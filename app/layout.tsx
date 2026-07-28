import type { Metadata, Viewport } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "中国人生模拟器 | China Life Simulator",
  description: "从出生到退休，用选择写下一段虚构而真实的人生。",
  metadataBase: new URL("https://china-life-simulator.vercel.app"),
  openGraph: {
    title: "中国人生模拟器",
    description: "这一生，你会怎么选？",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1b2a35",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
