import { guides } from "@/lib/guides";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Guide by Vrinda Business Solution";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  return ogImage({ brand: "Vrinda Business Solution guides", title: g?.title ?? "Guides", subtitle: g?.description ?? "" });
}
