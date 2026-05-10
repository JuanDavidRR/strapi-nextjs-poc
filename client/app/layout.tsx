import type { Metadata } from "next";
import { Merriweather, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "./components/layout/Header";
import { getGlobalSettings } from "./data/loaders";
import { Footer } from "./components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-merriweather",
});

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getGlobalSettings();

  return {
    title: data?.seo?.title || "Strapi & Next.js - POC for the Pilot",
    description: data?.seo?.description || "This is the metadescription for the homepage for this custom development site using the latest technologies",
    keywords: data?.seo?.keywords || [],
    openGraph: {
      title: data?.seo?.title,
      description: data?.seo?.description,
      images: data?.seo?.image ? [{ url: data.seo.image.url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: data?.seo?.title,
      description: data?.seo?.description,
      images: data?.seo?.image ? [data.seo.image.url] : [],
    },
  };
}

async function loader() {
  const { data } = await getGlobalSettings();
  if (!data) throw new Error("Failed to fetch global settings");
  return { header: data?.header, footer: data?.footer };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { header, footer } = await loader();
  return (
    <html lang="en" className={`${poppins.variable} ${merriweather.variable}`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Header data={header} />
        {children}
        <Footer data={footer} />
      </body>
    </html>
  );
}
