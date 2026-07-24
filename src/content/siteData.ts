export interface HeroSlide {
  tagline: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
}

export interface Offering {
  title: string;
  description: string;
  details: string[];
  link: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface CaseStudy {
  title: string;
  subtitle: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  metrics: Metric[];
}

export interface StatItem {
  value: number;
  suffix: string;
  text: string;
}

export interface ProjectItem {
  title: string;
  capacity: string;
  location: string;
  tag: string;
  image: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface BlogPostItem {
  title: string;
  image: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  posted: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  applicationUrl: string;
}

export interface CareerBenefit {
  title: string;
  description: string;
}

export const siteData = {
  logos: {
    dark: "https://wp.ashipaelectric.com/wp-content/uploads/2026/05/Asset-21-scaled.png",
    white: "https://wp.ashipaelectric.com/wp-content/uploads/2026/05/logo-horizontal-white-text-scaled.png",
  },
  
  navigation: {
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/#about" },
      { name: "Services", href: "/#services" },
      { name: "Projects", href: "/#projects" },
      { name: "Updates", href: "/#updates" },
      { name: "Careers", href: "/#careers" },
      { name: "Contact", href: "/contact" },
    ],
    contactInfo: {
      phones: ["+1 205 202 9490", "+234 703 992 9954"],
      email: "info@ashipaelectric.com",
    },
    cta: {
      text: "Get in Touch",
      href: "/contact",
    },
  },

  contact: {
    title: "Let's build the future of energy together.",
    description:
      "Whether you are looking to develop a community mini-grid, deploy commercial solar, or need engineering and operations support, our team is ready to help.",
    phones: ["+1 205 202 9490", "+234 703 992 9954"],
    email: "info@ashipaelectric.com",
    address: "Victoria Island, Lagos, Nigeria",
    serviceOptions: [
      "Commercial & Industrial Solar",
      "Mini-Grid Operations",
      "Energy Monitoring & Operations",
      "Consulting & Feasibility Studies",
    ],
  },

  hero: {
    slides: [
      {
        tagline: "MINI-GRIDS & ECONOMIC DEVELOPMENT",
        title: "Energy Access That Creates Real Economic Opportunity",
        description: "Deploying intelligent, utility-grade mini-grid infrastructure to power off-grid communities, driving local entrepreneurship, agricultural value chains, and community resilience.",
        ctaText: "Explore Our Mini-Grids",
        ctaLink: "#projects",
        image: "/images/hero-minigrid-aerial.png",
      },
      {
        tagline: "COMMERCIAL & INDUSTRIAL SOLAR",
        title: "Powering Businesses, Enabling Growth",
        description: "Custom solar PV and lithium battery storage systems that eliminate power outages, lower operating costs by up to 50%, and shrink carbon footprints for African enterprise.",
        ctaText: "See C&I Solutions",
        ctaLink: "#services",
        image: "/images/team-technicians-solar.png",
      },
      {
        tagline: "DIGITIZED UTILITY OPERATIONS",
        title: "Reliable Power, Fully Managed",
        description: "Integrated monitoring, billing, and operations support designed for decentralized utilities to optimize efficiency, protect revenue, and serve communities reliably.",
        ctaText: "Explore Our Services",
        ctaLink: "#services",
        image: "/images/hero-community-powered.png",
      },
    ] as HeroSlide[],
  },

  offerings: {
    title: "How We Support Your Energy Transition",
    subtitle: "We design, develop, build, and operate intelligent decentralized energy solutions tailored for African growth.",
    items: [
      {
        title: "Energy Projects",
        description: "End-to-end development of decentralized clean energy systems including hybrid solar-diesel-battery mini-grids and commercial rooftop solar installations.",
        details: ["Engineering, Procurement & Construction (EPC)", "Power Purchase Agreements (PPAs)", "Asset Management & Operations (O&M)"],
        link: "/contact",
      },
      {
        title: "Consulting Services",
        description: "Expert engineering design, feasibility studies, project advisory, and environmental impact assessments for complex decentralized utility projects.",
        details: ["Project Feasibility & Modelling", "Technical Audits & Optimization", "Regulatory & Policy Advisory"],
        link: "/contact",
      },
      {
        title: "Energy Monitoring",
        description: "Deploying high-precision IoT telemetry and remote monitoring systems to deliver live data analytics, uptime reporting, and proactive maintenance.",
        details: ["24/7 Remote Operations Center", "Predictive Failure Detection", "Yield & Degradation Analytics"],
        link: "/#services",
      },
    ] as Offering[],
  },

