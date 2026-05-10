import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { StrapiImage } from "../StrapiImage";
import { FeaturedArticleProps } from "@/app/types";

export function FeaturedArticle({
  headline,
  link,
  excerpt,
  image,
}: Readonly<FeaturedArticleProps>) {
  return (
    <article className="flex flex-col md:flex-row max-w-7xl mx-auto gap-10 items-center my-20">
      <div className="flex-1 flex flex-col gap-4">
        <h3 className="text-4xl md:text-5xl">{headline}</h3>
        <div className="copy">
          <ReactMarkdown>{excerpt}</ReactMarkdown>
        </div>
        <Link
          href={link.href}
          className={`inline-block rounded-full transition-all w-fit h-fit uppercase py-4 px-10 text-xl shadow-lg hover:scale-105 bg-turquoise text-white`}
        >
          {link.text}
        </Link>
      </div>
      <StrapiImage
        src={image.url}
        alt={image.alternativeText || "No alternative text provided"}
        height={200}
        width={300}
        className="flex-1 w-full h-auto object-cover rounded-lg"
      />
    </article>
  );
}
