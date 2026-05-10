"use client";
import { FC } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

// Props interface for the main pagination component
interface PaginationProps {
  pageCount: number; // Total number of pages
}

// Props interface for the arrow buttons
interface PaginationArrowProps {
  direction: "left" | "right"; // Direction of the arrow
  href: string; // URL to navigate to
  isDisabled: boolean; // Whether the arrow should be disabled
}

// Arrow button component for navigation
const PaginationArrow: FC<PaginationArrowProps> = ({
  direction,
  href,
  isDisabled,
}) => {
  const router = useRouter();
  const isLeft = direction === "left";

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (isDisabled) return;
        router.push(href, { scroll: false });
      }}
      className={`inline-flex items-center justify-center rounded-lg border py-3 text-sm font-medium duration-200 transition ${
        isDisabled
          ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
          : "border-gray-400 bg-white text-gray-700 hover:bg-gray-200"
      }`}
      aria-disabled={isDisabled}
      disabled={isDisabled}
    >
      {isLeft ? "<" : ">"}
    </button>
  );
};

export function PaginationComponent({ pageCount }: Readonly<PaginationProps>) {
  // Get current URL path and search parameters using Next.js hooks
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Extract current page from URL params, defaulting to 1 if not present
  const currentPage = Number(searchParams.get("page")) || 1;

  // Helper function to create URLs for pagination
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`; // Combines current path with updated page parameter
  };

  return (
    <nav role="navigation" aria-label="Pagination" className="mt-8">
      <ul className="flex items-center justify-center space-x-3 bg-white px-3 py-2">
        <li>
          <PaginationArrow
            direction="left"
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />
        </li>
        <li>
          <span className="rounded-full bg-gray-100 px-4 py-2 text-lg font-semibold text-gray-700">
            Page {currentPage} / {pageCount}
          </span>
        </li>
        <li>
          <PaginationArrow
            direction="right"
            href={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= pageCount}
          />
        </li>
      </ul>
    </nav>
  );
}
