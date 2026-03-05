import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import AnimatedNatureBackground from "@/components/common/AnimatedNatureBackground";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope"
});

export const metadata: Metadata = {
  title: "Explorers Group | Indian Treks and Adventure Trips",
  description:
    "Trip-first booking platform for Indian Himalayan treks, Sahyadri expeditions, forest trails, and curated adventure departures."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${manrope.variable} relative font-body antialiased`}>
        <AnimatedNatureBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
