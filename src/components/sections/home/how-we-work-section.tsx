import { howWeWorkCopy } from "@/lib/copy/site";

export function HowWeWorkSection() {
  return (
    <section id="how-we-work" className="scroll-mt-20 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {howWeWorkCopy.headline}
        </h2>
        <p className="text-lg text-muted-foreground mb-10">
          {howWeWorkCopy.intro}
        </p>
        <ol className="grid gap-6 md:grid-cols-3">
          {howWeWorkCopy.steps.map((step, index) => (
            <li key={step.title} className="rounded-lg border border-border p-5">
              <p className="text-sm font-semibold text-primary mb-2">
                Step {index + 1}
              </p>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8">{howWeWorkCopy.close}</p>
      </div>
    </section>
  );
}
