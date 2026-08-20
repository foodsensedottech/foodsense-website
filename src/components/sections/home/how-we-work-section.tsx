import { CopyCard } from "@/components/ui/media/copy-card";
import type { HomeMarketingCopy } from "@/lib/copy/resolved";

export function HowWeWorkSection({
  copy,
}: {
  copy: HomeMarketingCopy["howWeWork"];
}) {
  return (
    <section id="how-we-work" className="scroll-mt-20 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{copy.headline}</h2>
        <p className="text-lg text-muted-foreground mb-10">{copy.intro}</p>
        <ol className="grid gap-6 md:grid-cols-3">
          {copy.steps.map((step, index) => (
            <li key={step.title}>
              <CopyCard {...step} kicker={`Step ${index + 1}`} />
            </li>
          ))}
        </ol>
        <p className="mt-8">{copy.close}</p>
      </div>
    </section>
  );
}
