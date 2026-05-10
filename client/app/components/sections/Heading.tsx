import { HeadingProps } from "@/app/types";
export function Heading({ heading, linkId }: Readonly<HeadingProps>) {
  return (
    <h3 className="text-3xl md:text-5xl font-bold pb-8" id={linkId}>
      {heading}
    </h3>
  );
}
