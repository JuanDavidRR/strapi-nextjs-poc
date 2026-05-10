"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { StrapiImage } from "../StrapiImage";
import { LinkProps, LogoProps } from "@/app/types";

interface HeaderProps {
  data: {
    logo: LogoProps;
    navigation: LinkProps[];
    cta: LinkProps;
  };
}

export function Header({ data }: HeaderProps) {
  const pathname = usePathname();
  const headerLight = ["/experience", "/team"].includes(pathname);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Close mobile menu on scroll
      } else {
        setIsVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = () => setIsMobileMenuOpen(false);
    if (isMobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  if (!data) return null;

  const { logo, navigation, cta } = data;

  return (
    <>
      <header
        className={`flex justify-between items-center duration-200 py-5 shadow-lg sticky top-0 w-full bg-white px-5 z-50 transition-transform ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${headerLight ? "bg-orange-500! text-white" : ""}`}
      >
        {/* Logo */}
        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
          <StrapiImage
            src={logo.image?.url}
            alt={logo.image?.alternativeText || "No alternative text provided"}
            className={`w-12 header__logo--${headerLight ? "white" : "black"}`}
            width={120}
            height={120}
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 items-center text-2xl">
          {navigation.map((item) => (
            <li key={item.id} className="duration-300 hover:translate-y-1">
              <Link
                href={item.href}
                target={item.isExternal ? "_blank" : "_self"}
              >
                <h5>{item.text}</h5>
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href={cta.href}
          target={cta.isExternal ? "_blank" : "_self"}
          className={`hidden md:inline-block rounded-full transition-all w-fit h-fit uppercase py-4 px-10 text-xl shadow-lg hover:scale-105 bg-black text-white`}
        >
          {cta.text}
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          aria-label="Toggle mobile menu"
        >
          <div className="relative w-6 h-5">
            <span
              className={`absolute block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 top-2" : "top-0"
              }`}
            />
            <span
              className={`absolute block w-6 h-0.5 bg-gray-800 transition-opacity duration-300 top-2 ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 top-2" : "top-4"
              }`}
            />
          </div>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-70 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 md:hidden transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {/* Mobile Navigation */}
          <nav className="flex-1">
            <ul className="space-y-6">
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    target={item.isExternal ? "_blank" : "_self"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-2xl font-medium text-gray-800 hover:text-gray-600 transition-colors duration-200"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile CTA */}
          <div className="pb-8">
            <Link
              href={cta.href}
              target={cta.isExternal ? "_blank" : "_self"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-block w-full text-center rounded-full transition-all uppercase py-4 px-10 text-xl shadow-lg hover:scale-105 bg-black text-white"
            >
              {cta.text}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
