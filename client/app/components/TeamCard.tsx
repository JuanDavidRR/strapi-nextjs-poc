import { StrapiImage } from "./StrapiImage";
import { ImageProps } from "../types";

export interface MemberCardProps {
  documentId: string;
  title: string;
  description: string;
  image: ImageProps;
  basePath: string;
}

export function MemberCard({
  title,
  description,
  image,
}: Readonly<MemberCardProps>) {
  return (
    <div className="flex flex-col">
      <div className="content-items__card-img">
        <StrapiImage
          src={image.url}
          alt={image.alternativeText || "No alternative text provided"}
          width={400}
          height={400}
          className="w-full h-auto aspect-square object-cover rounded-t-2xl"
        />
      </div>
      <div className="flex flex-col gap-3 bg-orange-100 py-5 px-5 md:px-10 rounded-b-2xl">
        <h5 className="text-2xl font-bold">{title}</h5>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
