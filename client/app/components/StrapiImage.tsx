import { getStrapiURL } from "@/app/utils/get-strapi-url";
import Image from "next/image";

export function StrapiImage({
  src,
  alt,
  className,
  width,
  height,
  priority,
}: {
  src?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  const imageUrl = src ? getStrapiMedia(src) : null;
  if (!imageUrl) return null;

  return (
    <Image
      src={imageUrl}
      alt={alt}
      className={className}
      width={width || 1920}
      height={height || 1080}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      unoptimized={true}
    />
  );
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return getStrapiURL() + url;
}