  caseStudy: {
    title: "95.4 kWp Solar Investment. Full ROI in 18 Months.",
    subtitle: "ACCELERATING AGRICULTURAL POWER SECURITY",
    quote: "Ashipa Electric's solar solution transformed our agricultural operations. We completely eliminated crop damage from unexpected grid outages while cutting our monthly operational power costs by over 45%.",
    author: "Mr. Kelvin Busolo",
    role: "Head Grower",
    company: "Dobi AgriCo Limited",
    image: "/images/case-kelvin-busolo.jpg",
    metrics: [
      { value: "95.4 kWp", label: "Solar PV Capacity" },
      { value: "339.2 MT", label: "CO₂ Emissions Displaced" },
      { value: "45%+", label: "Operational Cost Savings" },
      { value: "18 mo", label: "Full ROI Achieved" },
    ],
  } as CaseStudy,

  statsBand: {
    bgImage: "/images/stats-team-site.png",
    items: [
      { value: 479.4, suffix: " kWp", text: "Total Installed Solar PV Capacity" },
      { value: 120, suffix: "+", text: "Communities Served + Pipeline" },
      { value: 1585.5, suffix: " MT", text: "Displaced CO₂e" },
      { value: 3, suffix: "", text: "Winning Awards" },
    ] as StatItem[],
  },

  whyDistributed: {
    title: "Why Distributed Energy?",
    subtitle: "Centralized grids are failing to power Africa's growth. The future is localized, digitized, and clean.",
    featureImage: "/images/community-ashipa-worker.png",
    videoUrl: "https://www.youtube.com/embed/M_axidrLdhA",
    blocks: [
      {
        title: "Our Mission",
        description: "To build decentralized, intelligent energy infrastructure that fuels economic self-determination across Africa, bridging the energy access gap through high-performance engineering.",
      },
      {
        title: "Our Vision",
        description: "To serve as the technological backbone of Africa's clean energy transition, linking millions of businesses and households to reliable, digitized, and fully auditable power systems.",
      },
    ],
  },

  projects: {
    title: "Featured Projects",
    subtitle: "Engineering solutions delivering measurable impact. Explore our portfolio of active installations across Nigeria.",
    items: [
      {
        title: "Aguobiri Mini-Grid Project",
        capacity: "33 kWp Solar + Lithium Storage",
        location: "Bayelsa State, Nigeria",
        tag: "Mini-Grid",
        image: "/images/project-aguobiri.png",
      },
      {
        title: "Kaida Tsoho Mini-Grid Project",
        capacity: "100 kWp Solar + Hybrid Storage",
        location: "Federal Capital Territory, Nigeria",
        tag: "Mini-Grid",
        image: "/images/project-kaida-tsoho-aerial.jpg",
      },
      {
        title: "Korokorosei Mini-Grid Project",
        capacity: "101 kWp Solar + Utility Storage",
        location: "Bayelsa State, Nigeria",
        tag: "Mini-Grid",
        image: "/images/project-korokorosei.png",
      },
      {
        title: "LATC DOBI Farm",
        capacity: "95.4 kWp Commercial Solar PV",
        location: "Nigeria",
        tag: "Commercial & Industrial",
        image: "/images/project-dobi-farm.png",
      },
    ] as ProjectItem[],
  },

  industries: {
    bgImage: "/images/industries-agro-processing.png",
    title: "Industries We Serve",
    subtitle: "Tailored energy solutions engineered for the specific demands of high-growth sectors.",
    list: [
      { name: "Agro-Processing", desc: "Providing uninterrupted power to cold storage, milling, and irrigation systems." },
      { name: "Manufacturing", desc: "Reducing generator dependence and optimizing peak load costs for industrial factories." },
      { name: "Underserved Communities", desc: "Deploying retail micro-utilities to unlock rural business growth." },
      { name: "Commercial Facilities", desc: "Empowering shopping malls, hotels, and offices with clean, cost-competitive solar." },
      { name: "Public Infrastructure", desc: "Energizing primary healthcare, clean water facilities, and public buildings." },
      { name: "Real Estate & Urban Communities", desc: "Building independent smart-grids for gated estates and modern townships." },
    ],
  },

