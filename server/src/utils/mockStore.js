// Robust fallback store with full JAC MediaLand seed data

let adminUser = {
  id: 'admin-1',
  name: 'JAC MediaLand Administrator',
  email: 'admin@jacmedialand.com',
  passwordHash: '$2a$10$wK1G96s0/50v2H210/W64O7kQ2g9qN5V2V1m7Tq6rN9O9i6c3yW4K', // matches Admin@JAC2026!
  role: 'superadmin'
};

let services = [
  {
    _id: 'srv-1',
    title: 'Web Development',
    slug: 'web-development',
    tagline: 'High-performance, modern web applications built for scale and conversion',
    shortDescription: 'From high-converting corporate portals to complex web apps, we build scalable, ultra-fast web platforms using Next.js, React, and Node.js.',
    fullDescription: 'At JAC MediaLand IT Solutions, our web engineering division crafts resilient digital ecosystems. We combine architectural elegance with bleeding-edge web frameworks to deliver lightning-fast page speeds, flawless responsive layouts, and robust backend integrations that convert visitors into loyal customers.',
    icon: 'Code2',
    featuredImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'API Architecture'],
    deliverables: [
      'Custom Responsive Web Design',
      'High-Speed Core Web Vitals Optimization',
      'REST & GraphQL API Integrations',
      'Enterprise CMS & Headless Architectures',
      'Search Engine Optimization Architecture',
      'Ongoing Security & Maintenance'
    ],
    features: [
      { title: 'Sub-Second Speeds', description: 'Engineered for top Core Web Vitals scores and rapid content delivery.' },
      { title: 'Scalable Architecture', description: 'Built with modular component systems and microservices-ready backends.' },
      { title: 'Secure & Reliable', description: 'Enterprise-grade authentication, HTTPS headers, and automated security safeguards.' }
    ],
    faq: [
      { question: 'What technologies do you use for web development?', answer: 'We primarily specialize in modern JavaScript/TypeScript stacks including React, Next.js, Node.js, Express, PostgreSQL, and MongoDB.' },
      { question: 'Do you provide maintenance after launch?', answer: 'Yes, we provide ongoing SLAs covering security patches, uptime monitoring, and feature updates.' }
    ],
    order: 1,
    isActive: true
  },
  {
    _id: 'srv-2',
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    tagline: 'Native and cross-platform mobile apps for iOS and Android',
    shortDescription: 'We develop intuitive, high-performance mobile applications with seamless user experiences and rock-solid backend infrastructure.',
    fullDescription: 'Transform your digital presence with native-grade mobile applications built for both iOS and Android. Our team combines sleek UI/UX design with robust Flutter and React Native architectures to craft mobile experiences your users will love returning to every day.',
    icon: 'Smartphone',
    featuredImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    tags: ['React Native', 'Flutter', 'iOS & Android', 'Firebase', 'Real-time Sync'],
    deliverables: [
      'Cross-Platform iOS & Android Apps',
      'Smooth 60FPS UI Animations',
      'Push Notifications & Analytics Integration',
      'Offline-First Data Synchronization',
      'App Store & Play Store Submissions'
    ],
    features: [
      { title: 'Single Codebase, Native Speed', description: 'Lower time-to-market without compromising on smooth gestures or device capabilities.' },
      { title: 'Intuitive Onboarding', description: 'Frictionless authentication, biometric login, and user retention workflows.' }
    ],
    faq: [
      { question: 'Can you help with App Store publication?', answer: 'Yes, we manage the complete submission, compliance, and launch process for both Apple App Store and Google Play Store.' }
    ],
    order: 2,
    isActive: true
  },
  {
    _id: 'srv-3',
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    tagline: 'Human-centered interfaces crafted with visual flair and scientific usability',
    shortDescription: 'We craft bespoke design systems, wireframes, and high-fidelity interactive prototypes that mesmerize users and streamline complex workflows.',
    fullDescription: 'Design is not just how something looks, it is fundamentally how it works. JAC MediaLand designs interfaces that remove friction, guide decision-making, and create memorable brand affinities. Through user research, iterative wireframing, and interactive prototyping, we turn complex software into intuitive experiences.',
    icon: 'Palette',
    featuredImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Accessibility (WCAG)'],
    deliverables: [
      'User Personas & Journey Maps',
      'Interactive Figma Prototypes',
      'Design Systems & Component Libraries',
      'WCAG 2.1 AA Accessibility Compliance',
      'Developer Handoff Documentation'
    ],
    features: [
      { title: 'Design Systems', description: 'Comprehensive design tokens, typography, and reusable components.' },
      { title: 'Behavioral UX', description: 'Data-driven information architecture that reduces bounce rates and boosts conversions.' }
    ],
    faq: [
      { question: 'What tools do you use for design?', answer: 'Our primary design and prototyping suite is Figma, alongside Framer for interactive micro-motion tests.' }
    ],
    order: 3,
    isActive: true
  },
  {
    _id: 'srv-4',
    title: 'Digital Marketing & Growth',
    slug: 'digital-marketing',
    tagline: 'Performance-driven marketing strategies that amplify your reach and ROI',
    shortDescription: 'Scale your brand revenue with targeted paid media campaigns, content strategy, funnel optimization, and measurable growth marketing.',
    fullDescription: 'Connect with high-intent audiences and maximize customer acquisition with our data-backed digital marketing strategies. We optimize the entire customer lifecycle—from awareness and acquisition to activation, retention, and referral.',
    icon: 'TrendingUp',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Google Ads', 'Meta Ads', 'Funnel Optimization', 'Email Automation', 'Analytics'],
    deliverables: [
      'Multi-Channel Paid Ads Strategy',
      'Conversion Rate Optimization (CRO)',
      'Automated Lifecycle Email Marketing',
      'Custom KPI Dashboards & ROI Tracking'
    ],
    features: [
      { title: 'High-Converting Funnels', description: 'Optimized landing pages and messaging targeted to customer pain points.' },
      { title: 'Transparent Analytics', description: 'Real-time ROI, CPA, and ROAS reports without vanity metrics.' }
    ],
    faq: [
      { question: 'How do you measure marketing success?', answer: 'We focus on concrete business metrics: cost per acquisition (CPA), return on ad spend (ROAS), and qualified pipeline growth.' }
    ],
    order: 4,
    isActive: true
  },
  {
    _id: 'srv-5',
    title: 'Search Engine Optimization (SEO)',
    slug: 'seo',
    tagline: 'Technical and organic search optimization to dominate search results',
    shortDescription: 'We drive sustainable organic traffic with deep technical audits, semantic keyword targeting, high-authority backlink strategies, and Core Web Vitals optimization.',
    fullDescription: 'Modern SEO demands technical precision, exceptional content hierarchy, and fast page speeds. We optimize your website architecture, schema markup, and keyword strategy to achieve first-page rankings that continuously drive organic customer pipeline.',
    icon: 'Search',
    featuredImage: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=1200&q=80',
    tags: ['Technical SEO', 'Keyword Research', 'Schema Markup', 'Content Audits', 'Local SEO'],
    deliverables: [
      'Technical SEO Audit & Fixes',
      'Structured Data / Schema Implementation',
      'Content Keyword Mapping & Gap Analysis',
      'Local Business Citations & Google Business Profile'
    ],
    features: [
      { title: 'Structured Data', description: 'Enhanced SERP snippets with JSON-LD Schema markup.' },
      { title: 'Keyword Authority', description: 'Topical maps that rank for long-tail, high-intent buyer searches.' }
    ],
    faq: [
      { question: 'How long does SEO take to produce results?', answer: 'Organic SEO compounding typically shows substantial progress between 3 to 6 months depending on competition.' }
    ],
    order: 5,
    isActive: true
  },
  {
    _id: 'srv-6',
    title: 'Social Media Management',
    slug: 'social-media-management',
    tagline: 'Compelling storytelling and visual identities across social channels',
    shortDescription: 'Build an engaged, authoritative brand community across LinkedIn, Instagram, and Twitter with consistent creative assets and strategic posting.',
    fullDescription: 'In today’s connected marketplace, your social channels represent your brand’s personality and credibility. JAC MediaLand produces high-impact visuals, motion reels, and thought-leadership copy that builds meaningful audience engagement.',
    icon: 'Share2',
    featuredImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    tags: ['Social Content', 'Brand Storytelling', 'Community Management', 'Reels & Motion'],
    deliverables: [
      'Monthly Content Calendars',
      'High-Fidelity Graphic & Motion Assets',
      'Community Moderation & Engagement',
      'Influencer Collaboration Strategy'
    ],
    features: [
      { title: 'Bespoke Brand Voice', description: 'Consistent messaging aligned with your brand values and goals.' },
      { title: 'Active Community Growth', description: 'Engage real stakeholders, potential clients, and industry peers.' }
    ],
    faq: [
      { question: 'Which platforms do you manage?', answer: 'We specialize in LinkedIn, Instagram, X (Twitter), Facebook, and YouTube.' }
    ],
    order: 6,
    isActive: true
  }
];

