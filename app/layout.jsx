import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";
import ScrollProgress from "@/components/animations/ScrollProgress";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata = {
  title: "brahmatatva",
  description: "Temple Management System homepage",
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml"
    }
  }
};

export default async function RootLayout({ children }) {
  const locale = await getServerLocale();

  return (
    <html lang={locale === "hi" ? "hi" : "en"}>
      <body>
        <ScrollProgress />
        <AppProviders initialLocale={locale}>{children}</AppProviders>
      </body>
    </html>
  );
}
