import { z } from "zod";
import { site } from "@/lib/site";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.email().max(320),
  message: z.string().trim().min(10).max(5000),
  /* Honeypot: real users never see this field. Accept anything here so a
     filled value reaches the fake-success branch instead of a 400. */
  company: z.string().optional(),
});

/* Best-effort rate limit. On Cloudflare Workers this map is per-isolate, so
   it's a speed bump rather than a guarantee — the honeypot does the real work. */
const lastSubmission = new Map<string, number>();
const RATE_LIMIT_MS = 30_000;

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      { error: "Please fill in all fields with valid values." },
      { status: 400 },
    );
  }

  const { name, email, message, company } = parsed.data;

  /* Bots that filled the honeypot get a fake success — no signal to adapt to. */
  if (company) {
    return Response.json({ ok: true });
  }

  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const last = lastSubmission.get(ip);
  if (last && Date.now() - last < RATE_LIMIT_MS) {
    return Response.json(
      { error: "Please wait a moment before sending another message." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form is disabled");
    return Response.json(
      { error: "The contact form is not available right now." },
      { status: 503 },
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      /* `||` not `??`: .env templates ship these as empty strings, which
         must fall through to the defaults. */
      from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.CONTACT_TO_EMAIL || site.email,
      reply_to: email,
      subject: `mhshakouri.dev contact: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!response.ok) {
    console.error("Resend error:", response.status, await response.text());
    return Response.json(
      { error: "Sending failed. Please try again or email me directly." },
      { status: 502 },
    );
  }

  /* Only count successful sends against the rate limit, so a failed
     submission can be retried immediately. */
  lastSubmission.set(ip, Date.now());

  return Response.json({ ok: true });
}
