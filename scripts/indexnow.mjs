// Tells IndexNow search engines (Bing, Yandex and others) about every URL in the live sitemaps.
// Bing's index also feeds ChatGPT search and Microsoft Copilot. Google does not use IndexNow; it reads the sitemaps.
// Usage: node scripts/indexnow.mjs   (run after a production deploy)
const KEY = "2787078fc4d16f05fbb71a1f71fbea03";
const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vrindabsolution.com").replace(/\/$/, "");

async function sitemapUrls(origin) {
  const res = await fetch(`${origin}/sitemap.xml`);
  if (!res.ok) throw new Error(`${origin}/sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function submit(origin) {
  const host = new URL(origin).host;
  const urlList = await sitemapUrls(origin);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key: KEY, keyLocation: `${origin}/${KEY}.txt`, urlList }),
  });
  console.log(`${host}: submitted ${urlList.length} URLs, IndexNow replied ${res.status}`);
  if (res.status >= 400) process.exitCode = 1;
}

// BeeWhat runs on Render with its own sitemap; this key is only served by this site.
for (const origin of [SITE]) {
  try {
    await submit(origin);
  } catch (err) {
    console.error(`${origin}: ${err.message}`);
    process.exitCode = 1;
  }
}
