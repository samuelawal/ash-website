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

export interface EnvironmentItem {
  name: string;
  description: string;
  image: string;
  /** Which of the three logo colours frames this card. */
  accent: "purple" | "green" | "red";
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

export interface ComplianceItem {
  title: string;
  description: string;
  /**
   * Only `verified` items render on the public site.
   *
   * A regulatory or certification claim on a page that DFIs, lenders, and NERC
   * read is a claim the company has to be able to evidence on request. Items
   * are seeded as `unconfirmed` and must be checked against the actual
   * certificate or permit — with its number and expiry — before being flipped.
   * The unconfirmed entries stay in this file as the outstanding checklist.
   */
  status: "verified" | "unconfirmed";
  /** Optional registration or permit number, shown when present. */
  reference?: string;
}

export interface ChargerType {
  name: string;
  power: string;
  connector: string;
  chargeTime: string;
  bestFor: string;
}

export interface EvUseCase {
  title: string;
  description: string;
}

export interface MonitoringMetric {
  label: string;
  value: string;
  /** Drives the colour of the status pip on the demo dashboard. */
  state: "healthy" | "watch" | "fault";
  detail: string;
}

export interface MonitoringSite {
  name: string;
  state: string;
  capacity: string;
  uptime: string;
  /** Percentage of the site's capacity currently being drawn. */
  load: number;
  status: "online" | "degraded" | "maintenance";
}

/** One hourly reading on the demo generation chart. */
export interface GenerationPoint {
  hour: number;
  kw: number;
}

export interface NavLink {
  name: string;
  href: string;
  /** Renders as a dropdown on desktop and an indented group in the mobile menu. */
  children?: NavLink[];
}

export interface PartnerItem {
  name: string;
  /**
   * What the relationship actually is — avoids implying endorsement. Entries
   * sharing a category are grouped under it, in first-appearance order.
   */
  category: string;
  /** Path under /public. Falls back to a wordmark tile when absent. */
  logo?: string;
  /**
   * Set for a logo supplied as light artwork on transparency, which would be
   * invisible on the default white tile. Gives that tile a dark backing.
   * Prefer replacing the asset with a light-background version.
   */
  onDark?: boolean;
}

export interface ResourceItem {
  title: string;
  description: string;
  /** `request` items open the enquiry form; `download` items need a real file. */
  kind: "request" | "download";
  requestType?: string;
  file?: string;
}

export const siteData = {
  /**
   * Served from /public, not from the WordPress site.
   *
   * wp.ashipaelectric.com sits behind SiteGround's bot protection, which
   * answers server-side requests with an HTML captcha challenge rather than the
   * file. Next's image optimiser fetches the URL, gets `text/html`, and fails
   * the whole request — which took the header and footer logo down on every
   * page. A local asset has no such dependency.
   */
  logos: {
    /** Dark wordmark — for light backgrounds. */
    dark: "/brand/ashipa-logo-dark.png",
    /** White wordmark — for the dark header and footer. */
    white: "/brand/ashipa-logo-white.png",
  },
  
  navigation: {
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/#about" },
      {
        // The service lines that have their own page hang off here rather than
        // adding six more items to a nav that already runs to seven.
        name: "Services",
        href: "/#services",
        children: [
          { name: "All Capabilities", href: "/#services" },
          { name: "EV Charging", href: "/ev-charging" },
          // MONITORING DISABLED
          // { name: "Remote Monitoring", href: "/monitoring" },
          { name: "Governance & Compliance", href: "/compliance" },
          { name: "Technical Resources", href: "/resources" },
        ],
      },
      { name: "Projects", href: "/#projects" },
      { name: "Insights", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ] as NavLink[],
    contactInfo: {
      phones: ["+1 205 202 9490", "+234 703 992 9954"],
      email: "careers@ashipaelectric.com",
    },
    cta: {
      text: "Get in Touch",
      href: "/contact",
    },
  },

  contact: {
    title: "Let's build the future of energy together.",
    description:
      "Whether you are developing a distributed energy system, deploying commercial and industrial solar, or need engineering and operations support at utility scale, our team is ready to help.",
    phones: ["+1 205 202 9490", "+234 703 992 9954"],
    email: "info@ashipaelectric.com",
    /**
     * The Lagos and US offices are as they appear on the company letterhead.
     *
     * Abuja is deliberately NOT: the letterhead still lists the old Garki Area 2
     * address, and the Asokoro address below supersedes it. Do not "correct" it
     * back from the letterhead.
     */
    offices: [
      {
        label: "Lagos",
        lines: ["30, Oremeji Street", "Ilupeju, Lagos"],
      },
      {
        label: "Abuja",
        lines: ["23 Mungo Park Close", "Asokoro, Abuja"],
      },
      {
        label: "Houston",
        lines: ["4201 Main St.", "Houston, TX 77002"],
      },
      {
        label: "Birmingham",
        lines: ["811 5th Ave. North", "Birmingham, AL 35203"],
      },
    ],
    serviceOptions: [
      "Commercial & Industrial Solar",
      "Distributed Energy Operations",
      "Utility-Scale Project Development",
      "Energy Monitoring & Operations",
      "Consulting & Feasibility Studies",
    ],
  },

  hero: {
    slides: [
      {
        tagline: "UTILITY-SCALE POWER SOLUTIONS",
        title: "Building the Power Infrastructure Africa's Growth Runs On",
        description: "We develop, build, and operate generation and storage assets at utility scale — from multi-megawatt solar plants to grid-connected battery systems serving cities, industry, and communities alike.",
        ctaText: "See What We Build",
        ctaLink: "#where-we-build",
        image: "/images/project-ashipa-branded-site.png",
      },
      {
        tagline: "URBAN, COMMERCIAL & INDUSTRIAL",
        title: "Powering Cities, Businesses and Enterprise",
        description: "Custom solar PV and lithium battery storage systems that retire diesel generators across urban centres — eliminating outages, lowering operating costs by up to 50%, and shrinking carbon footprints for African enterprise.",
        ctaText: "See C&I Solutions",
        ctaLink: "#services",
        image: "/images/blog-generator-to-solar.png",
      },
      {
        tagline: "DISTRIBUTED ENERGY & ECONOMIC DEVELOPMENT",
        title: "Energy Access That Creates Real Economic Opportunity",
        description: "Deploying intelligent, utility-grade distributed energy infrastructure to power underserved communities, driving local entrepreneurship, agricultural value chains, and community resilience.",
        ctaText: "Explore Distributed Energy",
        ctaLink: "#projects",
        image: "/images/hero-minigrid-aerial.png",
      },
      {
        tagline: "DIGITIZED UTILITY OPERATIONS",
        title: "Reliable Power, Fully Managed",
        description: "Integrated monitoring, billing, and operations support designed for modern utilities to optimize efficiency, protect revenue, and serve every customer reliably — at any scale.",
        ctaText: "Explore Our Services",
        ctaLink: "#services",
        image: "/images/team-technicians-solar.png",
      },
    ] as HeroSlide[],
  },

  offerings: {
    title: "How We Support Your Energy Transition",
    subtitle: "We design, develop, build, and operate intelligent energy infrastructure at every scale — from urban commercial rooftops and industrial plants to grid-connected generation and storage.",
    items: [
      {
        title: "Energy Projects",
        description: "End-to-end development of clean energy systems, from utility-scale solar and battery storage plants to hybrid distributed energy systems and commercial rooftop installations.",
        details: ["Engineering, Procurement & Construction (EPC)", "Power Purchase Agreements (PPAs)", "Asset Management & Operations (O&M)"],
        link: "/contact",
      },
      {
        title: "Consulting Services",
        description: "Expert engineering design, feasibility studies, project advisory, and environmental impact assessments for complex decentralized utility projects.",
        details: ["Project Feasibility & Modelling", "Technical Audits & Optimization", "Regulatory & Policy Advisory"],
        link: "/resources",
      },
      {
        title: "Energy Monitoring",
        description: "Deploying high-precision IoT telemetry and remote monitoring systems to deliver live data analytics, uptime reporting, and proactive maintenance.",
        details: ["24/7 Remote Operations Center", "Predictive Failure Detection", "Yield & Degradation Analytics"],
        // MONITORING DISABLED — was "/monitoring"; back to the section anchor
        // while that page is parked.
        link: "/#services",
      },
      {
        title: "Utility-Scale Development",
        description: "Large-format generation and storage projects for urban centres and industrial off-takers, taken from site origination and grid studies through financing, construction, and long-term operation.",
        details: ["Grid-Connected Solar & Storage", "Urban & Industrial Power Systems", "Long-Term Asset Operation"],
        link: "/contact",
      },
      {
        title: "EV Charging Infrastructure",
        description: "AC and DC charge points for fleets, forecourts, workplaces, and estates — installed on sites we can also energise, so a charger is not simply another load on a supply that already fails.",
        details: ["Fleet & Depot Charging", "Solar & Storage-Backed Charge Points", "Metering, Payments & Revenue Share"],
        link: "/ev-charging",
      },
    ] as Offering[],
  },

  whereWeBuild: {
    eyebrow: "Scale Of Operations",
    title: "From City Rooftops to Grid-Scale Power Plants",
    subtitle:
      "Ashipa Electric is building a modern utility. We engineer, finance, and operate power infrastructure across every environment our customers work in — urban centres, industrial estates, and the communities in between.",
    environments: [
      {
        name: "Urban & Commercial Centres",
        description:
          "Behind-the-meter solar and storage for offices, hotels, estates, and retail across Lagos, Abuja, and Nigeria's fastest-growing cities — cutting diesel out of the urban energy mix.",
        image: "/images/project-nicon.png",
        accent: "purple",
      },
      {
        name: "Utility-Scale Generation & Storage",
        description:
          "Ground-mount solar plants, containerized lithium storage, and grid-connected assets built to utility engineering standards, with the O&M discipline to keep them performing for decades.",
        image: "/images/feature-battery-rack.jpg",
        accent: "red",
      },
      {
        name: "Industrial & Productive Use",
        description:
          "Dedicated power for manufacturing, agro-processing, and cold chain — sized for heavy motor loads and continuous production, with guaranteed uptime backed by live telemetry.",
        image: "/images/equipment-jinko-ceesolar.png",
        accent: "purple",
      },
      {
        name: "Distributed Energy Communities",
        description:
          "Retail micro-utilities that bring metered, billable, 24/7 power to communities beyond the reach of the national grid — the foundation our operating experience was built on.",
        image: "/images/hero-village-minigrid.png",
        accent: "green",
      },
    ] as EnvironmentItem[],
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
    videoUrl: "https://youtu.be/YtZIEMJzYts?si=BRqDXRQAR5m1Xp0w",
    blocks: [
      {
        title: "Our Mission",
        description: "To expedite the transition of the electric power sector to a decentralized, digitized, and decarbonized future, while maintaining cost effectiveness, reliability, and resiliency.",
      },
      {
        title: "Our Vision",
        description: "To be a top five global partner for decentralized energy systems.",
      },
    ],
  },

  projects: {
    title: "Featured Projects",
    subtitle: "Engineering solutions delivering measurable impact. Explore our portfolio of active installations across Nigeria — from distributed energy plants to commercial and industrial systems.",
    items: [
      {
        title: "Aguobiri Distributed Energy Project",
        capacity: "33 kWp Solar + Lithium Storage",
        location: "Bayelsa State, Nigeria",
        tag: "Distributed Energy",
        image: "/images/project-aguobiri.png",
      },
      {
        title: "Kaida Tsoho Distributed Energy Project",
        capacity: "100 kWp Solar + Hybrid Storage",
        location: "Federal Capital Territory, Nigeria",
        tag: "Distributed Energy",
        image: "/images/project-kaida-tsoho-aerial.jpg",
      },
      {
        title: "Korokorosei Distributed Energy Project",
        capacity: "101 kWp Solar + Utility Storage",
        location: "Bayelsa State, Nigeria",
        tag: "Distributed Energy",
        image: "/images/project-korokorosei.png",
      },
      {
        title: "LATC DOBI Farm",
        capacity: "95.4 kWp Commercial Solar PV",
        location: "Nigeria",
        tag: "Commercial & Industrial",
        image: "/images/project-dobi-farm.jpg",
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
        quote: "With 24/7 power from Ashipa's distributed energy network, my refrigeration shop can finally run reliably. I've doubled my daily sales and no longer rely on loud, expensive diesel generators that eat into all my profits.",
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
    subtitle: "Stay updated on the latest trends in renewable energy financing, operations innovation, and distributed energy deployment in Africa.",
    /**
     * What the desk actually covers, stated up front on the index. It sets a
     * reader's expectation before the article grid loads, and it is the brief
     * the editorial calendar is written against — keep the two in step.
     */
    coverage: [
      {
        title: "Tariffs & Regulation",
        description:
          "NERC orders, mini-grid regulations, DisCo tariff reviews, and what each one changes for a distributed operator in practice.",
      },
      {
        title: "Project Case Studies",
        description:
          "Commissioned sites with the numbers attached — capacity, generation, diesel displaced, payback, and what we would do differently.",
      },
      {
        title: "E-Mobility & EV Policy",
        description:
          "Charging economics, import and duty policy, fleet electrification cases, and the grid capacity question underneath all of it.",
      },
      {
        title: "Finance & Carbon Markets",
        description:
          "Project finance structures, DFI and lender requirements, results-based financing, and carbon revenue for distributed assets.",
      },
    ],
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
        title: "Unlocking Carbon Credits for Distributed Energy Developers in West Africa",
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
        excerpt: "How transparent metering and live operational data help distributed energy developers protect revenue and serve communities reliably.",
      },
    ] as BlogPostItem[],
  },
  
  newsletter: {
    title: "Get energy insights for decision makers",
    subtitle: "Join leading executives, energy operators, and policymakers who receive our monthly research briefing on African decentralized infrastructure.",
    placeholder: "Enter email",
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
        description: "Lead capital-raising activities, manage investor relationships, secure grants and financing facilities, and structure project finance transactions to support Ashipa Electric's growth across distributed energy, utility-scale, and C&I solar projects.",
        responsibilities: [
          "Develop and execute fundraising strategies across equity, debt, grant, and blended finance instruments",
          "Build and sustain relationships with DFIs, private equity, commercial lenders, and grant providers",
          "Develop project finance models and support bankability assessments for distributed energy, utility-scale, and C&I projects",
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
        location: "Project sites / Distributed energy communities (travel across operating regions)",
        type: "Full-time",
        posted: "July 2026",
        description:
          "Support the implementation and day-to-day operation of Ashipa Electric's Environmental and Social Management System (ESMS) across distributed energy projects. Ensure compliance with the company's E&S Policy, national regulations, and lender/investor standards throughout site selection, design, construction, and operation — identifying, avoiding, and managing environmental and social risks while maintaining transparent relationships with host communities. Reports to the Technical Operations Manager.",
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
          "Frequent travel to distributed energy project sites, including rural communities; close coordination with contractors, communities, regulators (REA), and lenders/investors",
        ],
        applicationUrl: "https://forms.gle/YRukTRWXRYcTKLp89",
      },
    ] as JobPosting[],
  },
  
  /**
   * Regulatory standing and governance.
   *
   * Everything marked `verified` below is drawn from Ashipa Electric's own
   * published role specifications for the EHS Officer and Customer Liaison
   * Officer, which describe the ESMS, the E&S Policy, the grievance mechanism,
   * and the REA/NESREA permitting path as existing company processes.
   *
   * The `unconfirmed` entries are the ones a DFI will ask for by certificate
   * number — they are listed so nothing is forgotten, but they do not render
   * until someone confirms them. Do not flip a flag without the document.
   */
  compliance: {
    eyebrow: "Governance & Compliance",
    title: "Built to the Standards Our Lenders and Regulators Audit Against",
    subtitle:
      "Bankability is not a claim, it is a paper trail. Every Ashipa Electric project runs through a documented Environmental and Social Management System, a permitting path agreed with the regulator before construction starts, and reporting our lenders can audit.",
    frameworks: [
      {
        title: "Environmental & Social Management System (ESMS)",
        description:
          "A maintained ESMS manual, legal register, training matrix, and E&S documentation set governs every project from site screening through operation, with monthly E&S performance reporting to management.",
        status: "verified",
      },
      {
        title: "Site Screening & Risk Categorisation",
        description:
          "Candidate sites are screened against a formal Exclusion List and categorised as Category I (high-risk) or Category II (low-risk), determining whether a full ESIA, an ESMP, or a Resettlement/Livelihood Restoration Plan is required before works begin.",
        status: "verified",
      },
      {
        title: "REA & NESREA Permitting",
        description:
          "Environmental and social clearances are tracked and secured from the Rural Electrification Agency, NESREA, and the relevant state MDAs before construction mobilises — never retrospectively.",
        status: "verified",
      },
      {
        title: "Lender E&S Standards Alignment",
        description:
          "Our E&S framework is structured around the IFC Performance Standards, so lender and investor due diligence maps onto documentation we already maintain rather than a bespoke reporting exercise.",
        status: "verified",
      },
      {
        title: "Grievance Redress Mechanism",
        description:
          "Every project operates a documented GRM with a maintained register. Community grievances are logged, investigated, and closed within agreed timelines, alongside monthly community engagement sessions.",
        status: "verified",
      },
      {
        title: "Gender, Vulnerable Groups & SEA/GBV Safeguards",
        description:
          "E&S risks affecting women, vulnerable groups, and protection against sexual exploitation, abuse, and gender-based violence are identified and mitigated as a standing part of project screening.",
        status: "verified",
      },
      {
        title: "Voluntary Land Donation Guidelines",
        description:
          "Land acquisition follows VLD Guidelines, supporting fair and transparent processes with host communities and documented consent.",
        status: "verified",
      },
      {
        title: "HSE Management & Incident Reporting",
        description:
          "Records of training, audits, inspections, permits, and non-conformances are maintained across all sites, with periodic HSE compliance reports issued to REA, lenders, and investors.",
        status: "verified",
      },
      // ---------------------------------------------------------------------
      // TO CONFIRM — supply the certificate/permit number and expiry, then set
      // status to "verified" and fill `reference`. These stay hidden until then.
      // ---------------------------------------------------------------------
      {
        title: "NERC Mini-Grid Permit / Registration",
        description:
          "Registration or permit issued under the NERC Mini-Grid Regulations for our distributed energy sites.",
        status: "unconfirmed",
      },
      {
        title: "ISO 9001 Quality Management",
        description:
          "Certified quality management system covering engineering, procurement, and construction delivery.",
        status: "unconfirmed",
      },
      {
        title: "ISO 45001 Occupational Health & Safety",
        description:
          "Certified occupational health and safety management system covering site and field operations.",
        status: "unconfirmed",
      },
      {
        title: "Nigerian Content Compliance",
        description:
          "Local content participation, Nigerian supplier development, and community employment commitments.",
        status: "unconfirmed",
      },
      {
        title: "Corporate Registration",
        description: "Registered with the Corporate Affairs Commission of Nigeria.",
        status: "unconfirmed",
      },
    ] as ComplianceItem[],
  },

  /**
   * EV charging.
   *
   * Ashipa Electric's own Senior Product Manager specification lists EV
   * Charging as one of the digital utility platforms the company builds and
   * operates, so this section describes a real capability. It deliberately does
   * not claim deployed public charge points or an installed-base map — add
   * `sites` here once there are commissioned locations to plot.
   */
  ev: {
    eyebrow: "E-Mobility Infrastructure",
    title: "EV Charging, Powered by Our Own Generation",
    subtitle:
      "Nigeria's charging problem is a power problem. We install charge points on sites we can also energise — solar, storage, and grid combined — so a charger is not simply another load on a supply that already fails.",
    image: "/images/project-nicon.png",
    chargerTypes: [
      {
        name: "AC Level 2 — Destination",
        power: "7.4 – 22 kW",
        connector: "Type 2 (IEC 62196)",
        chargeTime: "4 – 8 hours to full",
        bestFor:
          "Offices, hotels, malls, and residential estates where vehicles dwell for hours. Lowest install cost and gentlest on site capacity.",
      },
      {
        name: "DC Fast — Commercial",
        power: "30 – 60 kW",
        connector: "CCS2 / GB/T",
        chargeTime: "45 – 90 minutes to 80%",
        bestFor:
          "Filling stations, logistics depots, and retail forecourts serving mixed public traffic on a paid tariff.",
      },
      {
        name: "DC Rapid — Fleet & Transit",
        power: "120 – 180 kW",
        connector: "CCS2, dual-gun",
        chargeTime: "20 – 35 minutes to 80%",
        bestFor:
          "Bus and commercial fleet depots on tight turnaround cycles, typically paired with battery storage to cap peak demand.",
      },
      {
        name: "Battery-Buffered Charging",
        power: "Site-dependent",
        connector: "AC or DC output",
        chargeTime: "Matched to duty cycle",
        bestFor:
          "Sites with weak or capacity-constrained grid connections. Storage absorbs the peak so rapid charging does not require a new transformer.",
      },
    ] as ChargerType[],
    useCases: [
      {
        title: "Fleet & Logistics Depots",
        description:
          "Depot-wide charging sized to your duty cycle and dwell windows, with load management so vehicles charge overnight without tripping the site's supply or forcing a costly grid upgrade.",
      },
      {
        title: "Filling Stations & Forecourts",
        description:
          "Turnkey charge points for existing fuel retailers entering e-mobility — including the solar and storage needed to run them where the grid cannot be relied on.",
      },
      {
        title: "Workplaces, Malls & Estates",
        description:
          "Destination AC charging as an amenity, metered per user and integrated with the site's existing solar or hybrid system.",
      },
      {
        title: "Charging as a Service",
        description:
          "We fund, install, own, and operate the charge points; the host site provides the space and takes a share of revenue with no capital outlay.",
      },
    ] as EvUseCase[],
    siteRequirements: [
      "Available electrical capacity, or space for the solar and storage to create it",
      "Parking bays with safe vehicle access and turning clearance",
      "Reliable mobile network coverage for remote monitoring and payment authorisation",
      "Sufficient cable route distance from the point of supply to the bay",
      "Lighting, drainage, and physical protection for the charge point enclosure",
      "Site owner consent and, where applicable, landlord or estate approval",
    ],
    paymentModels: [
      {
        title: "Pay-as-you-go",
        description:
          "Drivers pay per kWh by card or transfer at the point of charge, with automated receipting.",
      },
      {
        title: "Fleet Account Billing",
        description:
          "Consolidated monthly invoicing per vehicle or per driver, with usage reporting for cost allocation.",
      },
      {
        title: "Host Revenue Share",
        description:
          "Ashipa Electric carries the capital and operating cost; the site host earns a share of charging revenue.",
      },
      {
        title: "Capex Purchase & O&M",
        description:
          "You own the hardware outright and we operate and maintain it under a service agreement.",
      },
    ],
  },

  /**
   * Remote monitoring.
   *
   * The dashboard figures rendered from `demoMetrics` and `sites` are
   * illustrative of the platform's telemetry, not a live feed — the UI labels
   * them as such. Wire these to the real SCADA API to make the section live.
   */
  monitoring: {
    eyebrow: "Remote Monitoring & Control",
    title: "Every Asset We Operate, Visible in Real Time",
    subtitle:
      "Our operations centre carries live telemetry from every site we run — generation, storage state of charge, feeder load, meter health, and revenue collection. It is how we can commit to uptime in writing, and how faults get diagnosed before a customer notices them.",
    capabilities: [
      {
        title: "Live Generation & Storage Telemetry",
        description:
          "Per-string PV yield, inverter status, battery state of charge, and depth-of-discharge sampled continuously and trended against expected performance.",
      },
      {
        title: "Feeder & Distribution Monitoring",
        description:
          "Voltage, current, and load per distribution transformer, with energy accounting that isolates technical from commercial loss.",
      },
      {
        title: "Smart Metering & Revenue Assurance",
        description:
          "Meter health, tamper detection, token vending, and collection rates per customer — the same data our Customer Liaison Officers work from in the field.",
      },
      {
        title: "Predictive Fault Detection",
        description:
          "Degradation and yield anomalies raise a maintenance ticket before they become an outage, so trucks roll against evidence rather than a phone call.",
      },
      {
        title: "Uptime & SLA Reporting",
        description:
          "Auditable availability reporting per site and per month, in the format lenders and off-takers require for disbursement and performance covenants.",
      },
      {
        title: "Third-Party Asset Integration",
        description:
          "We instrument and monitor assets we did not build. If you own a plant with poor visibility, we can bring it onto the same platform.",
      },
    ],
    demoMetrics: [
      {
        label: "Fleet Availability",
        value: "99.2%",
        state: "healthy",
        detail: "Rolling 30-day average across monitored sites",
      },
      {
        label: "Instantaneous Generation",
        value: "312 kW",
        state: "healthy",
        detail: "Aggregate PV output across the fleet",
      },
      {
        label: "Mean Battery SoC",
        value: "78%",
        state: "healthy",
        detail: "Weighted by installed storage capacity",
      },
      {
        label: "Open Maintenance Tickets",
        value: "2",
        state: "watch",
        detail: "Both raised automatically by yield anomaly detection",
      },
      {
        label: "Collection Rate",
        value: "94.6%",
        state: "healthy",
        detail: "Billed versus collected, current month",
      },
      {
        label: "Meters Reporting",
        value: "98.1%",
        state: "watch",
        detail: "Remainder pending network restoration at two sites",
      },
    ] as MonitoringMetric[],
    /**
     * A representative clear-day generation profile for the monitored fleet,
     * in kW at the top of each hour. Illustrative, like `demoMetrics` — the
     * chart labels it as a typical day rather than as today's live feed.
     */
    generationProfile: [
      { hour: 0, kw: 0 },
      { hour: 1, kw: 0 },
      { hour: 2, kw: 0 },
      { hour: 3, kw: 0 },
      { hour: 4, kw: 0 },
      { hour: 5, kw: 0 },
      { hour: 6, kw: 12 },
      { hour: 7, kw: 48 },
      { hour: 8, kw: 112 },
      { hour: 9, kw: 186 },
      { hour: 10, kw: 248 },
      { hour: 11, kw: 296 },
      { hour: 12, kw: 322 },
      { hour: 13, kw: 331 },
      { hour: 14, kw: 312 },
      { hour: 15, kw: 268 },
      { hour: 16, kw: 197 },
      { hour: 17, kw: 118 },
      { hour: 18, kw: 44 },
      { hour: 19, kw: 6 },
      { hour: 20, kw: 0 },
      { hour: 21, kw: 0 },
      { hour: 22, kw: 0 },
      { hour: 23, kw: 0 },
    ] as GenerationPoint[],
    sites: [
      {
        name: "Korokorosei",
        state: "Bayelsa",
        capacity: "101 kWp",
        uptime: "99.4%",
        load: 68,
        status: "online",
      },
      {
        name: "Kaida Tsoho",
        state: "FCT",
        capacity: "100 kWp",
        uptime: "99.1%",
        load: 74,
        status: "online",
      },
      {
        name: "Aguobiri",
        state: "Bayelsa",
        capacity: "33 kWp",
        uptime: "98.7%",
        load: 52,
        status: "online",
      },
      {
        name: "LATC DOBI Farm",
        state: "FCT",
        capacity: "95.4 kWp",
        uptime: "99.6%",
        load: 81,
        status: "online",
      },
    ] as MonitoringSite[],
  },

  /**
   * Partners.
   *
   * `category` doubles as the group heading, so the order here determines both
   * the grouping and the order the groups appear in. Categories describe the
   * nature of the relationship rather than asserting endorsement by any of
   * these organisations.
   *
   * Logo usage generally requires written consent — confirm it per mark before
   * adding one. Any entry without a `logo` renders as a wordmark tile instead,
   * so a relationship can be listed before its artwork arrives.
   */
  partners: {
    eyebrow: "Who We Work With",
    title: "Partners, Regulators & Suppliers",
    subtitle:
      "We deliver alongside regulators, development finance institutions, equipment manufacturers, and engineering partners across every project we take on.",
    items: [
      // --- Regulators, government & programme partners --------------------
      {
        name: "Rural Electrification Agency",
        category: "Regulators, Government & Programme Partners",
        logo: "/partners/REA.png",
      },
      {
        name: "Ibadan Electricity Distribution Company",
        category: "Regulators, Government & Programme Partners",
        logo: "/partners/IBEDC.png",
      },
      {
        name: "The World Bank",
        category: "Regulators, Government & Programme Partners",
        logo: "/partners/The_World_Bank_IBRD_IDA.png",
      },
      {
        name: "USAID",
        category: "Regulators, Government & Programme Partners",
        logo: "/partners/USAID.png",
      },
      {
        name: "WeCyclers",
        category: "Regulators, Government & Programme Partners",
        logo: "/partners/WeCyclers.png",
      },

      // --- Industry bodies & networks -------------------------------------
      {
        name: "Africa Minigrid Developers Association",
        category: "Industry Bodies & Networks",
        logo: "/partners/AMDA.png",
      },
      {
        name: "Renewable Energy Association of Nigeria",
        category: "Industry Bodies & Networks",
        logo: "/partners/REAN.png",
      },
      {
        name: "U.S. Chamber of Commerce",
        category: "Industry Bodies & Networks",
        logo: "/partners/US_Chamber_of_Commerce.png",
      },
      {
        name: "Techstars",
        category: "Industry Bodies & Networks",
        logo: "/partners/Techstars.png",
      },

      // --- Equipment & technology manufacturers ---------------------------
      { name: "ABB", category: "Equipment & Technology Manufacturers", logo: "/partners/ABB.png" },
      {
        name: "Hitachi ABB",
        category: "Equipment & Technology Manufacturers",
        logo: "/partners/Hitachi_ABB.png",
      },
      {
        name: "Schneider Electric",
        category: "Equipment & Technology Manufacturers",
        logo: "/partners/Schneider.png",
      },
      {
        name: "Caterpillar",
        category: "Equipment & Technology Manufacturers",
        logo: "/partners/Caterpillar.png",
      },
      {
        // The uploaded file name misspells this; the display name is correct.
        name: "Mitsubishi Hitachi Power Systems",
        category: "Equipment & Technology Manufacturers",
        logo: "/partners/Mistubishi_Hitachi_Power_Systems.png",
      },
      {
        name: "Jinko Solar",
        category: "Equipment & Technology Manufacturers",
        logo: "/partners/Jinko_Solar.png",
      },
      {
        name: "JA Solar",
        category: "Equipment & Technology Manufacturers",
        logo: "/partners/JA_solar.png",
      },
      {
        name: "Auxano Solar",
        category: "Equipment & Technology Manufacturers",
        logo: "/partners/Auxano_Solar_Logo.png",
      },
      {
        name: "Growatt",
        category: "Equipment & Technology Manufacturers",
        logo: "/partners/Growatt.png",
      },
      {
        name: "Victron Energy",
        category: "Equipment & Technology Manufacturers",
        logo: "/partners/Victron_Energy.png",
      },
      {
        name: "SteamaCo",
        category: "Equipment & Technology Manufacturers",
        logo: "/partners/SteamaCo.png",
      },
      {
        // Artwork reads "SparkMeter"; the uploaded file name is misspelled.
        name: "SparkMeter",
        category: "Equipment & Technology Manufacturers",
        logo: "/partners/Spartmeter.png",
      },

      // --- Engineering, delivery & advisory -------------------------------
      {
        name: "Clarke Energy",
        category: "Engineering, Delivery & Advisory",
        logo: "/partners/Clarke_Energy.png",
      },
      {
        name: "Oriden",
        category: "Engineering, Delivery & Advisory",
        logo: "/partners/Oriden.png",
      },
      {
        name: "Stag Engineering (Nigeria) Ltd",
        category: "Engineering, Delivery & Advisory",
        logo: "/partners/Stag_Engineering_Nigeria_LTD.png",
      },
      {
        name: "SEWW Energy",
        category: "Engineering, Delivery & Advisory",
        logo: "/partners/SEWW_Energy.png",
      },
      {
        name: "Hirotec",
        category: "Engineering, Delivery & Advisory",
        logo: "/partners/Hirotec.png",
      },
      {
        name: "Shaybis Nigeria Limited",
        category: "Engineering, Delivery & Advisory",
        logo: "/partners/Shaybis_Nigeria_Limited.png",
      },
      {
        // Supplied as a white wordmark on transparency — needs the dark tile.
        name: "Ajayi Solutions",
        category: "Engineering, Delivery & Advisory",
        logo: "/partners/Ajayi_Solutions.png",
        onDark: true,
      },
      {
        name: "Jeka Energy",
        category: "Engineering, Delivery & Advisory",
        logo: "/partners/Jeka_energy.png",
      },
      {
        name: "Lapomik Energy",
        category: "Engineering, Delivery & Advisory",
        logo: "/partners/lapomik.png",
      },
      {
        name: "Balch & Bingham LLP",
        category: "Engineering, Delivery & Advisory",
        logo: "/partners/Balch_Bingham_LLP.png",
      },
      {
        name: "Prag Attorneys & Consultants",
        category: "Engineering, Delivery & Advisory",
        logo: "/partners/Prag_Attorneys_Consultants.png",
      },
    ] as PartnerItem[],
  },

  /**
   * Technical resources.
   *
   * `request` items route into the enquiry form and work today. `download`
   * items need a real PDF placed under /public before they are added — an
   * empty resources hub reads worse than none at all.
   */
  resources: {
    eyebrow: "Technical Resources",
    title: "Start With an Engineer, Not a Brochure",
    subtitle:
      "Tell us about your site and our engineering team will come back with something specific to it — a costed feasibility study, an audit of what you are already running, or a technical review of a design you have been given.",
    items: [
      {
        title: "C&I Feasibility Study",
        description:
          "We model your actual load against solar, hybrid, and storage options, and return generation yield, capital cost, projected savings, and payback period for your site.",
        kind: "request",
        requestType: "ci-feasibility",
      },
      {
        title: "Site Energy Audit",
        description:
          "An engineer-led review of your supply, tariff, diesel consumption, and load profile, with a costed plan covering both efficiency and generation.",
        kind: "request",
        requestType: "energy-audit",
      },
      {
        title: "Technical Design Review",
        description:
          "Independent review of single-line diagrams, sizing calculations, and equipment schedules on a design prepared by another party.",
        kind: "request",
        requestType: "epc-om",
      },
      {
        title: "EV Charging Site Assessment",
        description:
          "Suitability assessment for charge points: available capacity, civil and electrical works required, charger sizing, and payment model options.",
        kind: "request",
        requestType: "ev-charging",
      },
      // MONITORING DISABLED — the enquiry form still accepts a
      // `remote-monitoring` request, so this card is the only thing hidden.
      // {
      //   title: "Asset Monitoring Assessment",
      //   description:
      //     "A review of an existing plant's instrumentation and reporting, and what it would take to bring it onto live remote monitoring.",
      //   kind: "request",
      //   requestType: "remote-monitoring",
      // },
      {
        title: "Mini-Grid Partnership Briefing",
        description:
          "For developers, DFIs, and government partners: our distributed energy delivery model, ESMS framework, and pipeline approach.",
        kind: "request",
        requestType: "minigrid-partnership",
      },
    ] as ResourceItem[],
  },

  footer: {
    tagline: "Energizing Communities, Empowering People",
    socials: [
      { name: "LinkedIn", href: "https://www.linkedin.com/company/67755970/" },
      { name: "Twitter", href: "https://x.com/AshipaElectric" },
      { name: "Facebook", href: "https://web.facebook.com/AshipaElectric/" },
      { name: "Instagram", href: "https://www.instagram.com/p/Da5Hh3ThYe4/" },
      { name: "TikTok", href: "https://www.tiktok.com/@ashipaelectric" },
      { name: "YouTube", href: "https://www.youtube.com/@ashipaelectric391" },
    ],
    links: {
      company: [
        { name: "About Us", href: "/#about" },
        { name: "Our Services", href: "/#services" },
        { name: "Impact Metrics", href: "/#about" },
        { name: "Careers", href: "/#careers" },
      ],
      services: [
        { name: "Distributed Energy Operations", href: "/#projects" },
        { name: "Commercial & Industrial Solar", href: "/#services" },
        { name: "EV Charging Infrastructure", href: "/ev-charging" },
        // MONITORING DISABLED
        // { name: "Remote Monitoring & SCADA", href: "/monitoring" },
        { name: "Governance & Compliance", href: "/compliance" },
        { name: "Technical Resources", href: "/resources" },
      ],
    },
  },
};
