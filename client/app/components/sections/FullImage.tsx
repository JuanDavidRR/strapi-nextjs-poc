import { FullImageProps } from "@/app/types";
import { StrapiImage } from "../StrapiImage";

export function FullImage({ image }: Readonly<FullImageProps>) {
  return (
    <div className="py-10">
      <StrapiImage
        src={image.url}
        alt={image.alternativeText || "No alternative text provided"}
        width={1920}
        height={1080}
        className="w-full h-auto object-cover rounded-lg"
      />
    </div>
  );
}
