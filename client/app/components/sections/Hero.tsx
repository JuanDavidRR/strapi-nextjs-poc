import Link from "next/link";
import { HeroSectionProps } from "@/app/types";
import { StrapiImage } from "../StrapiImage";

export function Hero({
  theme,
  heading,
  cta,
  image,
  logo,
  author,
  darken = false,
  publishedAt,
}: Readonly<HeroSectionProps>) {
  const buttonBgColor = theme === "turquoise" ? "bg-teal-500" : "bg-orange-500";
  const buttonTextColor = theme === "turquoise" ? "text-white" : "text-black";

  return (
    <section className="relative w-full min-h-[75vh] md:min-h-[90vh] py-20 pb-0 mb-12 flex flex-col items-start justify-center">
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden rounded-b-[200px]">
        <StrapiImage
          src={image?.url}
          alt={image?.alternativeText || "No alternative text provided"}
          width={1920}
          height={1080}
          priority={true}
          className="w-full h-full object-cover object-center"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

        {darken && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
        )}
      </div>

      <div className="max-w-7xl flex flex-col gap-8 md:gap-16 px-10 z-10 md:pl-20">
        <h1 className="text-5xl md:w-1/2 md:text-7xl leading-tight tracking-tight text-white">
          {heading}
        </h1>

        <div>
          {author && (
            <p className="text-xl font-semibold text-gray-200">
              - {author}
            </p>
          )}

          {publishedAt && <p className="text-white">{publishedAt}</p>}
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

      {logo && logo.image && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20">
          <StrapiImage
            src={logo.image.url}
            alt={logo.image.alternativeText || "logo"}
            width={120}
            height={120}
            className="w-20 h-20md:w-auto md:h-auto object-contain"
          />
        </div>
      )}
    </section>
  );
}
