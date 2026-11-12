/* Service worker: makes the course work offline and installable.
   Strategy: on install, read index.html and cache every same-origin file it
   references. After that it is NETWORK-FIRST: when you are online you always
   get the latest files (and the cache is refreshed); when you are offline the
   cached copies are used. Navigations fall back to the cached shell. */

const CACHE = "secplus-v2";

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const res = await fetch("index.html", { cache: "reload" });
    const html = await res.clone().text();
    const urls = ["./", "index.html", "manifest.webmanifest"];
    for (const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
      const u = m[1];
      if (/^(https?:|data:|\/\/)/.test(u)) continue;
      urls.push(u);
    }
    await Promise.allSettled(urls.map((u) => cache.add(new Request(u, { cache: "reload" }))));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const res = await fetch(req, { cache: "no-cache" });
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    } catch (err) {
      const cached = await cache.match(req, { ignoreSearch: true });
      if (cached) return cached;
      if (req.mode === "navigate") { const shell = await cache.match("index.html"); if (shell) return shell; }
      return new Response("Offline", { status: 503, statusText: "Offline" });
    }
  })());
});
