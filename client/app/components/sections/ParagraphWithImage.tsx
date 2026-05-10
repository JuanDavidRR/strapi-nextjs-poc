import ReactMarkdown from "react-markdown";
import { StrapiImage } from "../StrapiImage";
import { ParagraphWithImageProps } from "@/app/types";

export function ParagraphWithImage({
  content,
  image,
  reversed,
  imageLandscape,
}: Readonly<ParagraphWithImageProps>) {
  return (
    <div
      className={`flex flex-col py-8 ${
        reversed ? "md:flex-row-reverse" : "md:flex-row"
      } gap-8 items-start`}
    >
      <div className="flex-6 space-y-6">
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="prose-custom">{children}</p>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
      <div className="flex-5">
        <StrapiImage
          src={image.url}
          alt={image.alternativeText || "No alternative text provided"}
          width={1920}
          height={1080}
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