  testimonials: {
    title: "Empowering People, Transforming Communities",
    subtitle: "Direct feedback from the operators, business owners, and leaders whose livelihoods are powered by Ashipa Electric.",
    items: [
      {
        name: "Mary",
        role: "Community Shop Owner",
        quote: "With 24/7 power from Ashipa's mini-grid, my refrigeration shop can finally run reliably. I've doubled my daily sales and no longer rely on loud, expensive diesel generators that eat into all my profits.",
        avatar: "/images/avatar-mary.jpg",
      },
      {
        name: "Funmilayo",
        role: "Head Nurse, Local Clinic",
        quote: "Having stable energy is a matter of life and death. Vaccines are kept cold, and deliveries or emergency treatments can go on safely at night. Ashipa Electric has transformed our clinic.",
        avatar: "/images/avatar-funmilayo.jpg",
      },
      {
        name: "Ezekiel",
        role: "Agro-Processor Enterprise Owner",
        quote: "Our agricultural processing machines now run non-stop. The cost of solar power is fixed and highly predictable, which allowed us to double our production capacity and hire five more people.",
        avatar: "/images/avatar-ezekiel.jpg",
      },
    ] as TestimonialItem[],
  },

  blog: {
    title: "Company Insights & Updates",
    subtitle: "Stay updated on the latest trends in renewable energy financing, operations innovation, and mini-grid deployment in Africa.",
    items: [
      {
        title: "Partnering with WeCyclers for Circular Energy Solutions",
        image: "/images/blog-wecyclers.jpg",
        author: "Ashipa Communications",
        date: "June 15, 2026",
        category: "Partnership",
        excerpt: "We are partnering to integrate clean energy into plastic collection hubs, combining recycling with solar power.",
      },
      {
        title: "Unlocking Carbon Credits for Mini-Grid Developers in West Africa",
        image: "/images/blog-minigrid-aerial.png",
        author: "Investment Team",
        date: "May 2, 2026",
        category: "Finance",
        excerpt: "An in-depth look at how digital utilities can leverage decentralized power assets to generate and sell carbon offsets.",
      },
      {
        title: "Building Revenue Assurance for Decentralized Utilities",
        image: "/images/team-meeting-solar.png",
        author: "Operations Team",
        date: "March 18, 2026",
        category: "Operations",
        excerpt: "How transparent metering and live operational data help mini-grid developers protect revenue and serve communities reliably.",
      },
    ] as BlogPostItem[],
  },
  
  newsletter: {
    title: "Get energy insights for decision makers",
    subtitle: "Join leading executives, energy operators, and policymakers who receive our monthly research briefing on African decentralized infrastructure.",
    placeholder: "Enter your professional email",
    cta: "Subscribe Now",
  },

  careersPreview: {
    eyebrow: "Join Our Team",
    title: "Contribute to Our Mission",
    subtitle:
      "Help us deploy intelligent decentralized energy infrastructure that powers underserved communities and accelerates Africa's clean energy transition.",
    ctaText: "View Open Roles",
    ctaLink: "/careers",
    highlights: [
      {
        title: "Mission-Driven Impact",
        description: "Work on projects that directly energize communities and enable local economic growth.",
      },
      {
        title: "Learning & Growth",
        description: "Training budget for certifications, conferences, and professional development in energy and technology.",
      },
      {
        title: "Flexible Work",
        description: "Hybrid arrangements and field support where the role allows, across all Nations.",
      },
    ],
  },

