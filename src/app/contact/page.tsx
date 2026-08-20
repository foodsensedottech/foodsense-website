import { BaseLayout } from "@/components/layout";
import { ScopedEngagementForm } from "@/components/sections/contact/scoped-engagement-form";
import {
  SITE_EMAIL,
  SITE_INSTAGRAM,
  SITE_LINKEDIN,
  contactCopy,
} from "@/lib/copy/site";

export default function ContactPage() {
  return (
    <BaseLayout>
      <main className="container mx-auto py-10">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{contactCopy.headline}</h1>
            <p className="mt-2 text-muted-foreground">{contactCopy.body}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {contactCopy.modeNote}
            </p>
            <p className="mt-4 text-sm">
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

          <div className="bg-card p-6 rounded-lg border border-border mb-10">
            <ScopedEngagementForm />
          </div>

          <section id="contact-calendar">
            <h2 className="text-xl font-semibold mb-2">
              Prefer a time on the calendar
            </h2>
            <p className="text-sm text-muted-foreground">
              Calendar embed is coming once the booking URL is set. Until then,
              use the form or email {SITE_EMAIL}.
            </p>
          </section>
        </div>
      </main>
    </BaseLayout>
  );
}
