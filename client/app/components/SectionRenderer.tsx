import { Suspense, lazy } from "react";
import { Block } from "../types";
import { Hero } from "./sections/Hero";

const Info = lazy(() =>
  import("./sections/Info").then((m) => ({ default: m.Info })),
);
const FeaturedArticle = lazy(() =>
  import("./sections/FeaturedArticle").then((m) => ({
    default: m.FeaturedArticle,
  })),
);
const Subscribe = lazy(() =>
  import("./sections/Subscribe").then((m) => ({ default: m.Subscribe })),
);
const Heading = lazy(() =>
  import("./sections/Heading").then((m) => ({ default: m.Heading })),
);
const Paragraph = lazy(() =>
  import("./sections/Paragraph").then((m) => ({ default: m.Paragraph })),
);
const ParagraphWithImage = lazy(() =>
  import("./sections/ParagraphWithImage").then((m) => ({
    default: m.ParagraphWithImage,
  })),
);
const FullImage = lazy(() =>
  import("./sections/FullImage").then((m) => ({ default: m.FullImage })),
);

function sectionRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "sections.hero":
      return <Hero {...block} key={index} />;
    case "sections.2-cols-image-content":
      return (
        <Suspense fallback={null} key={index}>
          <Info {...block} />
        </Suspense>
      );
    case "sections.featured-article":
      return (
        <Suspense fallback={null} key={index}>
          <FeaturedArticle {...block} />
        </Suspense>
      );
    case "sections.subscribe":
      return (
        <Suspense fallback={null} key={index}>
          <Subscribe {...block} />
        </Suspense>
      );
    case "sections.heading":
      return (
        <Suspense fallback={null} key={index}>
          <Heading {...block} />
        </Suspense>
      );
    case "sections.paragraph":
      return (
        <Suspense fallback={null} key={index}>
          <Paragraph {...block} />
        </Suspense>
      );
    case "sections.paragraph-with-image":
      return (
        <Suspense fallback={null} key={index}>
          <ParagraphWithImage {...block} />
        </Suspense>
      );
    case "sections.full-image":
      return (
        <Suspense fallback={null} key={index}>
          <FullImage {...block} />
        </Suspense>
      );
    default:
      return null;
  }
}

export function SectionRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => sectionRenderer(block, index));
}
