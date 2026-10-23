import type { ReactNode } from "react";

// Illustrative screens for product pages. The data is example data and is labelled as such.

function Frame({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return (
    <figure className="fragment" style={{ margin: 0 }}>
      <div className="fragment-title">
        <span>{title}</span>
        <small>Example screen</small>
      </div>
      {children}
      <figcaption className="fragment-caption">{note}</figcaption>
    </figure>
  );
}

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

function SmaraPipeline() {
  const rows = [
    { lead: "Mehta Interiors", source: "IndiaMART", stage: "Proposal sent", next: "Call today", tone: "pill-amber" },
    { lead: "Arora Foods", source: "Website", stage: "Demo booked", next: "Thu, 11:00", tone: "pill-blue" },
    { lead: "K. Reddy", source: "WhatsApp", stage: "New", next: "Assign", tone: "" },
    { lead: "Sunrise Clinics", source: "Meta ads", stage: "Won", next: "Handover", tone: "pill-teal" },
  ];
  return (
    <Frame title="Today's follow-ups" note="Every lead has a stage and a next step, so nothing waits on memory.">
      <table>
        <thead>
          <tr>
            <th scope="col">Lead</th>
            <th scope="col">Source</th>
            <th scope="col">Stage</th>
            <th scope="col">Next</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.lead}>
              <td>{r.lead}</td>
              <td>{r.source}</td>
              <td>
                <span className={`pill ${r.tone}`}>{r.stage}</span>
              </td>
              <td>{r.next}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Frame>
  );
}

function ErpSnapshot() {
  const rows = [
    { item: "Steel bracket 40mm", wh: "Pune", qty: 1240, reorder: false },
    { item: "Steel bracket 40mm", wh: "Nashik", qty: 85, reorder: true },
    { item: "Hinge set, brass", wh: "Pune", qty: 610, reorder: false },
  ];
  return (
    <Frame title="Stock by warehouse" note="Sales, purchase and stock share one record, so the numbers agree.">
      <table>
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Warehouse</th>
            <th scope="col" className="num">
              On hand
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.item + r.wh}>
              <td>{r.item}</td>
              <td>{r.wh}</td>
              <td className="num">
                {r.qty.toLocaleString("en-IN")} {r.reorder && <span className="pill pill-amber">Reorder</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Frame>
  );
}

function Payslip() {
  const earnings = [
    ["Basic", 18000],
    ["HRA", 7200],
    ["Overtime (6 hrs)", 1350],
  ] as const;
  const deductions = [
    ["PF (12%)", 2160],
    ["ESI", 0],
    ["Professional tax", 200],
  ] as const;
  const gross = earnings.reduce((s, [, v]) => s + v, 0);
  const less = deductions.reduce((s, [, v]) => s + v, 0);
  return (
    <Frame title="Payslip, March" note="Attendance, overtime and statutory deductions flow straight into the payslip.">
      <table>
        <tbody>
          <tr>
            <th scope="row">Days present</th>
            <td className="num">25 of 26</td>
          </tr>
          {earnings.map(([k, v]) => (
            <tr key={k}>
              <td>{k}</td>
              <td className="num">{inr.format(v)}</td>
            </tr>
          ))}
          {deductions.map(([k, v]) => (
            <tr key={k}>
              <td>{k}</td>
              <td className="num">−{inr.format(v)}</td>
            </tr>
          ))}
          <tr>
            <th scope="row">Net pay</th>
            <td className="num" style={{ fontWeight: 700 }}>
              {inr.format(gross - less)}
            </td>
          </tr>
        </tbody>
      </table>
    </Frame>
  );
}

function WorkflowRun() {
  const steps = [
    ["Website form submitted", "0.2s"],
    ["Lead created in SMARA CRM", "0.6s"],
    ["Assigned to Pune sales team", "0.7s"],
    ["WhatsApp welcome message sent", "1.4s"],
    ["Row added to weekly report sheet", "1.6s"],
  ];
  return (
    <Frame title="Workflow run: new enquiry" note="Five tasks that used to take someone ten minutes, done in under two seconds.">
      <table>
        <tbody>
          {steps.map(([s, t]) => (
            <tr key={s}>
              <td>
                <span className="pill pill-teal">Done</span> {s}
              </td>
              <td className="num">{t}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Frame>
  );
}

function AgentChat() {
  return (
    <Frame title="Sales agent on WhatsApp" note="The agent answers from your catalogue, then books the call in your CRM.">
      <div style={{ display: "grid", gap: "0.6rem" }}>
        <p className="pill" style={{ justifySelf: "start", borderRadius: 14, padding: "0.6rem 0.9rem", fontWeight: 500 }}>
          Do you have the 3-seater sofa in grey, and what is the price?
        </p>
        <p
          className="pill pill-blue"
          style={{ justifySelf: "end", borderRadius: 14, padding: "0.6rem 0.9rem", fontWeight: 500, maxWidth: "85%" }}
        >
          Yes, the Oslo 3-seater is in stock in grey at ₹42,500 with free delivery in Pune. Would you like a call
          from our team today?
        </p>
        <p className="pill" style={{ justifySelf: "start", borderRadius: 14, padding: "0.6rem 0.9rem", fontWeight: 500 }}>
          Yes, after 5 pm.
        </p>
        <p className="pill pill-teal" style={{ justifySelf: "end", borderRadius: 14, padding: "0.6rem 0.9rem" }}>
          Call booked for 5:30 pm and added to CRM
        </p>
      </div>
    </Frame>
  );
}

function AgenticPlan() {
  const steps = [
    { s: "Read purchase order from email", st: "Done", tone: "pill-teal" },
    { s: "Check stock in ERP", st: "Done", tone: "pill-teal" },
    { s: "Draft invoice for ₹3,84,000", st: "Waiting for approval", tone: "pill-amber" },
    { s: "Book dispatch and notify customer", st: "Queued", tone: "" },
  ];
  return (
    <Frame title="Order processing run" note="The system plans the steps, does the routine ones and waits for you on the important one.">
      <table>
        <tbody>
          {steps.map((r) => (
            <tr key={r.s}>
              <td>{r.s}</td>
              <td className="num">
                <span className={`pill ${r.tone}`}>{r.st}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Frame>
  );
}

function CustomCrm() {
  const fields = [
    ["Project type", "Commercial fit-out"],
    ["Site visit", "Completed, 12 Mar"],
    ["Quotation revision", "R3, approved by manager"],
    ["Lead score", "82 / 100"],
  ];
  return (
    <Frame title="Deal record with your own fields" note="Fields, stages and approvals are designed around your process.">
      <table>
        <tbody>
          {fields.map(([k, v]) => (
            <tr key={k}>
              <th scope="row">{k}</th>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Frame>
  );
}

const fragments: Record<string, () => ReactNode> = {
  "smara-crm": SmaraPipeline,
  "erp-setup": ErpSnapshot,
  "payroll-attendance-system": Payslip,
  "workflow-automation": WorkflowRun,
  "ai-agents": AgentChat,
  "agentic-ai": AgenticPlan,
  "vrinda-crm-pro": CustomCrm,
};

export function Fragment({ slug }: { slug: string }) {
  const F = fragments[slug];
  return F ? <F /> : null;
}

export function hasFragment(slug: string) {
  return slug in fragments;
}
