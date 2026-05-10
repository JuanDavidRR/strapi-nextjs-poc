import { notFound } from "next/navigation";
import { SectionRenderer } from "../components/SectionRenderer";
import { getPageBySlug } from "../data/loaders";
import { ContentList } from "../components/ContentList";
import { BlogCard } from "../components/BlogCard";
import { Metadata } from "next";
import { cache } from "react";

const loader = cache(async () => {
  const { data } = await getPageBySlug("blog");
  if (data.length === 0) notFound();
  return { page: data[0], blocks: data[0]?.blocks };
});

interface PageProps {
  searchParams: Promise<{ page?: string; query?: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await loader();

  return {
    title: page?.title || "Blog",
    description: page?.description || "Check out our latest articles",
    openGraph: {
      title: page?.title,
      description: page?.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page?.title,
      description: page?.description,
    },
  };
}

export default async function BlogPageRoute({ searchParams }: PageProps) {
  const { page: pageParam, query } = await searchParams;
  const { blocks } = await loader();

  return (
    <div className="max-w-7xl mx-auto mb-20 px-5">
      {/* {page?.title && <h1 className="text-3xl font-bold mb-4 text-center">{page.title}</h1>}
      {page?.description && <p className="text-lg text-gray-600 mb-8 text-center">{page.description}</p>} */}

      <SectionRenderer blocks={blocks} />
      <ContentList
        headline="Check out our latest articles"
        path="/api/articles"
        component={BlogCard}
        showSearch
        headlineAlignment="center"
        query={query}
        showPagination
        page={pageParam}
      />
    </div>
  );
}
