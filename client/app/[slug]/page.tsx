import { notFound } from "next/navigation";
import { SectionRenderer } from "../components/SectionRenderer";
import { getPageBySlug } from "../data/loaders";
import { Metadata } from "next";

async function loader(slug: string) {
  const { data } = await getPageBySlug(slug);
  if (data.length === 0) notFound();
  console.log("Page data for slug:", slug, JSON.stringify(data[0], null, 2));
  return { page: data[0], blocks: data[0]?.blocks };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const { page } = await loader(slug);

  return {
    title: page?.title || "Page Title",
    description: page?.description || "Page description",
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

export default async function DynamicPageRoute({ params }: PageProps) {
  const slug = (await params).slug;
  const { blocks } = await loader(slug);

  return (
    <div>
      {/* {page?.title && <h1 className="text-3xl font-bold mb-4">{page.title}</h1>}
      {page?.description && <p className="text-lg text-gray-600 mb-8">{page.description}</p>} */}
      <SectionRenderer blocks={blocks} />
    </div>
  );
}
