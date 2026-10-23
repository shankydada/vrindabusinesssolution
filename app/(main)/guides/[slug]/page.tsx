import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactBand } from "@/components/ContactBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { OfferList } from "@/components/OfferList";
import type { Offering } from "@/lib/catalog";
import { getOffering } from "@/lib/catalog";
import { getGuide, guides } from "@/lib/guides";
import { articleLd, breadcrumbLd, faqLd } from "@/lib/jsonld";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  const path = `/guides/${g.slug}`;
  return {
    title: { absolute: g.seoTitle },
    description: g.description,
    keywords: g.keywords,
    alternates: { canonical: path },
    openGraph: { url: path, title: g.seoTitle, description: g.description, type: "article", publishedTime: g.published, modifiedTime: g.updated },
  };
}

const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: g.title, path: `/guides/${g.slug}` },
  ];
  const related = g.products.map(getOffering).filter((o): o is Offering => !!o);
  const more = guides.filter((x) => x.slug !== g.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="page-head">
          <div className="wrap">
            <Breadcrumbs items={crumbs} />
            <h1 style={{ maxWidth: "20ch" }}>{g.title}</h1>
            <p className="lede">{g.intro}</p>
            <p className="guide-meta">
              By Vrinda Business Solution. Updated <time dateTime={g.updated}>{dateFormat.format(new Date(g.updated))}</time>
            </p>
          </div>
        </header>
        <div className="section">
          <div className="wrap guide-body">
            {g.sections.map((s) => {
              const List = s.ordered ? "ol" : "ul";
              return (
                <section key={s.heading}>
                  <h2>{s.heading}</h2>
                  {s.list && (
                    <List>
                      {s.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </List>
                  )}
                  {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                </section>
              );
            })}
            <section>
              <h2>Frequently asked questions</h2>
              <Faq items={g.faqs} />
            </section>
          </div>
        </div>
      </article>

      <section className="section" aria-labelledby="related-title">
        <div className="wrap">
          <h2 id="related-title" style={{ marginBottom: "2rem" }}>
            Products mentioned in this guide
          </h2>
          <OfferList items={related} />
        </div>
      </section>

      <section className="section" aria-labelledby="more-title">
        <div className="wrap">
          <h2 id="more-title" style={{ marginBottom: "2rem" }}>
            More guides
          </h2>
          <div className="cells" style={{ "--cols": 3 } as React.CSSProperties}>
            {more.map((m) => (
              <Link key={m.slug} href={`/guides/${m.slug}`} className="cell-link">
                <h3>{m.title}</h3>
                <p>{m.description}</p>
                <span className="cell-go">Read the guide</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactBand />
      <JsonLd data={[articleLd(g), breadcrumbLd(crumbs), faqLd(g.faqs)]} />
    </>
  );
}