let projects = [
  {
    _id: 'proj-1',
    title: 'ApexFlow Cloud SaaS Platform',
    slug: 'apexflow-cloud-saas',
    client: 'ApexFlow Technologies',
    category: 'Web Development',
    summary: 'An enterprise cloud telemetry dashboard and real-time event analytics platform featuring sub-second data streaming and interactive charts.',
    challenge: 'The client needed to visualize millions of server events per second without dropping frames or freezing customer browser sessions.',
    solution: 'We engineered a high-throughput React dashboard with WebSockets, WebGL-accelerated chart rendering, and an ultra-clean modular dark-mode interface.',
    results: [
      { metric: '99.99%', label: 'Uptime' },
      { metric: '<45ms', label: 'Telemetry Latency' },
      { metric: '3.4x', label: 'User Retention' }
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'WebSockets', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
    ],
    liveUrl: 'https://jacmedialand.com',
    year: '2025',
    isFeatured: true,
    isPublished: true,
    order: 1
  },
  {
    _id: 'proj-2',
    title: 'AuraPay FinTech Mobile Experience',
    slug: 'aurapay-fintech-app',
    client: 'AuraPay Global',
    category: 'App Development',
    summary: 'A next-generation cross-border digital wallet and currency exchange app featuring biometric authentication and seamless bank transfers.',
    challenge: 'Delivering banking-grade security and KYC verification with an effortless, consumer-friendly user experience.',
    solution: 'Built a cross-platform React Native app with end-to-end cryptographic signatures, smooth micro-interactions, and instant WhatsApp receipt integration.',
    results: [
      { metric: '250K+', label: 'Active Users' },
      { metric: '4.9/5', label: 'App Rating' },
      { metric: '60%', label: 'Lower KYC Drop-off' }
    ],
    techStack: ['React Native', 'TypeScript', 'Node.js', 'Stripe', 'Redis'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80'
    ],
    liveUrl: 'https://jacmedialand.com',
    year: '2025',
    isFeatured: true,
    isPublished: true,
    order: 2
  },
  {
    _id: 'proj-3',
    title: 'Verve Studio Design System & Website',
    slug: 'verve-studio-design-system',
    client: 'Verve Architecture Studio',
    category: 'UI/UX Design',
    summary: 'An editorial portfolio website and comprehensive design tokens library for an award-winning international architecture firm.',
    challenge: 'Expressing minimalist architectural beauty with fluid scroll-triggered transitions and immersive image masks.',
    solution: 'Designed an editorial typography layout using Instrument Serif and Inter, paired with GSAP ScrollTrigger for buttery smooth parallax storytelling.',
    results: [
      { metric: '100%', label: 'Brand Alignment' },
      { metric: '+85%', label: 'Inquiry Volume' },
      { metric: 'Award', label: 'AOTD Design Nominee' }
    ],
    techStack: ['Figma', 'GSAP', 'React', 'Tailwind CSS', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    liveUrl: 'https://jacmedialand.com',
    year: '2024',
    isFeatured: true,
    isPublished: true,
    order: 3
  },
  {
    _id: 'proj-4',
    title: 'Lumina Organic eCommerce Flagship',
    slug: 'lumina-ecommerce-flagship',
    client: 'Lumina Botanicals',
    category: 'Web Development',
    summary: 'A headless e-commerce storefront with custom ingredient filtering, lightning-fast checkout, and subscription management.',
    challenge: 'Overcoming slow Shopify template speeds and delivering an unforgettable, tactile shopping experience.',
    solution: 'Re-architected the store with a headless Next.js frontend, customized Razorpay & Stripe checkouts, and micro-animations on cart interactions.',
    results: [
      { metric: '+140%', label: 'Mobile Conversion' },
      { metric: '0.8s', label: 'Average Page Load' },
      { metric: '₹10 Cr+', label: 'Annual GMV' }
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Shopify Storefront API', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80'
    ],
    liveUrl: 'https://jacmedialand.com',
    year: '2024',
    isFeatured: true,
    isPublished: true,
    order: 4
  },
  {
    _id: 'proj-5',
    title: 'Kalyan Logistics Global Fleet Portal',
    slug: 'kalyan-logistics-portal',
    client: 'Kalyan Supply Chain Ltd',
    category: 'Web Development',
    summary: 'Enterprise B2B shipment tracking and warehouse dispatch automation system handling thousands of daily freight consignments.',
    challenge: 'Modernizing legacy paper-based dispatch systems into a real-time web platform.',
    solution: 'Designed and engineered an automated dispatch console with automated GPS milestones, WhatsApp driver alerts, and ERP synchronization.',
    results: [
      { metric: '70%', label: 'Dispatch Speedup' },
      { metric: 'Zero', label: 'Lost Consignments' },
      { metric: '10K+', label: 'Daily Shipments' }
    ],
    techStack: ['React', 'Express.js', 'MongoDB', 'Docker', 'Google Maps API'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
    ],
    liveUrl: 'https://jacmedialand.com',
    year: '2024',
    isFeatured: false,
    isPublished: true,
    order: 5
  },
  {
    _id: 'proj-6',
    title: 'NexGen Health Telemedicine Portal',
    slug: 'nexgen-health-telemedicine',
    client: 'NexGen Healthcare Solutions',
    category: 'App Development',
    summary: 'HIPAA-compliant doctor appointment scheduling and high-definition video consultation platform with encrypted prescriptions.',
    challenge: 'Guaranteeing medical data privacy and low-latency audio/video on slower mobile network connections.',
    solution: 'Engineered WebRTC encrypted video pipelines, integrated automated calendar sync, and designed a senior-friendly high-contrast UI.',
    results: [
      { metric: '50K+', label: 'Consultations' },
      { metric: '99.9%', label: 'Video Reliability' },
      { metric: '4.8/5', label: 'Patient Satisfaction' }
    ],
    techStack: ['React', 'WebRTC', 'Node.js', 'Socket.io', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80'
    ],
    liveUrl: 'https://jacmedialand.com',
    year: '2024',
    isFeatured: false,
    isPublished: true,
    order: 6
  }
];

let enquiries = [
  {
    _id: 'enq-1',
    name: 'Rajesh Subramanian',
    email: 'rajesh@techforward.in',
    phone: '+91 98401 23456',
    service: 'Web Development',
    budget: '₹50,000 - ₹1,00,000',
    message: 'We are looking to rebuild our enterprise B2B website with a modern look similar to top digital agencies. Need sub-second load times and custom animations.',
    status: 'In Review',
    internalNotes: [
      { text: 'Scheduled intro call for Thursday 3 PM', createdAt: new Date(), author: 'Admin' }
    ],
    createdAt: new Date(Date.now() - 24 * 3600 * 1000)
  },
  {
    _id: 'enq-2',
    name: 'Sarah Jenkins',
    email: 'sarah.j@bloomapp.io',
    phone: '+1 415 890 1234',
    service: 'App Development',
    budget: '₹2,50,000+',
    message: 'We require a cross-platform mobile app in React Native for our wellness startup. Need high quality UX and Stripe integration.',
    status: 'New',
    internalNotes: [],
    createdAt: new Date(Date.now() - 6 * 3600 * 1000)
  },
  {
    _id: 'enq-3',
    name: 'Anand Kumar',
    email: 'anand@textilesexport.com',
    phone: '+91 97890 45678',
    service: 'UI/UX Design',
    budget: 'Under ₹50,000',
    message: 'Our product catalog needs a complete redesign to attract European buyers. Looking for clean typography and fast image loading.',
    status: 'Contacted',
    internalNotes: [
      { text: 'Sent portfolio samples and questionnaire', createdAt: new Date(), author: 'Admin' }
    ],
    createdAt: new Date(Date.now() - 48 * 3600 * 1000)
  }
];

let faqs = [
  {
    _id: 'faq-1',
    question: 'What web and digital services does JAC MediaLand provide?',
    answer: 'JAC MediaLand IT Solutions delivers end-to-end digital capabilities including custom Web Development, Mobile App Development (iOS & Android), UI/UX Design, Graphic Design, Digital Marketing, SEO, and Social Media Management.',
    category: 'General',
    order: 1,
    isActive: true
  },
  {
    _id: 'faq-2',
    question: 'How do you ensure high performance and sub-second loading speeds?',
    answer: 'We do not rely on slow website builder templates. We build modern custom codebases using Next.js/React, Tailwind CSS, lightweight GSAP/Framer animations, responsive asset compression, and clean modular architecture.',
    category: 'Engineering',
    order: 2,
    isActive: true
  },
  {
    _id: 'faq-3',
    question: 'What is your typical project timeline and process?',
    answer: 'A standard corporate website typically takes 3 to 5 weeks from discovery to deployment. Custom mobile applications and complex SaaS platforms take 6 to 12 weeks. We follow an agile 5-step process: Discover -> Design -> Build -> Test -> Launch & Scale.',
    category: 'Process',
    order: 3,
    isActive: true
  },
  {
    _id: 'faq-4',
    question: 'Can you work with clients internationally?',
    answer: 'Yes! JAC MediaLand partners with forward-thinking enterprises, startups, and brands across India, North America, Europe, and the Middle East, maintaining seamless communication via Slack, Google Meet, and Jira.',
    category: 'General',
    order: 4,
    isActive: true
  },
  {
    _id: 'faq-5',
    question: 'Will our website be mobile-responsive and search engine optimized?',
    answer: 'Every website we engineer is 100% mobile-first, passes Google Core Web Vitals with flying colors, and includes structured schema markup, clean semantic HTML, and on-page SEO best practices.',
    category: 'SEO',
    order: 5,
    isActive: true
  }
];

let settings = {
  companyName: 'JAC MediaLand IT Solutions',
  tagline: 'Innovating Digital Possibilities, Engineering Enterprise Growth',
  heroHeading: 'Creative Design & Full-Stack IT Solutions Agency',
  heroSubheading: 'We build world-class websites, mobile apps, brand identities, and high-growth digital platforms for startups and ambitious enterprises.',
  contactEmail: 'contact@jacmedialand.com',
  supportEmail: 'info@jacmedialand.com',
  phoneNumber: '+91 98765 43210',
  address: 'Tech Innovation Hub, Coimbatore & Chennai, Tamil Nadu, India',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/jacmedialand',
    instagram: 'https://instagram.com/jacmedialand',
    twitter: 'https://twitter.com/jacmedialand',
    facebook: 'https://facebook.com/jacmedialand',
    github: 'https://github.com/jacmedialand'
  },
  stats: {
    projectsCompleted: '150+',
    happyClients: '98%',
    yearsExperience: '8+',
    expertDevelopers: '25+'
  }
};

