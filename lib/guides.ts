import type { Faq } from "./catalog";

export type GuideSection = { heading: string; paragraphs?: string[]; list?: string[]; ordered?: boolean };

export type Guide = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  keywords: string[];
  published: string;
  updated: string;
  /** Product slugs this guide supports; linked from the guide and back from the product pages. */
  products: string[];
  intro: string;
  sections: GuideSection[];
  faqs: Faq[];
};

export const guides: Guide[] = [
  {
    slug: "save-whatsapp-chats-to-crm",
    title: "How to save WhatsApp chats to your CRM automatically",
    seoTitle: "How to Save WhatsApp Chats to Your CRM Automatically",
    description:
      "Why WhatsApp sales conversations go missing, the three ways businesses try to record them, and how to capture every chat in your CRM with no manual entry.",
    keywords: ["save WhatsApp chats to CRM", "WhatsApp CRM integration", "WhatsApp lead management", "export WhatsApp chat to CRM", "zero touch CRM"],
    published: "2026-10-23",
    updated: "2026-10-23",
    products: ["beewhat", "smara-crm"],
    intro:
      "For many Indian businesses, WhatsApp is where sales actually happen. Customers ask prices, send requirements and confirm orders in chat. The CRM, if there is one, only hears about it when someone remembers to type it in. This guide explains why that gap costs you leads and how to close it.",
    sections: [
      {
        heading: "Why WhatsApp conversations go missing",
        paragraphs: [
          "The problem is rarely the CRM. It is that the conversation and the record live in two places, and a person has to carry information from one to the other.",
        ],
        list: [
          "Chats sit on salespeople's personal phones, so the business cannot see them.",
          "Updating the CRM after every chat is the first task dropped on a busy day.",
          "When a salesperson changes role or leaves, their customer history leaves with them.",
          "Managers cannot see which enquiries were answered, or how quickly.",
        ],
      },
      {
        heading: "Three ways businesses try to fix it",
        list: [
          "Manual export: WhatsApp's Export Chat option saves one conversation at a time as a text file. It works for an occasional record but not for daily sales.",
          "A shared business number: everyone answers from one WhatsApp Business account. Customers see one name, but the conversations still are not linked to leads, deals or follow-ups.",
          "Automatic capture: every message is saved to the right contact in the CRM as it is sent or received, without anyone doing anything. This is what a zero-touch WhatsApp CRM does.",
        ],
      },
      {
        heading: "What to look for in a WhatsApp CRM",
        list: [
          "New numbers become new contacts automatically, with the first message attached.",
          "Every message appears on the contact's timeline next to calls, notes and deals.",
          "Salespeople keep chatting the way they do today, with no extra steps.",
          "Managers see conversations based on access rules you control.",
          "Unanswered chats and promised callbacks turn into follow-up tasks.",
          "You can export your data, and the connection follows WhatsApp's terms for business use.",
        ],
      },
      {
        heading: "How BeeWhat handles it",
        ordered: true,
        list: [
          "Connect your WhatsApp by logging in with Facebook. You keep using the WhatsApp Business app on your phone with the same number.",
          "Every enquiry is recorded on the customer's history, and you can bring in up to six months of past chats when you connect.",
          "Quick replies such as /quote and /confirm turn the conversation into an order with GST quotes, invoices, payment checks and follow-ups.",
        ],
        paragraphs: [
          "BeeWhat is built for Indian manufacturers who sell on WhatsApp, and you can export everything to Excel at any time. It has a free 14-day trial.",
        ],
      },
    ],
    faqs: [
      { q: "Can I export WhatsApp chats to Excel?", a: "WhatsApp's Export Chat feature saves a single conversation as a text file, which you can paste into a spreadsheet. It is manual and one chat at a time, so it does not suit daily sales work." },
      { q: "Do salespeople need to change how they use WhatsApp?", a: "Not with a tool such as BeeWhat that works alongside the WhatsApp Business app. They keep chatting with customers as usual and the messages are recorded in the background." },
      { q: "Is it okay to store customer chats in a CRM?", a: "Business conversations are normal business records, but treat them as personal data: collect only what you need, tell customers how you use it, restrict access and keep it secure, in line with India's Digital Personal Data Protection Act." },
    ],
  },
  {
    slug: "crm-for-small-business-india",
    title: "Choosing a CRM for a small business in India",
    seoTitle: "CRM for Small Business in India: What to Look For",
    description:
      "Signs you need a CRM, the features that matter for Indian sales teams, ready-made versus custom CRM, and how to roll one out without your team resisting it.",
    keywords: ["CRM for small business India", "best CRM for small business", "sales CRM India", "lead management software", "CRM with WhatsApp"],
    published: "2026-10-23",
    updated: "2026-10-23",
    products: ["smara-crm", "vrinda-crm-pro", "beewhat"],
    intro:
      "A CRM is simply one place where every lead, conversation and follow-up lives, so nothing depends on someone's memory. For a small business the right CRM is the one your team will actually use every day. Here is how to choose it.",
    sections: [
      {
        heading: "Signs you need a CRM",
        list: [
          "Leads are tracked in Excel sheets, notebooks or WhatsApp.",
          "You find out about a lost deal only when the customer has bought elsewhere.",
          "Follow-ups slip when a salesperson is on leave.",
          "You cannot say which lead source brings the most sales.",
          "Getting a pipeline update means asking each person.",
        ],
      },
      {
        heading: "Features that matter for Indian sales teams",
        list: [
          "Lead capture from your website, Google and Meta ads, IndiaMART, JustDial and phone calls.",
          "WhatsApp conversations saved on the lead, because that is where customers talk.",
          "A next action and date on every lead, with reminders for overdue follow-ups.",
          "A pipeline board with your own stages and deal values.",
          "Automatic assignment by region, product or rotation.",
          "Reports by source, salesperson and stage that owners can read in a minute.",
          "A mobile app for field sales.",
        ],
      },
      {
        heading: "Ready-made or custom?",
        paragraphs: [
          "A ready-made CRM such as SMARA CRM is set up in days and suits most sales processes. A custom CRM such as VrindaCRM Pro is built around an unusual process, carries your own branding, and the source code is yours. Start ready-made unless your process genuinely cannot fit, or you plan to offer the CRM to your own clients.",
        ],
      },
      {
        heading: "Rolling it out without resistance",
        ordered: true,
        list: [
          "Map your stages and lead sources before configuring anything.",
          "Import existing leads so the team starts with full history, not an empty screen.",
          "Connect lead sources first, so the CRM saves time from day one.",
          "Train in short sessions using your own leads.",
          "Review the pipeline in the CRM at every sales meeting. Teams use what managers look at.",
        ],
      },
    ],
    faqs: [
      { q: "How long does it take to set up a CRM?", a: "A ready-made CRM such as SMARA CRM can be configured, loaded with your existing leads and connected to lead sources in days. A custom CRM usually takes four to eight weeks for a first version." },
      { q: "Can a CRM capture leads from IndiaMART and JustDial?", a: "Yes. With SMARA CRM, marketplace and ad leads are connected during setup so they arrive in the CRM automatically." },
      { q: "What is the difference between a CRM and an ERP?", a: "A CRM manages customers and sales: leads, follow-ups and deals. An ERP manages operations and money: stock, purchase, invoicing and accounts. Growing businesses often connect the two so a won deal becomes an invoice automatically." },
    ],
  },
  {
    slug: "signs-you-have-outgrown-tally",
    title: "Tally or ERP? Seven signs your business has outgrown spreadsheets and accounting software",
    seoTitle: "Tally or ERP? 7 Signs Your Business Needs an ERP",
    description:
      "Seven practical signs that accounting software and spreadsheets are holding your business back, whether to keep Tally alongside an ERP, and how an ERP move works.",
    keywords: ["Tally vs ERP", "when to move to ERP", "ERP for small business India", "ERP implementation India", "Tally integration ERP"],
    published: "2026-10-23",
    updated: "2026-10-23",
    products: ["erp-setup", "payroll-attendance-system", "workflow-automation"],
    intro:
      "Tally is excellent accounting software, and many businesses should keep using it. The question is not whether to replace it, but whether your operations (orders, stock, purchase and branches) have grown beyond what accounting software and spreadsheets can coordinate.",
    sections: [
      {
        heading: "Seven signs it is time",
        ordered: true,
        list: [
          "Stock in the system rarely matches stock on the shelf.",
          "Sales, purchase and accounts live in different files, and someone reconciles them every month.",
          "Month-end closing takes days rather than hours.",
          "You run several branches or warehouses and cannot see them together.",
          "Approvals for discounts, purchases and payments happen over WhatsApp with no record.",
          "You manufacture, and material consumption is worked out after the fact.",
          "As the owner, you cannot see today's sales, receivables and stock without asking someone.",
        ],
      },
      {
        heading: "Keep Tally, add an ERP",
        paragraphs: [
          "Many businesses keep Tally for statutory accounting and run daily operations in an ERP, with entries synced between them. Accountants keep the tool they know, and the rest of the business works from one live system.",
        ],
      },
      {
        heading: "How an ERP move works",
        ordered: true,
        list: [
          "Process study: document how orders, stock and money move today.",
          "Configuration: modules, approvals, numbering, GST and reports set up to match.",
          "Data migration from Tally, Excel or old software, followed by a parallel run to check the numbers agree.",
          "Go-live with training and support through the first month-end closing.",
        ],
      },
    ],
    faqs: [
      { q: "Do we have to stop using Tally if we adopt an ERP?", a: "No. Keeping Tally for statutory accounting and syncing it with an ERP for operations is a common and sensible setup." },
      { q: "How long does an ERP implementation take?", a: "A focused setup for a single business typically takes a few weeks. Multi-branch and manufacturing setups take longer. The timeline should come from a process study, not a guess." },
      { q: "Is an ERP only for large companies?", a: "No. The signs above appear in businesses with a handful of staff. What matters is how many moving parts you coordinate, not headcount." },
    ],
  },
  {
    slug: "payroll-pf-esi-pt-tds-checklist",
    title: "Payroll with PF, ESI, PT and TDS: a monthly checklist for growing Indian businesses",
    seoTitle: "Payroll with PF, ESI, PT and TDS: A Monthly Checklist",
    description:
      "What PF, ESI, professional tax and TDS mean for your payroll, a month-by-month checklist from attendance to payslip, and how to automate it.",
    keywords: ["payroll with PF ESI", "payroll checklist India", "payroll software India", "attendance and payroll software", "PF ESI PT TDS"],
    published: "2026-10-23",
    updated: "2026-10-23",
    products: ["payroll-attendance-system", "erp-setup"],
    intro:
      "Payroll in India is more than salary minus leave. Each month you apply attendance, overtime and leave rules, calculate statutory deductions, deposit them on time and give every employee a payslip. This checklist shows the moving parts. Rates, wage ceilings and due dates change, so always confirm current figures on the official EPFO, ESIC and Income Tax websites.",
    sections: [
      {
        heading: "The four statutory deductions",
        list: [
          "PF (Provident Fund): a retirement contribution from employee and employer, administered by the EPFO.",
          "ESI (Employees' State Insurance): health insurance for employees up to a wage limit, administered by the ESIC.",
          "PT (Professional Tax): a state tax on employment. Whether it applies, and the slabs, depend on the state.",
          "TDS on salary: income tax deducted each month based on the employee's expected annual income and chosen tax regime.",
        ],
        paragraphs: [
          "India's new labour codes are revising how wages are defined for these calculations, which is another reason to keep salary structures in a system that can be updated in one place.",
        ],
      },
      {
        heading: "Monthly payroll checklist",
        ordered: true,
        list: [
          "Close attendance: punches from mobile and biometric devices, leave, weekly offs and holidays.",
          "Apply rules: late marks, half days, overtime and shift allowances.",
          "Update changes: new joiners, exits, increments and one-time payments such as incentives.",
          "Run payroll and calculate PF, ESI, PT and TDS for each employee.",
          "Review the register for exceptions before approving.",
          "Pay salaries through a bank transfer file.",
          "Deposit statutory dues and file returns by their due dates.",
          "Share payslips with every employee.",
          "Post the salary journal to accounts.",
        ],
      },
      {
        heading: "Where payroll usually goes wrong",
        list: [
          "Attendance and payroll in separate systems, joined by a spreadsheet.",
          "Overtime and leave rules applied differently each month.",
          "Statutory settings not updated after a rule change.",
          "Field staff attendance that cannot be verified.",
        ],
      },
    ],
    faqs: [
      { q: "Can software calculate PF, ESI, PT and TDS automatically?", a: "Yes. A payroll and attendance system calculates statutory deductions from each employee's salary structure every month. Keep the statutory settings current when rules change." },
      { q: "How can field staff mark attendance?", a: "Through a mobile app with location and selfie checks, so punches from the field go into the same register as office biometric devices." },
      { q: "Where can I check current PF and ESI rates?", a: "On the official EPFO (epfindia.gov.in) and ESIC (esic.gov.in) websites. Professional tax rules are published by each state, and TDS rules by the Income Tax Department." },
    ],
  },
  {
    slug: "ai-agents-vs-agentic-ai",
    title: "AI agents vs agentic AI: what the difference means for your business",
    seoTitle: "AI Agents vs Agentic AI: The Difference for Businesses",
    description:
      "A plain-language explanation of AI agents and agentic AI, examples of each in a growing business, and how to adopt them safely with approvals and audit logs.",
    keywords: ["AI agents vs agentic AI", "what is agentic AI", "AI agents for business", "agentic AI examples", "AI agent development India"],
    published: "2026-10-23",
    updated: "2026-10-23",
    products: ["ai-agents", "agentic-ai", "workflow-automation"],
    intro:
      "The terms get used interchangeably, but the difference is useful when deciding what to build. An AI agent does one job. Agentic AI coordinates several agents and tools to finish a whole process.",
    sections: [
      {
        heading: "AI agents: one job, done well",
        paragraphs: [
          "An AI agent uses a language model to understand a request, decide what to do and act through connected tools. It can answer a customer on WhatsApp from your catalogue, read an invoice into your ERP, or tell your team which payments are overdue.",
        ],
      },
      {
        heading: "Agentic AI: a whole process",
        paragraphs: [
          "Agentic AI plans a multi-step process, carries it out across several systems and checks its own work. Taking an order from a chat, checking stock, drafting the invoice and booking dispatch is one process with several decisions, and agentic AI handles it end to end.",
        ],
      },
      {
        heading: "Which one to start with",
        list: [
          "Start with an AI agent when one repetitive job takes up a lot of time, such as answering the same questions or entering data from documents.",
          "Move to agentic AI when a process crosses several systems and people spend their day passing work between them.",
          "Automate fixed, rule-based steps with workflow automation first. It is cheaper and more predictable than AI for anything that does not need judgment.",
        ],
      },
      {
        heading: "Adopting AI safely",
        list: [
          "Give each agent only the data and permissions its job needs.",
          "Require human approval for high-value or unusual actions.",
          "Log every decision and action with the reason.",
          "Test against real past cases before going live.",
          "Widen what the system handles only where it has proven reliable.",
        ],
      },
    ],
    faqs: [
      { q: "Is a chatbot an AI agent?", a: "A chatbot answers questions. It becomes an AI agent when it can also act, for example by creating a lead, booking a call or updating a record within limits you set." },
      { q: "Will AI agents replace my staff?", a: "In practice they take over repetitive work such as answering common questions and typing data from documents, so staff spend more time on customers and exceptions." },
      { q: "What does an agentic AI project involve?", a: "Mapping the process with the people who run it, designing agents, tools and approval points, a pilot alongside your team on real cases, and then gradually relaxing approvals where results are reliable." },
    ],
  },
  {
    slug: "workflows-to-automate-first",
    title: "Ten workflows a small business should automate first",
    seoTitle: "10 Business Workflows to Automate First (with n8n)",
    description:
      "Ten practical automations for small and growing businesses, from lead routing to payment reminders, and why self-hosted n8n is a good place to build them.",
    keywords: ["workflow automation small business", "business process automation examples", "n8n workflow examples", "automate business tasks", "n8n automation India"],
    published: "2026-10-23",
    updated: "2026-10-23",
    products: ["workflow-automation", "smara-crm", "ai-agents"],
    intro:
      "The best first automations are the boring ones: tasks someone does many times a week, the same way each time. Here are ten that pay back quickly in most growing businesses.",
    sections: [
      {
        heading: "Ten workflows to start with",
        ordered: true,
        list: [
          "New website or ad enquiry: create the lead in the CRM, assign it and send a WhatsApp welcome.",
          "Quote follow-up: remind the salesperson and the customer if a quote has had no reply after a few days.",
          "Payment reminders: send polite reminders before and after the due date, and stop when payment arrives.",
          "Won deal to invoice: raise the invoice in the ERP when a deal is marked won.",
          "Daily sales summary: email owners yesterday's sales, collections and new leads every morning.",
          "Low stock alert: notify purchase when an item falls below its reorder level.",
          "Attendance exceptions: alert managers about absences and late marks each morning.",
          "New employee onboarding: create accounts, share documents and schedule first-week tasks.",
          "Review request: ask happy customers for a Google review after delivery.",
          "Form backup: copy every form submission to a sheet so nothing is lost if an app fails.",
        ],
      },
      {
        heading: "Why n8n",
        paragraphs: [
          "n8n is an open-source automation platform with a visual editor and hundreds of integrations. It can be self-hosted on your own server, so your data stays with you and there are no per-task fees as volume grows. When a step needs custom logic, it can run code.",
        ],
      },
      {
        heading: "Making automations reliable",
        list: [
          "Alert a named person when a workflow fails, with the reason.",
          "Document what each workflow does and who owns it.",
          "Start with one workflow, measure the hours saved, then add the next.",
        ],
      },
    ],
    faqs: [
      { q: "What is workflow automation?", a: "Repetitive steps, such as copying a lead into the CRM or sending a payment reminder, run on their own when something happens, without a person doing them." },
      { q: "Do I need a developer to use n8n?", a: "Not for day-to-day changes. n8n has a visual editor; a specialist sets up the server and first workflows, and your team can then adjust and add workflows." },
      { q: "Is workflow automation the same as AI?", a: "No. Workflow automation follows fixed rules. AI agents handle steps that need understanding or judgment. Many processes combine both." },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export function guidesForProduct(slug: string) {
  return guides.filter((g) => g.products.includes(slug));
}
