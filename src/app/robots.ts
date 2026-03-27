import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.the-swift-dictionary.me';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/auth/', '/profile/', '/favorites/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
