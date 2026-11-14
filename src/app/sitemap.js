import { siteUrl } from "@/lib/site";

// Static export needs route handlers to be explicitly static.
export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
