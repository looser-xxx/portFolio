document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. LIGHTBOX FUNCTIONALITY --- */

    // Create the lightbox element dynamically
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    // Create the image element inside the lightbox
    const lightboxImg = document.createElement('img');
    lightbox.appendChild(lightboxImg);

    // Select all images in the gallery
    const images = document.querySelectorAll('.gallery-item img');

    // Open Lightbox on Click
    images.forEach(image => {
        image.addEventListener('click', e => {
            lightbox.classList.add('active');
            lightboxImg.src = image.src;
        });
    });

    // Close Lightbox on Click (anywhere outside the image)
    lightbox.addEventListener('click', e => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });


    /* --- 2. SCROLL ANIMATION --- */

    // Config for the observer (start animation when 15% of item is visible)
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run animation only once
            }
        });
    }, observerOptions);

    // Observe all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        observer.observe(item);
    });
});