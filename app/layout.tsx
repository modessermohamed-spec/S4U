import "./globals.css";
import type { Metadata, Viewport } from "next";
import { LangProvider } from "@/lib/i18n";
import { DemoBar, SiteFooter, SiteHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "S4U | Sudan for You",
  description: "Find local professionals in Sudan. Demo version.",
  // Demo with fictional profiles: keep it out of search engines for now.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#176e78" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <LangProvider>
          <DemoBar />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </LangProvider>
      </body>
    </html>
  );
}
