const addResourcesToCache = async (resources) => {
	console.log('adding stuff to cache');
  const cache = await caches.open("v6");
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      "/",
	  "/manifest.json",
      "/index.html",
      "/app.css",
      "/app.js"
    ]),
  );
});

const cacheFirst = async (request) => {
  console.log('cachefirst');
  /*
  my hack to not cache locally
  */
  if(self.location.host.indexOf('127') > -1) return fetch(request);
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  return fetch(request);
};

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});
