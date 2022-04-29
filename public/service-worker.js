const CACHE_NAME = "version-2";
const urlToCache = ["index.html", "offline.html"];
// Referring to the global object;
var self = this;

// Install service worker for the first time
self.addEventListener("install", (event) => {
  // Waiting for the cache to fully load and initializing the cache
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache is opened now.");
      return cache.addAll(urlToCache);
    })
  );
});

// Listen for the request
self.addEventListener("fetch", (event) => {
  // Respond to the request with the cache version
  event.respondWith(
    caches
      .match(event.request)
      .then(() =>
        fetch(event.request).catch(() => caches.match("offline.html"))
      )
  );
});

// Active the service Worker instance
self.addEventListener("activate", (event) => {
  // Remove the used cache and add the new onEdit
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  console.log("Cache is activated now.");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map(
          (cacheName) =>
            !cacheWhitelist.includes(cacheName) && caches.delete(cacheName)
        )
      );
    })
  );
});
