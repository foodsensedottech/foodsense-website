import { Suspense } from "react";
import { BaseLayout } from "@/components/layout";
import { HomeContent } from "@/components/sections/home-content";
import { SectionLoading } from "@/components/ui/layout/section-loading";

export default function Home() {
  return (
    <BaseLayout>
      <Suspense fallback={<SectionLoading />}>
        <HomeContent />
      </Suspense>
    </BaseLayout>
  );
}

// Add this export for ISR configuration
export const revalidate = 3600; // Revalidate at most once per hour
