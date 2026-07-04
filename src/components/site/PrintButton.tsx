"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="border-border hover:bg-muted rounded-md border px-3 py-1.5 text-sm font-medium transition-colors print:hidden"
    >
      Print / Save PDF
    </button>
  );
}
