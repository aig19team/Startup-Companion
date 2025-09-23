// Buyer Persona page functionality
document.addEventListener('DOMContentLoaded', function() {
    const personaForm = document.getElementById('personaForm');
    const questionsContainer = document.getElementById('questionsContainer');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    // Mobile menu toggle
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Service-specific questions database
    const serviceQuestions = {
        'idea-tuning': {
            title: 'Idea Tuning',
            icon: 'fas fa-lightbulb',
            questions: [
                {
                    id: 'problem_solving',
                    label: 'What problem does your service solve?',
                    type: 'textarea',
                    placeholder: 'Describe the main problem or pain point your service addresses...',
                    required: true
                },
                {
                    id: 'target_customers',
                    label: 'Who are your target customers?',
                    type: 'textarea',
                    placeholder: 'Describe your ideal customers, their demographics, and characteristics...',
                    required: true
                },
                {
                    id: 'competitive_advantage',
                    label: 'How do you stand out from competitors?',
                    type: 'textarea',
                    placeholder: 'What makes your service unique or better than existing solutions...',
                    required: true
                },
                {
                    id: 'business_model',
                    label: 'What is your preferred business model?',
                    type: 'radio',
                    options: [
                        'Subscription-based',
                        'One-time service fee',
                        'Commission-based',
                        'Freemium model',
                        'Not sure yet'
                    ],
                    required: true
                }
            ]
        },
        'registration': {
            title: 'Registration Guide',
            icon: 'fas fa-file-contract',
            questions: [
                {
                    id: 'entity_type',
                    label: 'What is your preferred entity type?',
                    type: 'radio',
                    options: [
                        'LLP (Limited Liability Partnership)',
                        'Private Limited Company',
                        'Proprietorship',
                        'Partnership',
                        'Not sure yet'
                    ],
                    required: true
                },
                {
                    id: 'business_name',
                    label: 'Do you have a business name in mind?',
                    type: 'text',
                    placeholder: 'Enter your preferred business name or leave blank if unsure',
                    required: false
                },
                {
                    id: 'business_location',
                    label: 'Where will your business be primarily located?',
                    type: 'text',
                    placeholder: 'City, State/Province',
                    required: true
                },
                {
                    id: 'registration_timeline',
                    label: 'When do you plan to register your business?',
                    type: 'radio',
                    options: [
                        'Within 1 month',
                        '1-3 months',
                        '3-6 months',
                        'More than 6 months',
                        'Not sure yet'
                    ],
                    required: true
                }
            ]
        },
        'compliance': {
            title: 'Compliance Guide',
            icon: 'fas fa-shield-alt',
            questions: [
                {
                    id: 'license_awareness',
                    label: 'Are you aware of required licenses or registrations for your business?',
                    type: 'radio',
                    options: [
                        'Yes, I know what I need',
                        'I have some idea',
                        'No, I need guidance',
                        'Not applicable to my business'
                    ],
                    required: true
                },
                {
                    id: 'business_bank_account',
                    label: 'Do you have a business bank account?',
                    type: 'radio',
                    options: [
                        'Yes, already set up',
                        'No, but planning to open one',
                        'No, need guidance on this',
                        'Using personal account currently'
                    ],
                    required: true
                },
                {
                    id: 'tax_registration',
                    label: 'What tax registrations do you need help with?',
                    type: 'checkbox',
                    options: [
                        'GST Registration (India)',
                        'EIN (US)',
                        'State/Local taxes',
                        'Professional tax',
                        'Not sure what I need'
                    ],
                    required: true
                },
                {
                    id: 'compliance_priority',
                    label: 'What compliance area is your top priority?',
                    type: 'radio',
                    options: [
                        'Tax compliance',
                        'Legal documentation',
                        'Industry-specific licenses',
                        'Employment law compliance',
                        'Data protection compliance'
                    ],
                    required: true
                }
            ]
        },
        'branding': {
            title: 'Branding Guide',
            icon: 'fas fa-palette',
            questions: [
                {
                    id: 'brand_personality',
                    label: 'Describe your brand personality and values',
                    type: 'textarea',
                    placeholder: 'What personality traits and values should your brand represent? (e.g., professional, friendly, innovative, trustworthy)',
                    required: true
                },
                {
                    id: 'domain_logo_status',
                    label: 'Do you already own a domain or logo?',
                    type: 'checkbox',
                    options: [
                        'I have a domain name',
                        'I have a logo design',
                        'I have brand colors chosen',
                        'I have a tagline/slogan',
                        'I don\'t have any of these yet'
                    ],
                    required: true
                },
                {
                    id: 'brand_inspiration',
                    label: 'What brands do you admire and why?',
                    type: 'textarea',
                    placeholder: 'Name 2-3 brands you admire and what you like about their branding...',
                    required: false
                },
                {
                    id: 'marketing_channels',
                    label: 'Which marketing channels do you plan to use?',
                    type: 'checkbox',
                    options: [
                        'Social media (Instagram, Facebook, LinkedIn)',
                        'Website/Blog',
                        'Email marketing',
                        'Print materials (business cards, brochures)',
                        'Online advertising',
                        'Networking events',
                        'Not sure yet'
                    ],
                    required: true
                }
            ]
        },
        'hr-policy': {
            title: 'HR Policy Hub',
            icon: 'fas fa-users',
            questions: [
                {
                    id: 'team_size_plan',
                    label: 'How many team members do you plan to hire in the first year?',
                    type: 'radio',
                    options: [
                        'Just me (solo founder)',
                        '1-2 employees',
                        '3-5 employees',
                        '6-10 employees',
                        'More than 10 employees',
                        'Not sure yet'
                    ],
                    required: true
                },
                {
                    id: 'hr_priorities',
                    label: 'What HR policies are your top priorities?',
                    type: 'checkbox',
                    options: [
                        'Employment contracts',
                        'Leave and vacation policies',
                        'Compensation and benefits',
                        'Performance evaluation',
                        'Workplace safety',
                        'Confidentiality agreements',
                        'Remote work policies',
                        'Not sure what I need'
                    ],
                    required: true
                },
                {
                    id: 'hiring_timeline',
                    label: 'When do you plan to make your first hire?',
                    type: 'radio',
                    options: [
                        'Within 3 months',
                        '3-6 months',
                        '6-12 months',
                        'More than 1 year',
                        'No plans to hire yet'
                    ],
                    required: true
                },
                {
                    id: 'work_arrangement',
                    label: 'What work arrangement do you prefer?',
                    type: 'radio',
                    options: [
                        'Fully remote',
                        'Hybrid (remote + office)',
                        'Fully in-office',
                        'Flexible based on role',
                        'Haven\'t decided yet'
                    ],
                    required: true
                }
            ]
        },
        'mentors': {
            title: 'Connect with Mentors',
            icon: 'fas fa-user-tie',
            questions: [
                {
                    id: 'mentorship_type',
                    label: 'What type of mentorship do you need most?',
                    type: 'checkbox',
                    options: [
                        'Legal guidance',
                        'Financial planning and accounting',
                        'Branding and marketing',
                        'HR and team building',
                        'Business strategy and growth',
                        'Industry-specific expertise',
                        'Technology and digital tools',
                        'Not sure what I need'
                    ],
                    required: true
                },
                {
                    id: 'mentor_experience',
                    label: 'What level of mentor experience are you looking for?',
                    type: 'radio',
                    options: [
                        'Successful entrepreneurs in my industry',
                        'Professional consultants (lawyers, accountants, etc.)',
                        'Business coaches and advisors',
                        'Investors or VCs',
                        'Any experienced professional',
                        'Not sure'
                    ],
                    required: true
                },
                {
                    id: 'mentorship_frequency',
                    label: 'How often would you like to connect with mentors?',
                    type: 'radio',
                    options: [
                        'Weekly sessions',
                        'Bi-weekly sessions',
                        'Monthly sessions',
                        'As needed basis',
                        'One-time consultations',
                        'Not sure yet'
                    ],
                    required: true
                },
                {
                    id: 'specific_challenges',
                    label: 'What specific challenges do you need help with?',
                    type: 'textarea',
                    placeholder: 'Describe the main challenges or questions you\'d like to discuss with mentors...',
                    required: false
                }
            ]
        }
    };

    // Get selected services from localStorage (from signup)
    function getSelectedServices() {
        const savedData = localStorage.getItem('signupFormData');
        if (savedData) {
            const data = JSON.parse(savedData);
            return data.services || [];
        }
        
        // Fallback: show all services if no data found
        return ['idea-tuning', 'registration', 'compliance', 'branding', 'hr-policy', 'mentors'];
    }

    // Generate questions based on selected services
    function generateQuestions() {
        const selectedServices = getSelectedServices();
        const container = questionsContainer;
        
        // Add progress indicator
        const progressIndicator = createProgressIndicator(selectedServices.length);
        container.appendChild(progressIndicator);
        
        selectedServices.forEach((serviceKey, index) => {
            const serviceData = serviceQuestions[serviceKey];
            if (serviceData) {
                const serviceSection = createServiceSection(serviceData, index + 1);
                container.appendChild(serviceSection);
            }
        });
        
        updateProgress();
    }

    // Create progress indicator
    function createProgressIndicator(totalSections) {
        const progressDiv = document.createElement('div');
        progressDiv.className = 'progress-indicator';
        progressDiv.innerHTML = `
            <div class="progress-text">Complete all sections to continue</div>
            <div class="progress-bar-container">
                <div class="progress-bar" id="progressBar"></div>
            </div>
        `;
        return progressDiv;
    }

    // Create service section
    function createServiceSection(serviceData, sectionNumber) {
        const section = document.createElement('div');
        section.className = 'service-section';
        section.dataset.service = serviceData.title.toLowerCase().replace(/\s+/g, '-');
        
        const header = document.createElement('div');
        header.className = 'service-header';
        header.innerHTML = `
            <div class="service-icon">
                <i class="${serviceData.icon}"></i>
            </div>
            <h2 class="service-title">${serviceData.title}</h2>
        `;
        
        const questionsGrid = document.createElement('div');
        questionsGrid.className = 'questions-grid';
        
        serviceData.questions.forEach((question, qIndex) => {
            const questionGroup = createQuestionGroup(question, sectionNumber, qIndex);
            questionsGrid.appendChild(questionGroup);
        });
        
        section.appendChild(header);
        section.appendChild(questionsGrid);
        
        return section;
    }

    // Create individual question group
    function createQuestionGroup(question, sectionNumber, questionIndex) {
        const group = document.createElement('div');
        group.className = 'question-group';
        
        const label = document.createElement('label');
        label.className = 'question-label';
        label.textContent = question.label;
        if (question.required) {
            label.innerHTML += ' <span style="color: #dc3545;">*</span>';
        }
        
        let inputElement;
        const fieldName = `section_${sectionNumber}_q_${questionIndex}`;
        
        switch (question.type) {
            case 'text':
                inputElement = document.createElement('input');
                inputElement.type = 'text';
                inputElement.className = 'form-input';
                inputElement.name = fieldName;
                inputElement.placeholder = question.placeholder || '';
                inputElement.required = question.required;
                break;
                
            case 'textarea':
                inputElement = document.createElement('textarea');
                inputElement.className = 'form-textarea';
                inputElement.name = fieldName;
                inputElement.placeholder = question.placeholder || '';
                inputElement.required = question.required;
                break;
                
            case 'select':
                inputElement = document.createElement('select');
                inputElement.className = 'form-select';
                inputElement.name = fieldName;
                inputElement.required = question.required;
                
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Select an option';
                inputElement.appendChild(defaultOption);
                
                question.options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option;
                    optionElement.textContent = option;
                    inputElement.appendChild(optionElement);
                });
                break;
                
            case 'radio':
                inputElement = document.createElement('div');
                inputElement.className = 'radio-group';
                
                question.options.forEach((option, optIndex) => {
                    const radioOption = document.createElement('div');
                    radioOption.className = 'radio-option';
                    
                    const radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.name = fieldName;
                    radioInput.value = option;
                    radioInput.id = `${fieldName}_${optIndex}`;
                    radioInput.required = question.required;
                    
                    const radioLabel = document.createElement('label');
                    radioLabel.className = 'radio-label';
                    radioLabel.htmlFor = `${fieldName}_${optIndex}`;
                    radioLabel.textContent = option;
                    
                    radioOption.appendChild(radioInput);
                    radioOption.appendChild(radioLabel);
                    inputElement.appendChild(radioOption);
                });
                break;
                
            case 'checkbox':
                inputElement = document.createElement('div');
                inputElement.className = 'checkbox-group';
                
                question.options.forEach((option, optIndex) => {
                    const checkboxOption = document.createElement('div');
                    checkboxOption.className = 'checkbox-option';
                    
                    const checkboxInput = document.createElement('input');
                    checkboxInput.type = 'checkbox';
                    checkboxInput.name = `${fieldName}[]`;
                    checkboxInput.value = option;
                    checkboxInput.id = `${fieldName}_${optIndex}`;
                    
                    const checkboxLabel = document.createElement('label');
                    checkboxLabel.className = 'checkbox-label';
                    checkboxLabel.htmlFor = `${fieldName}_${optIndex}`;
                    checkboxLabel.textContent = option;
                    
                    checkboxOption.appendChild(checkboxInput);
                    checkboxOption.appendChild(checkboxLabel);
                    inputElement.appendChild(checkboxOption);
                });
                break;
        }
        
        group.appendChild(label);
        if (question.helper) {
            const helper = document.createElement('div');
            helper.className = 'question-helper';
            helper.textContent = question.helper;
            group.appendChild(helper);
        }
        group.appendChild(inputElement);
        
        return group;
    }

    // Update progress bar
    function updateProgress() {
        const progressBar = document.getElementById('progressBar');
        if (!progressBar) return;
        
        const serviceSections = document.querySelectorAll('.service-section');
        let completedSections = 0;
        
        serviceSections.forEach(section => {
            const requiredFields = section.querySelectorAll('[required]');
            let sectionComplete = true;
            
            requiredFields.forEach(field => {
                if (field.type === 'radio') {
                    const radioGroup = section.querySelectorAll(`input[name="${field.name}"]`);
                    const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                    if (!isChecked) sectionComplete = false;
                } else if (field.type === 'checkbox') {
                    const checkboxGroup = section.querySelectorAll(`input[name="${field.name}[]"]`);
                    const isChecked = Array.from(checkboxGroup).some(checkbox => checkbox.checked);
                    if (!isChecked) sectionComplete = false;
                } else if (!field.value.trim()) {
                    sectionComplete = false;
                }
            });
            
            if (sectionComplete) completedSections++;
        });
        
        const percentage = (completedSections / serviceSections.length) * 100;
        progressBar.style.width = percentage + '%';
        
        // Update progress text
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            if (percentage === 100) {
                progressText.textContent = 'All sections completed! Ready to submit.';
                progressText.style.color = '#28a745';
            } else {
                progressText.textContent = `${completedSections} of ${serviceSections.length} sections completed`;
                progressText.style.color = '#666';
            }
        }
    }

    // Form submission
    personaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitButton = document.querySelector('.btn-primary');
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.innerHTML = 'Processing Your Responses...';
        submitButton.disabled = true;
        
        // Validate form
        if (!validateForm()) {
            submitButton.classList.remove('loading');
            submitButton.innerHTML = 'Submit & Continue <i class="fas fa-arrow-right"></i>';
            submitButton.disabled = false;
            return;
        }
        
        // Simulate API call
        setTimeout(() => {
            // In a real app, this would send data to the server
            console.log('Persona data submitted:', Object.fromEntries(formData));
            
            // Store persona data
            const personaData = {};
            for (let [key, value] of formData.entries()) {
                if (personaData[key]) {
                    // Handle multiple values (checkboxes)
                    if (Array.isArray(personaData[key])) {
                        personaData[key].push(value);
                    } else {
                        personaData[key] = [personaData[key], value];
                    }
                } else {
                    personaData[key] = value;
                }
            }
            
            localStorage.setItem('personaData', JSON.stringify(personaData));
            
            // Show success and redirect
            showSuccessMessage('Profile completed successfully! Redirecting to your dashboard...');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
            
        }, 2000);
    });

    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = document.querySelectorAll('[required]');
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(error => error.remove());
        document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
        
        requiredFields.forEach(field => {
            let fieldValid = true;
            
            if (field.type === 'radio') {
                const radioGroup = document.querySelectorAll(`input[name="${field.name}"]`);
                const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                if (!isChecked) {
                    fieldValid = false;
                    showFieldError(field.closest('.question-group'), 'Please select an option');
                }
            } else if (field.type === 'checkbox') {
                const checkboxGroup = document.querySelectorAll(`input[name="${field.name}[]"]`);
                const isChecked = Array.from(checkboxGroup).some(checkbox => checkbox.checked);
                if (!isChecked) {
                    fieldValid = false;
                    showFieldError(field.closest('.question-group'), 'Please select at least one option');
                }
            } else if (!field.value.trim()) {
                fieldValid = false;
                field.classList.add('error');
                showFieldError(field.closest('.question-group'), 'This field is required');
            }
            
            if (!fieldValid) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            // Scroll to first error
            const firstError = document.querySelector('.error, .error-message');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        
        return isValid;
    }

    // Show field error
    function showFieldError(questionGroup, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        questionGroup.appendChild(errorDiv);
    }

    // Show success message
    function showSuccessMessage(message) {
        const successBanner = document.createElement('div');
        successBanner.className = 'success-banner';
        successBanner.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
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
        
        setTimeout(() => {
            if (successBanner.parentNode) {
                successBanner.remove();
            }
        }, 5000);
    }

    // Add event listeners for progress tracking
    document.addEventListener('change', updateProgress);
    document.addEventListener('input', updateProgress);

    // Auto-save functionality
    let saveTimeout;
    personaForm.addEventListener('input', function() {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            const formData = new FormData(personaForm);
            const data = Object.fromEntries(formData);
            localStorage.setItem('personaFormData', JSON.stringify(data));
        }, 1000);
    });

    // Load saved data
    function loadSavedData() {
        const savedData = localStorage.getItem('personaFormData');
        if (savedData) {
            const data = JSON.parse(savedData);
            
            Object.keys(data).forEach(key => {
                const field = document.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'radio' || field.type === 'checkbox') {
                        field.checked = true;
                    } else {
                        field.value = data[key];
                    }
                }
            });
        }
    }

    // Initialize the page
    generateQuestions();
    
    // Load saved data after questions are generated
    setTimeout(loadSavedData, 100);
});

// Add CSS for success banner animation
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