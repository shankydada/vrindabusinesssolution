import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="section">
      <div className="wrap">
        <h1 style={{ fontSize: "var(--step-3)" }}>This page does not exist</h1>
        <p className="lede" style={{ marginTop: "1rem" }}>
          The link may be old or mistyped. Start from the home page or see all products.
        </p>
        <div className="hero-actions">
          <Link href="/" className="btn btn-primary">
            Go to Home
          </Link>
          <Link href="/products" className="btn btn-secondary">
            See All Products
          </Link>
        </div>
      </div>
    </main>
  );
}
