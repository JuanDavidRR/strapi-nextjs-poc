import { ContentList } from "../components/ContentList";
import { SectionRenderer } from "../components/SectionRenderer";
import { notFound } from "next/navigation";
import { getPageBySlug } from "../data/loaders";
import { MemberCard } from "../components/TeamCard";
import { Metadata } from "next";

async function loader() {
  const { data } = await getPageBySlug("team");
  if (data.length === 0) notFound();
  return { page: data[0], blocks: data[0]?.blocks };
}

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

export default async function MembersPageRoute({ searchParams }: PageProps) {
  const { blocks } = await loader();

  return (
    <section>
      <SectionRenderer blocks={blocks} />
      <div className="max-w-7xl mx-auto px-5 py-12">
        <ContentList
          headline="Our Team"
          path="/api/members"
          headlineAlignment="center"
          component={MemberCard}
          pageSize={4}
        />
      </div>
    </section>
  );
}
