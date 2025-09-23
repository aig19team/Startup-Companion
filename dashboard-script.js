// Dashboard page functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    // Mobile menu toggle
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Service configurations (same as activity page)
    const serviceConfigs = {
        'idea-tuning': {
            title: 'Idea Tuning',
            icon: 'fas fa-lightbulb',
            activities: [
                'Define Your Problem Statement',
                'Identify Your Target Customers',
                'Develop Your Competitive Advantage',
                'Choose Your Business Model',
                'Create Your Pitch Deck'
            ]
        },
        'registration': {
            title: 'Registration Guide',
            icon: 'fas fa-file-contract',
            activities: [
                'Choose Your Business Entity',
                'Reserve Your Business Name',
                'Prepare Registration Documents',
                'Submit Registration Application',
                'Receive Registration Certificate'
            ]
        },
        'compliance': {
            title: 'Compliance Guide',
            icon: 'fas fa-shield-alt',
            activities: [
                'GST Registration Setup',
                'Business Bank Account',
                'Professional Tax Registration',
                'Industry-Specific Licenses',
                'Compliance Calendar Setup'
            ]
        },
        'branding': {
            title: 'Branding Guide',
            icon: 'fas fa-palette',
            activities: [
                'Define Brand Identity',
                'Design Logo & Visual Assets',
                'Secure Domain & Online Presence',
                'Develop Brand Guidelines',
                'Implement Brand Across Touchpoints'
            ]
        },
        'hr-policy': {
            title: 'HR Policy Hub',
            icon: 'fas fa-users',
            activities: [
                'Employment Contract Templates',
                'Compensation & Benefits Structure',
                'Leave & Attendance Policies',
                'Workplace Safety & Conduct',
                'Remote Work & Flexibility Policies'
            ]
        },
        'mentors': {
            title: 'Connect with Mentors',
            icon: 'fas fa-user-tie',
            activities: [
                'Identify Mentorship Needs',
                'Browse Mentor Profiles',
                'Schedule Mentor Meetings',
                'Prepare for Mentor Sessions',
                'Implement Mentor Recommendations'
            ]
        }
    };

    // Dashboard data management
    let userServices = [];
    let progressData = {};
    let timelineData = [];

    // Initialize dashboard
    function initializeDashboard() {
        loadUserData();
        generateServiceCards();
        updateOverallProgress();
        updateQuickActions();
    }

    // Load user data from localStorage
    function loadUserData() {
        // Get selected services from signup
        const savedSignupData = localStorage.getItem('signupFormData');
        if (savedSignupData) {
            const signupData = JSON.parse(savedSignupData);
            userServices = signupData.services || [];
        }

        // Fallback: show all services if no data found
        if (userServices.length === 0) {
            userServices = ['idea-tuning', 'registration', 'compliance', 'branding', 'hr-policy', 'mentors'];
        }

        // Load activity progress
        const savedProgress = localStorage.getItem('activityProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            progressData.currentServiceIndex = progress.serviceIndex || 0;
            progressData.currentActivityIndex = progress.activityIndex || 0;
        } else {
            progressData.currentServiceIndex = 0;
            progressData.currentActivityIndex = 0;
        }

        // Generate mock progress data for demonstration
        generateMockProgress();
    }

    // Generate mock progress data
    function generateMockProgress() {
        progressData.services = {};
        
        userServices.forEach((serviceKey, serviceIndex) => {
            const serviceConfig = serviceConfigs[serviceKey];
            if (serviceConfig) {
                const totalActivities = serviceConfig.activities.length;
                let completedActivities = 0;
                
                // Calculate completed activities based on current progress
                if (serviceIndex < progressData.currentServiceIndex) {
                    // Previous services are fully completed
                    completedActivities = totalActivities;
                } else if (serviceIndex === progressData.currentServiceIndex) {
                    // Current service has partial completion
                    completedActivities = progressData.currentActivityIndex;
                }
                
                progressData.services[serviceKey] = {
                    completed: completedActivities,
                    total: totalActivities,
                    percentage: Math.round((completedActivities / totalActivities) * 100)
                };
            }
        });
    }

    // Generate service cards
    function generateServiceCards() {
        const servicesGrid = document.getElementById('servicesGrid');
        servicesGrid.innerHTML = '';

        userServices.forEach(serviceKey => {
            const serviceConfig = serviceConfigs[serviceKey];
            const serviceProgress = progressData.services[serviceKey];
            
            if (serviceConfig && serviceProgress) {
                const serviceCard = createServiceCard(serviceKey, serviceConfig, serviceProgress);
                servicesGrid.appendChild(serviceCard);
            }
        });
    }

    // Create individual service card
    function createServiceCard(serviceKey, config, progress) {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.dataset.service = serviceKey;
        
        card.innerHTML = `
            <div class="service-header">
                <div class="service-icon">
                    <i class="${config.icon}"></i>
                </div>
                <div class="service-info">
                    <h3 class="service-title">${config.title}</h3>
                    <p class="service-progress-text">${progress.completed} of ${progress.total} activities completed</p>
                </div>
            </div>
            <div class="service-progress-bar">
                <div class="service-progress-fill" style="width: ${progress.percentage}%"></div>
            </div>
            <div class="service-activities">
                <div class="activities-list">
                    ${config.activities.map((activity, index) => {
                        let status = 'pending';
                        let statusIcon = '○';
                        
                        if (index < progress.completed) {
                            status = 'completed';
                            statusIcon = '✓';
                        } else if (index === progress.completed && serviceKey === userServices[progressData.currentServiceIndex]) {
                            status = 'in-progress';
                            statusIcon = '●';
                        }
                        
                        return `
                            <div class="activity-item ${status}">
                                <div class="activity-status ${status}">${statusIcon}</div>
                                <span class="activity-name">${activity}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        // Add click handler to expand/collapse
        card.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });

        return card;
    }

    // Update overall progress
    function updateOverallProgress() {
        let totalActivities = 0;
        let completedActivities = 0;

        userServices.forEach(serviceKey => {
            const serviceProgress = progressData.services[serviceKey];
            if (serviceProgress) {
                totalActivities += serviceProgress.total;
                completedActivities += serviceProgress.completed;
            }
        });

        const overallPercentage = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;
        const completedServices = Object.values(progressData.services).filter(service => service.percentage === 100).length;

        // Update DOM elements
        document.getElementById('overallPercentage').textContent = overallPercentage + '%';
        document.getElementById('completedActivities').textContent = completedActivities;
        document.getElementById('totalActivities').textContent = totalActivities;
        document.getElementById('completedServices').textContent = completedServices;

        // Update donut chart
        updateDonutChart(overallPercentage);
    }

    // Update donut chart
    function updateDonutChart(percentage) {
        const donutChart = document.getElementById('overallDonut');
        const degrees = (percentage / 100) * 360;
        
        if (percentage <= 50) {
            donutChart.style.background = `conic-gradient(#6D94C5 0deg, #6D94C5 ${degrees}deg, #e9ecef ${degrees}deg)`;
        } else {
            donutChart.style.background = `conic-gradient(#6D94C5 0deg, #6D94C5 ${degrees}deg, #e9ecef ${degrees}deg)`;
        }
    }

    // Update quick actions
    function updateQuickActions() {
        const continueCard = document.getElementById('continueActivityCard');
        
        if (progressData.currentServiceIndex < userServices.length) {
            const currentServiceKey = userServices[progressData.currentServiceIndex];
            const currentService = serviceConfigs[currentServiceKey];
            const currentProgress = progressData.services[currentServiceKey];
            
            if (currentService && currentProgress) {
                const nextActivity = currentService.activities[progressData.currentActivityIndex];
                if (nextActivity) {
                    continueCard.querySelector('.action-title').textContent = 'Continue: ' + currentService.title;
                    continueCard.querySelector('.action-description').textContent = 'Next: ' + nextActivity;
                }
            }
        } else {
            continueCard.querySelector('.action-title').textContent = 'All Activities Complete!';
            continueCard.querySelector('.action-description').textContent = 'Congratulations on your progress';
            continueCard.style.opacity = '0.6';
            continueCard.style.pointerEvents = 'none';
        }
    }

    // Refresh dashboard data
    function refreshDashboard() {
        loadUserData();
        generateServiceCards();
        updateOverallProgress();
        updateQuickActions();
    }

    // Auto-refresh dashboard every 30 seconds
    setInterval(refreshDashboard, 30000);

    // Handle visibility change to refresh when user returns to tab
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            refreshDashboard();
        }
    });

    // Add keyboard navigation for service cards
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedCard = document.activeElement;
            if (focusedCard.classList.contains('service-card')) {
                e.preventDefault();
                focusedCard.classList.toggle('expanded');
            }
        }
    });

    // Make service cards focusable
    document.querySelectorAll('.service-card').forEach(card => {
        card.setAttribute('tabindex', '0');
    });

    // Initialize dashboard on page load
    initializeDashboard();

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

    // Add loading states for action cards
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (this.href && !this.href.includes('#')) {
                const icon = this.querySelector('.action-icon i');
                const originalClass = icon.className;
                
                icon.className = 'fas fa-spinner fa-spin';
                
                setTimeout(() => {
                    icon.className = originalClass;
                }, 1000);
            }
        });
    });

    // Add animation on scroll for timeline items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);

    // Observe timeline items for animation
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Add celebration animation for completed services
    function celebrateCompletion() {
        const completedServices = Object.values(progressData.services).filter(service => service.percentage === 100).length;
        const totalServices = userServices.length;
        
        if (completedServices === totalServices) {
            // Show celebration message
            showCelebrationMessage();
        }
    }

    function showCelebrationMessage() {
        const celebration = document.createElement('div');
        celebration.className = 'celebration-message';
        celebration.innerHTML = `
            <div class="celebration-content">
                <i class="fas fa-trophy"></i>
                <h3>Congratulations!</h3>
                <p>You've completed your entire startup journey!</p>
            </div>
        `;
        
        celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #6D94C5, #5a7ba8);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            text-align: center;
            animation: celebrationPop 0.5s ease-out;
        `;
        
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            if (celebration.parentNode) {
                celebration.remove();
            }
        }, 5000);
    }

    // Check for completion on load
    setTimeout(celebrateCompletion, 1000);
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes celebrationPop {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    .celebration-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
    
    .celebration-content i {
        font-size: 3rem;
        color: #ffd700;
    }
    
    .celebration-content h3 {
        font-size: 1.5rem;
        margin: 0;
    }
    
    .celebration-content p {
        margin: 0;
        opacity: 0.9;
    }
`;
document.head.appendChild(style);