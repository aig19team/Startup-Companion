// Activity page functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    // Mobile menu toggle
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Activity management system
    let currentServiceIndex = 0;
    let currentActivityIndex = 0;
    let userServices = [];
    let activityData = {};

    // Service configurations with activities
    const serviceConfigs = {
        'idea-tuning': {
            title: 'Idea Tuning',
            icon: 'fas fa-lightbulb',
            activities: [
                {
                    title: 'Define Your Problem Statement',
                    guidance: {
                        title: 'Clarify the Problem You\'re Solving',
                        content: `Based on your responses, here's a refined problem statement for your service business:

**Problem Analysis:**
Your service addresses the gap in [specific market need] for [target customer segment]. This problem is significant because it affects [impact description].

**Recommended Actions:**
• Validate this problem with 5-10 potential customers
• Research existing solutions and their limitations  
• Document specific pain points your service will address
• Create a clear value proposition statement

**Next Steps:**
Once you accept this guidance, we'll help you refine your target customer profile.`
                    }
                },
                {
                    title: 'Identify Your Target Customers',
                    guidance: {
                        title: 'Define Your Ideal Customer Profile',
                        content: `Based on your business idea, here's your target customer analysis:

**Primary Customer Segment:**
Demographics, psychographics, and behavioral patterns of your ideal customers.

**Customer Needs & Pain Points:**
• Specific challenges they face
• Current solutions they use
• Budget considerations
• Decision-making process

**Recommended Actions:**
• Create detailed customer personas
• Conduct customer interviews
• Analyze competitor customer bases
• Test your assumptions with real prospects

**Market Size Estimation:**
We estimate your addressable market size and growth potential.`
                    }
                },
                {
                    title: 'Develop Your Competitive Advantage',
                    guidance: {
                        title: 'Position Your Service Uniquely',
                        content: `Here's your competitive positioning strategy:

**Competitive Landscape:**
Analysis of direct and indirect competitors in your space.

**Your Unique Value Proposition:**
• Key differentiators that set you apart
• Competitive advantages you can leverage
• Barriers to entry you can create

**Positioning Strategy:**
• How to communicate your unique value
• Pricing strategy relative to competitors
• Marketing messages that resonate

**Action Items:**
• Complete competitive analysis worksheet
• Refine your unique selling proposition
• Test messaging with target customers`
                    }
                },
                {
                    title: 'Choose Your Business Model',
                    guidance: {
                        title: 'Select the Right Revenue Model',
                        content: `Based on your service type and target market, here are recommended business models:

**Recommended Primary Model:**
[Subscription/One-time/Commission] based on your responses.

**Revenue Streams:**
• Primary revenue source
• Secondary revenue opportunities
• Pricing structure recommendations

**Financial Projections:**
• Expected revenue per customer
• Customer acquisition costs
• Lifetime value estimates

**Implementation Plan:**
• How to test your pricing model
• Payment processing setup
• Revenue tracking systems`
                    }
                },
                {
                    title: 'Create Your Pitch Deck',
                    guidance: {
                        title: 'Prepare Your Investor Presentation',
                        content: `Your personalized pitch deck outline:

**Slide Structure:**
1. Problem & Opportunity
2. Solution & Value Proposition  
3. Market Size & Target Customers
4. Business Model & Revenue
5. Competitive Advantage
6. Financial Projections
7. Team & Ask

**Key Messages:**
• Your compelling story narrative
• Market opportunity size
• Traction and validation proof
• Clear funding ask and use of funds

**Next Steps:**
• Download our pitch deck template
• Gather supporting data and metrics
• Practice your presentation
• Get feedback from mentors`
                    }
                }
            ]
        },
        'registration': {
            title: 'Registration Guide',
            icon: 'fas fa-file-contract',
            activities: [
                {
                    title: 'Choose Your Business Entity',
                    guidance: {
                        title: 'Select the Right Business Structure',
                        content: `Based on your location and business plans, here's our recommendation:

**Recommended Entity Type:**
[LLP/Private Limited/Proprietorship] - Best fit for your situation.

**Why This Structure:**
• Liability protection benefits
• Tax implications and advantages
• Compliance requirements
• Growth and investment flexibility

**Required Documentation:**
• Identity and address proofs
• Business name options
• Registered office address
• Initial capital requirements

**Timeline & Costs:**
• Registration process: 7-15 days
• Government fees: [Amount]
• Professional fees: [Amount]
• Annual compliance costs: [Amount]`
                    }
                },
                {
                    title: 'Reserve Your Business Name',
                    guidance: {
                        title: 'Secure Your Business Identity',
                        content: `Business name registration process for your entity:

**Name Availability Check:**
We'll help you check if your preferred names are available.

**Naming Guidelines:**
• Must comply with government regulations
• Should reflect your business nature
• Avoid restricted words and phrases
• Consider trademark implications

**Recommended Names:**
Based on your business description, here are some suggestions:
• [Name Option 1]
• [Name Option 2]  
• [Name Option 3]

**Next Steps:**
• Submit name reservation application
• Prepare alternative options
• Check domain availability
• Consider trademark registration`
                    }
                },
                {
                    title: 'Prepare Registration Documents',
                    guidance: {
                        title: 'Gather Required Documentation',
                        content: `Complete checklist of documents needed for registration:

**Founder Documents:**
• PAN cards of all founders
• Aadhaar cards and address proofs
• Passport-size photographs
• Educational certificates (if required)

**Business Documents:**
• Memorandum of Association (MOA)
• Articles of Association (AOA)
• Registered office proof
• No Objection Certificate (if rented)

**Financial Documents:**
• Bank account opening documents
• Initial capital proof
• CA certification (if required)

**We'll Help You:**
• Draft all legal documents
• Review and verify completeness
• Submit applications online
• Track approval status`
                    }
                },
                {
                    title: 'Submit Registration Application',
                    guidance: {
                        title: 'File Your Business Registration',
                        content: `Step-by-step registration submission process:

**Online Filing Process:**
1. Create account on government portal
2. Fill application forms accurately
3. Upload all required documents
4. Pay registration fees online
5. Submit and get acknowledgment

**What Happens Next:**
• Document verification (2-3 days)
• Name approval (3-5 days)
• Certificate generation (5-7 days)
• PAN and TAN allocation

**Our Support:**
• We'll guide you through each step
• Help with any queries or rejections
• Ensure compliance with all requirements
• Provide updates on application status

**Expected Timeline:**
Total process: 10-15 working days`
                    }
                },
                {
                    title: 'Receive Registration Certificate',
                    guidance: {
                        title: 'Complete Your Business Registration',
                        content: `Final steps to complete your business registration:

**What You'll Receive:**
• Certificate of Incorporation
• PAN card for business
• TAN (Tax Deduction Account Number)
• Digital signature certificates

**Immediate Next Steps:**
• Open business bank account
• Apply for necessary licenses
• Register for GST (if applicable)
• Set up accounting systems

**Compliance Calendar:**
• Annual filing requirements
• Board meeting schedules
• Tax payment deadlines
• ROC compliance dates

**Congratulations!**
Your business is now legally registered and ready to operate.`
                    }
                }
            ]
        },
        'compliance': {
            title: 'Compliance Guide',
            icon: 'fas fa-shield-alt',
            activities: [
                {
                    title: 'GST Registration Setup',
                    guidance: {
                        title: 'Register for Goods & Services Tax',
                        content: `GST registration process for your business:

**GST Eligibility:**
Based on your business type and expected turnover, GST registration is [Required/Optional/Not Required].

**Registration Process:**
• Online application on GST portal
• Document upload and verification
• Physical verification (if required)
• GSTIN generation

**Required Documents:**
• Business registration certificate
• PAN card and Aadhaar
• Bank account details
• Business address proof
• Authorized signatory details

**Compliance Requirements:**
• Monthly/Quarterly returns filing
• Invoice and record maintenance
• Tax payment deadlines
• Annual return submission

**Timeline:** 7-15 working days`
                    }
                },
                {
                    title: 'Business Bank Account',
                    guidance: {
                        title: 'Open Your Business Banking Account',
                        content: `Business banking setup recommendations:

**Recommended Banks:**
Based on your business needs and location:
• [Bank 1] - Best for startups
• [Bank 2] - Digital banking features
• [Bank 3] - Relationship banking

**Required Documents:**
• Business registration certificate
• PAN and TAN cards
• Address proof of business
• Identity proof of authorized signatories
• Board resolution (for companies)

**Account Features to Consider:**
• Online banking and mobile app
• Payment gateway integration
• Overdraft facilities
• Multi-user access
• Transaction limits

**Setup Process:**
1. Choose bank and account type
2. Submit application with documents
3. Initial deposit (varies by bank)
4. Account activation (3-7 days)`
                    }
                },
                {
                    title: 'Professional Tax Registration',
                    guidance: {
                        title: 'Register for Professional Tax',
                        content: `Professional tax compliance for your business:

**Applicability:**
Professional tax applies if you have employees or your business falls under specified categories.

**Registration Process:**
• State-specific online portal
• Submit application with documents
• Pay registration fees
• Receive registration certificate

**Required Information:**
• Business details and address
• Nature of business/profession
• Number of employees
• Expected salary/income range

**Compliance Requirements:**
• Monthly tax payments
• Annual returns filing
• Employee enrollment
• Salary deduction (if applicable)

**State-Specific Guidelines:**
[Your state] specific rules and rates apply.`
                    }
                },
                {
                    title: 'Industry-Specific Licenses',
                    guidance: {
                        title: 'Obtain Required Business Licenses',
                        content: `Licenses required for your service business:

**Identified License Requirements:**
Based on your business type, you may need:
• [License 1] - [Purpose and Authority]
• [License 2] - [Purpose and Authority]
• [License 3] - [Purpose and Authority]

**Application Process:**
• Online/offline application submission
• Document verification
• Site inspection (if required)
• Fee payment and approval

**Compliance Obligations:**
• License renewal schedules
• Periodic reporting requirements
• Inspection compliance
• Record maintenance

**Timeline & Costs:**
• Processing time: [Duration]
• Government fees: [Amount]
• Validity period: [Duration]
• Renewal requirements

**We'll Help You:**
Navigate the entire licensing process step-by-step.`
                    }
                },
                {
                    title: 'Compliance Calendar Setup',
                    guidance: {
                        title: 'Create Your Compliance Schedule',
                        content: `Your personalized compliance calendar:

**Monthly Obligations:**
• GST return filing (11th of next month)
• Professional tax payment
• TDS return filing (if applicable)
• Salary processing and compliance

**Quarterly Requirements:**
• GST quarterly returns
• Income tax advance payments
• Board meetings (for companies)
• Financial statement preparation

**Annual Compliance:**
• Income tax return filing
• GST annual return
• ROC annual filings
• License renewals

**Automated Reminders:**
We'll set up automated reminders for all compliance deadlines.

**Professional Support:**
Connect with our CA/CS partners for ongoing compliance management.`
                    }
                }
            ]
        },
        'branding': {
            title: 'Branding Guide',
            icon: 'fas fa-palette',
            activities: [
                {
                    title: 'Define Brand Identity',
                    guidance: {
                        title: 'Establish Your Brand Foundation',
                        content: `Your brand identity framework:

**Brand Personality:**
Based on your responses, your brand should embody: [Professional/Friendly/Innovative/Trustworthy] characteristics.

**Brand Values:**
• Core value 1: [Description]
• Core value 2: [Description]
• Core value 3: [Description]

**Brand Voice & Tone:**
• Communication style guidelines
• Language preferences
• Messaging consistency rules

**Brand Promise:**
Your commitment to customers: [Brand promise statement]

**Visual Identity Direction:**
• Color psychology recommendations
• Typography suggestions
• Imagery style guidelines

**Next Steps:**
• Refine brand positioning statement
• Create brand guidelines document
• Test brand concepts with target audience`
                    }
                },
                {
                    title: 'Design Logo & Visual Assets',
                    guidance: {
                        title: 'Create Your Visual Brand Identity',
                        content: `Logo and visual asset development plan:

**Logo Design Brief:**
• Style recommendations: [Modern/Classic/Minimalist]
• Color palette suggestions
• Typography preferences
• Symbol/icon considerations

**Brand Color Palette:**
• Primary colors: [Color codes]
• Secondary colors: [Color codes]
• Neutral colors: [Color codes]
• Usage guidelines for each

**Typography System:**
• Primary font: [Font name]
• Secondary font: [Font name]
• Hierarchy and usage rules

**Visual Assets Needed:**
• Logo variations (horizontal, vertical, icon)
• Business card design
• Letterhead template
• Social media templates
• Website header graphics

**Design Resources:**
• Access to design tools and templates
• Professional designer recommendations
• Brand asset management system`
                    }
                },
                {
                    title: 'Secure Domain & Online Presence',
                    guidance: {
                        title: 'Establish Your Digital Identity',
                        content: `Domain and online presence setup:

**Domain Recommendations:**
Based on your business name, consider:
• [yourbusiness].com (Primary recommendation)
• [yourbusiness].in (Local alternative)
• [yourbusiness].co (Modern alternative)

**Domain Registration Process:**
• Check availability across extensions
• Register for 2-5 years initially
• Set up domain privacy protection
• Configure DNS settings

**Social Media Handles:**
Secure consistent handles across platforms:
• Instagram: @[yourbusiness]
• Facebook: /[yourbusiness]
• LinkedIn: /company/[yourbusiness]
• Twitter: @[yourbusiness]

**Email Setup:**
• Professional email addresses
• Email signature design
• Auto-responder setup

**Website Planning:**
• Site structure and navigation
• Content strategy
• SEO optimization basics`
                    }
                },
                {
                    title: 'Develop Brand Guidelines',
                    guidance: {
                        title: 'Create Brand Consistency Standards',
                        content: `Comprehensive brand guidelines document:

**Logo Usage Guidelines:**
• Proper logo placement and sizing
• Clear space requirements
• Acceptable color variations
• What NOT to do with your logo

**Color Standards:**
• Exact color codes (HEX, RGB, CMYK)
• Color combinations and contrasts
• Accessibility considerations

**Typography Rules:**
• Font hierarchy and sizing
• Line spacing and formatting
• Headings and body text styles

**Voice & Messaging:**
• Brand voice characteristics
• Tone variations for different contexts
• Key messaging pillars
• Communication do's and don'ts

**Application Examples:**
• Business cards and stationery
• Website and digital applications
• Marketing materials
• Social media posts

**Brand Asset Library:**
Organized collection of all brand elements for easy access.`
                    }
                },
                {
                    title: 'Implement Brand Across Touchpoints',
                    guidance: {
                        title: 'Apply Your Brand Consistently',
                        content: `Brand implementation across all customer touchpoints:

**Digital Applications:**
• Website design and development
• Social media profile setup
• Email templates and signatures
• Digital marketing materials

**Print Materials:**
• Business cards and stationery
• Brochures and flyers
• Signage and banners
• Packaging (if applicable)

**Customer Experience:**
• Service delivery standards
• Communication protocols
• Customer service scripts
• Feedback and review management

**Internal Branding:**
• Employee guidelines
• Internal communications
• Office/workspace branding
• Uniform or dress code standards

**Brand Monitoring:**
• Consistency check processes
• Brand usage audits
• Customer perception tracking
• Competitor brand analysis

**Launch Strategy:**
Coordinated brand reveal across all channels.`
                    }
                }
            ]
        },
        'hr-policy': {
            title: 'HR Policy Hub',
            icon: 'fas fa-users',
            activities: [
                {
                    title: 'Employment Contract Templates',
                    guidance: {
                        title: 'Create Legal Employment Agreements',
                        content: `Employment contract framework for your business:

**Contract Types Needed:**
Based on your hiring plans:
• Full-time employee contracts
• Part-time/contract worker agreements
• Consultant/freelancer agreements
• Internship agreements

**Key Contract Elements:**
• Job description and responsibilities
• Compensation and benefits structure
• Working hours and leave policies
• Confidentiality and non-compete clauses
• Termination conditions

**Legal Compliance:**
• Labor law requirements for your location
• Minimum wage and overtime rules
• Statutory benefits and deductions
• Notice period regulations

**Customizable Templates:**
• Industry-specific contract templates
• Role-based variations
• Different experience levels
• Remote work considerations

**Review Process:**
• Legal review recommendations
• Regular contract updates
• Employee acknowledgment procedures`
                    }
                },
                {
                    title: 'Compensation & Benefits Structure',
                    guidance: {
                        title: 'Design Your Compensation Framework',
                        content: `Compensation and benefits strategy:

**Salary Structure:**
• Market research for your industry
• Role-based compensation bands
• Performance-linked incentives
• Annual review and increment process

**Benefits Package:**
• Health insurance options
• Retirement/provident fund contributions
• Leave policies (sick, vacation, personal)
• Professional development allowances

**Statutory Compliance:**
• PF and ESI contributions
• Gratuity provisions
• Bonus calculations
• Tax deductions and reporting

**Performance Management:**
• Goal setting and KPI frameworks
• Regular review cycles
• Promotion and career progression
• Recognition and reward programs

**Budget Planning:**
• Total cost of employment calculations
• Benefits cost projections
• Compliance cost estimates
• ROI on employee investments

**Implementation Timeline:**
Phased rollout based on your hiring schedule.`
                    }
                },
                {
                    title: 'Leave & Attendance Policies',
                    guidance: {
                        title: 'Establish Leave Management System',
                        content: `Comprehensive leave and attendance framework:

**Leave Types & Entitlements:**
• Annual/earned leave: [Days per year]
• Sick leave: [Days per year]
• Casual leave: [Days per year]
• Maternity/paternity leave
• Emergency/bereavement leave

**Leave Policy Rules:**
• Accrual and carry-forward rules
• Advance leave provisions
• Leave encashment policies
• Holiday calendar and optional holidays

**Attendance Management:**
• Working hours and flexibility
• Remote work policies
• Overtime compensation
• Late arrival and early departure rules

**Leave Application Process:**
• Digital leave management system
• Approval workflows
• Documentation requirements
• Leave balance tracking

**Compliance Requirements:**
• Statutory leave entitlements
• Record maintenance obligations
• Reporting requirements
• Audit and inspection readiness

**System Recommendations:**
Digital tools for leave and attendance tracking.`
                    }
                },
                {
                    title: 'Workplace Safety & Conduct',
                    guidance: {
                        title: 'Create Safe and Professional Workplace',
                        content: `Workplace safety and conduct policies:

**Code of Conduct:**
• Professional behavior expectations
• Communication guidelines
• Dress code and appearance standards
• Social media and digital conduct

**Anti-Harassment Policy:**
• Zero tolerance policy statement
• Reporting mechanisms
• Investigation procedures
• Disciplinary actions

**Workplace Safety:**
• Health and safety protocols
• Emergency procedures
• First aid and medical facilities
• Incident reporting system

**Data Security & Confidentiality:**
• Information security policies
• Client confidentiality agreements
• Data protection compliance
• IT usage guidelines

**Disciplinary Procedures:**
• Progressive discipline framework
• Documentation requirements
• Appeal processes
• Termination procedures

**Training Requirements:**
• Mandatory training programs
• Regular policy updates
• Compliance certifications`
                    }
                },
                {
                    title: 'Remote Work & Flexibility Policies',
                    guidance: {
                        title: 'Design Flexible Work Arrangements',
                        content: `Remote and flexible work policy framework:

**Work Arrangement Options:**
Based on your preferences:
• Fully remote work
• Hybrid work model
• Flexible hours
• Compressed work weeks

**Remote Work Guidelines:**
• Eligibility criteria
• Home office setup requirements
• Communication protocols
• Performance measurement

**Technology & Equipment:**
• IT equipment provision
• Software and tool access
• Internet and connectivity support
• Security requirements

**Communication Standards:**
• Regular check-in schedules
• Meeting protocols
• Collaboration tools
• Response time expectations

**Performance Management:**
• Output-based evaluation
• Goal setting and tracking
• Regular feedback mechanisms
• Career development support

**Legal & Compliance:**
• Tax implications
• Insurance coverage
• Labor law compliance
• Data protection requirements

**Implementation Plan:**
Step-by-step rollout of flexible work policies.`
                    }
                }
            ]
        },
        'mentors': {
            title: 'Connect with Mentors',
            icon: 'fas fa-user-tie',
            activities: [
                {
                    title: 'Identify Mentorship Needs',
                    guidance: {
                        title: 'Define Your Mentorship Requirements',
                        content: `Personalized mentorship needs assessment:

**Priority Areas for Mentorship:**
Based on your responses, focus on:
• [Area 1]: Specific challenges and goals
• [Area 2]: Skill gaps and development needs
• [Area 3]: Strategic guidance requirements

**Mentor Profile Recommendations:**
• Industry experience: [Years] in [Industry]
• Functional expertise: [Specific areas]
• Company stage experience: [Startup/Growth/Scale]
• Geographic preference: [Local/Remote/Global]

**Mentorship Objectives:**
• Short-term goals (3-6 months)
• Medium-term objectives (6-12 months)
• Long-term vision (1-2 years)
• Success metrics and milestones

**Time Commitment:**
• Recommended frequency: [Weekly/Bi-weekly/Monthly]
• Session duration: [30-60 minutes]
• Additional support needs
• Preparation requirements

**Mentorship Format:**
• One-on-one sessions
• Group mentoring opportunities
• Workshop and masterclass access
• Peer networking events`
                    }
                },
                {
                    title: 'Browse Mentor Profiles',
                    guidance: {
                        title: 'Explore Available Mentors',
                        content: `Curated mentor recommendations for your needs:

**Featured Mentors in Your Area:**

**Legal & Compliance Experts:**
• [Mentor Name] - Corporate Lawyer, 15+ years
  Specializes in startup legal structures and compliance
• [Mentor Name] - CA with startup expertise
  Focus on tax planning and financial compliance

**Business Strategy Mentors:**
• [Mentor Name] - Serial Entrepreneur
  3 successful exits, expertise in service businesses
• [Mentor Name] - Business Coach
  Specializes in first-time founders

**Industry-Specific Mentors:**
• [Mentor Name] - [Your Industry] Expert
  20+ years experience, built and scaled similar businesses

**Mentor Matching Criteria:**
• Availability and time zones
• Communication style preferences
• Industry and functional expertise
• Startup stage experience
• Success stories and testimonials

**Next Steps:**
• Review detailed mentor profiles
• Check availability and rates
• Read testimonials and case studies
• Schedule introductory calls`
                    }
                },
                {
                    title: 'Schedule Mentor Meetings',
                    guidance: {
                        title: 'Book Your First Mentor Sessions',
                        content: `Mentor meeting scheduling and preparation:

**Recommended First Meetings:**
Based on your priorities:
1. [Mentor Type] - [Specific focus area]
2. [Mentor Type] - [Specific focus area]
3. [Mentor Type] - [Specific focus area]

**Meeting Preparation:**
• Define specific questions and challenges
• Prepare business overview and current status
• Set clear objectives for each session
• Gather relevant documents and data

**Meeting Agenda Template:**
• Introduction and background (10 minutes)
• Current challenges discussion (20 minutes)
• Mentor advice and recommendations (20 minutes)
• Next steps and action items (10 minutes)

**Scheduling Options:**
• Online video calls (Zoom, Teams)
• In-person meetings (if local)
• Phone consultations
• Flexible timing options

**Session Management:**
• Automated calendar integration
• Reminder notifications
• Session recording options
• Follow-up action tracking

**Payment & Billing:**
• Transparent pricing structure
• Flexible payment options
• Session packages and discounts`
                    }
                },
                {
                    title: 'Prepare for Mentor Sessions',
                    guidance: {
                        title: 'Maximize Your Mentorship Value',
                        content: `Session preparation and optimization guide:

**Pre-Session Preparation:**
• Review your business plan and current status
• Identify specific questions and challenges
• Prepare relevant documents and data
• Set clear session objectives

**Question Framework:**
• Strategic questions about business direction
• Tactical questions about immediate challenges
• Industry-specific insights and trends
• Personal development and leadership

**Documentation:**
• Business overview one-pager
• Financial projections and current metrics
• Competitive analysis summary
• Key challenges and opportunities list

**Session Best Practices:**
• Be punctual and prepared
• Take detailed notes
• Ask follow-up questions
• Request specific recommendations
• Discuss implementation timelines

**Follow-up Actions:**
• Summarize key insights and advice
• Create action item lists with deadlines
• Schedule follow-up sessions
• Track progress on recommendations

**Building Long-term Relationships:**
• Regular communication between sessions
• Progress updates and wins sharing
• Referral opportunities
• Mutual value creation`
                    }
                },
                {
                    title: 'Implement Mentor Recommendations',
                    guidance: {
                        title: 'Execute Mentor Guidance Effectively',
                        content: `Action implementation and progress tracking:

**Action Plan Creation:**
• Prioritize mentor recommendations
• Create implementation timelines
• Assign responsibilities and resources
• Set measurable milestones

**Progress Tracking System:**
• Weekly progress reviews
• Milestone achievement tracking
• Challenge identification and resolution
• Success metrics monitoring

**Regular Check-ins:**
• Scheduled progress updates with mentors
• Quarterly relationship reviews
• Feedback on mentorship effectiveness
• Adjustment of mentorship focus areas

**Knowledge Application:**
• Document lessons learned
• Share insights with team members
• Apply learnings to business operations
• Measure impact on business outcomes

**Mentor Relationship Management:**
• Maintain regular communication
• Provide updates on progress
• Seek additional guidance as needed
• Express gratitude and recognition

**Expanding Your Network:**
• Leverage mentor connections
• Attend mentor-recommended events
• Join relevant professional communities
• Build relationships with peer entrepreneurs

**Long-term Value Creation:**
• Develop ongoing mentor relationships
• Become a mentor to others
• Contribute to mentor community
• Share success stories and testimonials`
                    }
                }
            ]
        }
    };

    // Initialize activity system
    function initializeActivities() {
        // Get selected services from localStorage (from signup)
        const savedSignupData = localStorage.getItem('signupFormData');
        const personaData = localStorage.getItem('personaData');
        
        if (savedSignupData) {
            const signupData = JSON.parse(savedSignupData);
            userServices = signupData.services || [];
        }
        
        // Fallback: show all services if no data found
        if (userServices.length === 0) {
            userServices = ['idea-tuning', 'registration', 'compliance', 'branding', 'hr-policy', 'mentors'];
        }
        
        // Initialize activity tracking
        const savedProgress = localStorage.getItem('activityProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            currentServiceIndex = progress.serviceIndex || 0;
            currentActivityIndex = progress.activityIndex || 0;
        }
        
        // Generate service navigation
        generateServiceNavigation();
        
        // Load activity data with persona information
        loadActivityData();
    }

    // Generate service navigation
    function generateServiceNavigation() {
        const serviceNav = document.getElementById('serviceNavigation');
        const navTitle = document.createElement('h3');
        navTitle.className = 'service-nav-title';
        navTitle.textContent = 'Your Startup Journey';
        
        const navList = document.createElement('div');
        navList.className = 'service-nav-list';
        
        userServices.forEach((serviceKey, index) => {
            const serviceConfig = serviceConfigs[serviceKey];
            if (serviceConfig) {
                const navItem = document.createElement('a');
                navItem.href = '#';
                navItem.className = 'service-nav-item';
                navItem.dataset.serviceIndex = index;
                
                if (index < currentServiceIndex) {
                    navItem.classList.add('completed');
                } else if (index === currentServiceIndex) {
                    navItem.classList.add('active');
                }
                
                navItem.innerHTML = `
                    <i class="${serviceConfig.icon}"></i>
                    <span>${serviceConfig.title}</span>
                `;
                
                navItem.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (index <= currentServiceIndex) {
                        switchToService(index);
                    }
                });
                
                navList.appendChild(navItem);
            }
        });
        
        serviceNav.appendChild(navTitle);
        serviceNav.appendChild(navList);
    }

    // Load activity data with personalization
    function loadActivityData() {
        const personaData = JSON.parse(localStorage.getItem('personaData') || '{}');
        
        // Personalize activity content based on persona data
        userServices.forEach(serviceKey => {
            const serviceConfig = serviceConfigs[serviceKey];
            if (serviceConfig) {
                serviceConfig.activities.forEach(activity => {
                    // Customize guidance based on persona responses
                    activity.guidance.content = personalizeGuidance(activity.guidance.content, personaData, serviceKey);
                });
            }
        });
    }

    // Personalize guidance content
    function personalizeGuidance(content, personaData, serviceKey) {
        // Replace placeholders with actual persona data
        let personalizedContent = content;
        
        // Example personalizations (you can expand this based on actual persona data structure)
        if (personaData.country) {
            personalizedContent = personalizedContent.replace(/\[Your location\]/g, personaData.country);
            personalizedContent = personalizedContent.replace(/\[your state\]/g, personaData.country);
        }
        
        // Add more personalization logic based on your persona data structure
        return personalizedContent;
    }

    // Start activities
    window.startActivities = function() {
        document.getElementById('welcomeSection').style.display = 'none';
        document.getElementById('activitySection').style.display = 'block';
        document.getElementById('serviceNavigation').classList.add('active');
        
        loadCurrentActivity();
    };

    // Load current activity
    function loadCurrentActivity() {
        if (currentServiceIndex >= userServices.length) {
            showCompletionSection();
            return;
        }
        
        const serviceKey = userServices[currentServiceIndex];
        const serviceConfig = serviceConfigs[serviceKey];
        
        if (!serviceConfig || currentActivityIndex >= serviceConfig.activities.length) {
            // Move to next service
            currentServiceIndex++;
            currentActivityIndex = 0;
            updateServiceNavigation();
            loadCurrentActivity();
            return;
        }
        
        const activity = serviceConfig.activities[currentActivityIndex];
        
        // Update service header
        document.getElementById('currentServiceIcon').className = `service-icon ${serviceConfig.icon}`;
        document.getElementById('currentServiceTitle').textContent = serviceConfig.title;
        
        // Update progress
        const progressText = `Step ${currentActivityIndex + 1} of ${serviceConfig.activities.length}`;
        document.getElementById('progressText').textContent = progressText;
        
        const progressPercentage = ((currentActivityIndex + 1) / serviceConfig.activities.length) * 100;
        document.getElementById('progressBar').style.width = progressPercentage + '%';
        
        // Update activity content
        document.getElementById('activityTitle').textContent = activity.title;
        
        const guidanceContent = document.getElementById('guidanceContent');
        guidanceContent.innerHTML = `
            <h4>${activity.guidance.title}</h4>
            <div style="white-space: pre-line;">${activity.guidance.content}</div>
        `;
        
        // Save progress
        saveProgress();
    }

    // Accept activity
    window.acceptActivity = function() {
        const acceptBtn = document.getElementById('acceptBtn');
        const originalText = acceptBtn.innerHTML;
        
        // Show loading state
        acceptBtn.classList.add('loading');
        acceptBtn.innerHTML = 'Processing...';
        acceptBtn.disabled = true;
        
        setTimeout(() => {
            // Move to next activity
            currentActivityIndex++;
            
            // Reset button
            acceptBtn.classList.remove('loading');
            acceptBtn.innerHTML = originalText;
            acceptBtn.disabled = false;
            
            // Load next activity
            loadCurrentActivity();
            
            // Show success message
            showNotification('Great! Moving to your next step.', 'success');
        }, 1000);
    };

    // Reject activity and edit persona
    window.rejectActivity = function() {
        const rejectBtn = document.getElementById('rejectBtn');
        const originalText = rejectBtn.innerHTML;
        
        // Show loading state
        rejectBtn.classList.add('loading');
        rejectBtn.innerHTML = 'Redirecting...';
        rejectBtn.disabled = true;
        
        setTimeout(() => {
            // Save current progress
            saveProgress();
            
            // Redirect to buyer persona page with service context
            const serviceKey = userServices[currentServiceIndex];
            localStorage.setItem('editService', serviceKey);
            window.location.href = 'buyer-persona.html';
        }, 1000);
    };

    // Switch to specific service
    function switchToService(serviceIndex) {
        if (serviceIndex <= currentServiceIndex) {
            currentServiceIndex = serviceIndex;
            currentActivityIndex = 0;
            updateServiceNavigation();
            loadCurrentActivity();
        }
    }

    // Update service navigation
    function updateServiceNavigation() {
        const navItems = document.querySelectorAll('.service-nav-item');
        navItems.forEach((item, index) => {
            item.classList.remove('active', 'completed');
            if (index < currentServiceIndex) {
                item.classList.add('completed');
            } else if (index === currentServiceIndex) {
                item.classList.add('active');
            }
        });
    }

    // Show completion section
    function showCompletionSection() {
        document.getElementById('activitySection').style.display = 'none';
        document.getElementById('completionSection').style.display = 'block';
        
        // Mark all services as completed
        const navItems = document.querySelectorAll('.service-nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            item.classList.add('completed');
        });
        
        // Clear progress
        localStorage.removeItem('activityProgress');
        
        // Set completion flag
        localStorage.setItem('activitiesCompleted', 'true');
        
        showNotification('Congratulations! You\'ve completed your startup journey.', 'success');
    }

    // Save progress
    function saveProgress() {
        const progress = {
            serviceIndex: currentServiceIndex,
            activityIndex: currentActivityIndex,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('activityProgress', JSON.stringify(progress));
    }

    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#6D94C5'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    // Initialize the page
    initializeActivities();
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);