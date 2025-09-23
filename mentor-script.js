// Mentor page functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    // Mobile menu toggle
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Service configurations with icons
    const serviceConfigs = {
        'idea-tuning': {
            title: 'Idea Tuning Mentors',
            icon: 'fas fa-lightbulb'
        },
        'registration': {
            title: 'Registration Guide Mentors',
            icon: 'fas fa-file-contract'
        },
        'compliance': {
            title: 'Compliance Guide Mentors',
            icon: 'fas fa-shield-alt'
        },
        'branding': {
            title: 'Branding Guide Mentors',
            icon: 'fas fa-palette'
        },
        'hr-policy': {
            title: 'HR Policy Hub Mentors',
            icon: 'fas fa-users'
        },
        'mentors': {
            title: 'General Business Mentors',
            icon: 'fas fa-user-tie'
        }
    };

    // Mentor database organized by service
    const mentorDatabase = {
        'idea-tuning': [
            {
                name: 'Rajesh Kumar',
                tag: 'Business Coach',
                phone: '+91 98765 43210',
                email: 'rajesh.kumar@businesscoach.com',
                address: 'Mumbai, Maharashtra\nIndia',
                website: 'www.rajeshkumarcoaching.com'
            },
            {
                name: 'Sarah Johnson',
                tag: 'Startup Advisor',
                phone: '+1 555-123-4567',
                email: 'sarah@startupadvice.com',
                address: 'San Francisco, CA\nUnited States',
                website: 'www.sarahjohnsonadvising.com'
            }
        ],
        'registration': [
            {
                name: 'Priya Sharma',
                tag: 'CS',
                phone: '+91 87654 32109',
                email: 'priya.sharma@legalservices.in',
                address: 'Delhi, India\nConnaught Place',
                website: 'www.priyasharmalegal.com'
            },
            {
                name: 'Michael Chen',
                tag: 'Legal Consultant',
                phone: '+1 555-987-6543',
                email: 'michael@legalconsult.com',
                address: 'New York, NY\nUnited States',
                website: null
            }
        ],
        'compliance': [
            {
                name: 'Neelam Patel',
                tag: 'CA',
                phone: '+91 76543 21098',
                email: 'neelam.patel@taxconsult.in',
                address: 'Ahmedabad, Gujarat\nIndia',
                website: 'www.neelampateltax.com'
            },
            {
                name: 'David Rodriguez',
                tag: 'Tax Advisor',
                phone: '+1 555-456-7890',
                email: 'david@taxadvisory.com',
                address: 'Austin, TX\nUnited States',
                website: 'www.davidrodrigueztax.com'
            }
        ],
        'branding': [
            {
                name: 'Anita Desai',
                tag: 'Brand Consultant',
                phone: '+91 65432 10987',
                email: 'anita@brandconsult.in',
                address: 'Bangalore, Karnataka\nIndia',
                website: 'www.anitadesaibranding.com'
            },
            {
                name: 'Jessica Williams',
                tag: 'Creative Director',
                phone: '+1 555-234-5678',
                email: 'jessica@creativestudio.com',
                address: 'Los Angeles, CA\nUnited States',
                website: 'www.jessicawilliamscreative.com'
            }
        ],
        'hr-policy': [
            {
                name: 'Ravi Gupta',
                tag: 'HR Consultant',
                phone: '+91 54321 09876',
                email: 'ravi.gupta@hrconsult.in',
                address: 'Pune, Maharashtra\nIndia',
                website: 'www.raviguptahr.com'
            },
            {
                name: 'Emily Davis',
                tag: 'HR Specialist',
                phone: '+1 555-345-6789',
                email: 'emily@hrspecialist.com',
                address: 'Chicago, IL\nUnited States',
                website: null
            }
        ],
        'mentors': [
            {
                name: 'Sunayana Singh',
                tag: 'Serial Entrepreneur',
                phone: '+91 43210 98765',
                email: 'sunayana@entrepreneur.in',
                address: 'Hyderabad, Telangana\nIndia',
                website: 'www.sunayanasingh.com'
            },
            {
                name: 'Robert Thompson',
                tag: 'Business Mentor',
                phone: '+1 555-567-8901',
                email: 'robert@businessmentor.com',
                address: 'Seattle, WA\nUnited States',
                website: 'www.robertthompsonmentor.com'
            },
            {
                name: 'Quincy Adams',
                tag: 'Investment Advisor',
                phone: '+1 555-678-9012',
                email: 'quincy@investmentadvice.com',
                address: 'Boston, MA\nUnited States',
                website: 'www.quincyadamsinvest.com'
            }
        ]
    };

    // Get selected services from localStorage
    function getSelectedServices() {
        const savedData = localStorage.getItem('signupFormData');
        if (savedData) {
            const data = JSON.parse(savedData);
            return data.services || [];
        }
        
        // Fallback: show all services if no data found
        return ['idea-tuning', 'registration', 'compliance', 'branding', 'hr-policy', 'mentors'];
    }

    // Generate mentor sections
    function generateMentorSections() {
        const selectedServices = getSelectedServices();
        const container = document.getElementById('mentorsContainer');
        
        if (selectedServices.length === 0) {
            showEmptyState(container);
            return;
        }
        
        selectedServices.forEach(serviceKey => {
            const serviceConfig = serviceConfigs[serviceKey];
            const mentors = mentorDatabase[serviceKey];
            
            if (serviceConfig && mentors && mentors.length > 0) {
                const serviceSection = createServiceSection(serviceKey, serviceConfig, mentors);
                container.appendChild(serviceSection);
            }
        });
    }

    // Create service section
    function createServiceSection(serviceKey, config, mentors) {
        const section = document.createElement('div');
        section.className = 'service-section';
        section.dataset.service = serviceKey;
        
        const header = document.createElement('div');
        header.className = 'service-header';
        header.innerHTML = `
            <div class="service-icon">
                <i class="${config.icon}"></i>
            </div>
            <h2 class="service-title">${config.title}</h2>
        `;
        
        const mentorsGrid = document.createElement('div');
        mentorsGrid.className = 'mentors-grid';
        
        mentors.forEach(mentor => {
            const mentorCard = createMentorCard(mentor);
            mentorsGrid.appendChild(mentorCard);
        });
        
        section.appendChild(header);
        section.appendChild(mentorsGrid);
        
        return section;
    }

    // Create mentor card
    function createMentorCard(mentor) {
        const card = document.createElement('div');
        card.className = 'mentor-card';
        card.setAttribute('tabindex', '0');
        
        // Get initials for avatar
        const initials = mentor.name.split(' ').map(n => n[0]).join('').toUpperCase();
        
        card.innerHTML = `
            <div class="mentor-header">
                <div class="mentor-basic-info">
                    <div class="mentor-avatar">${initials}</div>
                    <div class="mentor-name-tag">
                        <div class="mentor-name">${mentor.name}</div>
                        <div class="mentor-tag">${mentor.tag}</div>
                    </div>
                </div>
                <div class="expand-icon">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            <div class="mentor-details">
                <div class="contact-info">
                    <div class="contact-item">
                        <div class="contact-icon">
                            <i class="fas fa-phone"></i>
                        </div>
                        <div class="contact-content">
                            <div class="contact-label">Phone</div>
                            <div class="contact-value">
                                <a href="tel:${mentor.phone.replace(/\s/g, '')}">${mentor.phone}</a>
                            </div>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div class="contact-content">
                            <div class="contact-label">Email</div>
                            <div class="contact-value">
                                <a href="mailto:${mentor.email}">${mentor.email}</a>
                            </div>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="contact-content">
                            <div class="contact-label">Address</div>
                            <div class="contact-value mentor-address">${mentor.address.replace(/\n/g, '<br>')}</div>
                        </div>
                    </div>
                    ${mentor.website ? `
                    <div class="contact-item">
                        <div class="contact-icon">
                            <i class="fas fa-globe"></i>
                        </div>
                        <div class="contact-content">
                            <div class="contact-label">Website</div>
                            <div class="contact-value">
                                <a href="https://${mentor.website}" target="_blank" rel="noopener noreferrer">${mentor.website}</a>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        // Add click handler to expand/collapse
        card.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('expanded');
            }
        });
        
        return card;
    }

    // Show empty state
    function showEmptyState(container) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <i class="fas fa-user-friends"></i>
            <h3>No Services Selected</h3>
            <p>Please complete your signup process to see relevant mentors for your selected services.</p>
        `;
        container.appendChild(emptyState);
    }

    // Initialize the page
    generateMentorSections();

    // Add smooth scrolling for internal links
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

    // Add animation on scroll for service sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service sections for animation
    document.querySelectorAll('.service-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add search functionality (optional enhancement)
    function addSearchFunctionality() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search mentors by name, tag, or service...';
        searchInput.className = 'mentor-search';
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const mentorCards = document.querySelectorAll('.mentor-card');
            
            mentorCards.forEach(card => {
                const mentorName = card.querySelector('.mentor-name').textContent.toLowerCase();
                const mentorTag = card.querySelector('.mentor-tag').textContent.toLowerCase();
                const serviceTitle = card.closest('.service-section').querySelector('.service-title').textContent.toLowerCase();
                
                if (mentorName.includes(searchTerm) || mentorTag.includes(searchTerm) || serviceTitle.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        // Insert search input before mentors container
        const container = document.getElementById('mentorsContainer');
        container.parentNode.insertBefore(searchInput, container);
    }

    // Uncomment to enable search functionality
    // addSearchFunctionality();
});