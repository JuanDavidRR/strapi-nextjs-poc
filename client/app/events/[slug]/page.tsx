import { Card, CardProps } from "@/app/components/Card";
import { ContentList } from "@/app/components/ContentList";
import { EventSignupForm } from "@/app/components/SignUpForm";
import { getContent, getContentBySlug } from "@/app/data/loaders";
import { EventProps } from "@/app/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

const loader = cache(async (slug: string) => {
  const { data } = await getContentBySlug(slug, "/api/events");
  const event = data[0];
  if (!event) throw notFound();
  return { event: event as EventProps, blocks: event?.blocks };
});

export async function generateStaticParams() {
  const { data } = await getContent(
    "/api/events",
    undefined,
    undefined,
    undefined,
    100,
  );
  return data.map((event: EventProps) => ({ slug: event.slug }));
}

interface ParamsProps {
  params: Promise<{ slug: string }>;
}

const EventCard = (props: Readonly<CardProps>) => (
  <Card {...props} basePath="events" />
);

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const slug = (await params).slug;
  const { event } = await loader(slug);

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:3000";
  const imageUrl = event.image ? `${baseUrl}${event.image.url}` : undefined;

  return {
    title: event.title + " | Events",
    description: event.description,
    authors: [{ name: event.author }],
    openGraph: {
      title: event.title,
      description: event.description,
      type: "article",
      publishedTime: event.publishedAt,
      authors: [event.author],
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: event.image?.alternativeText || event.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function SingleEventRoute({ params }: ParamsProps) {
  const slug = (await params).slug;
  const { event, blocks } = await loader(slug);

  return (
    <section className="">
      <div className="bg-orange-50">
        <div className="max-w-7xl mx-auto px-5 py-12 ">
          <div className="event-page">
            <EventSignupForm
              blocks={blocks}
              eventId={event.documentId}
              startDate={event.startDate}
              price={event.price}
            />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 py-12 ">
        <ContentList
          headline="Upcoming events"
          path="/api/events"
          headlineAlignment="center"
          component={EventCard}
        />
      </div>
    </section>
  );
}
