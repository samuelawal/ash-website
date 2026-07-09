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
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/#contact" },
    ],
    contactInfo: {
      phone: "+234 1 888 0192",
      email: "info@ashipaelectric.com",
    },
    cta: {
      text: "Get in Touch",
      href: "/#contact",
    },
  },

  hero: {
    slides: [
      {
        tagline: "MINI-GRIDS & ECONOMIC DEVELOPMENT",
        title: "Energy Access That Creates Real Economic Opportunity",
        description: "Deploying intelligent, utility-grade mini-grid infrastructure to power off-grid communities, driving local entrepreneurship, agricultural value chains, and community resilience.",
        ctaText: "Explore Our Mini-Grids",
        ctaLink: "#projects",
        image: "https://wp.ashipaelectric.com/wp-content/uploads/2023/03/DJI_0888.00_10_10_15.Still010-scaled.jpg",
      },
      {
        tagline: "COMMERCIAL & INDUSTRIAL SOLAR",
        title: "Powering Businesses, Enabling Growth",
        description: "Custom solar PV and lithium battery storage systems that eliminate power outages, lower operating costs by up to 50%, and shrink carbon footprints for African enterprise.",
        ctaText: "See C&I Solutions",
        ctaLink: "#services",
        image: "https://wp.ashipaelectric.com/wp-content/uploads/2026/05/3.png",
      },
      {
        tagline: "SMART ENERGY TOOLS (SOFTWARE)",
        title: "Monitor. Audit. Charge. One Ecosystem.",
        description: "Introducing AshGridX, AshAudit, and SureChargeX — our integrated energy operating system designed for utilities to optimize efficiency, automate billing, and provide live auditing.",
        ctaText: "Discover Software Suite",
        ctaLink: "#services",
        image: "https://wp.ashipaelectric.com/wp-content/uploads/2026/05/4.png",
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
        link: "#contact",
      },
      {
        title: "Consulting Services",
        description: "Expert engineering design, feasibility studies, project advisory, and environmental impact assessments for complex decentralized utility projects.",
        details: ["Project Feasibility & Modelling", "Technical Audits & Optimization", "Regulatory & Policy Advisory"],
        link: "#contact",
      },
      {
        title: "Software Suite",
        description: "AshGridX (smart grid management), AshAudit (live financial & power auditing), and SureChargeX (automated micro-billing) form our custom energy software layer.",
        details: ["AshGridX: Smart grid operations", "AshAudit: Real-time billing & revenue audits", "SureChargeX: Mobile-integrated smart payments"],
        link: "#services",
      },
      {
        title: "Energy Monitoring",
        description: "Deploying high-precision IoT telemetry and remote monitoring systems to deliver live data analytics, uptime reporting, and proactive maintenance.",
        details: ["24/7 Remote Operations Center", "Predictive Failure Detection", "Yield & Degradation Analytics"],
        link: "#services",
      },
    ] as Offering[],
  },

  caseStudy: {
    title: "100kWp Solar Investment. Full ROI in 18 Months.",
    subtitle: "AGRICULTURAL POWER INTEGRATION",
    quote: "Ashipa Electric's solar solution transformed our agricultural operations. We completely eliminated crop damage from unexpected grid outages while cutting our monthly operational power costs by over 45%.",
    author: "Mr. Kelvin Busolo",
    role: "Head Grower",
    company: "Dobi AgriCo Limited",
    image: "https://wp.ashipaelectric.com/wp-content/uploads/2026/05/Mr-Kelvin-Busolo-Head-Grower-Dobi-AgriCo-Limited.jpg",
    metrics: [
      { value: "333.55 MT", label: "CO₂ Emissions Reduced" },
      { value: "90 MT+", label: "Coal Equivalent Saved" },
      { value: "45%+", label: "Operational Cost Savings" },
      { value: "100%", label: "Uptime Achieved" },
    ],
  } as CaseStudy,

  statsBand: {
    bgImage: "https://wp.ashipaelectric.com/wp-content/uploads/2023/03/DJI_0888.00_02_12_11.Still002-scaled-e1778771012867.jpg",
    items: [
      { value: 1.8, suffix: " MWp", text: "Total Installed Solar PV Capacity" },
      { value: 12, suffix: " +", text: "Active Communities & C&I Sites Served" },
      { value: 4150, suffix: " MT", text: "Displaced CO₂e Annually" },
      { value: 25000, suffix: " +", text: "Active Customers Connected" },
    ] as StatItem[],
  },

  whyDistributed: {
    title: "Why Distributed Energy?",
    subtitle: "Centralized grids are failing to power Africa's growth. The future is localized, digitized, and clean.",
    featureImage: "https://wp.ashipaelectric.com/wp-content/uploads/2026/05/N8A2657-scaled.jpg",
    videoUrl: "https://www.youtube.com/embed/SZEflIVnhH8",
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
        capacity: "67.5 kWp Solar + Lithium Storage",
        location: "Bayelsa State, Nigeria",
        tag: "Mini-Grid",
        image: "https://wp.ashipaelectric.com/wp-content/uploads/2026/05/Aguobiri-Minigrid-Project.png",
      },
      {
        title: "Kaida Tsoho Mini-Grid Project",
        capacity: "32.4 kWp Solar + Hybrid Storage",
        location: "Federal Capital Territory, Nigeria",
        tag: "Mini-Grid",
        image: "https://wp.ashipaelectric.com/wp-content/uploads/2026/05/Kaida-Tsoho-Minigrid-Project.png",
      },
      {
        title: "Korokorosei Mini-Grid Project",
        capacity: "115.2 kWp Solar + Utility Storage",
        location: "Bayelsa State, Nigeria",
        tag: "Mini-Grid",
        image: "https://wp.ashipaelectric.com/wp-content/uploads/2026/05/Korokorosei-Minigrid-Project.png",
      },
      {
        title: "NICON Estate Solar Project",
        capacity: "150 kWp Commercial Solar PV",
        location: "Lekki, Lagos, Nigeria",
        tag: "Commercial & Industrial",
        image: "https://wp.ashipaelectric.com/wp-content/uploads/2026/05/NICON-Estate-Solar-Project.png",
      },
    ] as ProjectItem[],
  },

  industries: {
    bgImage: "https://wp.ashipaelectric.com/wp-content/uploads/2026/05/N8A2740-Copy-scaled.jpg",
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
        avatar: "https://wp.ashipaelectric.com/wp-content/uploads/2023/04/Ash-T-Mary.jpg",
      },
      {
        name: "Funmilayo",
        role: "Head Nurse, Local Clinic",
        quote: "Having stable energy is a matter of life and death. Vaccines are kept cold, and deliveries or emergency treatments can go on safely at night. Ashipa Electric has transformed our clinic.",
        avatar: "https://wp.ashipaelectric.com/wp-content/uploads/2023/04/Ash-T-Funmilayo.jpg",
      },
      {
        name: "Ezekiel",
        role: "Agro-Processor Enterprise Owner",
        quote: "Our agricultural processing machines now run non-stop. The cost of solar power is fixed and highly predictable, which allowed us to double our production capacity and hire five more people.",
        avatar: "https://wp.ashipaelectric.com/wp-content/uploads/2023/04/Ash-T-Ezekiel.jpg",
      },
    ] as TestimonialItem[],
  },

  blog: {
    title: "Company Insights & Updates",
    subtitle: "Stay updated on the latest trends in renewable energy financing, software innovation, and mini-grid deployment in Africa.",
    items: [
      {
        title: "Partnering with WeCyclers for Circular Energy Solutions",
        image: "https://wp.ashipaelectric.com/wp-content/uploads/2025/03/IMG-20250123-WA0022.jpg",
        author: "Ashipa Communications",
        date: "June 15, 2026",
        category: "Partnership",
        excerpt: "We are partnering to integrate clean energy into plastic collection hubs, combining recycling with solar power.",
      },
      {
        title: "Unlocking Carbon Credits for Mini-Grid Developers in West Africa",
        image: "https://wp.ashipaelectric.com/wp-content/uploads/2024/03/blog-5.jpg",
        author: "Investment Team",
        date: "May 2, 2026",
        category: "Finance",
        excerpt: "An in-depth look at how digital utilities can leverage decentralized power assets to generate and sell carbon offsets.",
      },
      {
        title: "Financial Auditing for Decentralized Utilities: Introducing AshAudit",
        image: "https://wp.ashipaelectric.com/wp-content/uploads/2024/03/blog-6.jpg",
        author: "Software Dev Division",
        date: "March 18, 2026",
        category: "Software",
        excerpt: "How Ashipa's new software engine delivers unparalleled transparency and real-time revenue audits for energy operators.",
      },
    ] as BlogPostItem[],
  },
  
  newsletter: {
    title: "Get energy insights for decision makers",
    subtitle: "Join leading executives, energy operators, and policymakers who receive our monthly research briefing on African decentralized infrastructure.",
    placeholder: "Enter your professional email",
    cta: "Subscribe Now",
  },

  careers: {
    title: "Build Africa's Energy Future",
    subtitle: "Join a team of engineers, operators, and innovators deploying intelligent decentralized energy infrastructure across the continent.",
    intro: "We're looking for people who want to solve hard problems at the intersection of clean energy, software, and community impact. Each role below links to a dedicated application form.",
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
        id: "senior-electrical-engineer",
        title: "Senior Electrical Engineer",
        department: "Engineering",
        location: "Lagos, Nigeria",
        type: "Full-time",
        posted: "July 2026",
        description: "Lead the design and commissioning of hybrid solar-diesel-battery mini-grids and commercial solar installations across West Africa.",
        responsibilities: [
          "Develop single-line diagrams, load analyses, and protection schemes for decentralized energy systems",
          "Oversee EPC quality during construction and commissioning",
          "Mentor junior engineers and support feasibility studies for new project pipelines",
        ],
        requirements: [
          "B.Eng or M.Eng in Electrical Engineering (power systems focus)",
          "5+ years in solar PV, mini-grid, or C&I energy project delivery",
          "Proficiency with PVsyst, AutoCAD, or equivalent design tools",
        ],
        applicationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeYOOgc2RtxnZLPh8fqamHrO7tB1f6_ML8pjXMp2EcO4-0ICQ/viewform",
      },
      {
        id: "mini-grid-operations-manager",
        title: "Mini-Grid Operations Manager",
        department: "Operations",
        location: "Bayelsa State, Nigeria",
        type: "Full-time",
        posted: "July 2026",
        description: "Manage day-to-day operations of active mini-grid sites, ensuring uptime, revenue collection, and community satisfaction.",
        responsibilities: [
          "Coordinate field technicians and remote monitoring for multiple mini-grid assets",
          "Track KPIs including uptime, collections, and customer growth",
          "Implement preventive maintenance schedules and incident response protocols",
        ],
        requirements: [
          "3+ years in utility operations, mini-grid, or distributed energy management",
          "Strong stakeholder management skills with rural communities",
          "Experience with SCADA, IoT telemetry, or energy billing platforms",
        ],
        applicationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeYOOgc2RtxnZLPh8fqamHrO7tB1f6_ML8pjXMp2EcO4-0ICQ/viewform",
      },
      {
        id: "full-stack-developer",
        title: "Full Stack Developer (Energy Software)",
        department: "Technology",
        location: "Lagos, Nigeria (Hybrid)",
        type: "Full-time",
        posted: "June 2026",
        description: "Build and scale AshGridX, AshAudit, and SureChargeX — the software layer powering Ashipa's intelligent energy ecosystem.",
        responsibilities: [
          "Develop features for grid monitoring, billing automation, and revenue auditing",
          "Integrate IoT device data pipelines and payment gateways",
          "Collaborate with product and field teams to ship reliable, field-tested software",
        ],
        requirements: [
          "3+ years building production web applications (React/Next.js preferred)",
          "Experience with APIs, databases, and cloud infrastructure",
          "Interest in energy, fintech, or IoT domains is a strong plus",
        ],
        applicationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeYOOgc2RtxnZLPh8fqamHrO7tB1f6_ML8pjXMp2EcO4-0ICQ/viewform",
      },
      {
        id: "project-development-associate",
        title: "Project Development Associate",
        department: "Business Development",
        location: "Abuja, Nigeria",
        type: "Full-time",
        posted: "June 2026",
        description: "Support the origination and financial modelling of new mini-grid and C&I solar projects across Nigeria.",
        responsibilities: [
          "Conduct site assessments and prepare pre-feasibility reports",
          "Build financial models for PPAs, lease structures, and grant-funded projects",
          "Coordinate with engineering and legal teams through project close",
        ],
        requirements: [
          "Bachelor's degree in Engineering, Finance, or related field",
          "1–3 years in renewable energy project development or consulting",
          "Strong Excel/financial modelling skills and attention to detail",
        ],
        applicationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeYOOgc2RtxnZLPh8fqamHrO7tB1f6_ML8pjXMp2EcO4-0ICQ/viewform",
      },
    ] as JobPosting[],
  },
  
  footer: {
    tagline: "Energizing Communities, Empowering People.",
    socials: [
      { name: "LinkedIn", href: "#" },
      { name: "Twitter", href: "#" },
      { name: "YouTube", href: "#" },
      { name: "Facebook", href: "#" },
    ],
    links: {
      company: [
        { name: "About Us", href: "/#about" },
        { name: "Our Software", href: "/#services" },
        { name: "Impact Metrics", href: "/#about" },
        { name: "Careers", href: "/careers" },
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
