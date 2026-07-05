import type { Metadata } from "next";
import { ContactForm } from "@/components/site/ContactForm";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Hossein Shakouri.",
};

export default function ContactPage() {
  return (
    <Container className="py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="text-muted-foreground mt-4 max-w-xl">
        Have a question, an opportunity, or just want to say hi? Send a message
        below, or email me directly at{" "}
        <a href={`mailto:${site.email}`} className="text-accent">
          {site.email}
        </a>
        .
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </Container>
  );
}
