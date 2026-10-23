import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferingPage } from "@/components/OfferingPage";
import { services } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

const local = services.filter((p) => !p.externalUrl);

export const dynamicParams = false;

export function generateStaticParams() {
  return local.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = local.find((x) => x.slug === slug);
  if (!p) return {};
  const path = `/services/${p.slug}`;
  return {
    title: { absolute: p.seoTitle },
    description: p.seoDescription,
    keywords: p.keywords,
    alternates: { canonical: path },
    openGraph: { url: path, title: p.seoTitle, description: p.seoDescription, type: "website" },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const p = local.find((x) => x.slug === slug);
  if (!p) notFound();
  return <OfferingPage offering={p} />;
}