let products = [
  {
    _id: 'prod-1',
    name: 'JAC Nexus ERP',
    slug: 'jac-nexus-erp',
    tagline: 'Intelligent Enterprise Resource Planning',
    category: 'Enterprise SaaS',
    badge: 'Flagship Platform',
    description: 'A unified operations operating system designed for mid-market and enterprise businesses. Seamlessly manages inventory, automated financial accounting, human resources, and supply chain logistics.',
    icon: 'Layers',
    color: 'from-amber-500/20 to-orange-500/10',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Multi-entity accounting and automated tax compliance',
      'Real-time inventory sync across multiple warehouses',
      'Role-based granular access control & SOC2 compliant audit logs',
      'Custom workflow automation and API webhook integrations'
    ],
    stats: { metric: '42%', label: 'Efficiency Improvement' },
    order: 1,
    isActive: true
  },
  {
    _id: 'prod-2',
    name: 'JAC PayFlow',
    slug: 'jac-payflow',
    tagline: 'High-Throughput Global Payments Gateway',
    category: 'FinTech Solution',
    badge: 'Sub-50ms Processing',
    description: 'Enterprise payment infrastructure built for mission-critical e-commerce and subscription platforms. Processes transactions in 135+ currencies with automated fraud detection and smart retry logic.',
    icon: 'Zap',
    color: 'from-emerald-500/20 to-teal-500/10',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Universal checkout widget with 1-click payment credentials',
      'Recurring billing, prorated subscriptions & dunning management',
      'AI-powered fraud risk scoring reducing chargebacks by 68%',
      'Direct reconciliation integration with QuickBooks & SAP'
    ],
    stats: { metric: '99.99%', label: 'Uptime Reliability' },
    order: 2,
    isActive: true
  },
  {
    _id: 'prod-3',
    name: 'JAC Pulse CRM',
    slug: 'jac-pulse-crm',
    tagline: 'Omnichannel Client Engagement & Pipeline Intelligence',
    category: 'Growth & CRM',
    badge: 'AI Enabled',
    description: 'Empower your sales and customer success teams with automated lead capture, predictive deal scoring, unified email/WhatsApp sequences, and real-time revenue forecasting.',
    icon: 'BarChart3',
    color: 'from-blue-500/20 to-cyan-500/10',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Automated lead qualification and intelligent routing',
      'Unified inbox connecting WhatsApp, Email, and SMS',
      'Visual drag-and-drop pipeline with stage probability analytics',
      'Automated email nurture sequences and trigger-based tasks'
    ],
    stats: { metric: '3.4x', label: 'Faster Deal Velocity' },
    order: 3,
    isActive: true
  },
  {
    _id: 'prod-4',
    name: 'JAC CloudDesk',
    slug: 'jac-clouddesk',
    tagline: 'Zero-Trust Secure Enterprise Workspace',
    category: 'Cloud Infrastructure',
    badge: 'Zero-Trust',
    description: 'Encrypted document collaboration, digital contract signing, and virtual workspaces built for distributed enterprise teams with end-to-end cryptographic confidentiality.',
    icon: 'Database',
    color: 'from-neutral-800/10 to-neutral-700/5',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    features: [
      'AES-256 military-grade client-side file encryption',
      'Legally binding digital signature workflows',
      'Granular permission expiration and watermark protection',
      'Instant cloud syncing with offline caching'
    ],
    stats: { metric: '100%', label: 'Compliance Audit Pass' },
    order: 4,
    isActive: true
  }
];

