// Add JavaScript below
// RC Car Accessibility Guide - JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // ACCESSIBILITY ENHANCEMENTS
    // ===================================
    
    // Announce page changes to screen readers
    announcePageLoad();
    
    // Add keyboard shortcuts info
    addKeyboardShortcuts();
    
    // Enhance form submission
    enhanceContactForm();
    
    // Add smooth scroll with accessibility support
    enhanceSmoothScroll();
    
    // Add "back to top" button
    addBackToTopButton();
    
    
    // ===================================
    // FUNCTIONS
    // ===================================
    
    /**
     * Announce page load to screen readers
     */
    function announcePageLoad() {
        const pageTitle = document.title;
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'visually-hidden';
        announcement.textContent = `${pageTitle} loaded`;
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => announcement.remove(), 1000);
    }
    
    
    /**
     * Add keyboard shortcuts (optional feature)
     */
    function addKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Alt + H = Home
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                window.location.href = 'index.html';
            }
            
            // Alt + A = About
            if (e.altKey && e.key === 'a') {
                e.preventDefault();
                window.location.href = 'about.html';
            }
            
            // Escape key closes modal if open
            if (e.key === 'Escape') {
                const modals = document.querySelectorAll('.modal.show');
                modals.forEach(modal => {
                    const bsModal = bootstrap.Modal.getInstance(modal);
                    if (bsModal) bsModal.hide();
                });
            }
        });
    }
    
    
    /**
     * Enhance contact form with validation and feedback
     */
    function enhanceContactForm() {
        const contactModal = document.getElementById('contactModal');
        
        if (contactModal) {
            const sendButton = contactModal.querySelector('.btn-success');
            
            if (sendButton) {
                sendButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const form = contactModal.querySelector('form');
                    const name = document.getElementById('nameInput');
                    const email = document.getElementById('emailInput');
                    const message = document.getElementById('messageInput');
                    
                    // Simple validation
                    if (!name.value || !email.value || !message.value) {
                        showAlert('Please fill in all fields', 'warning');
                        return;
                    }
                    
                    // Email validation
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email.value)) {
                        showAlert('Please enter a valid email address', 'warning');
                        return;
                    }
                    
                    // Simulate form submission
                    showAlert('Thank you! Your message has been sent.', 'success');
                    
                    // Reset form
                    form.reset();
                    
                    // Close modal
                    const bsModal = bootstrap.Modal.getInstance(contactModal);
                    if (bsModal) bsModal.hide();
                });
            }
        }
    }
    
    
    /**
     * Show alert message with accessibility announcement
     */
    function showAlert(message, type = 'info') {
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
        alert.style.zIndex = '9999';
        alert.setAttribute('role', 'alert');
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        document.body.appendChild(alert);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 150);
        }, 5000);
    }
    
    
    /**
     * Enhance smooth scrolling with accessibility
     */
    function enhanceSmoothScroll() {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!prefersReducedMotion) {
            // Add smooth scroll behavior to anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    
                    // Skip if href is just "#"
                    if (href === '#') return;
                    
                    const target = document.querySelector(href);
                    
                    if (target) {
                        e.preventDefault();
                        
                        // Scroll to target
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Set focus to target for keyboard users
                        target.setAttribute('tabindex', '-1');
                        target.focus();
                    }
                });
            });
        }
    }
    
    
    /**
     * Add "Back to Top" button
     */
    function addBackToTopButton() {
        // Create button
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.className = 'btn btn-success btn-back-to-top';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: none;
            z-index: 1000;
            font-size: 24px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(backToTopBtn);
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
            });
        });
    }
    
    
    /**
     * Log accessibility info to console (for developers)
     */
    console.log('%c♿ Accessibility Features Enabled', 'color: #198754; font-size: 16px; font-weight: bold;');
    console.log('• Keyboard navigation support');
    console.log('• Screen reader compatibility');
    console.log('• Reduced motion respect');
    console.log('• Keyboard shortcuts: Alt+H (Home), Alt+A (About)');
    
});


// ===================================
// ADDITIONAL UTILITY FUNCTIONS
// ===================================

/**
 * Detect if user is using keyboard navigation
 */
let isUsingKeyboard = false;

document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        isUsingKeyboard = true;
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    isUsingKeyboard = false;
    document.body.classList.remove('keyboard-navigation');
});


/**
 * Print page functionality
 */
function printPage() {
    window.print();
}

// Add print button functionality if needed
document.querySelectorAll('[data-print]').forEach(btn => {
    btn.addEventListener('click', printPage);
});