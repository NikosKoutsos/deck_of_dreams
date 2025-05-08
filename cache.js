// This is a simple JavaScript program that logs "Hello, World!" to the console

// Image preload and caching utility

// Function to preload the most important images
function preloadCriticalImages() {
    const criticalImages = [
        'images/THE SUN-index.jpg',
        'images/The Star-min.jpg',
        'images/the_spider_by_koutsosnikos_df3ag2o-min.jpg',
        'images/The Phoenix-min.jpg',
        'images/the_end.png',
        'images/goddess-min.jpg',
        'images/deck-of-dreams.png'
    ];
    
    console.log('Preloading critical images...');
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Execute immediately to preload critical images
preloadCriticalImages();