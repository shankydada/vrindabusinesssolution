import { ogImage, ogSize } from "@/lib/og";

export const alt = "BeeWhat: zero-touch WhatsApp CRM";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    brand: "BeeWhat by Vrinda Business Solution",
    title: "Every WhatsApp chat, saved to your CRM automatically",
    subtitle: "Zero-touch WhatsApp CRM. No forwarding, no exports, no data entry.",
    accent: "#f2b134",
  });
}
