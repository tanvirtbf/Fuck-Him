/**
 * Static-only portfolio — no server, no API routes, no database.
 * `output: 'export'` makes `next build` emit a fully static site into `out/`.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",

  // The default image optimizer needs a server; static export requires this.
  images: {
    unoptimized: true,
  },

  // Tailwind CSS v4 through Turbopack (set up by create-next-app 16.4).
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

module.exports = nextConfig;
