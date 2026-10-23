import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Vrinda Business Solution";

export default function Image() {
  return ogImage({ title: "Plans for every business size", subtitle: "Dedicated support, source code ownership and free onboarding in every plan." });
}
