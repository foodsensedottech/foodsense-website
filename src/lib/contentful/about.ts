import { getAboutCards, getAboutHeading } from "@/lib/contentful/client";

export async function getAboutContent() {
  const [heading, cards] = await Promise.all([
    getAboutHeading(),
    getAboutCards(),
  ]);

  return { heading, cards: cards ?? [] };
}
