import Image from "next/image";
import type { CopyCardData } from "@/lib/copy/resolved";

export function CopyCard({
  title,
  body,
  extra,
  image,
  kicker,
}: CopyCardData & { kicker?: string }) {
  return (
    <article className="rounded-lg border border-border bg-card overflow-hidden flex flex-col">
      {image?.url ? (
        <div className="relative aspect-[16/10] bg-muted">
          <Image
            src={image.url}
            alt={image.alt || title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="p-5 flex flex-col flex-grow">
        {kicker ? (
          <p className="text-sm font-semibold text-primary mb-2">{kicker}</p>
        ) : null}
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground flex-grow">{body}</p>
        {extra ? (
          <p className="text-sm mt-4 whitespace-pre-line">{extra}</p>
        ) : null}
      </div>
    </article>
  );
}
