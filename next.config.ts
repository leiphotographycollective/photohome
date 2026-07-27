import type { NextConfig } from "next";

// The site narrowed to weddings only: /portfolio (and its category and project
// subpaths) and /weddings all collapsed into /gallery. These keep the old
// leiphotography.co URLs working and consolidate their search rankings.
//
// `permanent: true` emits a 308, not a 301. Google treats the two the same;
// 308 additionally preserves the request method. Redirects are checked before
// the filesystem, so these must never name a path that still has a page.
// /images/portfolio/... is untouched: it does not start with /portfolio.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/work", destination: "/gallery", permanent: true },
      { source: "/weddings", destination: "/gallery", permanent: true },
      { source: "/portfolio", destination: "/gallery", permanent: true },
      // Every category and project page collapses to the hub: none of them
      // have an equivalent on the new site.
      { source: "/portfolio/:path*", destination: "/gallery", permanent: true },
    ];
  },
};

export default nextConfig;
