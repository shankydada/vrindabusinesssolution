import { products } from "@/lib/catalog";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Product by Vrinda Business Solution";

export function generateStaticParams() {
  return products.filter((p) => !p.externalUrl).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  return ogImage({ title: p?.name ?? "Vrinda Business Solution", subtitle: p?.summary ?? "" });
}
