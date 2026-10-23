import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// BeeWhat lives on its own subdomain but is served from this project:
// beewhat.<domain>/<path> is rewritten to the internal /beewhat-site/<path> route.
const BEEWHAT_PREFIX = "/beewhat-site";
const BEEWHAT_URL = (process.env.NEXT_PUBLIC_BEEWHAT_URL ?? "https://beewhat.vrindabsolution.com").replace(/\/$/, "");

function isBeeWhatHost(host: string | null) {
  return !!host && host.split(":")[0].startsWith("beewhat.");
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // The IndexNow key file must be served at the root of both hosts.
  if (/^\/[0-9a-f]{32}\.txt$/.test(pathname)) return NextResponse.next();

  if (isBeeWhatHost(request.headers.get("host"))) {
    if (pathname.startsWith(BEEWHAT_PREFIX)) {
      // Generated metadata images are addressed by their internal path; everything else gets a clean URL.
      if (pathname.includes("/opengraph-image")) return NextResponse.next();
      const url = request.nextUrl.clone();
      url.pathname = pathname.slice(BEEWHAT_PREFIX.length) || "/";
      return NextResponse.redirect(url, 308);
    }
    const url = request.nextUrl.clone();
    url.pathname = `${BEEWHAT_PREFIX}${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  // On the main domain, BeeWhat pages live on the subdomain only, so search engines see one URL.
  if (pathname === "/products/beewhat" || pathname.startsWith(BEEWHAT_PREFIX)) {
    const rest = pathname.startsWith(BEEWHAT_PREFIX) ? pathname.slice(BEEWHAT_PREFIX.length) : "";
    return NextResponse.redirect(`${BEEWHAT_URL}${rest || "/"}${search}`, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|svg|ico|woff2?)$).*)"],
};
