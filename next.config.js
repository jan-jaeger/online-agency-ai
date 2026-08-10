/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Leitet die nackte Domain (ohne www) automatisch auf www. um, damit
  // Google nicht zwei Versionen derselben Seite als Duplicate Content sieht.
  // Voraussetzung: Sowohl online-agency.ai als auch www.online-agency.ai
  // müssen in der Domain-/DNS-Konfiguration auf dieses Deployment zeigen.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "online-agency.ai" }],
        destination: "https://www.online-agency.ai/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
