/**
 * BFZ Inc. - Masterpiece Interaction Script
 * Ultra-smooth animations, Intersection Observers, and Premium Interactive Effects.
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Advanced Scroll Reveal using Intersection Observer
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            } else {
                entry.target.classList.remove("active");
            }
        });
    }, revealOptions);

    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => revealObserver.observe(el));

    // 2. Statistics Counter Animation
    const counterOptions = {
        threshold: 0.5
    };

    const countUp = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function: easeOutExpo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentCount = Math.floor(easeProgress * target);

            el.textContent = `${prefix}${currentCount}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        };

        requestAnimationFrame(updateCount);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                countUp(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, counterOptions);

    const counters = document.querySelectorAll('.counter');
    counters.forEach(el => counterObserver.observe(el));

    // 3. Navbar Scroll Logic
    const navbar = document.getElementById("main-nav");
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", handleNavbarScroll, { passive: true });

    // 4. Mobile Navigation Logic
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('toggle-active');
        });
    }

    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('toggle-active');
        }
    });

    // 5. Smooth Stagger for Grids
    const grids = document.querySelectorAll('.grid-2, .grid-3, .grid-4');
    grids.forEach(grid => {
        const items = grid.querySelectorAll('.reveal');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // 6. Interactive "Liquid" Cards (Subtle Tilt)
    const cards = document.querySelectorAll('.service-card, .sector-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
        });
    });

    // 7. Parallax Backgrounds (Subtle Image Shift)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const pageHeaders = document.querySelectorAll('.page-header-bg, .hero-bg-image');
        pageHeaders.forEach(img => {
            const limit = img.parentElement.offsetHeight;
            if (scrolled <= limit) {
                img.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    });

    // Initial check
    setTimeout(handleNavbarScroll, 100);
});
