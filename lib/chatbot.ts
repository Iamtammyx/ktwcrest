import { site } from "@/lib/content";

/**
 * Lightweight on-page assistant knowledge base + matcher.
 *
 * It answers from embedded FAQ/service responses using keyword-overlap scoring
 * (fully client-side, no backend or API key). When nothing scores above the
 * threshold — or the visitor asks for a person — the widget escalates to
 * WhatsApp. Swappable for an LLM endpoint later without touching the UI.
 */

export type KBEntry = {
  id: string;
  a: string;
  keywords: string[];
};

export const knowledgeBase: KBEntry[] = [
  {
    id: "services",
    a: "We deliver eight disciplines: CRM, Dashboards & BI, eCommerce, Custom Applications, Integration & Automation, Digital Strategy, Product Design, and Programme Delivery. Which one is closest to what you need?",
    keywords: ["services", "service", "offer", "capabilities", "provide", "disciplines", "solutions"],
  },
  {
    id: "crm",
    a: "Yes — CRM strategy, implementation, configuration, integration and optimisation across Salesforce, HubSpot, Dynamics or custom. We get your customer data into one dependable place.",
    keywords: ["crm", "customer", "relationship", "salesforce", "hubspot", "dynamics", "pipeline", "sales", "leads"],
  },
  {
    id: "bi",
    a: "We turn scattered metrics into executive dashboards and reporting built on definitions your teams agree on — Power BI, Tableau, Looker and custom. So you can see the numbers clearly.",
    keywords: ["dashboard", "dashboards", "bi", "intelligence", "analytics", "reporting", "reports", "data", "power", "tableau", "looker", "metrics", "kpi", "warehouse"],
  },
  {
    id: "ecommerce",
    a: "Scalable storefronts, payments and order workflows joined up with stock and finance — Shopify Plus, WooCommerce, headless builds, Stripe and local processors.",
    keywords: ["ecommerce", "commerce", "store", "storefront", "shop", "shopify", "woocommerce", "payment", "payments", "checkout", "stripe", "online", "cart"],
  },
  {
    id: "apps",
    a: "Web platforms, mobile apps, portals and line-of-business systems for the workflows off-the-shelf software won't fit — built cloud-native with clean, documented code.",
    keywords: ["custom", "application", "applications", "app", "apps", "software", "web", "mobile", "portal", "platform", "build", "development", "develop", "flutter"],
  },
  {
    id: "integration",
    a: "APIs, middleware and process automation that remove re-typing between systems and automate the handovers that break — REST/GraphQL, Zapier/Make/n8n and message queues.",
    keywords: ["integration", "integrate", "automation", "automate", "api", "apis", "middleware", "webhook", "connect", "zapier", "sync", "rpa"],
  },
  {
    id: "strategy",
    a: "Product discovery, solution architecture, technology roadmaps and business cases — framed for executives so you can fund and defend the plan.",
    keywords: ["strategy", "advisory", "roadmap", "architecture", "consulting", "advice", "discovery", "planning", "transformation", "advisor"],
  },
  {
    id: "design",
    a: "User research, information architecture, UI design and design systems focused on adoption — turning complex tools into clear journeys, tested to WCAG 2.2 AA.",
    keywords: ["design", "ux", "ui", "research", "prototype", "figma", "experience", "usability", "accessibility", "interface"],
  },
  {
    id: "delivery",
    a: "Programme and project management, QA and governance from kickoff to handover — with named outputs you approve at every step.",
    keywords: ["delivery", "project", "programme", "program", "management", "governance", "qa", "quality", "launch", "agile", "scrum"],
  },
  {
    id: "process",
    a: "We work in five steps: Discover, Define, Design, Deliver, Improve. Each step has named outputs you approve before we move on.",
    keywords: ["process", "approach", "methodology", "steps", "step", "phases", "stages", "work", "deliver"],
  },
  {
    id: "pricing",
    a: "Pricing depends on scope. A senior consultant confirms scope, price and delivery dates with you before any work starts — usually within two working days. Happy to share a few details?",
    keywords: ["price", "pricing", "cost", "costs", "quote", "budget", "rate", "rates", "expensive", "fee", "fees", "charge", "much", "afford"],
  },
  {
    id: "timeline",
    a: "It depends on scope, but we build in increments so you see value early. You get a delivery plan with dates during the Define step.",
    keywords: ["long", "timeline", "time", "duration", "quick", "fast", "deadline", "turnaround", "estimate", "schedule"],
  },
  {
    id: "location",
    a: `We're headquartered at ${site.address} (${site.location}), and we serve clients across Africa and internationally.`,
    keywords: ["where", "located", "location", "address", "office", "based", "find", "visit", "midrand", "sandridge", "johannesburg", "country", "region"],
  },
  {
    id: "contact",
    a: `You can call ${site.phone}, email ${site.email}, or tap "Talk to a human" to continue on WhatsApp.`,
    keywords: ["contact", "reach", "phone", "email", "number", "touch", "mail", "enquiry", "inquiry"],
  },
  {
    id: "about",
    a: `KTW Crest was registered in ${site.founded} — technology consulting from strategy through delivery, turning complex business needs into working software.`,
    keywords: ["about", "who", "founded", "established", "company", "history", "started", "registered", "experience", "background"],
  },
  {
    id: "careers",
    a: "We hire for judgement and range across our eight disciplines. Send your CV and a note on the work you want to do via the Careers page — a senior consultant reads every application.",
    keywords: ["career", "careers", "job", "jobs", "hiring", "hire", "vacancy", "apply", "cv", "recruit", "employment", "join", "intern", "internship"],
  },
  {
    id: "tech",
    a: "We work across Salesforce, HubSpot, Dynamics, Power BI, Tableau, Shopify, AWS, Google Cloud and Azure, plus custom stacks in Node.js, Python and Flutter — chosen for fit, not partnerships.",
    keywords: ["technology", "technologies", "tech", "tools", "stack", "platforms", "languages", "framework", "aws", "azure", "cloud", "node", "python"],
  },
  {
    id: "support",
    a: "Yes — after launch we provide monitoring, adoption review and continuous improvement, with a backlog for the next increment.",
    keywords: ["support", "maintenance", "maintain", "ongoing", "warranty", "post", "fix", "bug", "retainer", "aftercare"],
  },
  {
    id: "getstarted",
    a: 'Start with a discovery call. Tell me a little about your goal, or tap "Talk to a human" to reach a consultant on WhatsApp directly.',
    keywords: ["start", "started", "begin", "getting", "onboard", "first", "engage", "engagement", "kick", "proceed", "next", "book"],
  },
];

