import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://photohome-three.vercel.app"),
  title: {
    default: "Lei Photography Collective | Wedding, Portrait & Event Photography",
    template: "%s | Lei Photography Collective",
  },
  description:
    "Lei Photography Collective offers wedding, graduation, portrait, event, and real estate photography with a natural, cinematic style.",
  applicationName: "Lei Photography Collective",
  openGraph: {
    siteName: "Lei Photography Collective",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
