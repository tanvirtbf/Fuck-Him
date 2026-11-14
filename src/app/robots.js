import { siteUrl } from "@/lib/site";

// Static export needs route handlers to be explicitly static.
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