let otherServices = [
  {
    _id: 'os-1',
    title: 'Cloud Architecture & DevOps',
    slug: 'cloud-devops',
    category: 'Infrastructure',
    badge: '99.99% SLA',
    icon: 'Cloud',
    tagline: 'High-availability cloud migrations, automated CI/CD pipelines & container orchestration.',
    description: 'We design and manage resilient cloud infrastructure across AWS, Google Cloud, and Microsoft Azure. Our engineers implement automated zero-downtime deployment workflows, auto-scaling clusters, and cost-optimized serverless architectures.',
    deliverables: [
      'Multi-cloud architecture design & migration roadmap',
      'Docker containerization & Kubernetes (EKS/GKE) orchestration',
      'Automated CI/CD deployment pipelines (GitHub Actions, GitLab)',
      'Infrastructure as Code (Terraform, Ansible & Pulumi)',
      'Cloud spend audit & automated resource optimization'
    ],
    techStack: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
    order: 1,
    isActive: true
  },
  {
    _id: 'os-2',
    title: 'AI & Intelligent Automation',
    slug: 'ai-machine-learning',
    category: 'Next-Gen Tech',
    badge: 'AI Enabled',
    icon: 'Cpu',
    tagline: 'Custom LLM agents, predictive data pipelines & business process automation.',
    description: 'Transform manual enterprise workflows into lightning-fast automated systems. From conversational AI copilots and semantic document extraction to custom machine learning models for customer churn and demand forecasting.',
    deliverables: [
      'Private enterprise LLM integration & vector search (RAG)',
      'Custom conversational support agents & WhatsApp AI bots',
      'Intelligent document parsing & automated OCR pipelines',
      'Predictive customer analytics & recommendation engines',
      'API connectors connecting AI models to legacy databases'
    ],
    techStack: ['OpenAI / Claude', 'LangChain', 'Python', 'PyTorch', 'Pinecone', 'FastAPI'],
    order: 2,
    isActive: true
  },
  {
    _id: 'os-3',
    title: 'Cybersecurity & Compliance Auditing',
    slug: 'cybersecurity-compliance',
    category: 'Security',
    badge: 'Zero-Trust',
    icon: 'ShieldCheck',
    tagline: 'Vulnerability assessments, penetration testing & compliance readiness.',
    description: 'Safeguard your digital assets against evolving threats. We conduct deep code security audits, ethical penetration testing, zero-trust network configurations, and compliance preparation for SOC 2, ISO 27001, and GDPR.',
    deliverables: [
      'Full-stack source code vulnerability & dependency analysis',
      'Web application & API penetration testing (OWASP Top 10)',
      'Zero-trust access policy & multi-factor authentication setup',
      'Automated daily offsite cryptographic backup systems',
      'Regulatory compliance audit (SOC2, GDPR, HIPAA ready)'
    ],
    techStack: ['OWASP ZAP', 'Burp Suite', 'Cloudflare WAF', 'AWS GuardDuty', 'SonarQube'],
    order: 3,
    isActive: true
  },
  {
    _id: 'os-4',
    title: 'API Engineering & Legacy Modernization',
    slug: 'api-legacy-modernization',
    category: 'Enterprise Engineering',
    badge: 'Mission-Critical',
    icon: 'Server',
    tagline: 'Refactoring monolithic legacy systems into agile, high-throughput microservices.',
    description: 'Eliminate technical debt and bottlenecks without disrupting active business operations. We incrementally decouple legacy monoliths into modular services, build high-concurrency API gateways, and integrate disparate third-party enterprise tools.',
    deliverables: [
      'Monolith-to-microservice migration & strangler fig strategy',
      'High-throughput RESTful and GraphQL API gateways',
      'Real-time event streaming architectures with Apache Kafka / RabbitMQ',
      'Legacy database migrations (SQL Server / Oracle to PostgreSQL)',
      'Comprehensive OpenAPI documentation and developer SDKs'
    ],
    techStack: ['Node.js', 'Go', 'GraphQL', 'Kafka', 'Redis', 'PostgreSQL'],
    order: 4,
    isActive: true
  },
  {
    _id: 'os-5',
    title: 'Quality Assurance & Automated Testing',
    slug: 'qa-test-automation',
    category: 'Software Quality',
    badge: 'Zero Regression',
    icon: 'TestTube2',
    tagline: 'End-to-end automated regression testing, load testing & cross-browser validation.',
    description: 'Guarantee bug-free releases with automated QA pipelines. We write comprehensive integration, unit, and end-to-end test suites that run on every pull request, preventing regressions and validating peak traffic capacity.',
    deliverables: [
      'Automated end-to-end testing with Cypress & Playwright',
      'High-concurrency load & stress testing (K6 / JMeter)',
      'Cross-device mobile test automation on real hardware',
      'Security regression suites & API contract testing'
    ],
    techStack: ['Playwright', 'Cypress', 'Jest', 'K6', 'Postman', 'Selenium'],
    order: 5,
    isActive: true
  },
  {
    _id: 'os-6',
    title: '24/7 Managed SRE & DevOps Support',
    slug: 'managed-sre-support',
    category: 'Operations',
    badge: '15-min SLA',
    icon: 'Headphones',
    tagline: 'Around-the-clock uptime monitoring, incident response & proactive infrastructure maintenance.',
    description: 'Protect your revenue with dedicated Site Reliability Engineers monitoring your production servers 24/7/365. Rapid triage, automatic failover configurations, database health checks, and routine security patching.',
    deliverables: [
      '24/7/365 automated infrastructure uptime & APM monitoring',
      'Guaranteed 15-minute emergency incident response SLA',
      'Weekly automated security patching & vulnerability remediation',
      'Monthly capacity planning, database indexing & latency audits'
    ],
    techStack: ['Datadog', 'Prometheus', 'Grafana', 'PagerDuty', 'CloudWatch'],
    order: 6,
    isActive: true
  }
];

