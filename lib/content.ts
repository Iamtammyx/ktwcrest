/**
 * Site content for KTW Crest.
 * Copy is lifted from the original "KTW Crest Home (standalone)" reference build
 * so the redesign stays faithful to the brand's voice.
 */

export const site = {
  name: "KTW Crest",
  tagline: "Strategy-led technology. Built to perform.",
  intro:
    "KTW Crest designs and delivers CRMs, dashboards, commerce platforms and custom applications that turn complex business needs into working software.",
  email: "hello@ktwcrest.co.za",
  phone: "082 833 6256",
  phoneTel: "+27828336256",
  whatsapp: "27828336256", // wa.me / click-to-chat format (SA, no +)
  address: "Sandridge, Midrand, 1682",
  founded: "2016",
  location: "Johannesburg, South Africa",
  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Insights", href: "/insights" },
    { label: "Process", href: "/process" },
    { label: "Careers", href: "/careers" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const heroStats: { value: string; label: string }[] = [
  { value: "8", label: "Consulting practices, one delivery model" },
  { value: "5", label: "Named steps from discover to improve" },
  { value: "1", label: "Team, first workshop to post-launch" },
  { value: "2", label: "Working-day reply from a senior consultant" },
];

export type Service = {
  title: string;
  summary: string;
  detail: string;
  icon: IconName;
};

export const services: Service[] = [
  {
    title: "Digital Strategy & Advisory",
    summary:
      "Product discovery, solution architecture and roadmaps you can fund and defend.",
    detail:
      "Business case, prioritisation and technology decisions framed for executives.",
    icon: "compass",
  },
  {
    title: "CRM",
    summary:
      "Strategy, implementation, configuration and optimisation so customer data finally lives in one dependable place.",
    detail:
      "Pipelines, service queues and customer records configured around how your team already sells and supports.",
    icon: "users",
  },
  {
    title: "Dashboards & Business Intelligence",
    summary:
      "Reporting and decision-support tools executives actually open, built on definitions your teams agree on.",
    detail:
      "Executive and operational views with drill-down, refreshed on a schedule you can rely on.",
    icon: "chart",
  },
  {
    title: "Commerce",
    summary:
      "Storefronts, payments and operations joined up, so selling online stops creating manual work.",
    detail:
      "Catalogue, checkout and post-purchase flows integrated with stock, payments and finance.",
    icon: "cart",
  },
  {
    title: "Custom Applications",
    summary:
      "Web, mobile, portal and line-of-business systems for the workflows off-the-shelf software will not fit.",
    detail:
      "Internal portals and line-of-business apps that replace spreadsheets and email approvals.",
    icon: "app",
  },
  {
    title: "Integration & Automation",
    summary:
      "APIs, middleware and process digitisation that remove re-typing between systems.",
    detail:
      "We digitise the operational path from order to reconciliation and automate the handovers that break.",
    icon: "link",
  },
  {
    title: "Product Design & Experience",
    summary:
      "Research, service and interface design for adoption, not decoration.",
    detail: "UI design and design systems that make complex tools feel obvious.",
    icon: "sparkle",
  },
  {
    title: "Programme & Project Delivery",
    summary:
      "Programme and project management, QA and governance from kickoff to handover.",
    detail:
      "Delivery management, quality assurance, launch and continuous improvement with clear governance.",
    icon: "flag",
  },
];

export type Problem = {
  title: string;
  body: string;
  points_to: string;
};

export const problems: Problem[] = [
  {
    title: "One view of the customer",
    body: "Customer information is scattered across spreadsheets, inboxes and two systems that disagree.",
    points_to: "CRM strategy & integration",
  },
  {
    title: "See the numbers clearly",
    body: "Reports take days to assemble and still get challenged in the meeting.",
    points_to: "Dashboards & BI",
  },
  {
    title: "Commerce that runs itself",
    body: "The online store works, but fulfilment and finance are held together by manual steps.",
    points_to: "Commerce & automation",
  },
  {
    title: "Rescuing an existing build",
    body: "A previous build was delivered, but nobody can safely change it.",
    points_to: "Custom application rescue",
  },
];

export type ProcessStep = {
  number: string;
  name: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    name: "Discover",
    body: "Stakeholder interviews, current-state review and a written problem statement.",
  },
  {
    number: "02",
    name: "Define",
    body: "Scope, success measures, architecture options and a delivery plan you approve.",
  },
  {
    number: "03",
    name: "Design",
    body: "Process, data and interface design, validated with the people who will use it.",
  },
  {
    number: "04",
    name: "Deliver",
    body: "Build in increments with QA, documentation and a rehearsed launch.",
  },
  {
    number: "05",
    name: "Improve",
    body: "Post-launch support, adoption review and a backlog for the next increment.",
  },
];

export const expertise = {
  heading: "Adaptable expertise, not narrow specialisation",
  body: "Our methods transfer across contexts. We will tell you plainly where we have direct experience and where we would be applying proven practice to something new.",
  pillars: [
    {
      title: "Multidisciplinary practitioners",
      body: "One team across strategy, data, design and delivery — not a hand-off between silos.",
      icon: "layers" as IconName,
    },
    {
      title: "Senior consulting experience",
      body: "Practitioners who bring senior experience from large-scale transformation programmes.",
      icon: "shield" as IconName,
    },
    {
      title: "Named outputs at every step",
      body: "Each step has named outputs, so you always know exactly what you are approving.",
      icon: "check" as IconName,
    },
  ],
  sectors: [
    "Financial services",
    "Public sector & NGOs",
    "Retail & commerce",
    "Health & care",
    "Professional services",
    "Education",
  ],
};

export const contact = {
  heading: "Tell us what needs to work better",
  body: "A senior consultant reads every enquiry. We will confirm scope, price and delivery dates together — and reply within two working days.",
  note: "Nothing is sent until you approve it. Only the minimum lead data is kept, and only with your consent.",
};

export type IconName =
  | "compass"
  | "users"
  | "chart"
  | "cart"
  | "app"
  | "link"
  | "sparkle"
  | "flag"
  | "layers"
  | "shield"
  | "check";

/* ------------------------------------------------------------------ */
/* Services page — the 8 core disciplines, in depth                    */
/* ------------------------------------------------------------------ */

export type ServiceDiscipline = {
  slug: string;
  tag: string;
  title: string;
  summary: string;
  approach: string;
  capabilities: string[];
  deliverables: string[];
  tech: string[];
  icon: IconName;
};

export const serviceDisciplines: ServiceDiscipline[] = [
  {
    slug: "crm",
    tag: "Customer Relationship Management",
    title: "CRM Solutions",
    summary:
      "End-to-end strategy, implementation, configuration, integration, and optimisation for complex relationship architectures.",
    approach:
      "We evaluate existing sales and service operations, define clean data structures, and deploy configured pipelines backed by thorough staff onboarding.",
    capabilities: [
      "CRM Architecture & Platform Selection",
      "Data Migration & Cleansing Strategies",
      "Custom Pipeline & Sales Stage Automation",
      "Omnichannel Service & Ticketing Workflows",
      "ERP & Billing System Integrations",
    ],
    deliverables: [
      "Validated CRM Data Model & Blueprint",
      "Configured Enterprise CRM Environment",
      "Automated Workflow Triggers & Escalations",
      "User Role & Security Mapping Document",
      "Team Enablement & Playbook Documentation",
    ],
    tech: ["Salesforce", "HubSpot", "Microsoft Dynamics 365", "Custom Webhooks & REST APIs"],
    icon: "users",
  },
  {
    slug: "dashboards-bi",
    tag: "Data & Analytics Architecture",
    title: "Dashboards & Business Intelligence",
    summary:
      "Turning scattered metrics into clear data visualisations, decision-support tools, and executive reporting models.",
    approach:
      "Starting with core business questions, we design efficient data pipelines and crisp dashboards that give leaders single-source-of-truth clarity.",
    capabilities: [
      "Data Warehouse & ETL Pipeline Architecture",
      "Executive Dashboard & KPI Visualization",
      "Operational Reporting & Automated Alerts",
      "Embedded Analytics for Portals & Apps",
      "Data Governance & Access Control Frameworks",
    ],
    deliverables: [
      "Unified Data Warehouse / Mart Scheme",
      "Interactive Power BI / Tableau / Custom Dashboards",
      "Data Dictionary & Metric Standards Documentation",
      "Automated ETL / ELT Ingestion Pipelines",
    ],
    tech: ["Power BI", "Looker", "Tableau", "Snowflake", "PostgreSQL / BigQuery"],
    icon: "chart",
  },
  {
    slug: "ecommerce",
    tag: "Digital Commerce Platforms",
    title: "eCommerce Solutions",
    summary:
      "Scalable storefronts, payment gateway integrations, order management workflows, and high-performance digital commerce.",
    approach:
      "We engineer conversion-optimised checkout flows, robust inventory synchronization, and resilient payment rails tailored to regional & global buyers.",
    capabilities: [
      "B2B & B2C Storefront Architecture",
      "Payment Gateway & Local Payment Methods Integration",
      "Custom Product Configuration & Pricing Rules",
      "ERP & Warehouse Inventory Synchronization",
      "Headless Commerce & Frontend Optimization",
    ],
    deliverables: [
      "Production-Ready Headless / Modular Storefront",
      "Integrated Payment & Checkout Service Layer",
      "Inventory & Fulfillment Sync Automated Workflows",
      "Performance Audit & Mobile Speed Optimization Report",
    ],
    tech: ["Shopify Plus", "WooCommerce", "Custom Headless Frameworks", "Stripe", "Local Payment Processors"],
    icon: "cart",
  },
  {
    slug: "custom-applications",
    tag: "Software Engineering",
    title: "Custom Applications",
    summary:
      "Custom web platforms, mobile applications, internal portals, and line-of-business systems tailored to operational workflows.",
    approach:
      "We combine strict engineering discipline with user-centered design to craft maintainable, cloud-native applications that solve specific bottlenecks.",
    capabilities: [
      "Full-Stack Web & Mobile App Development",
      "Cross-Platform Mobile (Flutter / React Native)",
      "Enterprise Line-of-Business Systems",
      "Custom Client & Partner Self-Service Portals",
      "Cloud-Native Microservices & Modernization",
    ],
    deliverables: [
      "Responsive Cloud Web & Mobile Platform",
      "Clean Modular Codebase & Architectural Documentation",
      "Comprehensive Automated Test Suite",
      "DevOps CI/CD Deployment Pipeline Configuration",
    ],
    tech: ["Flutter", "Dart", "Node.js / Python", "REST & GraphQL APIs", "AWS / Google Cloud / Azure"],
    icon: "app",
  },
  {
    slug: "integration-automation",
    tag: "Systems & Process Digitisation",
    title: "Integration & Automation",
    summary:
      "Connecting isolated enterprise applications, designing robust APIs, and automating manual business workflows.",
    approach:
      "We map data pathways across legacy and modern tools, build resilient middleware connectors, and automate repetitive operational steps.",
    capabilities: [
      "API Design, Development & Management",
      "Enterprise Application Integration (EAI)",
      "Robotic Process Automation (RPA) & Event Triggers",
      "Webhook Architecture & Real-Time Sync",
      "Legacy System API Wrapper Modernization",
    ],
    deliverables: [
      "Scalable API Gateway & Microservices Infrastructure",
      "Automated Data Integration Workflows & Monitor Logs",
      "Comprehensive OpenAPI / Swagger Documentation",
      "Error Alerting & Fallback Recovery Protocols",
    ],
    tech: ["REST / GraphQL APIs", "Zapier / Make / n8n", "Node.js Middleware", "Kafka / RabbitMQ"],
    icon: "link",
  },
  {
    slug: "digital-strategy",
    tag: "Transformation Leadership",
    title: "Digital Strategy & Advisory",
    summary:
      "Product discovery, technology roadmap creation, architecture evaluation, and strategic alignment for digital initiatives.",
    approach:
      "We partner directly with executive leadership to evaluate technical feasibility, define practical roadmaps, and safeguard IT investments.",
    capabilities: [
      "Technology Capability & Maturity Assessment",
      "Multi-Year Digital Transformation Roadmaps",
      "Vendor Evaluation & RFP Management",
      "Solution & System Architecture Blueprinting",
      "Digital Operating Model & Governance Design",
    ],
    deliverables: [
      "Prioritised Technology Roadmap & Business Case",
      "System Architecture Blueprint & Data Standards",
      "Vendor Assessment Matrix & Technical Recommendations",
      "Executive Alignment Workshop Summaries",
    ],
    tech: ["Enterprise Architecture", "Cloud Governance", "Risk & Compliance Frameworks", "TOGAF / Agile"],
    icon: "compass",
  },
  {
    slug: "product-design",
    tag: "UX / UI Architecture",
    title: "Product Design & Experience",
    summary:
      "User research, information architecture, visual design systems, and rapid prototyping that drive adoption.",
    approach:
      "We craft clean, accessible, and intuitive user interfaces that reduce training overhead and turn complex tools into clear user journeys.",
    capabilities: [
      "User Research, Persona Mapping & Journey Mapping",
      "Wireframing & Interactive Prototype Design",
      "Enterprise Design Systems & UI Pattern Libraries",
      "Usability Testing & Accessibility Audits (WCAG 2.2 AA)",
      "Conversion Rate Optimization (CRO) & Interface Polish",
    ],
    deliverables: [
      "High-Fidelity Interactive Figma Prototypes",
      "Reusable Component Design System & Design Tokens",
      "User Testing Insights & Usability Audit Report",
      "UX Copywriting & Design Standard Guidelines",
    ],
    tech: ["Figma", "Design Tokens", "Design Systems", "WCAG 2.2 AA", "User Testing Frameworks"],
    icon: "sparkle",
  },
  {
    slug: "programme-delivery",
    tag: "Delivery Governance",
    title: "Programme & Project Delivery",
    summary:
      "Rigorous project management, quality assurance, launch execution, and continuous delivery governance.",
    approach:
      "We apply senior consulting discipline to maintain momentum, enforce quality gates, and deliver technology initiatives on schedule and scope.",
    capabilities: [
      "Agile / Hybrid Programme & Project Management",
      "Quality Assurance, Automation & Testing Strategy",
      "Vendor Management & Multi-Party Delivery Coordination",
      "Risk Mitigation, Dependency Tracking & Governance",
      "Launch Execution, Change Management & Post-Launch Ops",
    ],
    deliverables: [
      "Project Charter, WBS & Sprint Backlog",
      "Transparent Weekly Executive Progress Dashboards",
      "Comprehensive Test Suite & Quality Assurance Reports",
      "Go-Live Readiness Checklist & Release Plan",
    ],
    tech: ["Jira / Azure DevOps", "Agile / Scrum / Kanban", "Automated QA Tools", "Risk & RAID Logs"],
    icon: "flag",
  },
];

/* ------------------------------------------------------------------ */
/* Work page — case studies                                            */
/* ------------------------------------------------------------------ */

export type CaseStudy = {
  tag: string;
  title: string;
  challenge: string;
  solution: string;
  outcome: string;
  chips: string[];
  sample?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    tag: "Financial & Professional Services",
    title: "B2B Enterprise Relationship Management Modernization",
    challenge:
      "Fragmented customer information stored in regional spreadsheets resulted in duplicate client contact and inaccurate quarterly pipeline estimates.",
    solution:
      "Architected and configured an integrated CRM environment with automated deal routing and single-view client profiles.",
    outcome:
      "Streamlined account coordination across regional offices and established dependable sales reporting.",
    chips: ["CRM Strategy", "Data Integration", "Process Digitisation"],
    sample: true,
  },
  {
    tag: "Logistics & Supply Chain",
    title: "Executive Decision-Support Dashboard & Data Warehouse",
    challenge:
      "Manual spreadsheet reporting required 12+ hours weekly and lacked real-time visibility into operational bottlenecks.",
    solution:
      "Engineered an automated data pipeline and interactive Power BI dashboard suite with automated threshold alerts.",
    outcome:
      "Eliminated weekly manual report generation and provided leadership with instant operational visibility.",
    chips: ["Dashboards & BI", "Data Architecture", "ETL Pipelines"],
    sample: true,
  },
  {
    tag: "Technology & Legal Services",
    title: "Custom Partner Self-Service & Document Exchange Portal",
    challenge:
      "Manual email attachments for sensitive compliance document exchanges created security risks and delayed partner approvals.",
    solution:
      "Developed a custom cloud application with role-based document permissions, audit trails, and automated notification triggers.",
    outcome:
      "Reduced onboarding turn-around times while enforcing strict access security controls.",
    chips: ["Custom Applications", "UX/UI Design", "Security"],
    sample: true,
  },
];

