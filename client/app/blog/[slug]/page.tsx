import { Hero } from "@/app/components/sections/Hero";
import { SectionRenderer } from "@/app/components/SectionRenderer";
import {
  getContent,
  getContentBySlug,
  getContentBySlugAndLocale,
} from "@/app/data/loaders";
import { ArticleProps, Block } from "@/app/types";
import { formatDate } from "@/app/utils/format-date";
import { notFound } from "next/navigation";
import { Card, CardProps } from "@/app/components/Card";
import { ContentList } from "@/app/components/ContentList";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import { Metadata } from "next";
import { cache } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const loader = cache(async (slug: string) => {
  let { data } = await getContentBySlug(slug, "/api/articles");

  if (!data || data.length === 0) {
    ({ data } = await getContentBySlugAndLocale(slug, "/api/articles", "es"));
  }

  const article = data[0];
  if (!article) throw notFound();
  return { article: article as ArticleProps, blocks: article?.blocks };
});

export async function generateStaticParams() {
  const { data } = await getContent(
    "/api/articles",
    undefined,
    undefined,
    undefined,
    100,
  );
  return data.map((article: ArticleProps) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const { article } = await loader(slug);

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:3000";
  const imageUrl = article.image ? `${baseUrl}${article.image.url}` : undefined;

  return {
    title: article.title + " | Blog",
    description: article.description,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: article.image?.alternativeText || article.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

interface ArticleOverviewProps {
  description: string;
  tableOfContents: { heading: string; linkId?: string }[];
}

function ArticleOverview({ description }: Readonly<ArticleOverviewProps>) {
  return (
    <div className="article-overview">
      <div className="article-overview__info">
        <p className="text-xl font-medium leading-10">{description}</p>
      </div>
    </div>
  );
}

const BlogCard = (props: Readonly<CardProps>) => (
  <Card {...props} basePath="blog" />
);

export default async function SingleBlogRoute({ params }: PageProps) {
  const slug = (await params).slug;
  const { article, blocks } = await loader(slug);
  const { title, author, publishedAt, description, image } = article;

  const tableOfContents = blocks?.filter(
    (block: Block) => block.__component === "sections.heading",
  );

  return (
    <div>
      <Hero
        id={article.id}
        heading={title}
        theme="orange"
        image={image}
        author={author}
        publishedAt={formatDate(publishedAt)}
        darken={true}
      />
      <div className="max-w-7xl mx-auto py-16 px-5">
        <LanguageSwitcher
          currentLocale={article.locale}
          currentSlug={article.slug}
          localizations={article.localizations || []}
          basePath="blog"
        />
        <div className="flex flex-col-reverse md:flex-row justify-between pt-10 pb-20">
          <div className="flex-3">
            <ArticleOverview
              description={description}
              tableOfContents={tableOfContents}
            />
          </div>
          {tableOfContents && (
            <ul className="flex-2 flex flex-col gap-3 justify-start md:items-end mb-10">
              {tableOfContents.map(
                (item: { heading: string; linkId?: string }, index: number) => (
                  <li key={index}>
                    <a
                      href={`#${item.linkId}`}
                      className="text-xl underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    >
                      {index + 1}. {item.heading}
                    </a>
                  </li>
                ),
              )}
            </ul>
          )}
        </div>
        <SectionRenderer blocks={blocks} />
        <ContentList
          headline="Featured Articles"
          path="/api/articles"
          component={BlogCard}
          featured={true}
          headlineAlignment="center"
        />
      </div>
    </div>
  );
}