let teamMembers = [
  {
    _id: 'team-1',
    name: 'Anand Jayaraj',
    role: 'Founder & Managing Director',
    expertise: 'Strategic Vision & Enterprise Tech',
    bio: '12+ years directing high-impact digital transformations for fast-scaling global brands.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    order: 1,
    isActive: true
  },
  {
    _id: 'team-2',
    name: 'Dharani Kumar',
    role: 'Head of Engineering & Architecture',
    expertise: 'Full-Stack Systems & Cloud DevOps',
    bio: 'Spearheading robust backend pipelines, microservices, and modern JavaScript architectures.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    order: 2,
    isActive: true
  },
  {
    _id: 'team-3',
    name: 'Priya Sundaram',
    role: 'Lead UI/UX & Creative Director',
    expertise: 'Design Systems & Brand Identity',
    bio: 'Award-winning designer crafting editorial typography, tactile UI motion, and brand experiences.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    order: 3,
    isActive: true
  },
  {
    _id: 'team-4',
    name: 'Karthik Ranganathan',
    role: 'Principal Mobile Architect',
    expertise: 'Flutter, React Native & iOS',
    bio: 'Architecting ultra-responsive mobile applications servicing hundreds of thousands of active users.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    order: 4,
    isActive: true
  },
  {
    _id: 'team-5',
    name: 'Sneha Balaji',
    role: 'Senior Creative Technologist',
    expertise: 'Interactive Animation & Frontend',
    bio: 'Specialist in smooth micro-interactions, GSAP motion choreography, and high-performance rendering.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    order: 5,
    isActive: true
  },
  {
    _id: 'team-6',
    name: 'Arun Prasath',
    role: 'Cloud Infrastructure & Security Lead',
    expertise: 'AWS, Kubernetes & Cyber Security',
    bio: 'Ensuring bank-grade encryption, automated CI/CD pipelines, and 99.99% high availability.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    order: 6,
    isActive: true
  }
];

let careers = [
  {
    _id: 'job-1',
    title: 'Senior Full-Stack Engineer',
    slug: 'senior-full-stack-engineer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Chennai / Coimbatore / Remote',
    experience: '4 - 7 Years',
    salary: '₹14L - ₹24L PA + Equity',
    description: 'We are seeking a seasoned Full-Stack Engineer to architect and build high-performance web applications using React, Next.js, Node.js, and PostgreSQL.',
    responsibilities: [
      'Architect robust backend services and resilient microservices in Node.js',
      'Engineer lightning-fast client interfaces with Next.js App Router and Tailwind CSS',
      'Optimize database queries and Core Web Vitals for high-traffic platforms',
      'Mentor junior engineers through code reviews and technical design documents'
    ],
    requirements: [
      'Strong proficiency in TypeScript, React, Next.js, and Node.js',
      'Hands-on experience with PostgreSQL, Prisma/TypeORM, and Redis caching',
      'Solid grasp of REST, GraphQL, Docker, and AWS/Vercel cloud deployments',
      'Passionate about software craft, clean architecture, and sub-second page performance'
    ],
    order: 1,
    isActive: true
  },
  {
    _id: 'job-2',
    title: 'Lead UI/UX & Motion Designer',
    slug: 'lead-uiux-motion-designer',
    department: 'Design',
    type: 'Full-time',
    location: 'Coimbatore / Remote',
    experience: '3 - 6 Years',
    salary: '₹12L - ₹20L PA',
    description: 'Lead the visual design, tactile micro-interactions, and design systems for enterprise web portals and consumer-facing mobile products.',
    responsibilities: [
      'Craft end-to-end user journeys, wireframes, and high-fidelity Figma prototypes',
      'Define component libraries, typography tokens, and design systems',
      'Collaborate closely with frontend engineers to ensure 100% design fidelity',
      'Design micro-animations and motion choreography for web & mobile'
    ],
    requirements: [
      'Exceptional portfolio showcasing web app & mobile interface designs',
      'Deep mastery of Figma, auto-layout, design tokens, and components',
      'Understanding of HTML/CSS constraints and Framer/GSAP motion capabilities',
      'Strong communication skills to articulate design decisions to clients'
    ],
    order: 2,
    isActive: true
  },
  {
    _id: 'job-3',
    title: 'Mobile Application Developer (Flutter & React Native)',
    slug: 'mobile-app-developer',
    department: 'Mobile Engineering',
    type: 'Full-time',
    location: 'Chennai / Remote',
    experience: '2 - 5 Years',
    salary: '₹10L - ₹18L PA',
    description: 'Build native-grade cross-platform applications for iOS and Android with buttery-smooth 60fps animations and resilient offline sync.',
    responsibilities: [
      'Develop scalable, maintainable mobile apps in Flutter and React Native',
      'Integrate REST/GraphQL APIs, WebSocket telemetry, and push notifications',
      'Manage app store publishing, TestFlight distribution, and CI/CD releases',
      'Troubleshoot device-specific performance bottlenecks and memory leaks'
    ],
    requirements: [
      'Proven experience shipping production apps to App Store and Google Play',
      'Proficiency in Flutter/Dart or React Native/TypeScript',
      'Knowledge of state management (Bloc, Provider, Redux, Zustand)',
      'Familiarity with native iOS (Swift) or Android (Kotlin) bridging is a plus'
    ],
    order: 3,
    isActive: true
  },
  {
    _id: 'job-4',
    title: 'Cloud DevOps & Infrastructure Engineer',
    slug: 'cloud-devops-engineer',
    department: 'Cloud & Infrastructure',
    type: 'Full-time',
    location: 'Remote (India)',
    experience: '3 - 6 Years',
    salary: '₹12L - ₹22L PA',
    description: 'Architect, automate, and maintain resilient cloud environments across AWS and GCP, ensuring 99.99% uptime, zero-trust security, and automated CI/CD.',
    responsibilities: [
      'Build and maintain automated CI/CD pipelines via GitHub Actions and GitLab CI',
      'Manage Kubernetes clusters (EKS/GKE), Docker images, and Helm charts',
      'Implement Infrastructure as Code with Terraform and Ansible',
      'Configure APM monitoring, log aggregation, and automated alerting systems'
    ],
    requirements: [
      'Hands-on experience with AWS services (EC2, ECS, EKS, RDS, S3, CloudFront)',
      'Expertise in Docker containerization and Kubernetes orchestration',
      'Strong scripting skills in Bash and Python',
      'Experience managing production databases and zero-downtime blue/green deployments'
    ],
    order: 4,
    isActive: true
  }
];

let perks = [
  {
    _id: 'perk-1',
    icon: 'Laptop',
    title: 'Top-Tier Hardware',
    desc: 'Latest MacBook Pros, 4K external displays, and premium software licenses chosen by you.'
  },
  {
    _id: 'perk-2',
    icon: 'HeartHandshake',
    title: 'Work-Life Balance',
    desc: 'Flexible hybrid hours between our Coimbatore & Chennai hubs, or 100% remote for select roles.'
  },
  {
    _id: 'perk-3',
    icon: 'GraduationCap',
    title: 'Growth & Learning Budget',
    desc: 'Annual allowances for books, engineering certifications, tech conferences, and workshops.'
  },
  {
    _id: 'perk-4',
    icon: 'Smile',
    title: 'Comprehensive Health & Wellness',
    desc: 'Premium health insurance for you and your dependents, plus generous paid time off.'
  }
];

