import { ScopedEngagementForm } from "./scoped-engagement-form";
import { semanticConfig } from "@/lib/utils";
import {
  SITE_EMAIL,
  SITE_INSTAGRAM,
  SITE_LINKEDIN,
  contactCopy,
} from "@/lib/copy/site";

export function ContactSection() {
  return (
    <section
      id={semanticConfig.sections.contact}
      className="scroll-mt-20 py-16 px-4"
    >
      <div className="container mx-auto max-w-2xl">
        <div className="mb-10">
          <h2 className="text-4xl font-bold mb-4">{contactCopy.headline}</h2>
          <p className="text-lg text-muted-foreground mb-3">
            {contactCopy.body}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            {contactCopy.modeNote}
          </p>
          <p className="text-sm">
            <a className="underline underline-offset-4" href={`mailto:${SITE_EMAIL}`}>
              {SITE_EMAIL}
            </a>
            {" · "}
            <a
              className="underline underline-offset-4"
              href={SITE_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            {" · "}
            <a
              className="underline underline-offset-4"
              href={SITE_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </p>
        </div>
        <ScopedEngagementForm />
      </div>
    </section>
  );
}

export { ContactForm } from "./contact-form";
