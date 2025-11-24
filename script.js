// ============================================
// LANGUAGE SWITCHER
// ============================================
const languageSwitcher = {
    currentLang: 'ru',
    
    init() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.switchLanguage(lang);
                
                // Update active button
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        // Set initial language
        this.switchLanguage(this.currentLang);
    },
    
    switchLanguage(lang) {
        this.currentLang = lang;
        document.documentElement.lang = lang;
        
        // Update all elements with data attributes
        document.querySelectorAll('[data-ru], [data-uz]').forEach(element => {
            const text = element.dataset[lang];
            if (text) {
                element.textContent = text;
            }
        });
        
        // Update placeholders
        document.querySelectorAll('[data-ru-placeholder], [data-uz-placeholder]').forEach(element => {
            const placeholder = element.dataset[`${lang}Placeholder`];
            if (placeholder) {
                element.placeholder = placeholder;
            }
        });
        
        // Update select options
        document.querySelectorAll('option[data-ru], option[data-uz]').forEach(option => {
            const text = option.dataset[lang];
            if (text) {
                option.textContent = text;
            }
        });
        
        // Update meta tags
        this.updateMetaTags(lang);
    },
    
    updateMetaTags(lang) {
        const translations = {
            ru: {
                title: 'Дима Мебель - Изготовление мебели на заказ в Ташкенте | Кухни, Диваны, Шкафы',
                description: 'Дима Мебель - производство премиум мебели на заказ в Ташкенте. Кухонная, корпусная и мягкая мебель индивидуального дизайна. Качественные материалы, собственное производство.'
            },
            uz: {
                title: 'Dima Mebel - Toshkentda buyurtma bo\'yicha mebel ishlab chiqarish | Oshxonalar, Divanlar, Shkaflar',
                description: 'Dima Mebel - Toshkentda buyurtma bo\'yicha premium mebel ishlab chiqarish. Individual dizayndagi oshxona, korpus va yumshoq mebel. Sifatli materiallar, o\'z ishlab chiqarishimiz.'
            }
        };
        
        document.title = translations[lang].title;
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = translations[lang].description;
        }
    }
};

// ============================================
// NAVIGATION
// ============================================
const navigation = {
    init() {
        const navbar = document.querySelector('.navbar');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
            });
        }
        
        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('active');
                }
            });
        });
        
        // Smooth scroll for anchor links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
};

// ============================================
// GALLERY
// ============================================
const gallery = {
    itemsToShow: 9,
    currentFilter: 'all',
    
    init() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.loadMoreBtn = document.getElementById('loadMoreBtn');
        
        // Set up filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.filterGallery(filter);
                
                // Update active button
                this.filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        // Load more functionality
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => {
                this.loadMore();
            });
        }
        
        // Initialize visibility
        this.updateVisibility();
        
        // Video play on click
        this.initVideoPlayers();
        
        // Lightbox functionality
        this.initLightbox();
    },
    
    filterGallery(filter) {
        this.currentFilter = filter;
        this.itemsToShow = 9;
        this.updateVisibility();
    },
    
    updateVisibility() {
        let visibleCount = 0;
        
        this.galleryItems.forEach((item, index) => {
            const category = item.dataset.category;
            const matchesFilter = this.currentFilter === 'all' || category === this.currentFilter;
            
            if (matchesFilter && visibleCount < this.itemsToShow) {
                item.style.display = 'block';
                item.classList.add('show');
                visibleCount++;
            } else if (matchesFilter) {
                item.style.display = 'none';
            } else {
                item.style.display = 'none';
                item.classList.remove('show');
            }
        });
        
        // Show/hide load more button
        const totalMatchingItems = Array.from(this.galleryItems).filter(item => {
            return this.currentFilter === 'all' || item.dataset.category === this.currentFilter;
        }).length;
        
        if (this.loadMoreBtn) {
            this.loadMoreBtn.style.display = visibleCount < totalMatchingItems ? 'inline-block' : 'none';
        }
    },
    
    loadMore() {
        this.itemsToShow += 6;
        this.updateVisibility();
    },
    
    initVideoPlayers() {
        const videoItems = document.querySelectorAll('.video-item');
        
        videoItems.forEach(item => {
            const video = item.querySelector('video');
            const playIcon = item.querySelector('.video-play-icon');
            
            if (video && playIcon) {
                item.addEventListener('click', (e) => {
                    if (video.paused) {
                        video.play();
                        playIcon.style.display = 'none';
                    } else {
                        video.pause();
                        playIcon.style.display = 'flex';
                    }
                });
                
                video.addEventListener('ended', () => {
                    playIcon.style.display = 'flex';
                });
            }
        });
    },
    
    initLightbox() {
        // Simple lightbox - can be enhanced with a library
        this.galleryItems.forEach(item => {
            const img = item.querySelector('img');
            if (img) {
                item.addEventListener('click', () => {
                    // You can add lightbox functionality here
                    // For now, just log
                    console.log('Image clicked:', img.src);
                });
            }
        });
    }
};

