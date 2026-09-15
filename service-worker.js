/* Toy Haven - Service Worker */

const CACHE_NAME = "toy-haven-v6";

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


/* Install */

self.addEventListener("install", function (event) {

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(function (cache) {

                return cache.addAll(FILES_TO_CACHE);

            })

    );

});


/* Fetch */

self.addEventListener("fetch", function (event) {

    if (event.request.method !== "GET") {
        return;
    }

    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

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


/* Activate */

self.addEventListener("activate", function (event) {

    event.waitUntil(

        caches.keys()
            .then(function (cacheNames) {

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