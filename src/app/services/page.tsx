import type { Metadata } from "next";
import Link from "next/link";
import { BaseLayout } from "@/components/layout";
import { servicesPageCopy as copy } from "@/lib/content/services-page";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Advisory, fractional work, and project management for POS, kiosk, delivery, loyalty, and data — for 10+ unit QSR and franchise operators.",
  openGraph: {
    title: "Services | FoodSense",
    description:
      "Advisory, fractional work, and project management for 10+ unit restaurant operators.",
    url: "https://foodsense.tech/services",
    siteName: "FoodSense",
    locale: "en_US",
    type: "website",
  },
};

export const revalidate = 3600;

export default function ServicesPage() {
  return (
    <BaseLayout>
      <article>
        <section className="bg-[#253B59] text-white py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-3xl">
            <p className="text-sm tracking-[0.18em] uppercase text-[#F1C100] mb-3">
              {copy.eyebrow}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              {copy.heading}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">{copy.intro}</p>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-10 md:gap-8">
              {copy.modes.map((mode) => (
                <article
                  key={mode.title}
                  className="border-t border-[#253B59]/15 pt-6"
                >
                  <h2 className="text-xl font-semibold text-[#253B59] mb-3">
                    {mode.title}
                  </h2>
                  <p className="text-[#253B59]/75 leading-relaxed">{mode.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-[#F5F6F8]">
          <div className="container mx-auto px-4">
            <p className="text-sm tracking-[0.18em] uppercase text-[#D4A800] mb-3">
              {copy.capabilitiesEyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#253B59] mb-12 max-w-2xl leading-tight">
              {copy.capabilitiesHeading}
            </h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              {copy.capabilities.map((item) => (
                <article key={item.title}>
                  <h3 className="text-lg font-semibold text-[#253B59] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#253B59]/75 leading-relaxed">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-semibold text-[#253B59] mb-6">
              {copy.notHeading}
            </h2>
            <ul className="space-y-3 text-[#253B59]/80">
              {copy.notItems.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-[#F1C100] pl-4 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-14">
              <h2 className="text-2xl font-semibold text-[#253B59] mb-3">
                {copy.ctaHeading}
              </h2>
              <p className="text-[#253B59]/75 mb-6">{copy.ctaBody}</p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-[#F1C100] text-[#253B59] font-semibold hover:bg-[#D4A800] transition-colors duration-200"
              >
                {copy.ctaLabel}
              </Link>
            </div>
          </div>
        </section>
      </article>
    </BaseLayout>
  );
}
