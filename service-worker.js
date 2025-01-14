const CACHE_NAME = 'image-cache-v1';
const IMAGES_TO_CACHE = [
    'images/the_sun_by_koutsosnikos_df2vlnd-min.jpg',
    'images/the_star_by_koutsosnikos_df3w9vc-min.jpg',
    'images/the_spider_by_koutsosnikos_df3ag2o-min.jpg',
    'images/the_phoenix_by_koutsosnikos_df3yhzz-min.jpg',
    'images/the_end_by_koutsosnikos_df42i81-min.jpg',
    'images/the_goddess_by_koutsosnikos_df2s1sh-min.jpg',
    'images/the_moon_by_koutsosnikos_df3tvh3-min.jpg',
    'images/the_horror_by_koutsosnikos_df55keo-min.jpg',
    'images/the_guardian_by_koutsosnikos_df5ju3h-min.jpg',
    'images/the_facade_by_koutsosnikos_df3ca8f-min.jpg',
    'images/cherubimon_by_koutsosnikos_df5ygn8-min.jpg',
    'images/The Tempest-min.jpg',
    'images/THE PRIEST-min.jpg',
    'images/The Lovers-min.jpg',
    'images/The Emperor-min.jpg',
    'images/THE CURSE-min.jpg',
    'images/The Architect-min.jpg',
    'images/Oneiros-min.jpg',
    'images/melancholia_by_koutsosnikos_dfahanh-min.jpg',
    'images/mayura_by_koutsosnikos_df5se7t-min.jpg',
    'images/La Llorona-min.jpg',
    'images/KHRONOS-min.jpg',
    'images/erebos_by_koutsosnikos_df9axjm-min.jpg',
    'images/EOS-min.jpg',
    'images/images/Arachne-min.jpg',
    'images/anathema_by_koutsosnikos_df4vjxj-min.jpg',
    'images/photo-1447433553548-2fc162393482.jpg',
    'images/card_back_1.jpg'
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