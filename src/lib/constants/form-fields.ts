export const RESTAURANT_TYPES = [
  { label: "Quick service (QSR)", value: "qsr" },
  { label: "Fast casual", value: "fast_casual" },
  { label: "Casual dining", value: "casual_dining" },
  { label: "Multi-brand group", value: "multi_brand" },
  { label: "Ghost kitchen / virtual", value: "ghost_kitchen" },
  { label: "Fine dining", value: "fine_dining" },
  { label: "Other", value: "other" },
] as const;

export const POS_SYSTEMS = [
  { label: "Oracle / Simphony", value: "oracle" },
  { label: "NCR", value: "ncr" },
  { label: "Toast", value: "toast" },
  { label: "Aloha", value: "aloha" },
  { label: "PAR", value: "par" },
  { label: "Xenial", value: "xenial" },
  { label: "Clover", value: "clover" },
  { label: "Square", value: "square" },
  { label: "Lightspeed", value: "lightspeed" },
  { label: "None yet", value: "none" },
  { label: "Other", value: "other" },
] as const;

export const WHATS_BREAKING = [
  {
    label: "Siloed stack between Tech, Ops, and Digital",
    value: "siloed_stack",
  },
  {
    label: "Slow or expensive vendor professional services",
    value: "slow_vendor",
  },
  { label: "No owner of standardization", value: "no_owner" },
  {
    label: "Stores running different versions of the same stack",
    value: "version_drift",
  },
  { label: "POS or backend implementation", value: "pos_backend" },
  { label: "Customer-facing channels", value: "channels" },
  { label: "Menu architecture or pricing", value: "menu" },
  { label: "Rollout has no program owner", value: "no_pm" },
  { label: "Other", value: "other" },
] as const;

export type RestaurantTypeValue = (typeof RESTAURANT_TYPES)[number]["value"];
export type PosSystemValue = (typeof POS_SYSTEMS)[number]["value"];
export type WhatsBreakingValue = (typeof WHATS_BREAKING)[number]["value"];

export function optionLabel(
  options: readonly { label: string; value: string }[],
  value: string
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

export function formatSelectedOptions(
  values: string[] | undefined,
  options: readonly { label: string; value: string }[],
  otherText?: string
): string | undefined {
  if (!values?.length) {
    return otherText?.trim() || undefined;
  }

  const labels = values
    .filter((value) => value !== "other")
    .map((value) => optionLabel(options, value));

  const extra = otherText?.trim();
  if (values.includes("other") && extra) {
    labels.push(`Other: ${extra}`);
  } else if (values.includes("other")) {
    labels.push("Other");
  }

  return labels.length ? labels.join("; ") : undefined;
}
