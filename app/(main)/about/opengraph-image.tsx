import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Vrinda Business Solution";

export default function Image() {
  return ogImage({ title: "About Vrinda Business Solution", subtitle: "Business systems that start from one root and grow with you." });
}
