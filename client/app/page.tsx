import { notFound } from "next/navigation";
import { SectionRenderer } from "./components/SectionRenderer";
import { getHomePage } from "./data/loaders";
import { ContentList } from "./components/ContentList";
import { BlogCard } from "./components/BlogCard";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import type { Metadata } from "next";

interface PageProps {
  searchParams: Promise<{ locale?: string }>;
}

async function loader(locale: string = "en") {
  const data = await getHomePage(locale);
  if (!data) notFound();
  return { ...data.data };
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await loader();
  return {
    title: data?.title || "The Surfeers Guide using Strapi and Next.js",
    description:
      data?.description || "This is the metadescription for the homepage",
    openGraph: {
      title: data?.title,
      description: data?.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data?.title,
      description: data?.description,
    },
  };
}

export default async function HomeRoute({ searchParams }: PageProps) {
  const { locale } = await searchParams;
  const data = await loader(locale);
  const sections = data?.sections || [];

  return (
    <div>
      <SectionRenderer blocks={sections} />
      <div className="max-w-7xl mx-auto pt-10 px-5">
        <LanguageSwitcher
          currentLocale={data.locale}
          currentSlug=""
          localizations={data.localizations || []}
          basePath=""
        />
        <ContentList
          headline="Featured Articles"
          path="/api/articles"
          component={BlogCard}
          featured
          headlineAlignment="center"
        />
      </div>
    </div>
  );
}
