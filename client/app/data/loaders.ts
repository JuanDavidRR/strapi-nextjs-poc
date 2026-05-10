import qs from "qs";
import { fetchAPI } from "../utils/fetch-api";
import { getStrapiURL } from "../utils/get-strapi-url";

const BASE_URL = getStrapiURL();
const BLOG_PAGE_SIZE = 3;

//HOMEPAGE LOADER
export async function getHomePage(locale: string = "en") {
  const path = "/api/home-page";
  const url = new URL(path, BASE_URL);
  url.search = qs.stringify({
    locale,
    populate: {
      localizations: {
        fields: ["locale"],
      },
      sections: {
        on: {
          "sections.hero": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              logo: {
                populate: {
                  image: {
                    fields: ["url", "alternativeText"],
                  },
                },
              },
              cta: true,
            },
          },
          "sections.2-cols-image-content": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              cta: true,
            },
          },
        },
      },
    },
  });

  return fetchAPI(url.href, { method: "GET", next: { revalidate: 3600 } });
}

//PAGE BY SLUG LOADER
const pageBySlugQuery = (slug: string) =>
  qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      blocks: {
        on: {
          "sections.hero": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              logo: {
                populate: {
                  image: {
                    fields: ["url", "alternativeText"],
                  },
                },
              },
              cta: true,
            },
          },
          "sections.2-cols-image-content": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              cta: true,
            },
          },
          "sections.featured-article": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              link: true,
            },
          },
          "sections.subscribe": {
            populate: true,
          },
          "sections.heading": {
            populate: true,
          },
          "sections.paragraph": {
            populate: true,
          },
        },
      },
    },
  });

export async function getPageBySlug(slug: string) {
  const path = "/api/pages";
  const url = new URL(path, BASE_URL);
  url.search = pageBySlugQuery(slug);
  return await fetchAPI(url.href, {
    method: "GET",
    next: { revalidate: 3600 },
  });
}

//NAVIGATION LOADER
const globalSettingQuery = qs.stringify({
  populate: {
    header: {
      populate: {
        logo: {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
          },
        },
        navigation: true,
        cta: true,
      },
    },
    footer: {
      populate: {
        logo: {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
          },
        },
        navigation: true,
        policies: true,
      },
    },
  },
});

export async function getGlobalSettings() {
  const path = "/api/global";
  const url = new URL(path, BASE_URL);
  url.search = globalSettingQuery;
  return fetchAPI(url.href, { method: "GET", next: { revalidate: 3600 } });
}

export async function getContent(
  path: string,
  featured?: boolean,
  query?: string,
  page?: string,
  pageSize?: number,
) {
  const url = new URL(path, BASE_URL);

  url.search = qs.stringify({
    sort: ["createdAt:desc"],
    filters: {
      $or: [
        { title: { $containsi: query } },
        { description: { $containsi: query } },
      ],
      ...(featured && { featured: { $eq: featured } }),
    },
    pagination: {
      pageSize: pageSize || BLOG_PAGE_SIZE,
      page: parseInt(page || "1"),
    },
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
    },
  });

  return fetchAPI(url.href, {
    method: "GET",
    next: { revalidate: query ? 0 : 600 },
  });
}

const blogPopulate = {
  blocks: {
    on: {
      "sections.hero": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          logo: {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
          cta: true,
        },
      },
      "sections.2-cols-image-content": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          cta: true,
        },
      },
      "sections.featured-article": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          link: true,
        },
      },
      "sections.subscribe": {
        populate: true,
      },
      "sections.heading": {
        populate: true,
      },
      "sections.paragraph-with-image": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
        },
      },
      "sections.paragraph": {
        populate: true,
      },
      "sections.full-image": {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
        },
      },
    },
  },
};

export async function getContentBySlug(slug: string, path: string) {
  const url = new URL(path, BASE_URL);
  url.search = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
      localizations: {
        fields: ["slug", "locale"],
      },
      ...blogPopulate,
    },
  });

  return fetchAPI(url.href, { method: "GET", next: { revalidate: 3600 } });
}

export async function getContentBySlugAndLocale(
  slug: string,
  path: string,
  locale: string,
) {
  const url = new URL(path, BASE_URL);
  url.search = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    locale,
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
      localizations: {
        fields: ["slug", "locale"],
      },
      ...blogPopulate,
    },
  });

  return fetchAPI(url.href, { method: "GET", next: { revalidate: 3600 } });
}
