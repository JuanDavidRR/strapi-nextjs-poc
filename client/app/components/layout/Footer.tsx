import Link from "next/link";
import { StrapiImage } from "../StrapiImage";
import { LinkProps, LogoProps } from "@/app/types";

interface FooterProps {
  data: {
    logo: LogoProps;
    navigation: LinkProps[];
    policies: LinkProps[];
    copy: string;
  };
}

export function Footer({ data }: FooterProps) {
  if (!data) return null;

  const { logo, navigation, policies, copy } = data;
  return (
    <footer className=" bg-black text-white py-10 px-5">
      <section className="max-w-7xl mx-auto! flex flex-col gap-10 items-center">
        <nav className="flex flex-col md:flex-row justify-between items-center w-full">
          <StrapiImage
            src={logo.image?.url}
            alt={logo.image?.alternativeText || "No alternative text"}
            width={100}
            height={100}
            className="w-12"
          />
          <ul className="flex flex-col md:flex-row gap-8 items-center text-2xl">
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  target={item.isExternal ? "_blank" : "_self"}
                >
                  {<h5>{item.text}</h5>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col md:flex-row justify-between w-full">
          <ul className="flex flex-col md:flex-row gap-6 text-center md:text-left">
            {policies.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  target={item.isExternal ? "_blank" : "_self"}
                  className="copy"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
          <p className="copy mt-10 md:mt-0 text-center md:text-right">
            &copy; {new Date().getFullYear()} {copy}
          </p>
        </div>
      </section>
    </footer>
  );
}
