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
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});

// Animate elements on scroll
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

// Observe all feature cards and screenshots
document.querySelectorAll('.feature-card, .screenshot-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Download button animation
const downloadBtn = document.querySelector('.btn-download');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        // Add a small delay for animation
        this.innerHTML = '<span>⏳</span> جاري التحميل...';
        setTimeout(() => {
            this.innerHTML = '<span>⬇️</span> تحميل Nexus AI';
        }, 2000);
    });
}

// FAQ accordion functionality
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        // Close other items
        document.querySelectorAll('.faq-item').forEach(other => {
            if (other !== item) {
                other.style.maxHeight = null;
            }
        });
        
        // Toggle current item
        if (item.style.maxHeight) {
            item.style.maxHeight = null;
        } else {
            item.style.maxHeight = item.scrollHeight + 'px';
        }
    });
});

// Add loading animation for mockup
window.addEventListener('load', () => {
    const mockup = document.querySelector('.mockup');
    if (mockup) {
        mockup.style.opacity = '0';
        mockup.style.transform = 'translateY(20px)';
        mockup.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            mockup.style.opacity = '1';
            mockup.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Counter animation for stats
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Animate stats when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-number').forEach(stat => {
                const text = stat.textContent;
                if (text === '139') {
                    animateValue(stat, 0, 139, 1500);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}
