document.addEventListener('DOMContentLoaded', () => {
    
    // Navigation Smooth Scroll
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (hamburger && navMenu) { // Ensure elements exist
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                 window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // Sticky Header Effect
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active Link Highlighting (Intersection Observer)
    const sections = document.querySelectorAll('section, header'); 
    const navLinks = document.querySelectorAll('nav ul li a');

    const navObserverOptions = {
        root: null,
        threshold: 0.25, 
        rootMargin: "-10% 0px -50% 0px" // Trigger slightly before the section hits center
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const id = entry.target.getAttribute('id');
                let activeLink;

                if (id) {
                     activeLink = document.querySelector(`nav ul li a[href="#${id}"]`);
                } else if (entry.target.classList.contains('main-header') || entry.target.classList.contains('hero')) {
                     activeLink = document.querySelector(`nav ul li a[href="#"]`);
                }

                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

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
