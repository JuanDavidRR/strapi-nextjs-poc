import ReactMarkdown from "react-markdown";
import { StrapiImage } from "../StrapiImage";
import { InfoBlockProps } from "@/app/types";
import Link from "next/link";

export function Info({
  theme,
  reverse,
  image,
  heading,
  content,
  cta,
}: Readonly<InfoBlockProps>) {
  if (!image) return null;
  // Logic for dynamic colors
  const buttonBgColor = theme === "turquoise" ? "bg-teal-500" : "bg-orange-500";
  const buttonTextColor = "text-white";

  // Dynamic Title Color mapping
  const headingColor =
    theme === "turquoise" ? "text-teal-600" : "text-orange-600";

  return (
    <section
      className={`grid grid-cols-1 md:grid-cols-2 w-full gap-10 info--${theme} my-20`}
    >
      {/* Image Side: No padding, forced to boundaries */}
      <div className={`w-full h-full ${reverse ? "md:order-2" : "md:order-1"}`}>
        <StrapiImage
          src={image?.url}
          alt={image?.alternativeText || "Background"}
          height={800}
          width={800}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content Side: Internal padding while container hits the boundary */}
      <div
        className={`flex flex-col justify-center gap-6 w-full h-full 
      ${reverse ? "md:order-1 pr-[10%] pl-[5%]" : "md:order-2 pl-[10%] pr-[5%]"}
      ${theme === "orange" ? "bg-orange-50" : "bg-white"}
    `}
      >
        <h2 className={`text-4xl md:text-7xl font-bold mb-6 ${headingColor}`}>
          {heading}
        </h2>
        <div className="copy text-xl leading-relaxed mb-8">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        {cta && (
          <Link
            href={cta.href}
            target={cta.isExternal ? "_blank" : "_self"}
            className={`inline-block rounded-full transition-all w-fit uppercase py-4 px-10 text-xl shadow-lg hover:scale-105 ${buttonBgColor} ${buttonTextColor}`}
          >
            {cta.text}
          </Link>
        )}
      </div>
    </section>
  );
}