// ============================================
// CONTACT FORM (Simplified - No Backend Required)
// ============================================
const contactForm = {
    init() {
        // No form handling needed - using direct messenger links
        console.log('Contact via messengers initialized');
    }
};

// ============================================
// BACK TO TOP
// ============================================
const backToTop = {
    init() {
        const btn = document.getElementById('backToTop');
        
        if (btn) {
            // Show/hide on scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    btn.classList.add('show');
                } else {
                    btn.classList.remove('show');
                }
            });
            
            // Scroll to top on click
            btn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
};

// ============================================
// SCROLL ANIMATIONS
// ============================================
const scrollAnimations = {
    init() {
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
        
        // Observe sections
        const sections = document.querySelectorAll('.about, .services, .gallery, .contact');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
        
        // Observe cards
        const cards = document.querySelectorAll('.service-card, .feature-item, .gallery-item');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }
};

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
const performance = {
    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Preload critical resources
        this.preloadResources();
    },
    
    lazyLoadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            images.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        } else {
            // Fallback for older browsers
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    },
    
    preloadResources() {
        // Preload hero image
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const bgImage = window.getComputedStyle(heroSection).backgroundImage;
            const imageUrl = bgImage.slice(5, -2);
            
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = imageUrl;
            document.head.appendChild(link);
        }
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// ============================================
// ANALYTICS (Optional)
// ============================================
const analytics = {
    init() {
        // Track button clicks
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.trackEvent('button_click', {
                    button_text: btn.textContent.trim(),
                    button_location: this.getElementLocation(btn)
                });
            });
        });
        
        // Track form submissions
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', () => {
                this.trackEvent('form_submit', {
                    form_name: 'contact_form'
                });
            });
        }
        
        // Track gallery interactions
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                this.trackEvent('gallery_item_click', {
                    category: item.dataset.category
                });
            });
        });
    },
    
    trackEvent(eventName, eventData) {
        // Log to console (replace with actual analytics service)
        console.log('Analytics Event:', eventName, eventData);
        
        // Example: Google Analytics
        // if (window.gtag) {
        //     gtag('event', eventName, eventData);
        // }
        
        // Example: Facebook Pixel
        // if (window.fbq) {
        //     fbq('track', eventName, eventData);
        // }
    },
    
    getElementLocation(element) {
        let parent = element.closest('section');
        return parent ? parent.id || parent.className.split(' ')[0] : 'unknown';
    }
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    languageSwitcher.init();
    navigation.init();
    gallery.init();
    contactForm.init();
    backToTop.init();
    scrollAnimations.init();
    performance.init();
    analytics.init();
    
    // Add smooth scroll to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    console.log('Дима Мебель website initialized successfully!');
});

// ============================================
// SERVICE WORKER (PWA Support - Optional)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => {
        //         console.log('ServiceWorker registered:', registration);
        //     })
        //     .catch(error => {
        //         console.log('ServiceWorker registration failed:', error);
        //     });
    });
}

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // You can send errors to a logging service here
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // You can send errors to a logging service here
});