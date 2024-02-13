importScripts('https://cdn.cbd.int/workbox-sw@6.5.4/build/workbox-sw.js');
workbox.setConfig({ modulePathPrefix: 'https://storage.googleapis.com/workbox-cdn/releases/6.5.4/' });

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      var validSets = ["is-sw-d89a26","is-html-d89a26","is-cbd_cdn-d89a26","is-theme-d89a26","is-json-d89a26"];
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
  cacheName: 'is-sw-d89a26',
}));
workbox.routing.registerRoute(new RegExp('https://cdn\\.cbd\\.int'), workbox.strategies.staleWhileRevalidate({
  cacheName: 'is-cbd_cdn-d89a26',
  plugins: [ new workbox.expiration.Plugin({ maxAgeSeconds: 14400 }) ],
}));
workbox.routing.registerRoute(new RegExp('/.*\\.(?:js|css|woff2|png|jpg|gif)l;/span>'), workbox.strategies.cacheFirst({
  cacheName: 'is-theme-d89a26',
  plugins: [ new workbox.expiration.Plugin({ maxAgeSeconds: 14400 }) ],
}));
workbox.routing.registerRoute(new RegExp('your_data_prefix/.*\\.json'), workbox.strategies.cacheFirst({
  cacheName: 'is-json-d89a26',
  plugins: [ new workbox.expiration.Plugin({ maxAgeSeconds: 14400 }) ],
}));

workbox.routing.registerRoute(new RegExp('/.*(:?/[^\\.]*/?)$'), function(context) {
  var url = context.url.pathname;
  if (!url.endsWith('/')) url += '/';
  return fetch(url);
});