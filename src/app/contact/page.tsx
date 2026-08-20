import { SiteShell } from "@/components/layout";
import { ScopedEngagementForm } from "@/components/sections/contact/scoped-engagement-form";
import { getContactMarketingCopy } from "@/lib/contentful/marketing";

export const revalidate = 60;

export default async function ContactPage() {
  const { chrome, contact } = await getContactMarketingCopy();

  return (
    <SiteShell chrome={chrome}>
      <main className="container mx-auto py-10">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{contact.headline}</h1>
            <p className="mt-2 text-muted-foreground">{contact.body}</p>
            <p className="mt-2 text-sm text-muted-foreground">{contact.modeNote}</p>
            <p className="mt-4 text-sm">
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

          <div className="bg-card p-6 rounded-lg border border-border mb-10">
            <ScopedEngagementForm copy={contact} />
          </div>

          <section id="contact-calendar">
            <h2 className="text-xl font-semibold mb-2">{contact.calendarHeadline}</h2>
            <p className="text-sm text-muted-foreground">{contact.calendarBody}</p>
          </section>
        </div>
      </main>
    </SiteShell>
  );
}
