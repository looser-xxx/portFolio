document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth Scroll for "View Work" button
    const viewWorkBtn = document.querySelector('.btn-primary');
    if(viewWorkBtn) {
        viewWorkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('#projects').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }

    // Scroll Reveal Animation for Project Cards
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        // Set initial state for animation in JS to avoid accessibility issues if JS fails
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s, box-shadow 0.3s ease, border-color 0.3s ease`;
        
        observer.observe(card);
    });

    // Observe Contact Section
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        contactSection.style.opacity = '0';
        contactSection.style.transform = 'translateY(30px)';
        contactSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(contactSection);
    }
});
