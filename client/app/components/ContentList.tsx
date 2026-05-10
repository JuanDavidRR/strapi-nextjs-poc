import { getContent } from "../data/loaders";
import { ArticleProps } from "../types";
import { PaginationComponent } from "./Pagination";
import { Search } from "./Search";

interface ContentListProps {
  headline: string;
  query?: string;
  path: string;
  featured?: boolean;
  component: React.ComponentType<
    ArticleProps & { basePath: string; showMetaData?: boolean }
  >;
  headlineAlignment?: "center" | "right" | "left";
  showSearch?: boolean;
  page?: string;
  showPagination?: boolean;
  pageSize?: number;
  showMetaData?: boolean;
}

async function loader(
  path: string,
  featured?: boolean,
  query?: string,
  page?: string,
  pageSize?: number,
) {
  const { data, meta } = await getContent(
    path,
    featured,
    query,
    page,
    pageSize,
  );
  return {
    articles: (data as ArticleProps[]) || [],
    pageCount: meta?.pagination?.pageCount || 1,
  };
}

export async function ContentList({
  headline,
  path,
  featured,
  component,
  headlineAlignment = "left",
  showSearch,
  query,
  page,
  showPagination,
  pageSize,
  showMetaData = true,
}: Readonly<ContentListProps>) {
  const { articles, pageCount } = await loader(
    path,
    featured,
    query,
    page,
    pageSize,
  );
  const Component = component;

  return (
    <section className="my-20 bg-white w-full">
      <h3
        className={`text-3xl md:text-5xl pt-8 pb-10 md:pb-16 text-${headlineAlignment ?? ""}`}
      >
        {headline || "Featured Articles"}
      </h3>
      {showSearch && <Search />}
      {articles.length === 0 ? (
        <p className="mt-8 text-center text-lg text-gray-600">
          {query
            ? `No articles were found for "${query}".`
            : "No articles were found."}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Component
              key={article.documentId}
              {...article}
              basePath={path}
              showMetaData={showMetaData}
            />
          ))}
        </div>
      )}
      {articles.length > 0 && showPagination && (
        <PaginationComponent pageCount={pageCount} />
      )}
    </section>
  );
}
