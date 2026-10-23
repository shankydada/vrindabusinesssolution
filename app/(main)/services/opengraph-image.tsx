import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Vrinda Business Solution";

export default function Image() {
  return ogImage({ title: "Services that keep your systems running", subtitle: "Cloud & DevOps, Cybersecurity and Tech Consultancy" });
}
