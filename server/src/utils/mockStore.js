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

module.exports = {
  adminUser,
  services,
  projects,
  enquiries,
  faqs,
  settings
};
