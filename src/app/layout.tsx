import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieBanner } from "@/components/cookie-banner";
import { YandexMetrika } from "@/components/ym-script";

const fontSans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1020" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — форум первокурсников СОГУ`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontDisplay.variable} relative overflow-x-hidden`}>
        <ThemeProvider>
          <SiteHeader />
          <main className="relative z-10 mx-auto min-h-[60vh] w-full max-w-6xl px-4 pt-0 pb-0 md:px-6">
            {children}
          </main>
          <SiteFooter />
          <CookieBanner />
          <YandexMetrika />
        </ThemeProvider>
      </body>
    </html>
  );
}
