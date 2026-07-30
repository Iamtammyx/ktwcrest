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
  email: "hello@ktwcrest.com",
  founded: "2016",
  location: "Johannesburg, South Africa",
  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Insights", href: "/insights" },
    { label: "Process", href: "/process" },
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
