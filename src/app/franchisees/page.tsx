import type { Metadata } from "next";
import { BaseLayout } from "@/components/layout";
import { FranchiseeLanding } from "@/components/sections/franchisees/franchisee-landing";

export const metadata: Metadata = {
  title: "FoodSense",
  description: "Restaurant technology consulting for multi-unit franchisees.",
};

export default function FranchiseesPage() {
  return (
    <BaseLayout>
      <FranchiseeLanding />
    </BaseLayout>
  );
}
