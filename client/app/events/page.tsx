import { notFound } from "next/navigation";
import { Card, type CardProps } from "../components/Card";
import { EventProps } from "../types";
import { getContentBySlug } from "../data/loaders";
import { ContentList } from "../components/ContentList";
import { EventSignupForm } from "../components/SignUpForm";
import { Metadata } from "next";

async function loader(slug: string) {
  const { data } = await getContentBySlug(slug, "/api/events");
  const event = data[0];
  if (!event) throw notFound();
  return { event: event as EventProps, blocks: event?.blocks };
}

interface ParamsProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; query?: string }>;
}

const EventCard = (props: Readonly<CardProps>) => (
  <Card {...props} basePath="events" />
);

export async function generateMetadata(): Promise<Metadata> {
  const { event } = await loader("beginners-bootcamp");

  return {
    title: "Where everything starts | Events",
    description: event?.description || "Browse our upcoming events",
    openGraph: {
      title: event?.title,
      description: event?.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: event?.title,
      description: event?.description,
    },
  };
}

export default async function AllEventsRoute({ searchParams }: ParamsProps) {
  const { query, page } = await searchParams;
  const { event, blocks } = await loader("beginners-bootcamp");

  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-5 py-12 ">
        <div className="event-page">
          <EventSignupForm
            blocks={blocks}
            eventId={event.documentId}
            startDate={event.startDate}
            price={event.price}
          />
        </div>
        <ContentList
          headline="All Events"
          path="/api/events"
          query={query}
          headlineAlignment="center"
          page={page}
          showSearch
          showPagination
          component={EventCard}
        />
      </div>
    </section>
  );
}
