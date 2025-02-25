import { BaseLayout } from "@/components/layout";
import { HomeContent } from "@/components/sections/home-content";

export default function Home() {
  return (
    <BaseLayout>
      <HomeContent />
    </BaseLayout>
  );
}

// Add this export for ISR configuration
export const revalidate = 3600; // Revalidate at most once per hour
