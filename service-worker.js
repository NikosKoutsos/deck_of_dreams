const CACHE_NAME = 'image-cache-v2';
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
    'images/EOS-min.jpg', // Corrected path
    'images/Arachne-min.jpg',
    'images/photo-1447433553548-2fc162393482.jpg',
    'images/deck-of-dreams.png'
];

// Preload and cache critical images first
const CRITICAL_IMAGES = [
    'images/THE SUN-index.jpg',
    'images/The Star-min.jpg',
    'images/the_spider_by_koutsosnikos_df3ag2o-min.jpg',
    'images/The Phoenix-min.jpg',
    'images/the_end.png',
    'images/goddess-min.jpg',
    'images/deck-of-dreams.png'
];

// Install Event - Cache Images
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(async (cache) => {
                console.log('Caching critical images first...');
                // Cache critical images first
                await cache.addAll(CRITICAL_IMAGES).catch(err => console.error('Failed to cache critical images:', err));
                
                // Then cache the rest
                console.log('Caching remaining images...');
                return cache.addAll(IMAGES_TO_CACHE.filter(img => !CRITICAL_IMAGES.includes(img)));
            })
            .catch((error) => {
                console.error('Failed to cache images:', error);
            })
    );
    // Skip waiting to activate the new service worker immediately
    self.skipWaiting();
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
        }).then(() => {
            // Take control of all clients immediately
            return self.clients.claim();
        })
    );
});

// Fetch Event - Serve Cached Images with Network Fallback
self.addEventListener('fetch', (event) => {
    // For image requests
    if (event.request.destination === 'image') {
        event.respondWith(
            // Try the cache first
            caches.match(event.request)
                .then((cachedResponse) => {
                    // Return cached response if available
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    
                    // Otherwise fetch from network
                    return fetch(event.request)
                        .then((networkResponse) => {
                            // Don't cache responses that aren't successful
                            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                                return networkResponse;
                            }
                            
                            // Clone the response since it can only be consumed once
                            const responseToCache = networkResponse.clone();
                            
                            // Add to cache for future requests
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });
                                
                            return networkResponse;
                        })
                        .catch((error) => {
                            console.error('Fetching failed:', error);
                            // Could return a fallback image here
                        });
                })
        );
    }
});