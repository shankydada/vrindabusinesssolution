import type { Offering } from "@/lib/catalog";
import { offeringHref } from "@/lib/catalog";

export function OfferList({ items, headingLevel = 3 }: { items: Offering[]; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className="offer-list">
      {items.map((o) => (
        <li key={o.slug}>
          <a className="offer-row" href={offeringHref(o)}>
            <Heading>
              {o.name}
              {o.externalUrl && <span className="tag">Own site</span>}
            </Heading>
            <p>{o.summary}</p>
            <span className="go">View {o.short}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
