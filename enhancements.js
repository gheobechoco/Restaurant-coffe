/* enhancements.js - À ajouter après votre JS existant */

// ============================================
// TOAST NOTIFICATIONS SYSTEM
// ============================================

const Toast = {
    container: null,
    
    init() {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
    },
    
    show(message, type = 'success', duration = 3000) {
        if (!this.container) this.init();
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = type === 'success' ? '✅' : '❌';
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span>${message}</span>
            <button class="toast-close">&times;</button>
        `;
        
        this.container.appendChild(toast);
        
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px) scale(0.95)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
};

// ============================================
// COUNTER ANIMATION
// ============================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    const isFloat = target % 1 !== 0;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * eased;
        
        element.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = isFloat ? target.toFixed(1) : target;
        }
    }
    
    requestAnimationFrame(update);
}

// ============================================
// MENU TABS FILTER
// ============================================

function initMenuTabs() {
    const tabs = document.querySelectorAll('.menu-tab-btn');
    const items = document.querySelectorAll('.menu-card');
    
    if (!tabs.length || !items.length) return;
    
    items.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.display = 'block';
    });
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            items.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

function initScrollAnimations() {
    const elements = document.querySelectorAll('.card-enhanced, .feature-highlight, .testimonial-card, .stat-item, .story-feature, .team-card, .hours-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// FORM ENHANCEMENTS
// ============================================

function enhanceForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('[type="submit"]');
            
            if (submitBtn && !submitBtn.disabled) {
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = '⏳ Envoi...';
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 2000);
            }
        });
    });
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'M') {
            e.preventDefault();
            document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
        }
        
        if (e.ctrlKey && e.shiftKey && e.key === 'R') {
            e.preventDefault();
            const modal = document.getElementById('reservationModal');
            if (modal) modal.classList.add('active');
        }
    });
}

// ============================================
// MODAL ENHANCEMENT
// ============================================

function enhanceModal() {
    const modal = document.getElementById('reservationModal');
    if (!modal) return;
    
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// RESERVATION BUTTON
// ============================================

function initReservationButton() {
    const btn = document.getElementById('reserve-btn');
    const modal = document.getElementById('reservationModal');
    if (btn && modal) {
        btn.addEventListener('click', function() {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
}

// ============================================
// ORDER BUTTONS
// ============================================

function initOrderButtons() {
    document.querySelectorAll('.menu-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.menu-card');
            const title = card?.querySelector('.card-title')?.textContent || 'Bol';
            Toast.show(`🛒 "${title}" ajouté au panier !`, 'success');
        });
    });
}

// ============================================
// SMOOTH SCROLL FOR NAV
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// KEYBOARD SHORTCUT - ESC TO CLOSE MODAL
// ============================================

function initEscCloseModal() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('reservationModal');
            if (modal && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Compteurs
    document.querySelectorAll('.stat-number[data-count]').forEach(el => {
        const target = parseFloat(el.dataset.count);
        animateCounter(el, target);
    });
    
    // Tabs
    initMenuTabs();
    
    // Animations
    initScrollAnimations();
    
    // Formulaires
    enhanceForms();
    
    // Raccourcis clavier
    initKeyboardShortcuts();
    
    // Modal
    enhanceModal();
    initReservationButton();
    initEscCloseModal();
    
    // Boutons de commande
    initOrderButtons();
    
    // Scroll smooth
    initSmoothScroll();
    
    // Override alert avec Toast
    const originalAlert = window.alert;
    window.alert = function(message) {
        Toast.show(message, 'success');
    };
    
    // Contact form
    document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        Toast.show('📨 Message envoyé ! Nous vous recontacterons bientôt.', 'success');
        this.reset();
    });
    
    // Reservation form
    document.querySelector('.reservation-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        Toast.show('🎉 Réservation confirmée ! Merci de votre confiance.', 'success');
        this.reset();
        const modal = document.getElementById('reservationModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});