let programs = [
  {
    _id: 'prog-1',
    id: 'incubation',
    slug: 'incubation',
    tag: 'ENTERPRISE & STARTUPS',
    badge: 'Co-Innovation Lab',
    title: 'Enterprise Tech Incubation & Co-Innovation Lab',
    subtitle: 'Co-building high-velocity MVPs, scalable architectures, and production-ready AI systems alongside JAC MediaLand engineering leadership.',
    summary: 'Co-build mission-critical MVPs, generative AI workflows, and cloud-native digital infrastructure alongside JAC MediaLand senior engineers and principal architects.',
    duration: '12 – 24 Weeks',
    format: 'Hybrid / Dedicated Engineering Pods',
    commitment: 'Full-time / Sprint-based',
    targetAudience: 'High-Growth Startups, Enterprise Labs & Corporate Spin-offs',
    location: 'Bangalore & Chennai Tech Labs / Remote Hybrid',
    overview: 'The Enterprise Tech Incubation & Co-Innovation Lab is built for founders, corporate venture teams, and technology executives who need to bring complex software products to market with zero compromise on engineering rigor. Unlike standard incubators that offer theoretical advice, JAC MediaLand embeds battle-tested senior engineers, cloud architects, and UI/UX designers directly into your project squad.',
    highlights: [
      'Rapid prototype-to-production sprint cycles with 2-week ship cadences',
      'Direct architecture advisory with senior CTOs & cloud principal engineers',
      'Full CI/CD, AWS/GCP cloud setup, Docker/K8s infrastructure, and enterprise security audit',
      'Fractional tech leadership and IP ownership guaranteed to your enterprise'
    ],
    curriculum: [
      {
        phase: 'Phase 01',
        title: 'Architectural Blueprint & MVP Scoping',
        weeks: 'Weeks 1 – 4',
        description: 'System design, domain modeling, technical feasibility benchmarks, UI/UX design sprints, and database entity architecture.'
      },
      {
        phase: 'Phase 02',
        title: 'Core Development & Microservices Pods',
        weeks: 'Weeks 5 – 14',
        description: 'High-throughput API development, event-driven architecture, reactive frontends (Next.js/React), and third-party API orchestrations.'
      },
      {
        phase: 'Phase 03',
        title: 'Cloud DevOps, Hardening & Security Audit',
        weeks: 'Weeks 15 – 18',
        description: 'Automated CI/CD pipelines, penetration testing, load stress testing, GDPR/HIPAA compliance posture, and disaster recovery setups.'
      },
      {
        phase: 'Phase 04',
        title: 'Production Launch & Handover / Support',
        weeks: 'Weeks 19 – 24',
        description: 'Live traffic routing, observability (Datadog/Prometheus), technical documentation, and knowledge transfer to internal engineering leads.'
      }
    ],
    deliverables: [
      'Complete production-ready codebase with full source code IP ownership',
      'Fully automated CI/CD pipelines on AWS / Google Cloud Platform',
      'Comprehensive architecture diagrams & API documentation',
      '30-day post-launch warranty with on-call SLA support'
    ],
    eligibility: [
      'Funded seed to Series B tech startups OR established enterprise innovation departments',
      'Defined product vision or validated prototype ready for production scale',
      'Dedicated stakeholder or product owner available for weekly syncs'
    ],
    faqs: [
      {
        question: 'Who owns the intellectual property (IP)?',
        answer: 'You retain 100% intellectual property rights and codebase ownership from day one. JAC MediaLand operates strictly under enterprise non-disclosure agreements (NDAs).'
      },
      {
        question: 'How do you handle team collaboration?',
        answer: 'We integrate with your Slack, Jira/Linear, and GitHub environments. You get direct daily contact with your dedicated tech lead and engineers.'
      }
    ],
    order: 1,
    isActive: true
  },
  {
    _id: 'prog-2',
    id: 'fullstack',
    slug: 'fullstack',
    tag: 'TALENT & UPSKILLING',
    badge: 'Apprenticeship Cohort',
    title: 'Full-Stack & Cloud Engineering Immersion',
    subtitle: 'An intensive, hands-on apprenticeship designed to transform ambitious software developers into elite full-stack system builders.',
    summary: 'An intensive hands-on apprenticeship bridging theory with real enterprise codebases. Master React, Node.js, distributed databases, cloud architecture, and modern DevOps pipelines.',
    duration: '16 Weeks Intensive',
    format: 'Live Immersive Sprints',
    commitment: '20 hrs/week (Evening & Weekend cohorts available)',
    targetAudience: 'Junior to Mid-level Developers & Lateral Career Switchers',
    location: 'Virtual Classroom + JAC MediaLand Tech Hub Labs',
    overview: 'Standard bootcamps build toy apps. The JAC MediaLand Full-Stack & Cloud Immersion Program drops you straight into actual production-grade paradigms. You will write code with strict TypeScript guidelines, implement distributed message queues, optimize database indices, configure container clusters, and write end-to-end tests under 1-on-1 code reviews from senior engineers.',
    highlights: [
      'Production codebase contribution under 1-on-1 tech lead review',
      'Microservices, containerization (Docker/K8s) & serverless focus',
      'Direct hiring pipeline into JAC MediaLand and client network',
      'Comprehensive portfolio of 3 enterprise-tier shipped systems'
    ],
    curriculum: [
      {
        phase: 'Module 01',
        title: 'Modern Frontend Architecture & System Performance',
        weeks: 'Weeks 1 – 4',
        description: 'Deep dive into React 19, Next.js App Router, SSR/SSG caching strategies, state management, and accessible UI systems.'
      },
      {
        phase: 'Module 02',
        title: 'Backend Scalability, Microservices & Databases',
        weeks: 'Weeks 5 – 8',
        description: 'Node.js/Express, Go or Python services, PostgreSQL schema optimization, MongoDB, Redis caching, and RabbitMQ/Kafka streaming.'
      },
      {
        phase: 'Module 03',
        title: 'Cloud Infrastructure, Containers & DevOps',
        weeks: 'Weeks 9 – 12',
        description: 'Docker multi-stage builds, Kubernetes orchestration, AWS ECS/Lambda, Terraform IaC, and GitHub Actions CI/CD workflows.'
      },
      {
        phase: 'Module 04',
        title: 'Capstone Enterprise Build & Interview Lab',
        weeks: 'Weeks 13 – 16',
        description: 'End-to-end architecture capstone project, system design mock interviews, live defense before industry CTO panels, and portfolio polish.'
      }
    ],
    deliverables: [
      'Verified JAC MediaLand Professional Full-Stack Credential',
      '3 Live production projects hosted with custom domains and CI/CD pipelines',
      'GitHub repository audited for industry clean-code standards',
      'Direct interview referrals to hiring partners and JAC internal open roles'
    ],
    eligibility: [
      'Foundational programming knowledge in JavaScript/Python or computer science degree',
      'Commitment of minimum 15-20 hours per week for live labs and sprints',
      'Passing grade on our online technical logic assessment'
    ],
    faqs: [
      {
        question: 'Are there live mentorship sessions?',
        answer: 'Yes. Every cohort has 3 live interactive sessions per week with senior engineers, plus daily asynchronous code reviews on GitHub and Discord.'
      }
    ],
    order: 2,
    isActive: true
  }
];

