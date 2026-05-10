"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function Search() {
  // Get access to URL search parameters, routing, and current pathname
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  // Create a debounced search handler that only triggers 300ms after the user stops typing
  const handleSearch = useDebouncedCallback((term: string) => {
    // Create a new URLSearchParams instance with current params
    const params = new URLSearchParams(searchParams);
    // Reset to first page whenever search term changes
    params.set("page", "1");

    // Update URL search parameters based on search term
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    // Update the URL without triggering a page refresh
    // scroll: false prevents the page from jumping to top
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  return (
    <div className="my-10 max-w-3xl mx-auto">
      <input
        type="text"
        placeholder="Search articles..."
        // Call handleSearch whenever input value changes
        onChange={(e) => handleSearch(e.target.value)}
        // Initialize input with existing search query from URL
        defaultValue={searchParams.get("query")?.toString()}
        className="w-full border-2 border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 mb-10 focus:ring-turquoise-500"
      />
    </div>
  );
}
