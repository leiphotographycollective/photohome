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
    <html
      lang="en"
      className={`${dmSans.variable} ${bodoni.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Motion start states (globals.css) are scoped to .lx-motion, which
            only exists once this blocking script runs. Without it the server
            HTML paints fully visible and the GSAP `from` states land after
            first paint, so every reveal flashed in, out, then in again. The
            4s timer is a failsafe: if the motion bundle never arrives, the
            class drops and the page is readable rather than blank. Once the
            engine has initialized its inline styles win, so removing the
            class then is a no-op. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{" +
              "if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;" +
              "var d=document.documentElement;d.classList.add('lx-motion');" +
              "setTimeout(function(){d.classList.remove('lx-motion')},4000);" +
              "}catch(e){}})();",
          }}
        />
      </head>
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
