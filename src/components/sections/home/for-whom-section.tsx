import { forWhomCopy } from "@/lib/copy/site";

export function ForWhomSection() {
  return (
    <section id="for-whom" className="scroll-mt-20 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {forWhomCopy.headline}
        </h2>
        <p className="text-lg text-muted-foreground mb-4">{forWhomCopy.intro}</p>
        <p className="mb-2">{forWhomCopy.icp}</p>
        <p className="mb-8 font-medium">{forWhomCopy.notFor}</p>
        <p className="mb-4">{forWhomCopy.replaceIntro}</p>
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {forWhomCopy.doesNotReplace.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-border bg-card p-5"
            >
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{forWhomCopy.floor}</p>
      </div>
    </section>
  );
}
