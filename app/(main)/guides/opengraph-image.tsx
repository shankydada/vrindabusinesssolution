import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Guides by Vrinda Business Solution";

export default function Image() {
  return ogImage({ title: "Guides for running a growing business", subtitle: "CRM, WhatsApp CRM, ERP, payroll, workflow automation and AI agents, explained plainly." });
}