/* ------------------------------------------------------------------ */
/* Insights page — thought leadership                                  */
/* ------------------------------------------------------------------ */

export type Insight = {
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  preview: string;
  chips: string[];
  draft?: boolean;
};

export const insights: Insight[] = [
  {
    category: "CRM Solutions",
    readTime: "5 min read",
    title: "Why CRM Projects Fail Without a Data Quality Strategy",
    excerpt:
      "Investing in CRM platforms yields diminished results if underlying customer data remains unformatted and duplicated.",
    preview:
      "A successful CRM rollout is 20% software selection and 80% data structure and process alignment. Before configuring pipeline stages, organisations must establish standardized entity definitions, mandatory field validation, and ongoing governance routines.",
    chips: ["CRM", "Data Quality", "Strategy"],
    draft: true,
  },
  {
    category: "Business Intelligence",
    readTime: "6 min read",
    title: "Designing Executive Dashboards That Drive Action",
    excerpt:
      "How to avoid dashboard fatigue by focusing on decision-enabling metrics rather than vanity graphics.",
    preview:
      "Effective business intelligence dashboards do not try to display every available data point on one screen. Instead, they present clear operational hierarchies, contextual benchmarks, and automated indicators that prompt executive action.",
    chips: ["BI", "Analytics", "Leadership"],
    draft: true,
  },
  {
    category: "Integration & Automation",
    readTime: "7 min read",
    title: "Architecting Resilient API Integrations for Enterprise Workflows",
    excerpt:
      "Best practices for API middleware, exception handling, and maintaining auditability across connected systems.",
    preview:
      "When connecting core line-of-business systems, point-to-point hardcoded scripts create fragile dependencies. Modern enterprise integration relies on asynchronous message queues, automated retry limits, and centralized health logging.",
    chips: ["Integration", "APIs", "Architecture"],
    draft: true,
  },
];

