import { CopyCard } from "@/components/ui/media/copy-card";
import type { HomeMarketingCopy } from "@/lib/copy/resolved";

export function ForWhomSection({ copy }: { copy: HomeMarketingCopy["forWhom"] }) {
  return (
    <section id="for-whom" className="scroll-mt-20 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{copy.headline}</h2>
        <p className="text-lg text-muted-foreground mb-4">{copy.intro}</p>
        <p className="mb-2">{copy.icp}</p>
        <p className="mb-8 font-medium">{copy.notFor}</p>
        <p className="mb-4">{copy.replaceIntro}</p>
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {copy.cards.map((item) => (
            <CopyCard key={item.title} {...item} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{copy.floor}</p>
      </div>
    </section>
  );
}
