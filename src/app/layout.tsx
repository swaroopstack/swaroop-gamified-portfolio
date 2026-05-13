import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "swaroop_os",
  description: "Portfolio OS — Terminal Intro",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}