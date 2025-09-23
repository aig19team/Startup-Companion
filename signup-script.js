// Signup page functionality
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');
    const countrySelect = document.getElementById('country');
    const cityInput = document.getElementById('city');
    const serviceCheckboxes = document.querySelectorAll('input[name="services"]');

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

    // Password validation
    function validatePassword(password) {
        const minLength = 8;
        const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        const hasNumber = /\d/.test(password);
        
        return password.length >= minLength && hasSymbol && hasNumber;
    }

    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Real-time validation feedback
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const isValid = validatePassword(password);
        
        if (password.length > 0) {
            if (isValid) {
                this.classList.remove('error');
                showFieldSuccess(this, 'Password meets requirements');
            } else {
                this.classList.add('error');
                showFieldError(this, 'Password must be 8+ characters with at least one symbol and one number');
            }
        } else {
            this.classList.remove('error');
            clearFieldMessage(this);
        }
    });

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
    signupForm.addEventListener('submit', function(e) {
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
        if (!password || !validatePassword(password)) {
            showFieldError(passwordInput, 'Password must be 8+ characters with at least one symbol and one number');
            isValid = false;
        }
        
        // Validate country
        const country = formData.get('country');
        if (!country) {
            showFieldError(countrySelect, 'Please select your country');
            isValid = false;
        }
        
        // Validate city
        const city = formData.get('city');
        if (!city || city.trim().length < 2) {
            showFieldError(cityInput, 'Please enter a valid city name');
            isValid = false;
        }
        
        // Validate services selection
        const selectedServices = formData.getAll('services');
        if (selectedServices.length === 0) {
            showServicesError('Please select at least one service you\'re interested in');
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
        submitButton.innerHTML = 'Creating Account...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // In a real app, this would be an actual API call
            console.log('Form submitted with data:', Object.fromEntries(formData));
            
            // Show success message
            showSuccessMessage('Account created successfully! Redirecting to dashboard...');
            
            // Simulate redirect after success
            setTimeout(() => {
                // In a real app, redirect to dashboard or login page
                window.location.href = 'dashboard.html';
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

    function showFieldSuccess(field, message) {
        field.classList.remove('error');
        
        // Remove existing messages
        const existingMessage = field.parentNode.querySelector('.error-message, .success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Add success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        field.parentNode.appendChild(successDiv);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 3000);
    }

    function clearFieldMessage(field) {
        const existingMessage = field.parentNode.querySelector('.error-message, .success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }

    function showServicesError(message) {
        const servicesGrid = document.querySelector('.services-grid');
        
        // Remove existing error
        const existingError = servicesGrid.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        servicesGrid.parentNode.appendChild(errorDiv);
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

    // Service selection analytics (optional)
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const selectedCount = document.querySelectorAll('input[name="services"]:checked').length;
            console.log(`Services selected: ${selectedCount}`);
            
            // Clear services error if at least one is selected
            if (selectedCount > 0) {
                const servicesError = document.querySelector('.services-grid').parentNode.querySelector('.error-message');
                if (servicesError) {
                    servicesError.remove();
                }
            }
        });
    });

    // Auto-populate city based on country (optional enhancement)
    countrySelect.addEventListener('change', function() {
        const country = this.value;
        const cityInput = document.getElementById('city');
        
        // Clear city field when country changes
        cityInput.value = '';
        
        // You could add popular cities dropdown based on country selection
        // This is just a placeholder for future enhancement
        if (country === 'india') {
            cityInput.placeholder = 'e.g., Mumbai, Delhi, Bangalore';
        } else if (country === 'usa') {
            cityInput.placeholder = 'e.g., New York, San Francisco, Austin';
        } else {
            cityInput.placeholder = 'Enter your city';
        }
    });

    // Keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        // Allow Enter key to submit form when focused on submit button
        if (e.key === 'Enter' && document.activeElement.classList.contains('btn-primary')) {
            e.preventDefault();
            signupForm.dispatchEvent(new Event('submit'));
        }
    });

    // Form auto-save to localStorage (optional)
    function saveFormData() {
        const formData = new FormData(signupForm);
        const data = Object.fromEntries(formData);
        
        // Don't save password for security
        delete data.password;
        
        localStorage.setItem('signupFormData', JSON.stringify(data));
    }

    function loadFormData() {
        const savedData = localStorage.getItem('signupFormData');
        if (savedData) {
            const data = JSON.parse(savedData);
            
            // Populate form fields
            Object.keys(data).forEach(key => {
                const field = document.querySelector(`[name="${key}"]`);
                if (field && field.type !== 'password') {
                    if (field.type === 'checkbox') {
                        if (data[key]) {
                            field.checked = true;
                        }
                    } else {
                        field.value = data[key];
                    }
                }
            });
        }
    }

    // Auto-save form data on input (debounced)
    let saveTimeout;
    signupForm.addEventListener('input', function() {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(saveFormData, 1000);
    });

    // Load saved form data on page load
    loadFormData();

    // Clear saved data on successful submission
    signupForm.addEventListener('submit', function() {
        localStorage.removeItem('signupFormData');
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