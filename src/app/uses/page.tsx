import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Uses",
};

export default function UsesPage() {
  return (
    <Container className="py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Uses</h1>
      <p className="text-muted-foreground mt-4">Coming soon.</p>
    </Container>
  );
}
