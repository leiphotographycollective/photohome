import type { Metadata } from "next";
import { Bodoni_Moda, DM_Sans } from "next/font/google";
import { SITE_URL, localBusinessJsonLd } from "@/content/site";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Lei Photography Collective | San Francisco Bay Area Editorial Wedding Photography",
    template: "%s | Lei Photography Collective",
  },
  description:
    "Your wedding, shot like the cover story it is. Raymond Lei photographs editorial, fashion-influenced weddings for fun, stylish couples in the San Francisco Bay Area & beyond.",
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
      <body>
        {children}
        {/* LocalBusiness structured data (site-wide). Validate with Google's
            Rich Results Test. `<` is escaped to guard against XSS in strings. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
