// Login page functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    // Mobile menu toggle
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Password visibility toggle
    window.togglePassword = function() {
        const passwordIcon = document.getElementById('passwordIcon');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordIcon.classList.remove('fa-eye');
            passwordIcon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            passwordIcon.classList.remove('fa-eye-slash');
            passwordIcon.classList.add('fa-eye');
        }
    };

    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Real-time validation feedback
    emailInput.addEventListener('blur', function() {
        const email = this.value;
        if (email.length > 0) {
            if (validateEmail(email)) {
                this.classList.remove('error');
                clearFieldMessage(this);
            } else {
                this.classList.add('error');
                showFieldError(this, 'Please enter a valid email address');
            }
        }
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous validation states
        clearAllValidation();
        
        let isValid = true;
        const formData = new FormData(this);
        
        // Validate email
        const email = formData.get('email');
        if (!email || !validateEmail(email)) {
            showFieldError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        const password = formData.get('password');
        if (!password || password.length < 1) {
            showFieldError(passwordInput, 'Please enter your password');
            isValid = false;
        }
        
        if (isValid) {
            submitForm(formData);
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });

    // Form submission handler
    function submitForm(formData) {
        const submitButton = document.querySelector('.btn-primary');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.innerHTML = 'Logging In...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // In a real app, this would be an actual API call
            console.log('Login submitted with data:', Object.fromEntries(formData));
            
            // Show success message
            showSuccessMessage('Login successful! Redirecting to your dashboard...');
            
            // Simulate redirect after success
            setTimeout(() => {
                // Check if user has completed persona questionnaire
                const personaData = localStorage.getItem('personaData');
                if (personaData) {
                    // User has completed persona, go to dashboard
                    window.location.href = 'dashboard.html';
                } else {
                    // User hasn't completed persona, go to buyer persona page
                    window.location.href = 'buyer-persona.html';
                }
            }, 2000);
            
        }, 2000);
    }

    // Validation helper functions
    function showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    function clearFieldMessage(field) {
        const existingMessage = field.parentNode.querySelector('.error-message, .success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }

    function clearAllValidation() {
        // Remove all error classes
        document.querySelectorAll('.error').forEach(el => {
            el.classList.remove('error');
        });
        
        // Remove all error/success messages
        document.querySelectorAll('.error-message, .success-message').forEach(el => {
            el.remove();
        });
    }

    function showSuccessMessage(message) {
        // Create success banner
        const successBanner = document.createElement('div');
        successBanner.className = 'success-banner';
        successBanner.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles for success banner
        successBanner.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #28a745;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
            z-index: 9999;
            animation: slideDown 0.3s ease-out;
        `;
        
        document.body.appendChild(successBanner);
        
        // Remove banner after 5 seconds
        setTimeout(() => {
            if (successBanner.parentNode) {
                successBanner.remove();
            }
        }, 5000);
    }

    // Auto-populate email from localStorage if available
    function loadSavedEmail() {
        const savedSignupData = localStorage.getItem('signupFormData');
        if (savedSignupData) {
            const data = JSON.parse(savedSignupData);
            if (data.email) {
                emailInput.value = data.email;
            }
        }
    }

    // Load saved email on page load
    loadSavedEmail();

    // Keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        // Allow Enter key to submit form when focused on submit button
        if (e.key === 'Enter' && document.activeElement.classList.contains('btn-primary')) {
            e.preventDefault();
            loginForm.dispatchEvent(new Event('submit'));
        }
    });

    // Add focus management for better UX
    emailInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            passwordInput.focus();
        }
    });

    passwordInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            loginForm.dispatchEvent(new Event('submit'));
        }
    });
});

// Add CSS animation for success banner
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    .success-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .success-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);