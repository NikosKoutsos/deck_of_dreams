const CACHE_NAME = 'image-cache-v1';
const IMAGES_TO_CACHE = [
    'images/anathema_q-min.jpg',
    'images/THE SUN-index.jpg',
    'images/The Star-min.jpg',
    'images/the_spider_by_koutsosnikos_df3ag2o-min.jpg',
    'images/The Phoenix-min.jpg',
    'images/the_end.png',
    'images/goddess-min.jpg',
    'images/the_moon.png',
    'images/the horror-min.jpg',
    'images/the_guardian.jpg',
    'images/facade-min-index.jpg',
    'images/benevolence-min.jpg',
    'images/mayura-min.jpg',
    'images/The Tempest-min.jpg',
    'images/THE PRIEST-min.jpg',
    'images/The Lovers-min.jpg',
    'images/The Emperor-min.jpg',
    'images/THE CURSE-min.jpg',
    'images/The Architect-min.jpg',
    'images/Oneiros-min.jpg',
    'images/mistake-min.png',
    'images/melancholia_by_koutsosnikos_dfahanh-min.jpg',
    'images/La Llorona-min.jpg',
    'images/khronos.png',
    'images/images/EOS-min.jpg',
    'images/Arachne-min.jpg',
    'images/photo-1447433553548-2fc162393482.jpg',
    'images/deck-of-dreams.png'
];

// Install Event - Cache Images
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching images...');
                return cache.addAll(IMAGES_TO_CACHE);
            })
            .catch((error) => {
                console.error('Failed to cache images:', error);
            })
    );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch Event - Serve Cached Images
self.addEventListener('fetch', (event) => {
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request).then((fetchResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
        );
    }
});