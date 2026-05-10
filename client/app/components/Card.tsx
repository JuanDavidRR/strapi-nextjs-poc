import Link from "next/link";
import { StrapiImage } from "./StrapiImage";
import { ImageProps } from "../types";
import { formatDate } from "../utils/format-date";

export interface CardProps {
  documentId: string;
  title: string;
  description: string;
  slug: string;
  image: ImageProps;
  price?: number;
  startDate?: string;
  createdAt: string;
  basePath: string;
  name?: string;
  position?: string;
  showMetaData?: boolean;
}

export function Card({
  title,
  description,
  slug,
  documentId,
  image,
  price,
  createdAt,
  startDate,
  basePath,
  showMetaData = true,
}: Readonly<CardProps>) {
  const href = `/${basePath}/${slug ?? documentId}`;

  return (
    <Link href={href} className="flex flex-col">
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
        {price && (
          <p>
            <span>Price: </span>
            {price}
          </p>
        )}
        {showMetaData && (startDate ?? createdAt) && (
          <p className="text-gray-600">{formatDate(startDate ?? createdAt)}</p>
        )}
        <p className="text-lg">{description?.slice(0, 144) ?? ""}...</p>
      </div>
    </Link>
  );
}