let processSteps = [
  {
    _id: 'proc-1',
    step: '01',
    title: 'Discovery & Product Strategy',
    icon: 'Compass',
    summary: 'Deep dive into your business model, target audiences, and technical requirements.',
    details: [
      'Stakeholder interviews and requirement gathering',
      'Competitor landscape and technical feasibility analysis',
      'Information architecture and user persona creation',
      'Sprint roadmap and milestone timeline alignment'
    ],
    order: 1
  },
  {
    _id: 'proc-2',
    step: '02',
    title: 'Human-Centered UI/UX Design',
    icon: 'Layout',
    summary: 'Transforming complex product logic into elegant, intuitive interactive interfaces.',
    details: [
      'Low-fidelity wireframing and user flow diagrams',
      'High-fidelity interactive prototypes in Figma',
      'Design tokens and accessible component systems',
      'Iterative client reviews and usability refinement'
    ],
    order: 2
  },
  {
    _id: 'proc-3',
    step: '03',
    title: 'High-Performance Development',
    icon: 'Code2',
    summary: 'Building fast, clean, and modular codebases using modern frameworks.',
    details: [
      'Component-driven frontend development (React / Next.js / Tailwind)',
      'Robust backend APIs, database modeling, and auth guards',
      'Micro-animations and fluid GSAP/Framer interactions',
      'Sub-second Core Web Vitals optimization'
    ],
    order: 3
  },
  {
    _id: 'proc-4',
    step: '04',
    title: 'Rigorous Testing & QA',
    icon: 'ShieldCheck',
    summary: 'Ensuring absolute stability across devices, screen sizes, and network conditions.',
    details: [
      'End-to-end responsiveness checks across mobile and desktop',
      'Security headers, rate limiting, and input sanitization',
      'Cross-browser compatibility validation',
      'SEO schema markup and accessibility (WCAG) audits'
    ],
    order: 4
  },
  {
    _id: 'proc-5',
    step: '05',
    title: 'Deployment & Growth Scaling',
    icon: 'Rocket',
    summary: 'Flawless production launch with continuous monitoring and proactive maintenance.',
    details: [
      'Zero-downtime production deployment and DNS configuration',
      'Observability dashboards and APM latency monitoring',
      'Search engine indexing submission & Google Analytics tracking',
      'Dedicated post-launch SLA support and ongoing iteration'
    ],
    order: 5
  }
];

let engineeringStandards = [
  {
    _id: 'std-1',
    icon: 'Zap',
    title: 'Sub-Second Page Loads',
    desc: 'Every website and application is engineered to achieve 90+ Lighthouse and Core Web Vitals performance benchmarks.'
  },
  {
    _id: 'std-2',
    icon: 'GitBranch',
    title: 'Clean Git CI/CD Pipelines',
    desc: 'Automated staging deployments, semantic pull requests, and multi-tier code reviews before every production release.'
  },
  {
    _id: 'std-3',
    icon: 'Lock',
    title: 'Security-First Architecture',
    desc: 'Data sanitization, CSRF & XSS protections, secure HTTP-only cookies, and encrypted secrets management.'
  },
  {
    _id: 'std-4',
    icon: 'Cpu',
    title: 'Modular & Reusable Components',
    desc: 'Scalable atomic component architecture that empowers your in-house teams to maintain and extend features smoothly.'
  }
];

let industries = [
  { _id: 'ind-1', title: 'Agriculture', subtitle: 'SOLUTIONS & TECH', icon: 'Wind', order: 1, isActive: true },
  { _id: 'ind-2', title: 'Bank', subtitle: 'SOLUTIONS & TECH', icon: 'DollarSign', order: 2, isActive: true },
  { _id: 'ind-3', title: 'Chemical', subtitle: 'SOLUTIONS & TECH', icon: 'Droplet', order: 3, isActive: true },
  { _id: 'ind-4', title: 'Construction', subtitle: 'SOLUTIONS & TECH', icon: 'Wrench', order: 4, isActive: true },
  { _id: 'ind-5', title: 'Education', subtitle: 'SOLUTIONS & TECH', icon: 'BookOpen', order: 5, isActive: true },
  { _id: 'ind-6', title: 'Health', subtitle: 'SOLUTIONS & TECH', icon: 'Heart', order: 6, isActive: true },
  { _id: 'ind-7', title: 'Insurance', subtitle: 'SOLUTIONS & TECH', icon: 'Shield', order: 7, isActive: true },
  { _id: 'ind-8', title: 'Logistics', subtitle: 'SOLUTIONS & TECH', icon: 'Truck', order: 8, isActive: true },
  { _id: 'ind-9', title: 'Media', subtitle: 'SOLUTIONS & TECH', icon: 'Video', order: 9, isActive: true },
  { _id: 'ind-10', title: 'NGOs', subtitle: 'SOLUTIONS & TECH', icon: 'Users', order: 10, isActive: true },
  { _id: 'ind-11', title: 'Real Estate', subtitle: 'SOLUTIONS & TECH', icon: 'Home', order: 11, isActive: true },
  { _id: 'ind-12', title: 'Retail Business', subtitle: 'SOLUTIONS & TECH', icon: 'ShoppingBag', order: 12, isActive: true },
  { _id: 'ind-13', title: 'Social Network', subtitle: 'SOLUTIONS & TECH', icon: 'Flag', order: 13, isActive: true },
  { _id: 'ind-14', title: 'Space', subtitle: 'SOLUTIONS & TECH', icon: 'Globe', order: 14, isActive: true },
  { _id: 'ind-15', title: 'Sports', subtitle: 'SOLUTIONS & TECH', icon: 'Award', order: 15, isActive: true },
  { _id: 'ind-16', title: 'Tourism', subtitle: 'SOLUTIONS & TECH', icon: 'Map', order: 16, isActive: true }
];

let homeContent = {
  heroTagline: 'Creative Design & Full-Stack IT Solutions Agency',
  heroHeading: 'Innovating Digital Possibilities,',
  heroHeadingItalic: 'Engineering Enterprise Growth.',
  heroDescription: 'From high-performance corporate platforms and native mobile apps to AI integrations and design systems, JAC MediaLand engineers bespoke digital excellence that accelerates your business.',
  primaryCtaText: 'Explore Services',
  primaryCtaLink: '/services',
  secondaryCtaText: 'Schedule Technical Consultation',
  secondaryCtaLink: '/contact',
  storySectionTitle: 'Why JAC MediaLand?',
  storySectionHeading: 'Engineering with purpose, designing with soul.',
  storySectionDescription: 'We bridge visionary design aesthetics with battle-tested software engineering. Our platforms are built from scratch with clean code, sub-second performance, and intuitive user experiences.',
  storyItems: [
    {
      id: 1,
      title: 'Relentless Focus on Craft & Performance',
      content: 'We never use bloated website builders or off-the-shelf templates. Every digital solution is meticulously crafted with modern frontend code, sub-second load times, and custom micro-animations that make your users take notice.',
      stat: '99/100',
      statLabel: 'Average Google PageSpeed'
    },
    {
      id: 2,
      title: 'Full-Stack Technical Capabilities Under One Roof',
      content: 'From complex reactive web applications and mobile apps to brand strategy, conversion-optimized design systems, and cloud infrastructure, our multi-disciplinary team seamlessly connects design with rigorous software engineering.',
      stat: '100%',
      statLabel: 'In-House Delivery'
    },
    {
      id: 3,
      title: 'True Business Partnership, Not Just Vendors',
      content: 'We invest the time to understand your unit economics, user psychology, and market landscape. We don’t just deliver code—we guide technical strategy to help you scale sustainably with high ROI.',
      stat: '98%',
      statLabel: 'Client Retention Rate'
    },
    {
      id: 4,
      title: 'Transparent Collaboration & Rapid Agility',
      content: 'Real-time communication, weekly staging releases, and straightforward roadmaps. You always have full visibility into engineering milestones, code reviews, and launch timelines.',
      stat: '2-4 wks',
      statLabel: 'Rapid MVP Deployment'
    }
  ]
};

