export interface LinkProps {
  id: number;
  text: string;
  href: string;
  isExternal: boolean;
}

export interface ImageProps {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string;
}

export interface LogoProps {
  logoText: string;
  image: ImageProps;
}

export interface ArticleProps {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  image: ImageProps;
  author: string;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  localizations?: { slug: string; locale: string }[];
}

export interface EventProps {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  image: ImageProps;
  author: string;
  featured: boolean;
  price: string;
  startDate: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface MemberProps {
  id: number;
  documentId: string;
  title: string;
  description: string;
  image: ImageProps;
  position: string;
}

type ComponentType =
  | "sections.hero"
  | "sections.2-cols-image-content"
  | "sections.featured-article"
  | "sections.subscribe"
  | "sections.heading"
  | "sections.paragraph-with-image"
  | "sections.paragraph"
  | "sections.full-image";

interface Base<
  T extends ComponentType,
  D extends object = Record<string, unknown>,
> {
  id: number;
  __component?: T;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  data?: D;
}

export type Block =
  | HeroSectionProps
  | InfoBlockProps
  | FeaturedArticleProps
  | SubscribeProps
  | HeadingProps
  | ParagraphWithImageProps
  | ParagraphProps
  | FullImageProps;

export interface HeroSectionProps extends Base<"sections.hero"> {
  theme: "turquoise" | "orange";
  heading: string;
  image: ImageProps;
  cta?: LinkProps;
  logo?: LogoProps;
  author?: string;
  darken?: boolean;
}

export interface InfoBlockProps extends Base<"sections.2-cols-image-content"> {
  theme: "turquoise" | "orange";
  reverse?: boolean;
  heading: string;
  content: string;
  image: ImageProps;
  cta?: LinkProps;
}

export interface FeaturedArticleProps extends Base<"sections.featured-article"> {
  headline: string;
  excerpt: string;
  link: LinkProps;
  image: ImageProps;
}

export interface SubscribeProps extends Base<"sections.subscribe"> {
  headline: string;
  content: string;
  placeholder: string;
  buttonText: string;
}

export interface HeadingProps extends Base<"sections.heading"> {
  heading: string;
  linkId?: string;
}

export interface ParagraphWithImageProps extends Base<"sections.paragraph-with-image"> {
  content: string;
  image: ImageProps;
  reversed?: boolean;
  imageLandscape?: boolean;
}

export interface ParagraphProps extends Base<"sections.paragraph"> {
  content: string;
}

export interface FullImageProps extends Base<"sections.full-image"> {
  id: number;
  __component: "sections.full-image";
  image: ImageProps;
}
