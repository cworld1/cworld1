importScripts('https://cdn.cbd.int/workbox-sw@6.5.4/build/workbox-sw.js');
workbox.setConfig({ modulePathPrefix: 'https://cdn.cbd.int/workbox-sw@6.5.4/build/' });

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      var validSets = ["is-sw-3f0a6e","is-html-3f0a6e","is-jsdelivr-3f0a6e","is-theme-3f0a6e","is-json-3f0a6e"];
      return Promise.all(
        names
          .filter(function (name) { return !~validSets.indexOf(name); })
          .map(function (name) {
            indexedDB && indexedDB.deleteDatabase(name);
            return caches.delete(name);
          })
      ).then(function() { self.skipWaiting() });
    })
  );
});

workbox.routing.registerRoute(new RegExp('sw\\.js'), workbox.strategies.networkOnly({
  cacheName: 'is-sw-3f0a6e',
}));
workbox.routing.registerRoute(new RegExp('https://gcore\\.jsdelivr\\.net'), workbox.strategies.staleWhileRevalidate({
  cacheName: 'is-jsdelivr-3f0a6e',
  plugins: [ new workbox.expiration.Plugin({ maxAgeSeconds: 14400 }) ],
}));
workbox.routing.registerRoute(new RegExp('/.*\\.(?:js|css|woff2|png|jpg|gif)l;/span>'), workbox.strategies.cacheFirst({
  cacheName: 'is-theme-3f0a6e',
  plugins: [ new workbox.expiration.Plugin({ maxAgeSeconds: 14400 }) ],
}));
workbox.routing.registerRoute(new RegExp('your_data_prefix/.*\\.json'), workbox.strategies.cacheFirst({
  cacheName: 'is-json-3f0a6e',
  plugins: [ new workbox.expiration.Plugin({ maxAgeSeconds: 14400 }) ],
}));

workbox.routing.registerRoute(new RegExp('/.*(:?/[^\\.]*/?)$'), function(context) {
  var url = context.url.pathname;
  if (!url.endsWith('/')) url += '/';
  return fetch(url);
});