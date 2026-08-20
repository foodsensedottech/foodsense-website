import type { ReactNode } from "react";
import { BaseLayout } from "@/components/layout/base-layout";
import { getSiteChrome } from "@/lib/contentful/marketing";
import type { SiteChromeCopy } from "@/lib/copy/resolved";

export async function SiteShell({
  children,
  chrome,
}: {
  children: ReactNode;
  chrome?: SiteChromeCopy;
}) {
  const resolved = chrome ?? (await getSiteChrome());
  return <BaseLayout chrome={resolved}>{children}</BaseLayout>;
}
