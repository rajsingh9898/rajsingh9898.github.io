document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Check if device has a touch screen, if so, hide custom cursor
    if (!window.matchMedia("(pointer: coarse)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Add a slight delay to the outline for a smooth trailing effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover effect for links and magnetic elements
        const interactables = document.querySelectorAll('a, button, .magnetic, .bento-card, .bento-project');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hovering');
            });
        });
    } else {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }

    // Magnetic Button Effect
    const magnetics = document.querySelectorAll('.magnetic');
    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            // Move button slightly towards cursor
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    const magneticHeavy = document.querySelectorAll('.magnetic-heavy');
    magneticHeavy.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const position = el.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            // 3D tilt effect
            el.style.transform = `rotateX(${-y * 0.05}deg) rotateY(${x * 0.05}deg) translateZ(10px)`;
        });
        
        el.addEventListener('mouseleave', function() {
            el.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });

    // Typewriter Effect
    const roles = ["AI Engineer", "Full-Stack Developer", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;
    const typewriterElement = document.querySelector('.typewriter');

    function typeWriter() {
        if (!typewriterElement) return;
        
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typingDelay = isDeleting ? deleteSpeed : typeSpeed;
        
        if (!isDeleting && charIndex === currentRole.length) {
            typingDelay = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingDelay = 500; // pause before typing next word
        }
        
        setTimeout(typeWriter, typingDelay);
    }
    
    // Start typewriter
    setTimeout(typeWriter, 1000);

    // Scroll Reveal with IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '1rem 5%';
            navbar.style.background = 'rgba(5, 5, 5, 0.8)';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            navbar.style.padding = '1.5rem 5%';
            navbar.style.background = 'rgba(5, 5, 5, 0.6)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Need to change display or handle via a mobile class 
            // In the new CSS, nav-links is hidden on mobile, let's toggle inline style for simplicity or add a class
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(5,5,5,0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderRadius = '0';
            }
        });
        
        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            });
        });
    }

    // Contact Button Copy Fallback
    const contactBtn = document.getElementById('contact-btn');
    const copyToast = document.getElementById('copy-toast');
    if (contactBtn && copyToast) {
        contactBtn.addEventListener('click', (e) => {
            // Write to clipboard as a fallback in case mailto: fails to open an app
            navigator.clipboard.writeText("rajsingh98447859@gmail.com").catch(err => {
                console.log('Clipboard copy failed: ', err);
            });
            
            // Show toast message
            copyToast.style.opacity = '1';
            setTimeout(() => {
                copyToast.style.opacity = '0';
            }, 3000);
        });
    }
});
