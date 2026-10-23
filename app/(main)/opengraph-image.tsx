import { ogImage, ogSize } from "@/lib/og";

export const alt = "Vrinda Business Solution: CRM, ERP, payroll, workflow automation and AI agents";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "Business software that grows with you",
    subtitle: "SMARA CRM · BeeWhat WhatsApp CRM · ERP Setup · Payroll & Attendance · Workflow Automation · AI Agents",
  });
}
