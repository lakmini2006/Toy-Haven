const CACHE_NAME = "toy-haven-v5";

self.addEventListener("install", function (event) {
    self.skipWaiting();
});

const FILES_TO_CACHE = [
    "index.html",
    "products.html",
    "cart.html",
    "checkout.html",
    "wishlist.html",
    "feedback.html",
    "css/style.css",
    "js/main.js",
    "js/products.js",
    "js/cart.js",
    "js/checkout.js",
    "js/wishlist.js",
    "js/feedback.js",
    "manifest.json",
    "favicon.svg"
];


/* =========================================
   INSTALL
========================================= */

self.addEventListener("install", function (event) {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(function (cache) {

                return cache.addAll(FILES_TO_CACHE);

            })

    );

});


/* =========================================
   FETCH
========================================= */

self.addEventListener("fetch", function (event) {

    event.respondWith(

        fetch(event.request)
            .then(function (networkResponse) {

                return caches.open(CACHE_NAME)
                    .then(function (cache) {

                        cache.put(
                            event.request,
                            networkResponse.clone()
                        );

                        return networkResponse;

                    });

            })
            .catch(function () {

                return caches.match(event.request);

            })

    );

});


/* =========================================
   ACTIVATE
========================================= */

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );

    self.clients.claim();
});