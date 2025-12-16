// Typewriter effect for name
function typewriterEffect() {
    const text = "Shristi";
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
        if (!isDeleting && charIndex < text.length) {
            // Typing forward
            typewriterElement.textContent = text.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(type, 150); // Typing speed
        } else if (!isDeleting && charIndex === text.length) {
            // Pause at end before deleting
            if (!isPaused) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    type();
                }, 2000); // Pause duration
            }
        } else if (isDeleting && charIndex > 0) {
            // Deleting backward
            charIndex--;
            typewriterElement.textContent = text.substring(0, charIndex);
            setTimeout(type, 100); // Deleting speed
        } else if (isDeleting && charIndex === 0) {
            // Pause before typing again
            isDeleting = false;
            setTimeout(type, 500); // Pause before retyping
        }
    }

    type();
}

// Start typewriter effect when page loads
document.addEventListener('DOMContentLoaded', typewriterEffect);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.backgroundColor = 'rgba(240, 240, 240, 0.98)';
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = '';
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.section, .skill-category, .timeline-item, .project-card, .education-card'
    );

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add smooth hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Log page load time for performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});
