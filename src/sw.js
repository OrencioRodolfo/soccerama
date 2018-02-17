/* eslint-disable */
self.addEventListener('install', function installSW(event) {
  event.waitUntil(
    caches.open('soccerama-assets-v1').then((cache) => {
      return cache.addAll([
        '/',
        'bundle.js',
        'img-placeholder.png',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.url.match(/(goo\.gl|png|jpg|gif)/g)) {
    event.respondWith(
      caches.match('/img-placeholder.png').then(function(res) {
        return fetch(event.request).catch(function(){
          return res;
        })
      })
    );
    return;
  };

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      };
      return fetch(event.request);
    })
  );
});