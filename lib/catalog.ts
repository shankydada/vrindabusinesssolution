import { BEEWHAT_URL } from "./site";

export type Faq = { q: string; a: string };
export type Feature = { title: string; body: string };

export type Offering = {
  slug: string;
  kind: "product" | "service";
  name: string;
  /** Short label for the 3D tree and compact lists. */
  short: string;
  /** One line used in product lists. */
  summary: string;
  /** <title> for the page; the layout template appends the brand name. */
  seoTitle: string;
  /** Meta description, kept around 150 characters. */
  seoDescription: string;
  keywords: string[];
  h1: string;
  intro: string;
  audience: string[];
  features: Feature[];
  steps: string[];
  connects: string[];
  faqs: Faq[];
  related: string[];
  /** schema.org type that best describes the offering. */
  schemaType: "SoftwareApplication" | "Service";
  /** Lives outside the main site (BeeWhat has its own subdomain). */
  externalUrl?: string;
};

export const products: Offering[] = [
  {
    slug: "smara-crm",
    kind: "product",
    name: "SMARA CRM",
    short: "SMARA CRM",
    summary: "A ready-to-use CRM for sales teams: leads, follow-ups, pipeline and reports in one place.",
    seoTitle: "SMARA CRM: Sales CRM Software for Growing Businesses in India",
    seoDescription:
      "SMARA CRM keeps every lead, follow-up and deal in one place. Lead capture, pipeline tracking, reminders and sales reports, set up for your team.",
    keywords: ["CRM software India", "sales CRM", "lead management software", "CRM for small business", "SMARA CRM"],
    h1: "SMARA CRM keeps every lead and follow-up in one place",
    intro:
      "SMARA CRM is a ready-to-use sales CRM. Leads from your website, ads, phone calls and marketplaces land in one list, every salesperson sees what to do next, and owners see the whole pipeline without asking for an Excel sheet.",
    audience: [
      "Sales teams that track leads in Excel, notebooks or WhatsApp",
      "Owners who want to see the pipeline and team performance at a glance",
      "Businesses that lose leads because nobody followed up in time",
    ],
    features: [
      { title: "Lead capture", body: "Leads from website forms, ad campaigns, IndiaMART, JustDial and calls are added automatically once connected during setup, with no copy-paste." },
      { title: "Pipeline board", body: "Move deals through your own stages, see their value and spot where deals get stuck." },
      { title: "Follow-up reminders", body: "Every lead gets a next action and a date. Overdue follow-ups are flagged to the salesperson and the manager." },
      { title: "Assignment rules", body: "Share new leads by region, product or round-robin so none sit unassigned." },
      { title: "Sales reports", body: "Leads by source, conversion by salesperson and revenue forecast, ready without building spreadsheets." },
      { title: "Roles and access", body: "Salespeople see their own leads, managers see their team and owners see everything." },
    ],
    steps: [
      "We map your sales stages, lead sources and team structure in a short call.",
      "We configure SMARA CRM, import your existing leads and connect your lead sources.",
      "Your team is trained and starts working from the CRM, with support while they settle in.",
    ],
    connects: ["BeeWhat WhatsApp CRM", "Website forms", "Google and Meta lead ads", "IndiaMART", "JustDial", "Email", "ERP invoicing"],
    faqs: [
      { q: "What is SMARA CRM?", a: "SMARA CRM is a sales CRM from Vrinda Business Solution. It brings leads, follow-ups, deals and sales reports into one system so your team always knows the next step and owners can see the full pipeline." },
      { q: "How is SMARA CRM different from VrindaCRM Pro?", a: "SMARA CRM is ready to use and set up in days. VrindaCRM Pro is a CRM we build around your exact process, with your branding and full source code ownership. Choose SMARA for speed, VrindaCRM Pro when your process is unusual or you want to own the software." },
      { q: "Can SMARA CRM capture leads from WhatsApp?", a: "Yes. Pair it with BeeWhat and every WhatsApp conversation is saved to the right lead automatically." },
      { q: "Can I move my existing leads from Excel?", a: "Yes. We import your existing leads, contacts and open deals during setup so your team starts with complete history." },
    ],
    related: ["beewhat", "vrinda-crm-pro", "workflow-automation"],
    schemaType: "SoftwareApplication",
  },
  {
    slug: "beewhat",
    kind: "product",
    name: "BeeWhat",
    short: "BeeWhat",
    summary: "Zero-touch WhatsApp CRM: every WhatsApp message is saved to your CRM automatically.",
    seoTitle: "BeeWhat: Zero-Touch WhatsApp CRM, Every Chat Saved Automatically",
    seoDescription:
      "BeeWhat saves every WhatsApp message to your CRM automatically. Contacts, chat history and follow-ups are recorded with zero manual data entry.",
    keywords: ["WhatsApp CRM", "WhatsApp CRM integration", "zero touch CRM", "save WhatsApp chats to CRM", "WhatsApp lead management", "BeeWhat"],
    h1: "Every WhatsApp chat, saved to your CRM automatically",
    intro:
      "Your customers talk to you on WhatsApp, but your CRM never hears about it. BeeWhat closes that gap. Every incoming and outgoing WhatsApp message is stored against the right contact in your CRM automatically, so nobody has to type anything in.",
    audience: [
      "Sales teams that close deals on WhatsApp",
      "Owners who lose customer history when a salesperson leaves",
      "Real estate, education, clinics, distributors and service businesses that sell through chat",
    ],
    features: [
      { title: "Zero-touch capture", body: "Messages are saved to the CRM the moment they are sent or received. No forwarding, no exports and no data entry." },
      { title: "Automatic contacts", body: "A new number becomes a new contact with its first message attached. Known numbers go straight onto the existing record." },
      { title: "Full conversation timeline", body: "Every chat sits on the contact's timeline next to calls, notes and deals, so anyone picking up the lead sees the whole story." },
      { title: "History stays with the business", body: "When a salesperson changes or leaves, the conversations stay in the CRM and the customer relationship stays with you." },
      { title: "Follow-ups from chats", body: "Unanswered chats and promised callbacks become follow-up tasks so leads do not go cold." },
      { title: "Works with SMARA CRM", body: "BeeWhat feeds SMARA CRM out of the box and can be connected to other CRMs through workflow automation." },
    ],
    steps: [
      "Connect your business WhatsApp number to BeeWhat.",
      "Messages start flowing into the CRM, matched to existing contacts or saved as new ones.",
      "Your team works from the CRM with the complete chat history in front of them.",
    ],
    connects: ["SMARA CRM", "VrindaCRM Pro", "Other CRMs via workflow automation"],
    faqs: [
      { q: "What is BeeWhat?", a: "BeeWhat is a zero-touch WhatsApp CRM from Vrinda Business Solution. It automatically stores every WhatsApp message in your CRM against the right contact, so your team never has to copy chats or update records by hand." },
      { q: "What does zero-touch mean?", a: "It means nobody on your team has to do anything for a chat to be recorded. Once your number is connected, messages are saved to the CRM as they happen." },
      { q: "What happens when a new number messages us?", a: "BeeWhat creates a new contact for that number and attaches the conversation, so new enquiries become leads automatically." },
      { q: "Which CRM does BeeWhat work with?", a: "BeeWhat works with SMARA CRM and VrindaCRM Pro directly, and can be connected to other CRMs through our workflow automation service." },
    ],
    related: ["smara-crm", "workflow-automation", "ai-agents"],
    schemaType: "SoftwareApplication",
    externalUrl: BEEWHAT_URL,
  },
  {
    slug: "erp-setup",
    kind: "product",
    name: "ERP Setup",
    short: "ERP Setup",
    summary: "ERP set up for how you work: accounts, GST, inventory, purchase, sales and branches.",
    seoTitle: "ERP Setup & Implementation for Growing Businesses in India",
    seoDescription:
      "ERP setup and implementation for Indian businesses: accounts, GST invoicing, inventory, purchase, sales and multi-branch. Data migration and training included.",
    keywords: ["ERP implementation", "ERP software for small business India", "ERP setup", "GST ERP", "inventory management ERP", "VrindaERP"],
    h1: "ERP set up around the way your business already works",
    intro:
      "An ERP only helps if it matches how your business runs. We set up VrindaERP Suite for your accounts, GST invoicing, inventory, purchase, sales and branches, move your data across from Tally or Excel, and train your team until it is part of the daily routine.",
    audience: [
      "Traders, distributors and manufacturers outgrowing Tally and Excel",
      "Businesses with several branches or warehouses that need one view of stock",
      "Owners who want sales, purchase and accounts in one system",
    ],
    features: [
      { title: "Accounts and GST", body: "Ledgers, GST-ready invoices, e-way bills and returns data in the same system as your sales and purchase." },
      { title: "Inventory", body: "Stock by item, batch and warehouse, with reorder levels and transfers between locations." },
      { title: "Purchase and sales", body: "Quotes, orders, invoices and payments linked end to end, so every rupee can be traced." },
      { title: "Manufacturing", body: "Bills of materials, production orders and consumption for businesses that make what they sell." },
      { title: "Multi-branch", body: "Each branch runs its own books while owners see consolidated numbers." },
      { title: "Dashboards", body: "Sales, receivables, payables and stock value on one screen, updated as work happens." },
    ],
    steps: [
      "Process study: we document how orders, stock and money move through your business.",
      "Configuration: modules, approvals, numbering, taxes and reports set up to match.",
      "Data migration from Tally, Excel or your old software, then a parallel run to check the numbers.",
      "Go-live with on-site or remote training and support during the first closing cycle.",
    ],
    connects: ["Tally", "SMARA CRM", "Payroll & Attendance", "Banks and payment gateways", "Workflow automation"],
    faqs: [
      { q: "What does ERP setup include?", a: "Process study, configuration of VrindaERP Suite for your business, data migration from Tally or Excel, user training and support through go-live and the first closing cycle." },
      { q: "How long does an ERP implementation take?", a: "A focused setup for a single business typically takes a few weeks. Multi-branch or manufacturing setups take longer. You get a timeline after the process study." },
      { q: "Can we keep using Tally?", a: "Yes. Many clients keep Tally for statutory accounting and run operations in the ERP, with data synced between the two." },
      { q: "Is the ERP GST compliant?", a: "Yes. Invoices, credit notes and returns data are GST-ready, and e-way bill details can be generated from the same records." },
    ],
    related: ["payroll-attendance-system", "smara-crm", "workflow-automation"],
    schemaType: "SoftwareApplication",
  },
  {
    slug: "payroll-attendance-system",
    kind: "product",
    name: "Payroll & Attendance System",
    short: "Payroll & Attendance",
    summary: "Attendance, leave, shifts and payroll with PF, ESI, PT and TDS, from punch-in to payslip.",
    seoTitle: "Payroll & Attendance Management System with PF, ESI and TDS",
    seoDescription:
      "Payroll and attendance software for Indian businesses: mobile and biometric attendance, shifts, leave, overtime, PF, ESI, PT, TDS and payslips in one system.",
    keywords: ["payroll software India", "attendance management system", "HRMS", "biometric attendance software", "geo-fencing attendance app", "payroll with PF ESI"],
    h1: "Attendance in, payroll out, without the month-end spreadsheet",
    intro:
      "Attendance and payroll are usually two systems and a spreadsheet in between. Our Payroll & Attendance System records attendance from mobile and biometric devices, applies your shift, leave and overtime rules, and turns the month into salaries, statutory deductions and payslips.",
    audience: [
      "Businesses paying field staff, shop staff or factory workers",
      "HR teams that rebuild salary sheets from attendance every month",
      "Owners who want overtime and leave applied the same way every time",
    ],
    features: [
      { title: "Mobile attendance", body: "Staff punch in from their phone with location and selfie checks, useful for field and multi-site teams." },
      { title: "Biometric device sync", body: "Punches from supported biometric devices flow into the same attendance register." },
      { title: "Shifts, leave and overtime", body: "Your shift timings, leave policy, late marks and overtime rules are applied automatically." },
      { title: "Statutory deductions", body: "PF, ESI, professional tax and TDS calculated with each payroll run." },
      { title: "Payslips and bank file", body: "Payslips for every employee and a salary transfer file for your bank." },
      { title: "Employee self-service", body: "Employees apply for leave, see attendance and download payslips from the app." },
    ],
    steps: [
      "We record your shifts, leave policy, salary structures and statutory settings.",
      "Employees and devices are added, and staff install the attendance app.",
      "We run the first payroll alongside your current method so you can compare before switching.",
    ],
    connects: ["ERP Setup", "Biometric devices", "Bank salary uploads", "Workflow automation"],
    faqs: [
      { q: "Does the system calculate PF, ESI, PT and TDS?", a: "Yes. Statutory deductions are calculated in every payroll run based on the salary structure and settings for each employee." },
      { q: "Can field staff mark attendance from their phone?", a: "Yes. Staff can punch in from the mobile app with location and selfie verification, and those punches go into the same register as biometric devices." },
      { q: "Can it handle multiple shifts and sites?", a: "Yes. You can define shifts, weekly offs and rules per site or per group of employees." },
      { q: "Does payroll connect to our ERP?", a: "Yes. Salary journals can be posted to VrindaERP Suite so accounts are updated after each payroll run." },
    ],
    related: ["erp-setup", "workflow-automation", "ai-agents"],
    schemaType: "SoftwareApplication",
  },
  {
    slug: "workflow-automation",
    kind: "product",
    name: "Workflow Automation",
    short: "Workflow Automation",
    summary: "Your apps connected and repetitive work automated, on n8n that you own.",
    seoTitle: "Workflow Automation with n8n: Connect Your Business Apps",
    seoDescription:
      "Workflow automation built on self-hosted n8n. We connect your CRM, ERP, WhatsApp, email and sheets so data moves on its own and repetitive work disappears.",
    keywords: ["workflow automation", "business process automation", "n8n automation agency", "n8n expert India", "automate business workflows", "AutoFlow"],
    h1: "Repetitive work, handled by workflows instead of people",
    intro:
      "Most teams spend hours moving data between apps: copying leads into the CRM, sending the same reminder, updating a sheet after every invoice. We find those tasks and replace them with workflows on n8n, self-hosted for you, so the work happens on its own and you own the setup.",
    audience: [
      "Teams copying data between apps by hand",
      "Businesses using several tools that do not talk to each other",
      "Anyone who wants automation without paying per task to a SaaS tool",
    ],
    features: [
      { title: "Process audit", body: "We list the repetitive tasks in your week and rank them by hours saved." },
      { title: "Self-hosted n8n", body: "Your automation runs on your own server or cloud account, with no per-task fees." },
      { title: "Hundreds of integrations", body: "CRM, ERP, WhatsApp, email, Google Sheets, payment gateways and almost any app with an API." },
      { title: "Monitoring and alerts", body: "Failed runs alert the right person with the reason, so problems are fixed before anyone notices." },
      { title: "Documented handover", body: "Every workflow is documented and your team is trained to change and add workflows." },
    ],
    steps: [
      "Audit: we find the tasks worth automating first.",
      "Build: workflows are built and tested on your n8n instance.",
      "Run: monitoring is switched on and your team is trained to maintain them.",
    ],
    connects: ["SMARA CRM", "BeeWhat", "ERP Setup", "Google Workspace", "Microsoft 365", "Razorpay", "Any REST API"],
    faqs: [
      { q: "What is workflow automation?", a: "Workflow automation means repetitive steps, like copying a lead into the CRM or sending a payment reminder, run on their own when something happens, without a person doing them." },
      { q: "Why n8n?", a: "n8n is an open-source automation platform that can be self-hosted. You keep your data on your own server, pay no per-task fees and can extend workflows with code when needed." },
      { q: "Can non-technical staff manage the workflows?", a: "Yes. n8n has a visual editor. We build the first workflows and train your team to adjust and add new ones." },
      { q: "What can be automated?", a: "Lead routing, follow-up messages, invoice and payment reminders, report generation, data sync between CRM and ERP, approvals and notifications are common starting points." },
    ],
    related: ["ai-agents", "agentic-ai", "smara-crm"],
    schemaType: "Service",
  },
  {
    slug: "ai-agents",
    kind: "product",
    name: "AI Agents",
    short: "AI Agents",
    summary: "AI agents that answer customers, qualify leads and handle back-office tasks around the clock.",
    seoTitle: "AI Agent Development for Sales, Support and Operations",
    seoDescription:
      "Custom AI agents for sales, support and back office: WhatsApp and website agents, answers from your documents, and invoice reading into your ERP.",
    keywords: ["AI agent development company", "AI agents for business", "WhatsApp AI agent", "AI chatbot for business India", "AI customer support agent"],
    h1: "AI agents that do one job well, around the clock",
    intro:
      "An AI agent is software that understands a request, decides what to do and does it, using your data and your tools. We build agents for a specific job, such as answering customer questions on WhatsApp, qualifying leads, or reading invoices into your ERP, and connect them to the systems you already use.",
    audience: [
      "Businesses missing enquiries after hours or at peak times",
      "Support teams answering the same questions every day",
      "Back offices typing data from documents into software",
    ],
    features: [
      { title: "Sales agent", body: "Answers product and price questions on WhatsApp or your website, qualifies the lead and books a call into your CRM." },
      { title: "Support agent", body: "Answers from your own documents, policies and order data, and hands over to a person when it should." },
      { title: "Document agent", body: "Reads invoices, purchase orders and forms, and enters the data into your ERP or CRM for review." },
      { title: "Internal assistant", body: "Lets your team ask questions like \"which invoices are overdue this week?\" in plain language." },
      { title: "Guardrails", body: "Agents only act within limits you set, keep logs of every action and escalate when unsure." },
    ],
    steps: [
      "Pick one job with a clear measure, such as replies answered or documents processed.",
      "We build the agent on your data, connect it to your tools and test it against real examples.",
      "Launch with human review, then widen what the agent handles as it proves reliable.",
    ],
    connects: ["BeeWhat", "SMARA CRM", "ERP Setup", "Website chat", "Email", "Your documents and knowledge base"],
    faqs: [
      { q: "What is an AI agent?", a: "An AI agent is software that uses a large language model to understand a request, decide on the next step and take action through connected tools, such as replying to a customer or updating a CRM record." },
      { q: "What is the difference between an AI agent and a chatbot?", a: "A chatbot answers questions. An AI agent can also act: look up an order, create a lead, book a meeting or update a record, within limits you set." },
      { q: "Will the agent give wrong answers?", a: "Agents are restricted to your approved data, tested against real questions before launch, and set to hand over to a person when they are not confident." },
      { q: "Where can the agent work?", a: "On WhatsApp, your website, email or inside your internal tools, connected to your CRM and ERP." },
    ],
    related: ["agentic-ai", "workflow-automation", "beewhat"],
    schemaType: "Service",
  },
  {
    slug: "agentic-ai",
    kind: "product",
    name: "Agentic AI",
    short: "Agentic AI",
    summary: "AI systems that plan and run multi-step processes across your tools, with people in control.",
    seoTitle: "Agentic AI Solutions: Multi-Step AI for Business Operations",
    seoDescription:
      "Agentic AI systems that plan and complete multi-step business processes across your CRM, ERP and email, with approval steps, audit logs and guardrails built in.",
    keywords: ["agentic AI", "agentic AI solutions", "agentic AI services India", "multi-agent systems", "AI process automation", "autonomous AI workflows"],
    h1: "Agentic AI that runs a whole process, not just one step",
    intro:
      "Agentic AI goes beyond a single agent. It is a system of AI agents and tools that can plan a multi-step process, carry it out across your software and check its own work, such as taking an order from a WhatsApp chat through stock check, invoice and dispatch update. People stay in control through approval steps and a full audit log.",
    audience: [
      "Operations teams with processes that cross several systems",
      "Businesses that have automated simple tasks and want to handle the judgment-heavy ones",
      "Leaders who want AI with approvals, logs and clear limits",
    ],
    features: [
      { title: "Planning and execution", body: "The system breaks a goal into steps, chooses the right tool for each and completes them in order." },
      { title: "Multiple specialised agents", body: "Separate agents for reading, checking, deciding and acting, each with its own limited permissions." },
      { title: "Human approval steps", body: "High-value or unusual actions wait for a person to approve before anything changes." },
      { title: "Audit trail", body: "Every decision and action is logged with the reason, so you can review and improve the process." },
      { title: "Built on your systems", body: "Works with your CRM, ERP, payroll, email and workflow automation instead of replacing them." },
    ],
    steps: [
      "Process mapping: we document the process, decisions and exceptions with the people who run it today.",
      "Design: agents, tools, permissions and approval points are defined before anything is built.",
      "Pilot: the system runs alongside your team on real cases, and results are compared.",
      "Scale: approval thresholds are relaxed only where the system has proven reliable.",
    ],
    connects: ["AI Agents", "Workflow Automation", "SMARA CRM", "ERP Setup", "Payroll & Attendance"],
    faqs: [
      { q: "What is agentic AI?", a: "Agentic AI refers to AI systems that can plan and carry out multi-step tasks on their own, using tools and data, and adjust based on results, rather than only answering a single question." },
      { q: "How is agentic AI different from AI agents?", a: "An AI agent usually does one job. Agentic AI coordinates several agents and tools to complete a whole process from start to finish, with checks and approvals along the way." },
      { q: "Is agentic AI safe to use in operations?", a: "It is when it is designed with limits. We give each agent only the permissions it needs, add human approval for important actions and log every step." },
      { q: "Which processes suit agentic AI?", a: "Processes with several steps across systems and some judgment, such as order processing, vendor onboarding, collections follow-up and recruitment screening." },
    ],
    related: ["ai-agents", "workflow-automation", "erp-setup"],
    schemaType: "Service",
  },
  {
    slug: "vrinda-crm-pro",
    kind: "product",
    name: "VrindaCRM Pro",
    short: "VrindaCRM Pro",
    summary: "A CRM built around your exact sales process, with your branding and source code you own.",
    seoTitle: "VrindaCRM Pro: Custom CRM Development, Source Code Yours",
    seoDescription:
      "VrindaCRM Pro is a custom CRM built around your sales process. White-label ready, WhatsApp, email and SMS built in, and the source code is yours.",
    keywords: ["custom CRM development", "white label CRM", "CRM development company India", "bespoke CRM software", "VrindaCRM"],
    h1: "A CRM built around your process, and owned by you",
    intro:
      "When a ready-made CRM forces your team to work around it, VrindaCRM Pro is built the other way round. We start from your sales process and build the CRM to match, with your branding, your fields and your reports. The source code is yours.",
    audience: [
      "Businesses with a sales process that ready-made CRMs cannot model",
      "Companies that want to resell a CRM under their own brand",
      "Teams that need full ownership of their customer data and software",
    ],
    features: [
      { title: "Built to your process", body: "Stages, fields, approvals and screens designed around how your team actually sells." },
      { title: "Multi-channel communication", body: "WhatsApp, email and SMS from inside the CRM, with every message on the customer record." },
      { title: "AI lead scoring", body: "Leads ranked by likelihood to convert, so your team calls the right people first." },
      { title: "White-label ready", body: "Your logo, colours and domain, ready to offer to your own clients." },
      { title: "Source code ownership", body: "All code, assets and documentation become yours on final payment." },
    ],
    steps: [
      "Discovery: we map your sales process, roles and reports.",
      "Design: screens and data model are agreed before development starts.",
      "Build in short sprints with a demo every week.",
      "Launch, training and handover of code and documentation.",
    ],
    connects: ["BeeWhat", "ERP Setup", "Workflow Automation", "Payment gateways", "Tally", "Any REST API"],
    faqs: [
      { q: "Do we own the source code?", a: "Yes. All code, assets and documentation become your intellectual property on final payment, with deployment guides so you are never dependent on us." },
      { q: "Can VrindaCRM Pro be white-labelled?", a: "Yes. We rebrand it with your logo, colours and domain so you can use it or offer it to your clients as your own product." },
      { q: "How long does a custom CRM take?", a: "A first working version usually takes four to eight weeks, depending on scope. You get a sprint-by-sprint plan after discovery." },
    ],
    related: ["smara-crm", "beewhat", "workflow-automation"],
    schemaType: "SoftwareApplication",
  },
];

