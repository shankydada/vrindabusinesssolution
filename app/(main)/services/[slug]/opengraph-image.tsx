import { services } from "@/lib/catalog";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Service by Vrinda Business Solution";

export function generateStaticParams() {
  return services.filter((p) => !p.externalUrl).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = services.find((x) => x.slug === slug);
  return ogImage({ title: p?.name ?? "Vrinda Business Solution", subtitle: p?.summary ?? "" });
}
