import { ScopedEngagementForm } from "./scoped-engagement-form";
import { semanticConfig } from "@/lib/utils";
import type { ContactCopyResolved, SiteChromeCopy } from "@/lib/copy/resolved";

export function ContactSection({
  copy,
  chrome,
}: {
  copy: ContactCopyResolved;
  chrome: SiteChromeCopy;
}) {
  return (
    <section
      id={semanticConfig.sections.contact}
      className="scroll-mt-20 py-16 px-4"
    >
      <div className="container mx-auto max-w-2xl">
        <div className="mb-10">
          <h2 className="text-4xl font-bold mb-4">{copy.headline}</h2>
          <p className="text-lg text-muted-foreground mb-3">{copy.body}</p>
          <p className="text-sm text-muted-foreground mb-4">{copy.modeNote}</p>
          <p className="text-sm">
            <a
              className="underline underline-offset-4"
              href={`mailto:${chrome.footerEmail}`}
            >
              {chrome.footerEmail}
            </a>
            {" · "}
            <a
              className="underline underline-offset-4"
              href={chrome.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            {" · "}
            <a
              className="underline underline-offset-4"
              href={chrome.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </p>
        </div>
        <ScopedEngagementForm copy={copy} />
      </div>
    </section>
  );
}

export { ContactForm } from "./contact-form";
