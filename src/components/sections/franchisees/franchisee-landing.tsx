import { HomeContent } from "@/components/sections/home-content";
import type { FranchiseeLocale } from "@/lib/franchisees/copy";

interface FranchiseeLandingProps {
  locale: FranchiseeLocale;
}

export async function FranchiseeLanding({ locale }: FranchiseeLandingProps) {
  return <HomeContent locale={locale} />;
}
