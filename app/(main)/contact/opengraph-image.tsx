import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Vrinda Business Solution";

export default function Image() {
  return ogImage({ title: "Book a free demo", subtitle: "Call, WhatsApp or email Vrinda Business Solution." });
}
