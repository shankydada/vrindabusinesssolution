import Link from "next/link";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="crumbs">
        {items.map((item, i) => (
          <li key={item.path}>
            {i === items.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link href={item.path}>{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