/* ------------------------------------------------------------------ */
/* FAQs page                                                           */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Careers page                                                        */
/* ------------------------------------------------------------------ */

export const careers = {
  hero: {
    eyebrow: "Careers at KTW Crest",
    title: "Build. Grow. Ship work that performs.",
    body: "We are a senior, multidisciplinary team turning complex business needs into working software. Join us and own real outcomes — from the first workshop to a rehearsed launch and beyond.",
  },
  // Honest, culture-oriented figures (no inflated vanity metrics).
  stats: [
    { value: "2016", label: "Building since" },
    { value: "8", label: "Disciplines to grow across" },
    { value: "1", label: "Team, strategy through delivery" },
    { value: "100%", label: "Named outputs you can point to" },
  ],
  stages: [
    {
      title: "Early-career practitioners",
      body: "Learn the craft on real engagements with a senior consultant beside you — not a training sandbox. You will own named outputs from your first project.",
    },
    {
      title: "Experienced specialists",
      body: "Go deep in CRM, data, commerce, engineering or design, and broaden into the disciplines next door. We back mastery and range.",
    },
    {
      title: "Senior & lead consultants",
      body: "Shape strategy, architect solutions and mentor the team. Bring executive-grade judgement to programmes that matter.",
    },
  ],
  values: [
    {
      title: "Real ownership",
      body: "You own outcomes end to end, with your name on the outputs you approve and ship.",
      icon: "flag" as IconName,
    },
    {
      title: "Mentorship from day one",
      body: "Senior practitioners work beside you, not above you. Judgement is taught, not gatekept.",
      icon: "users" as IconName,
    },
    {
      title: "Range, not silos",
      body: "One team across strategy, data, design and delivery — grow beyond a single lane.",
      icon: "layers" as IconName,
    },
    {
      title: "Learning, funded",
      body: "Time and budget for the certifications, tools and conferences that sharpen your craft.",
      icon: "sparkle" as IconName,
    },
    {
      title: "Flexible & remote-friendly",
      body: "Outcomes over hours. Work where you do your best thinking, with the team when it counts.",
      icon: "compass" as IconName,
    },
    {
      title: "Work that actually ships",
      body: "We deliver systems people use every day — not decks that gather dust.",
      icon: "check" as IconName,
    },
  ],
  note: "We hire for judgement and range across our eight disciplines. No roles open right now? Send your CV and a note on the work you want to do — a senior consultant reads every application.",
};

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "When was KTW Crest established?",
    a: "KTW Crest was registered in 2016 as a technology consulting company focused on practical strategy, engineering, and digital systems delivery.",
  },
  {
    q: "Where is KTW Crest located?",
    a: "KTW Crest is headquartered in Johannesburg, South Africa [placeholder — contact details subject to confirmation]. We serve clients across Africa and international jurisdictions.",
  },
  {
    q: "How do you structure project engagements?",
    a: "We offer flexible engagement models tailored to project needs, including fixed-scope milestone deliverables, dedicated consulting discovery sprints, and ongoing technology advisory retainers.",
  },
  {
    q: "Do you provide post-launch support and maintenance?",
    a: "Yes. Following deployment, we provide post-launch monitoring, warranty optimization sprints, and continuous enhancement support tailored to operational requirements.",
  },
  {
    q: "Which technologies and platforms do you work with?",
    a: "Our practitioners work across mainstream CRM, BI, commerce and cloud platforms — Salesforce, HubSpot, Dynamics, Power BI, Tableau, Shopify, AWS, Google Cloud and Azure — as well as custom stacks in Node.js, Python and Flutter. We recommend tools based on fit, not partnerships.",
  },
  {
    q: "How do we get started?",
    a: "Begin with a discovery call. A senior consultant reads every enquiry and will confirm scope, price and delivery dates before any work starts — usually within two working days.",
  },
];
