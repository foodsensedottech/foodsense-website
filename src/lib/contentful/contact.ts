import { getTitle } from "@/lib/contentful/franchisee";
import type { FranchiseeTitleEntry } from "@/lib/contentful/types";

export async function getContactHeading(): Promise<FranchiseeTitleEntry | null> {
  return getTitle("contactTitleAndSubtitle");
}