let aboutContent = {
  heroEyebrow: 'About JAC MediaLand',
  heroHeading: 'We exist to help ambitious brands',
  heroHeadingItalic: 'dominate the digital world.',
  heroDescription: 'Founded with a vision to merge cutting-edge software engineering with award-winning creative design, JAC MediaLand is a full-service technology agency delivering transformative solutions across India and internationally.',
  missionHeading: 'Our Core Mission',
  missionText: 'To democratize world-class software craft, empower forward-thinking enterprises with scalable technology stacks, and create digital experiences that set new industry benchmarks for performance and aesthetics.',
  visionHeading: 'Our Vision',
  visionText: 'To be the most trusted technology engineering partner for next-generation enterprises globally, known for uncompromising quality, architectural durability, and human-centered design.',
  coreValues: [
    {
      icon: 'Code',
      title: 'Zero Compromise on Craft',
      description: 'We believe clean code is poetry. We refuse shortcuts, templates, or bloated dependencies, building custom software engineered to last for years.'
    },
    {
      icon: 'Sparkles',
      title: 'Design that Moves People',
      description: 'Aesthetics and usability are not afterthoughts. We craft thoughtful micro-interactions, editorial typography, and visual systems that elevate brands.'
    },
    {
      icon: 'Cpu',
      title: 'Modern Architecture',
      description: 'We build with modern frameworks like React, Next.js, Node.js, and cloud microservices to ensure lightning-fast speeds and effortless scalability.'
    },
    {
      icon: 'Shield',
      title: 'Radical Transparency',
      description: 'No technical jargon smoke-screens. We operate as genuine partners with weekly demos, shared code repos, and honest counsel on roadmap trade-offs.'
    }
  ],
  teamStrengths: [
    { title: 'Full-Stack Developers', count: '14+', desc: 'Specializing in React, Next.js, Node.js, Python, PostgreSQL and Cloud' },
    { title: 'Mobile Engineers', count: '6+', desc: 'Native & cross-platform Flutter and React Native specialists' },
    { title: 'UI/UX & Brand Designers', count: '5+', desc: 'Design systems, prototyping, animation, and visual identities' },
    { title: 'SEO & Growth Strategists', count: '4+', desc: 'Technical SEO, search semantics, and multi-channel paid acquisition' }
  ]
};

let legalContent = {
  privacyPolicy: {
    title: 'Privacy Policy',
    lastUpdated: 'January 2026',
    sections: [
      {
        heading: '1. Information We Collect',
        content: 'When you visit JAC MediaLand IT Solutions or submit project inquiries through our contact forms, we may collect personal identifiable details including your name, corporate email address, phone number, and project descriptions.'
      },
      {
        heading: '2. How We Use Your Information',
        content: 'Your contact details are strictly utilized to respond to technical inquiries, generate service proposals, execute nondisclosure agreements, and maintain communications regarding ongoing product development.'
      },
      {
        heading: '3. Data Confidentiality & Non-Disclosure',
        content: 'We treat all client specifications, architecture diagrams, and software requirements with strict confidentiality. JAC MediaLand does not sell, rent, or trade your personal or project data to third-party marketing entities.'
      },
      {
        heading: '4. Security Measures',
        content: 'We employ HTTPS encryption, rate limiting, and secure access protocols to safeguard all submitted data against unauthorized interception or breach.'
      },
      {
        heading: '5. Contact Our Data Controller',
        content: 'For privacy-related inquiries or to request data deletion, contact us at privacy@jacmedialand.com.'
      }
    ]
  },
  termsOfService: {
    title: 'Terms of Service',
    lastUpdated: 'January 2026',
    sections: [
      {
        heading: '1. Agreement to Terms',
        content: 'By accessing or utilizing the services provided by JAC MediaLand IT Solutions, you acknowledge and agree to be bound by these Terms of Service and all applicable laws and regulations.'
      },
      {
        heading: '2. Intellectual Property Rights',
        content: 'Unless otherwise stipulated in a signed Master Services Agreement (MSA), all custom software codebases and deliverables created for clients become the sole intellectual property of the client upon complete settlement of invoices.'
      },
      {
        heading: '3. Service Scope & Revisions',
        content: 'Project timelines, deliverables, sprint goals, and revision cycles are formally defined in individual Statement of Work (SOW) documents agreed between JAC MediaLand and the client.'
      },
      {
        heading: '4. Limitation of Liability',
        content: 'JAC MediaLand shall not be held liable for indirect, incidental, or consequential damages resulting from third-party hosting downtime, API outages, or unauthorized third-party intrusions outside our control.'
      }
    ]
  }
};

let logos = [
  { id: 'logo-1', name: 'Crazy Fun', src: '/Logos/optimized/1.png', order: 1, isActive: true },
  { id: 'logo-2', name: 'Gotfyd', src: '/Logos/optimized/2.png', order: 2, isActive: true },
  { id: 'logo-3', name: "Sophie's Studio", src: '/Logos/optimized/3.png', order: 3, isActive: true },
  { id: 'logo-4', name: "Mama's Coffee", src: '/Logos/optimized/4.png', order: 4, isActive: true },
  { id: 'logo-5', name: 'Rana Studio', src: '/Logos/optimized/5.png', order: 5, isActive: true },
  { id: 'logo-6', name: 'NIIT Technologies', src: '/Logos/optimized/6.png', order: 6, isActive: true },
  { id: 'logo-7', name: 'LevelUp Learning', src: '/Logos/optimized/7.png', order: 7, isActive: true },
  { id: 'logo-8', name: 'JAC Supercars', src: '/Logos/optimized/8.png', order: 8, isActive: true },
  { id: 'logo-9', name: 'Fiverr Pro', src: '/Logos/optimized/9.png', order: 9, isActive: true },
  { id: 'logo-10', name: 'Thejas Boutique', src: '/Logos/optimized/10.png', order: 10, isActive: true },
  { id: 'logo-11', name: 'VVM Traders', src: '/Logos/optimized/11.png', order: 11, isActive: true },
  { id: 'logo-12', name: 'Upwork Global', src: '/Logos/optimized/12.png', order: 12, isActive: true },
  { id: 'logo-13', name: 'Shopify Partners', src: '/Logos/optimized/13.png', order: 13, isActive: true },
  { id: 'logo-14', name: 'Brand Partner 14', src: '/Logos/optimized/14.png', order: 14, isActive: true }
];

module.exports = {
  adminUser,
  services,
  projects,
  enquiries,
  faqs,
  settings,
  products,
  otherServices,
  teamMembers,
  careers,
  perks,
  programs,
  processSteps,
  engineeringStandards,
  industries,
  homeContent,
  aboutContent,
  legalContent,
  logos
};
