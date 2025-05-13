// Optimize JavaScript execution
document.addEventListener('DOMContentLoaded', () => {
    // Use Intersection Observer for lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Optimize event listeners
    const revealAllButton = document.getElementById('reveal-all');
    if (revealAllButton) {
        revealAllButton.addEventListener('click', () => {
            requestAnimationFrame(() => {
                document.querySelectorAll('.image-container').forEach(card => {
                    card.classList.toggle('revealed');
                });
            });
        });
    }
});

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
    const altText = img.alt;

    container.addEventListener('mousedown', (event) => {
        const pageUrl = cardPages[altText];

        if (pageUrl) {
            if (event.button === 0) {
                window.location.href = pageUrl;
            } else if (event.button === 1) {
                window.open(pageUrl, '_blank');
            }
        } else {
            console.error(`No page mapped for: ${altText}`);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.image-gallery img');
    
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
                    
                    observer.unobserve(image);
                    
                    if (image.complete) {
                        image.classList.add('loaded');
                    }
                }
            });
        }, {
            rootMargin: '200px 0px',
            threshold: 0.01
        });
        
        images.forEach(image => {
            if (!image.hasAttribute('data-src') && image.src) {
                image.setAttribute('data-src', image.src);
            }
            imageObserver.observe(image);
        });
    } else {
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

document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.image-gallery');
    const cards = Array.from(gallery.children); 

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]]; 
        }
        return array;
    }

    const shuffledCards = shuffle(cards);
    shuffledCards.forEach(card => gallery.appendChild(card));
});

document.addEventListener('DOMContentLoaded', () => {
    const script = document.createElement('script');
    script.src = 'cache.js';
    script.defer = true;
    document.body.appendChild(script);
});