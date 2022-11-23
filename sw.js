importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
workbox.setConfig({ modulePathPrefix: 'https://g.alicdn.com/kg/workbox/3.6.3/' });

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      var validSets = ["is-sw-b90f61","is-html-b90f61","is-jsdelivr-b90f61","is-theme-b90f61","is-json-b90f61"];
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
  cacheName: 'is-sw-b90f61',
}));
workbox.routing.registerRoute(new RegExp('https://cdn\\.jsdelivr\\.net'), workbox.strategies.staleWhileRevalidate({
  cacheName: 'is-jsdelivr-b90f61',
}));
workbox.routing.registerRoute(new RegExp('/.*\\.(?:js|css|woff2|png|jpg|gif)l;/span>'), workbox.strategies.cacheFirst({
  cacheName: 'is-theme-b90f61',
}));
workbox.routing.registerRoute(new RegExp('your_data_prefix/.*\\.json'), workbox.strategies.cacheFirst({
  cacheName: 'is-json-b90f61',
}));

workbox.routing.registerRoute(new RegExp('/.*(:?/[^\\.]*/?)$'), function(context) {
  var url = context.url.pathname;
  if (!url.endsWith('/')) url += '/';
  return fetch(url);
});