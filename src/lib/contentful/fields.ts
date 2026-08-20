import { ensureAbsoluteUrl } from "@/lib/utils";

export type CmsImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export function pickString(
  fields: Record<string, unknown> | undefined,
  keys: string[],
  fallback = ""
): string {
  if (!fields) return fallback;
  for (const key of keys) {
    const value = fields[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return fallback;
}

export function pickNumber(
  fields: Record<string, unknown> | undefined,
  keys: string[],
  fallback = 0
): number {
  if (!fields) return fallback;
  for (const key of keys) {
    const value = fields[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
  }
  return fallback;
}

export function assetImage(
  fields: Record<string, unknown> | undefined,
  keys: string[] = ["image", "backgroundImage", "thumbnail"]
): CmsImage | null {
  if (!fields) return null;
  for (const key of keys) {
    const asset = fields[key] as
      | {
          fields?: {
            title?: string;
            description?: string;
            file?: {
              url?: string;
              details?: { image?: { width?: number; height?: number } };
            };
          };
        }
      | undefined;
    const url = asset?.fields?.file?.url;
    if (!url) continue;
    const image = asset.fields?.file?.details?.image;
    return {
      url: ensureAbsoluteUrl(url),
      alt: asset.fields?.title || asset.fields?.description || "",
      width: image?.width,
      height: image?.height,
    };
  }
  return null;
}