  careers: {
    title: "Build Africa's Energy Future",
    subtitle: "Join a team of engineers, operators, and innovators deploying intelligent decentralized energy infrastructure across the continent.",
    intro: "We're looking for people who want to solve hard problems at the intersection of clean energy, operations, and community impact. Each role below links to a dedicated application form.",
    applicationFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeYOOgc2RtxnZLPh8fqamHrO7tB1f6_ML8pjXMp2EcO4-0ICQ/viewform",
    benefits: [
      {
        title: "Competitive Compensation",
        description: "Market-aligned salary with performance bonuses tied to project delivery and company growth.",
      },
      {
        title: "Health & Wellness",
        description: "Comprehensive health insurance and wellness support for you and your dependents.",
      },
      {
        title: "Flexible Work",
        description: "Hybrid arrangements and flexible scheduling where the role allows, with support for field and remote teams.",
      },
      {
        title: "Learning & Growth",
        description: "Annual training budget for certifications, conferences, and professional development in energy and technology.",
      },
      {
        title: "Paid Time Off",
        description: "Generous leave policy including annual leave, public holidays, and parental leave.",
      },
      {
        title: "Mission-Driven Impact",
        description: "Work on projects that directly power underserved communities and accelerate Africa's clean energy transition.",
      },
    ] as CareerBenefit[],
    items: [
      {
        id: "fundraising-investor-relations-manager",
        title: "Fundraising & Investor Relations Manager",
        department: "Finance & Strategy",
        location: "Abuja / Lagos, Nigeria",
        type: "Full-time",
        posted: "July 2026",
        description: "Lead capital-raising activities, manage investor relationships, secure grants and financing facilities, and structure project finance transactions to support Ashipa Electric's growth across mini-grids and C&I solar.",
        responsibilities: [
          "Develop and execute fundraising strategies across equity, debt, grant, and blended finance instruments",
          "Build and sustain relationships with DFIs, private equity, commercial lenders, and grant providers",
          "Develop project finance models and support bankability assessments for mini-grid and C&I projects",
          "Coordinate due diligence, data rooms, and transaction closing through to successful completion",
        ],
        requirements: [
          "Bachelor's degree in Finance, Economics, Engineering, Business, or related discipline",
          "7+ years in project finance, investment banking, infrastructure finance, corporate finance, or fundraising",
          "Demonstrated track record of raising capital — equity, debt, or grants",
          "Strong financial modelling skills and an existing network in the DFI, impact investment, or African energy finance ecosystem",
        ],
        applicationUrl: "https://forms.gle/oLmZw2C7x8TzuVKK9",
      },
      {
        id: "senior-product-manager",
        title: "Senior Product Manager",
        department: "Product & Technology",
        location: "Abuja / Lagos, Nigeria",
        type: "Full-time",
        posted: "July 2026",
        description: "Own the full product lifecycle across Ashipa Electric's digital utility platforms — spanning energy management, metering, token vending, EV charging, and load audit — bridging technical complexity and business strategy.",
        responsibilities: [
          "Define and communicate a 12-to-36-month unified product roadmap across Energy Management, EV Charging, Metering, and Load Audit platforms",
          "Own end-to-end product delivery from ideation through design, build, testing, and launch",
          "Oversee post-launch platform stability, triage escalations, and close feedback loops with Engineering",
          "Serve as the primary interface for utilities, regulators, enterprise clients, and OEM partners",
        ],
        requirements: [
          "6+ years in Product Management with technical software products integrated with hardware or complex data systems",
          "Proven ability to manage complex timelines, mitigate risks, and lead resource planning across concurrent workstreams",
          "Ability to partner with Engineering on API design and data architecture while building business cases and ROI analyses",
          "Interest or experience in EV infrastructure, metering, DERMS, or related digital utility domains is advantageous",
        ],
        applicationUrl: "https://forms.gle/nWsKt6x2abGWdfGm9",
      },
      {
        id: "customer-liaison-officer",
        title: "Customer Liaison Officer (CLO)",
        department: "Technical Operations / Commercial",
        location: "Bayelsa, Nigeria",
        type: "Full-time",
        posted: "July 2026",
        description: "Manage and optimize Distribution Transformers within assigned clusters — focusing on meter validation, energy accounting, customer engagement, revenue protection, and regulatory compliance.",
        responsibilities: [
          "Validate metering assets and customers connected to assigned DTs; oversee meter health, accuracy, and tamper prevention",
          "Carry out disconnection/reconnection and supervise field technicians and contractors within DT clusters",
          "Detect and report energy theft, illegal connections, and meter tampering; minimize technical and commercial losses",
          "Prepare reports on DT performance, collection rates, and validation activities; enforce safety and regulatory compliance",
        ],
        requirements: [
          "Minimum of HND in Electrical Engineering, Mechanical Engineering, or related field",
          "Experience in meter management, customer validation, and energy loss reduction",
          "Good understanding of Nigeria's electricity distribution landscape and regulations (including MYTO)",
          "Strong analytical skills, Excel proficiency, and familiarity with mobile data collection applications",
        ],
        applicationUrl: "https://forms.gle/NQWCifGAaQgwr5G18",
      },
      {
        id: "finance-accounting-associate",
        title: "Finance & Accounting Associate",
        department: "Finance & Operations",
        location: "Abuja / Lagos, Nigeria",
        type: "Full-time",
        posted: "July 2026",
        description: "Maintain accurate financial records and support reporting, budgeting, compliance, cash flow monitoring, and audit readiness — serving as the operational backbone of the finance function.",
        responsibilities: [
          "Maintain day-to-day accounting records, process AP/AR, prepare bank reconciliations, and support payroll",
          "Prepare monthly, quarterly, and annual financial statements, management accounts, and board reports",
          "Support budgeting, variance analysis, cash flow forecasts, and treasury planning",
          "Support statutory filings, external audits, fundraising trackers, and investor/lender reporting",
        ],
        requirements: [
          "Bachelor's degree in Accounting, Finance, Economics, or a related field",
          "ICAN, ACCA, or ACA certification — qualified or in progress preferred",
          "2–4 years of relevant experience in a finance or accounting role",
          "Strong knowledge of accounting principles and proficiency in accounting software and MS Excel",
        ],
        applicationUrl: "https://forms.gle/sPvTY9BHfehHExi87",
      },
      {
        id: "ehs-officer",
        title: "Environmental, Health & Social (EHS) Officer",
        department: "Operations",
        location: "Project sites / Mini-grid communities (travel across operating regions)",
        type: "Full-time",
        posted: "July 2026",
        description:
          "Support the implementation and day-to-day operation of Ashipa Electric's Environmental and Social Management System (ESMS) across mini-grid projects. Ensure compliance with the company's E&S Policy, national regulations, and lender/investor standards throughout site selection, design, construction, and operation — identifying, avoiding, and managing environmental and social risks while maintaining transparent relationships with host communities. Reports to the Technical Operations Manager.",
        responsibilities: [
          "Maintain and update the company ESMS manual, legal register, training matrix, and E&S documentation; ensure all projects follow ESMS procedures and drive continual improvement",
          "Track E&S KPIs and present monthly E&S performance dashboards to management",
          "Screen candidate sites against the Exclusion List, complete Initial E&S Screening Checklists, and categorize sites as Category I (High-Risk) or Category II (Low-Risk)",
          "Apply VLD Guidelines for land donations and support fair, transparent land acquisition",
          "Coordinate required studies by category: ESIA, ESMP, RAP and/or LRP for Category I; ESMP for Category II",
          "Develop and implement Stakeholder Engagement Plans and Grievance Redress Mechanisms (GRM) for all projects",
          "Ensure E&S risks for gender, vulnerable groups, and SEA/GBV are identified and mitigated",
          "Track and secure environmental/social clearances and permits from REA, NESREA, and state MDAs before construction",
          "Maintain GRM register; ensure grievances are logged, investigated, and closed within agreed timelines",
          "Support monthly community engagement and feedback sessions; promote gender inclusion and protection of vulnerable persons",
          "Prepare periodic E&S and HSE compliance reports for REA, lenders, investors, and internal management",
          "Maintain records of trainings, audits, inspections, permits, and non-conformances",
        ],
        requirements: [
          "Bachelor's degree in Environmental Science, Environmental Management, Social Science, Occupational Health & Safety, Engineering, or related field",
          "2–4 years' experience in EHS or community relations roles, ideally in energy or infrastructure",
          "Familiarity with lender E&S standards (e.g., IFC Performance Standards) and national regulations is an advantage",
          "Strong grasp of E&S risk management, stakeholder engagement, and grievance handling",
          "Good report-writing, record-keeping, and independent field-based work skills; willingness to travel to remote sites",
          "Frequent travel to mini-grid project sites, including rural communities; close coordination with contractors, communities, regulators (REA), and lenders/investors",
        ],
        applicationUrl: "https://forms.gle/YRukTRWXRYcTKLp89",
      },
    ] as JobPosting[],
  },
  
  footer: {
    tagline: "Energizing Communities, Empowering People",
    socials: [
      { name: "LinkedIn", href: "#" },
      { name: "Twitter", href: "#" },
      { name: "YouTube", href: "https://www.youtube.com/@ashipaelectric391" },
      { name: "Facebook", href: "#" },
    ],
    links: {
      company: [
        { name: "About Us", href: "/#about" },
        { name: "Our Services", href: "/#services" },
        { name: "Impact Metrics", href: "/#about" },
        { name: "Careers", href: "/#careers" },
      ],
      services: [
        { name: "Mini-Grid Operations", href: "/#projects" },
        { name: "Commercial & Industrial Solar", href: "/#services" },
        { name: "Project Development & EPC", href: "/#services" },
        { name: "Telemetry & IoT Audits", href: "/#services" },
      ],
    },
  },
};
