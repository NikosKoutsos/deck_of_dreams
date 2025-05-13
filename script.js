// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Register service worker immediately instead of waiting for DOMContentLoaded
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker registered successfully.'))
        .catch((error) => console.error('Service Worker registration failed:', error));
}

const cardPages = {
    "The Sun": "the_sun.html",
    "The Star": "the_star.html",
    "The Spider": "the_spider.html",
    "The Phoenix": "the_phoenix.html",
    "The End": "the_end.html",
    "The Goddess": "the_goddess.html",
    "The Moon": "the_moon.html",
    "The Horror": "the_horror.html",
    "The Guardian": "the_guardian.html",
    "The Facade": "the_facade.html",
    "Benevolence": "benevolence.html",
    "Anathema": "anathema.html",
    "The Tempest": "the_tempest.html",
    "The Priest": "the_priest.html",
    "The Lovers": "the_lovers.html",
    "The Emperor": "the_emperor.html",
    "Mayura": "mayura.html",
    "The Curse": "the_curse.html",
    "The Architect": "the_architect.html",
    "Oneiros": "oneiros.html",
    "Error" : "unknown.html",
    "Melancholia": "melancholia.html",
    "La Llorona": "la_llorona.html",
    "Khronos": "khronos.html",
    "Eos": "eos.html",
    "Arachne": "arachne.html"
};

document.querySelectorAll('.image-container').forEach((container) => {
    const img = container.querySelector('img');
    const altText = img.alt; // Use the 'alt' attribute to identify the card

    container.addEventListener('mousedown', (event) => {
        const pageUrl = cardPages[altText]; // Get the URL based on the card name

        if (pageUrl) {
            if (event.button === 0) {
                // Left click
                window.location.href = pageUrl;
            } else if (event.button === 1) {
                // Middle click
                window.open(pageUrl, '_blank'); // Open in a new tab
            }
        } else {
            console.error(`No page mapped for: ${altText}`);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Remove duplicate image preloading code and replace with optimized version
    const images = document.querySelectorAll('.image-gallery img');
    
    // Use Intersection Observer for lazy loading images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    const dataSrc = image.getAttribute('data-src');
                    
                    if (dataSrc) {
                        image.src = dataSrc;
                    }
                    
                    image.onload = () => {
                        image.classList.add('loaded');
                    };
                    
                    // Stop observing the image after it's loaded
                    observer.unobserve(image);
                    
                    // If image is already loaded (from cache)
                    if (image.complete) {
                        image.classList.add('loaded');
                    }
                }
            });
        }, {
            rootMargin: '200px 0px', // Start loading when image is 200px away
            threshold: 0.01
        });
        
        // Observe all images
        images.forEach(image => {
            // Store original src in data-src and leave src empty or with placeholder
            if (!image.hasAttribute('data-src') && image.src) {
                image.setAttribute('data-src', image.src);
                // You could use a tiny placeholder or low-res version here
                // image.src = 'placeholder.jpg';
            }
            imageObserver.observe(image);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        images.forEach(image => {
            if (image.getAttribute('data-src')) {
                image.src = image.getAttribute('data-src');
            }
            
            image.onload = () => {
                image.classList.add('loaded');
            };
            
            if (image.complete) {
                image.classList.add('loaded');
            }
        });
    }
});

// Select the Reveal All button
const revealAllButton = document.getElementById('reveal-all');

// Add event listener for button click
revealAllButton.addEventListener('click', function () {
    // Select all image-container elements
    const cards = document.querySelectorAll('.image-gallery .image-container');

    // Check if any card is currently revealed
    const isRevealed = [...cards].some(card => card.classList.contains('revealed'));

    if (isRevealed) {
        // If already revealed, bring back the covers
        cards.forEach(card => card.classList.remove('revealed'));
        revealAllButton.textContent = 'Reveal'; // Update button text
    } else {
        // If not revealed, reveal all cards
        cards.forEach(card => card.classList.add('revealed'));
        revealAllButton.textContent = 'Conceal'; // Update button text
    }
});

// Shuffle the cards on page load
document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.image-gallery');
    const cards = Array.from(gallery.children); 

    // Shuffle function
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]]; 
        }
        return array;
    }

    // Shuffle cards
    const shuffledCards = shuffle(cards);

    // Clear the gallery and re-add the shuffled cards
    shuffledCards.forEach(card => gallery.appendChild(card));
});


document.addEventListener('DOMContentLoaded', () => {
    const script = document.createElement('script');
    script.src = 'cache.js';
    script.defer = true;
    document.body.appendChild(script);
});