export const services: Offering[] = [
  {
    slug: "cloud-devops",
    kind: "service",
    name: "Cloud & DevOps",
    short: "Cloud & DevOps",
    summary: "Cloud setup, migration and managed operations on AWS, Azure and Google Cloud.",
    seoTitle: "Cloud & DevOps Services: AWS, Azure and Google Cloud",
    seoDescription:
      "Cloud architecture, migration and managed DevOps on AWS, Azure and Google Cloud. CI/CD pipelines, monitoring, backups and cost reviews for your applications.",
    keywords: ["cloud migration services India", "DevOps services", "AWS consulting", "managed cloud services", "CI/CD setup"],
    h1: "Cloud and DevOps that keep your software running",
    intro:
      "We design, migrate and run cloud infrastructure for business applications on AWS, Microsoft Azure and Google Cloud, with automated deployments, monitoring and backups set up from the start.",
    audience: ["Businesses moving from a local server to the cloud", "Teams deploying by hand", "Companies with a cloud bill nobody has reviewed"],
    features: [
      { title: "Architecture and migration", body: "Right-sized infrastructure and a migration plan that avoids downtime." },
      { title: "CI/CD pipelines", body: "Automated build, test and deploy with GitHub Actions or your existing tools." },
      { title: "Monitoring and backups", body: "Alerts, logs and tested backups so problems are caught early and data is safe." },
      { title: "Cost reviews", body: "Regular reviews of usage and spend, with changes that reduce the bill." },
    ],
    steps: ["Assess the current setup", "Plan and migrate", "Automate deployments", "Monitor and optimise"],
    connects: ["AWS", "Microsoft Azure", "Google Cloud", "DigitalOcean", "Docker", "Kubernetes", "Terraform"],
    faqs: [
      { q: "Which cloud providers do you work with?", a: "AWS, Microsoft Azure and Google Cloud, plus DigitalOcean and Hetzner for cost-sensitive deployments." },
      { q: "Can you host the software you build for us?", a: "Yes. We can host and manage it in your own cloud account so you keep ownership, or hand it over to your team." },
    ],
    related: ["cybersecurity", "tech-consultancy", "workflow-automation"],
    schemaType: "Service",
  },
  {
    slug: "cybersecurity",
    kind: "service",
    name: "Cybersecurity",
    short: "Cybersecurity",
    summary: "VAPT, security audits and compliance support for your applications and infrastructure.",
    seoTitle: "Cybersecurity Services: VAPT, Security Audits and Compliance",
    seoDescription:
      "VAPT, security audits and ISO 27001 and GDPR compliance support for your business applications and cloud infrastructure, with re-testing after fixes.",
    keywords: ["VAPT services India", "penetration testing", "security audit", "ISO 27001 consulting", "application security"],
    h1: "Find the weak spots before someone else does",
    intro:
      "We test your applications and infrastructure the way an attacker would, explain what we find in plain language and help your team fix it, with compliance support for ISO 27001 and GDPR.",
    audience: ["Businesses handling customer or payment data", "Companies preparing for an audit or certification", "Teams launching a new application"],
    features: [
      { title: "VAPT", body: "Vulnerability assessment and penetration testing for web apps, APIs and networks." },
      { title: "Security audits", body: "Configuration and access reviews across cloud, servers and business software." },
      { title: "Compliance support", body: "Gap analysis and documentation for ISO 27001 and GDPR." },
      { title: "Fix verification", body: "We re-test after fixes so you know the issues are closed." },
    ],
    steps: ["Agree scope", "Test", "Report with fixes", "Re-test"],
    connects: ["Web applications", "APIs", "Cloud accounts", "Office networks"],
    faqs: [
      { q: "What is VAPT?", a: "Vulnerability assessment and penetration testing: a structured check for security weaknesses followed by controlled attempts to exploit them, so you know which issues are real and how serious they are." },
      { q: "How often should we test?", a: "At least once a year and after every major release or infrastructure change." },
    ],
    related: ["cloud-devops", "tech-consultancy", "erp-setup"],
    schemaType: "Service",
  },
  {
    slug: "tech-consultancy",
    kind: "service",
    name: "Tech Consultancy",
    short: "Tech Consultancy",
    summary: "Technology strategy, software selection and CTO-as-a-service for growing businesses.",
    seoTitle: "Tech Consultancy & CTO-as-a-Service for Growing Businesses",
    seoDescription:
      "Independent technology advice for growing businesses: digital transformation roadmaps, software selection, architecture reviews and CTO-as-a-service.",
    keywords: ["CTO as a service India", "technology consulting", "digital transformation consultant", "software selection", "IT strategy"],
    h1: "Technology decisions, made with someone who has done it before",
    intro:
      "Choosing software, planning a digital transformation or hiring a tech team is expensive to get wrong. We give independent advice, review architecture and vendors, and can act as your part-time CTO.",
    audience: ["Owners planning a move away from spreadsheets", "Companies choosing between software vendors", "Startups without a full-time CTO"],
    features: [
      { title: "Digital transformation roadmap", body: "Which processes to digitise first, with what, and in what order." },
      { title: "Software selection", body: "Requirements, vendor shortlist and comparison so you buy the right thing." },
      { title: "Architecture reviews", body: "An outside view of your systems, risks and technical debt." },
      { title: "CTO-as-a-service", body: "Part-time technical leadership for planning, hiring and vendor management." },
    ],
    steps: ["Understand goals", "Review current systems", "Recommend", "Support execution"],
    connects: ["All Vrinda products", "Your existing vendors"],
    faqs: [
      { q: "Will you only recommend your own products?", a: "No. We recommend what fits. If an existing tool or another vendor suits you better, we will say so." },
      { q: "What is CTO-as-a-service?", a: "Part-time technical leadership: a senior technologist who plans your roadmap, reviews vendors and code, and helps hire, without the cost of a full-time CTO." },
    ],
    related: ["erp-setup", "agentic-ai", "cloud-devops"],
    schemaType: "Service",
  },
];