const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "am", "do", "does", "did", "you", "your", "our",
  "i", "we", "to", "of", "for", "and", "or", "in", "on", "with", "can", "could",
  "would", "will", "me", "my", "about", "please", "have", "has", "any", "some",
  "that", "this", "it", "at", "be", "by", "so", "if", "as", "from", "us",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

const GREETINGS = ["hi", "hello", "hey", "yo", "hiya", "howdy", "morning", "afternoon", "evening", "greetings"];
const THANKS = ["thanks", "thank", "thankyou", "cheers", "appreciated", "great", "awesome", "perfect", "ta"];
const HUMAN = ["human", "person", "someone", "agent", "representative", "consultant", "real", "advisor", "operator", "staff", "team", "whatsapp"];

export function classify(text: string): "greeting" | "thanks" | "human" | null {
  const tokens = tokenize(text);
  const raw = text.toLowerCase();
  if (tokens.length <= 3 && tokens.some((t) => GREETINGS.includes(t))) return "greeting";
  if (tokens.some((t) => THANKS.includes(t))) return "thanks";
  if (HUMAN.some((h) => raw.includes(h))) return "human";
  return null;
}

/** Best-matching KB answer, or null if nothing clears the threshold. */
export function matchAnswer(text: string): KBEntry | null {
  const tokens = tokenize(text);
  if (!tokens.length) return null;

  let best: KBEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const token of tokens) {
      if (entry.keywords.includes(token)) score += 2;
      else if (entry.keywords.some((k) => k.includes(token) || token.includes(k))) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore >= 2 ? best : null;
}

export const suggestedQuestions = [
  "What services do you offer?",
  "How much does it cost?",
  "How do you work?",
  "Where are you located?",
];
