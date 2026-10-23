import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Vrinda Business Solution";

export default function Image() {
  return ogImage({ title: "Products for sales, money, people and AI", subtitle: "SMARA CRM, BeeWhat, ERP Setup, Payroll & Attendance, Workflow Automation, AI Agents, Agentic AI, VrindaCRM Pro" });
}
