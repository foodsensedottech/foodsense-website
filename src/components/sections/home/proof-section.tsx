import Link from "next/link";
import { CopyCard } from "@/components/ui/media/copy-card";
import type { HomeMarketingCopy } from "@/lib/copy/resolved";

export function ProofSection({ copy }: { copy: HomeMarketingCopy["proof"] }) {
  return (
    <section
      id="proof"
      className="scroll-mt-20 py-16 px-4 bg-muted/40 dark:bg-gray-900/40"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{copy.headline}</h2>
        <p className="mb-4">{copy.origin}</p>
        <p className="mb-8 text-muted-foreground">{copy.villain}</p>
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {copy.beats.map((beat) => (
            <CopyCard key={beat.title} {...beat} />
          ))}
        </div>
        <p className="text-sm mb-4">{copy.attribution}</p>
        <Link href="/about" className="text-sm font-medium underline underline-offset-4">
          About the operator
        </Link>
      </div>
    </section>
  );
}
