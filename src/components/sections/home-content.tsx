import { Suspense } from "react";
import { ConversionHome } from "./conversion";
import { SectionLoading } from "@/components/ui/layout/section-loading";

export async function HomeContent() {
  return (
    <Suspense fallback={<SectionLoading />}>
      <ConversionHome />
    </Suspense>
  );
}
