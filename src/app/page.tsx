import { Suspense } from "react";
import { SiteShell } from "@/components/layout";
import { HomeContent } from "@/components/sections/home-content";
import { SectionLoading } from "@/components/ui/layout/section-loading";

export default function Home() {
  return (
    <SiteShell>
      <Suspense fallback={<SectionLoading />}>
        <HomeContent />
      </Suspense>
    </SiteShell>
  );
}

export const revalidate = 60;