export const allOfferings = [...products, ...services];

export function getOffering(slug: string) {
  return allOfferings.find((o) => o.slug === slug);
}

export function offeringHref(o: Offering) {
  if (o.externalUrl) return o.externalUrl;
  return o.kind === "product" ? `/products/${o.slug}` : `/services/${o.slug}`;
}

export const industries = [
  { name: "Real estate", body: "Broker CRM, WhatsApp lead capture and site-visit follow-ups." },
  { name: "Manufacturing", body: "Production, inventory and multi-shift payroll in one flow." },
  { name: "Distribution and trading", body: "GST invoicing, stock across warehouses and dealer orders." },
  { name: "Healthcare and clinics", body: "Appointment enquiries, patient follow-ups and staff attendance." },
  { name: "Education", body: "Admission enquiries on WhatsApp, counsellor follow-ups and fee tracking." },
  { name: "Retail and e-commerce", body: "Customer data, order sync and inventory across channels." },
  { name: "Logistics", body: "Field staff attendance, dispatch updates and customer notifications." },
  { name: "Professional services", body: "Client CRM, billing and automated reminders." },
];

export const process = [
  { title: "Discovery", body: "We study your goals, users and how work moves today, before suggesting anything." },
  { title: "Blueprint", body: "Screens, data and integrations are agreed and signed off before development." },
  { title: "Build", body: "Short sprints with a working demo every week." },
  { title: "Launch", body: "Data migration, training and go-live support." },
  { title: "Support", body: "Monitoring, fixes and improvements after launch." },
];

export const generalFaqs: Faq[] = [
  { q: "What does Vrinda Business Solution do?", a: "Vrinda Business Solution builds and sets up business software for growing companies: SMARA CRM, BeeWhat WhatsApp CRM, ERP setup, a payroll and attendance system, workflow automation, AI agents and agentic AI, plus cloud, security and technology consulting." },
  { q: "Which product should I start with?", a: "Start where the most time or money is being lost. If leads slip through on WhatsApp, start with BeeWhat and SMARA CRM. If month-end is painful, start with ERP setup or payroll. If people copy data between apps, start with workflow automation." },
  { q: "Do you work with businesses outside India?", a: "Yes. We are based in India and work with clients worldwide through remote engagements." },
  { q: "Do we own the software and data?", a: "Your data is always yours. For custom builds such as VrindaCRM Pro, the source code also becomes yours on final payment." },
  { q: "Can you connect your products to our existing software?", a: "Yes. We regularly integrate with Tally, SAP, Salesforce, QuickBooks, Razorpay, Stripe and any software with an API." },
  { q: "Do you provide support after launch?", a: "Yes. Every engagement includes post-launch support, and we offer monthly maintenance for fixes, security updates, monitoring and small improvements." },
];
