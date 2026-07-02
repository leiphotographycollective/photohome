import type { Metadata } from "next";
import { Bodoni_Moda, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://photohome-three.vercel.app"),
  title: {
    default:
      "Lei Photography Collective | Bay Area Wedding, Graduation & Portrait Photography",
    template: "%s | Lei Photography Collective",
  },
  description:
    "Raymond Lei is a San Francisco Bay Area photographer specializing in weddings, engagements, graduations, and portraits — photographed with intention, so your moments aren't just seen, they're felt.",
  applicationName: "Lei Photography Collective",
  openGraph: {
    siteName: "Lei Photography Collective",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${bodoni.variable}`}>
      <body>{children}</body>
    </html>
  );
}
