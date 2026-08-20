import Link from "next/link";
import { proofCopy } from "@/lib/copy/site";

export function ProofSection() {
  return (
    <section
      id="proof"
      className="scroll-mt-20 py-16 px-4 bg-muted/40 dark:bg-gray-900/40"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {proofCopy.headline}
        </h2>
        <p className="mb-4">{proofCopy.origin}</p>
        <p className="mb-8 text-muted-foreground">{proofCopy.villain}</p>
        <div className="space-y-6 mb-8">
          {proofCopy.beats.map((beat) => (
            <article key={beat.title} className="rounded-lg border border-border bg-card p-5">
              <h3 className="font-semibold mb-2">{beat.title}</h3>
              <p className="text-sm text-muted-foreground">{beat.body}</p>
            </article>
          ))}
        </div>
        <p className="text-sm mb-4">{proofCopy.attribution}</p>
        <Link href="/about" className="text-sm font-medium underline underline-offset-4">
          About the operator
        </Link>
      </div>
    </section>
  );
}
