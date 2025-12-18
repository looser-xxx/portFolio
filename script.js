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

    // Smooth Scroll for Hero Buttons
    const viewWorkBtn = document.getElementById('btn-work');
    const viewShowreelBtn = document.getElementById('btn-showreel');

    if(viewWorkBtn) {
        viewWorkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    if(viewShowreelBtn) {
        viewShowreelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const showreelSection = document.querySelector('#showreel');
            if (showreelSection) {
                showreelSection.scrollIntoView({ behavior: 'smooth' });
            }
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

    // Showreel Video Switcher (Sequential Fade with Transition Lock)
    const video1 = document.getElementById('video-1');
    const video2 = document.getElementById('video-2');
    const radioButtons = document.querySelectorAll('input[name="showreel_select"]');

    let isTransitioning = false; // Flag to prevent rapid-fire glitches

    if (video1 && video2 && radioButtons.length > 0) {
        radioButtons.forEach(radio => {
            radio.addEventListener('click', (e) => { // Use 'click' to intercept before 'change' if needed, or stick to 'change' but check flag
                if (isTransitioning) {
                    e.preventDefault(); // Prevent radio selection visually if locked
                    return false;
                }
            });

            radio.addEventListener('change', (e) => {
                if (isTransitioning) {
                    // Should be caught by click, but double check
                    return; 
                }

                const videoName = e.target.value;
                const newSource = `videos/showReel/${videoName}.mp4`;
                
                let activeVideo, inactiveVideo;
                if (video1.classList.contains('active')) {
                    activeVideo = video1;
                    inactiveVideo = video2;
                } else {
                    activeVideo = video2;
                    inactiveVideo = video1;
                }

                // If the selected source is already playing (rare edge case), do nothing
                if (activeVideo.src.includes(newSource)) return;

                isTransitioning = true; // Lock input

                // Set new source and sync time
                inactiveVideo.src = newSource;
                
                // Safe access to currentTime
                if (activeVideo.readyState > 0) {
                     inactiveVideo.currentTime = activeVideo.currentTime;
                } else {
                     inactiveVideo.currentTime = 0;
                }
                
                // Load the inactive video
                inactiveVideo.load();

                // Wait for the inactive video to be ready to play
                const onCanPlay = function() {
                    inactiveVideo.removeEventListener('canplaythrough', onCanPlay); // Cleanup listener
                    
                    const playPromise = inactiveVideo.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            // 1. New video is playing. Fade it in.
                            inactiveVideo.classList.remove('inactive');
                            inactiveVideo.classList.add('active');

                            // 2. After the new video has faded in (1s), fade out the old one.
                            setTimeout(() => {
                                activeVideo.classList.remove('active');
                                activeVideo.classList.add('inactive');
                                
                                // 3. After the old video has faded out (1s), pause it and unlock.
                                setTimeout(() => {
                                    activeVideo.pause();
                                    isTransitioning = false; // Unlock input
                                                            }, 200); // Match fade-out duration
                                
                                                        }, 200); // Match fade-in duration
                        }).catch(error => {
                            console.log("Auto-play prevented:", error);
                            // Fallback: reset state so user isn't locked out forever
                            isTransitioning = false;
                        });
                    }
                };

                inactiveVideo.addEventListener('canplaythrough', onCanPlay);
                
                // Safety timeout: if video takes too long to load (e.g. network error), unlock.
                setTimeout(() => {
                    if(isTransitioning) {
                        console.warn("Transition timeout - releasing lock");
                        isTransitioning = false;
                        inactiveVideo.removeEventListener('canplaythrough', onCanPlay);
                    }
                }, 5000); 
            });
        });
    }
});
