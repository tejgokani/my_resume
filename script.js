// Theme Management
class ThemeManager {
    constructor() {
        this.theme = this.getStoredTheme() || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.bindEvents();
    }

    getStoredTheme() {
        return localStorage.getItem('theme');
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleResize();
    }

    bindEvents() {
        // Mobile menu toggle
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                this.closeMobileMenu();
            });
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', () => this.handleResize());

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navMenu?.contains(e.target) && !this.mobileMenuToggle?.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        if (this.navMenu && this.mobileMenuToggle) {
            this.navMenu.classList.toggle('active');
            this.mobileMenuToggle.classList.toggle('active');
        }
    }

    closeMobileMenu() {
        if (this.navMenu && this.mobileMenuToggle) {
            this.navMenu.classList.remove('active');
            this.mobileMenuToggle.classList.remove('active');
        }
    }

    handleResize() {
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const elementPosition = element.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Smooth Scroll for Hero Buttons
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        // Handle hero buttons and other internal links
        const heroButtons = document.querySelectorAll('.hero-buttons .btn[href^="#"]');
        heroButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = button.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const elementPosition = element.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Email functionality
function openEmailCompose() {
    const subject = encodeURIComponent("Portfolio Contact - Let's Connect");
    const body = encodeURIComponent("Hi Tej,\n\nI found your portfolio website and would like to discuss potential opportunities.\n\nBest regards,");
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=tejgokani@gmail.com&su=${subject}&body=${body}`;
    
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
}

// Intersection Observer for Animations
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.createObserver();
        }
    }

    createObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll('.skill-card, .experience-card, .education-card, .contact-method');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// Progress Bar Animation
class ProgressBarManager {
    constructor() {
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observeProgressBars();
        } else {
            // Fallback for older browsers
            this.animateAllProgressBars();
        }
    }

    observeProgressBars() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateProgressBar(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            bar.style.width = '0%';
            observer.observe(bar);
        });
    }

    animateProgressBar(progressBar) {
        const targetWidth = progressBar.style.width || '100%';
        progressBar.style.width = '0%';
        
        setTimeout(() => {
            progressBar.style.width = targetWidth;
        }, 300);
    }

    animateAllProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            this.animateProgressBar(bar);
        });
    }
}

// Form Validation and Enhancement
class FormManager {
    constructor() {
        this.init();
    }

    init() {
        // Add any form-specific functionality here
        this.enhanceEmailButtons();
    }

    enhanceEmailButtons() {
        const emailButtons = document.querySelectorAll('.email-link, .contact-link[href^="mailto:"]');
        emailButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.textContent.includes('tejgokani@gmail.com')) {
                    e.preventDefault();
                    openEmailCompose();
                }
            });
        });
    }
}

// Utility Functions
class Utils {
    static debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Performance Optimization
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        // Optimize scroll events
        this.optimizeScrollEvents();
        // Preload critical resources
        this.preloadResources();
    }

    optimizeScrollEvents() {
        let ticking = false;

        function updateNavbar() {
            const navbar = document.querySelector('.navbar');
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }
            
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });
    }

    preloadResources() {
        // Preload Google Fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preconnect';
        fontLink.href = 'https://fonts.googleapis.com';
        document.head.appendChild(fontLink);

        const fontLinkCrossorigin = document.createElement('link');
        fontLinkCrossorigin.rel = 'preconnect';
        fontLinkCrossorigin.href = 'https://fonts.gstatic.com';
        fontLinkCrossorigin.crossOrigin = 'anonymous';
        document.head.appendChild(fontLinkCrossorigin);
    }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all managers
    const themeManager = new ThemeManager();
    const navigationManager = new NavigationManager();
    const smoothScrollManager = new SmoothScrollManager();
    const animationManager = new AnimationManager();
    const progressBarManager = new ProgressBarManager();
    const formManager = new FormManager();
    const performanceManager = new PerformanceManager();

    // Global error handling
    window.addEventListener('error', function(e) {
        console.warn('An error occurred:', e.error);
    });

    // Add loading complete class for CSS transitions
    document.body.classList.add('loaded');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Page became visible again, refresh any time-sensitive content
        console.log('Page is now visible');
    }
});

// Handle online/offline status
window.addEventListener('online', function() {
    document.body.classList.remove('offline');
});

window.addEventListener('offline', function() {
    document.body.classList.add('offline');
});

// Export functions for global access if needed
window.openEmailCompose = openEmailCompose;