import type { Metadata } from "next";
import { Bodoni_Moda, DM_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { HOME_DESCRIPTION, SITE_TITLE, SITE_URL, localBusinessJsonLd } from "@/content/site";
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
    default: SITE_TITLE,
    template: "%s | Lei Photography Collective",
  },
  description: HOME_DESCRIPTION,
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
      <GoogleAnalytics gaId="G-FZPV80DSEF" />
    </html>
  );
}
