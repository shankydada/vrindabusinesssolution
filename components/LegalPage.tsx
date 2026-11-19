import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";

const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });

/** Shared layout for the Privacy Policy, Terms of Use and Data deletion pages. */
export function LegalPage({
  title,
  path,
  updated,
  intro,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  intro: string;
  children: React.ReactNode;
}) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: title, path },
  ];
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          <h1>{title}</h1>
          <p className="lede">{intro}</p>
          <p className="guide-meta">
            Last updated <time dateTime={updated}>{dateFormat.format(new Date(updated))}</time>
          </p>
        </div>
      </section>
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="wrap guide-body">{children}</div>
      </div>
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
