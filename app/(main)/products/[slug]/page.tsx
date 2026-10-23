import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferingPage } from "@/components/OfferingPage";
import { products } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

// BeeWhat is served from its own subdomain, so it has no page here.
const local = products.filter((p) => !p.externalUrl);

export const dynamicParams = false;

export function generateStaticParams() {
  return local.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = local.find((x) => x.slug === slug);
  if (!p) return {};
  const path = `/products/${p.slug}`;
  return {
    title: { absolute: p.seoTitle },
    description: p.seoDescription,
    keywords: p.keywords,
    alternates: { canonical: path },
    openGraph: { url: path, title: p.seoTitle, description: p.seoDescription, type: "website" },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = local.find((x) => x.slug === slug);
  if (!p) notFound();
  return <OfferingPage offering={p} />;
}
