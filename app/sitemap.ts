import type { MetadataRoute } from 'next';
import { site, nav } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return nav.map((n) => ({
    url: `${site.url}${n.href === '/' ? '' : n.href}`,
    lastModified: new Date(),
    changeFrequency: n.href === '/' ? 'weekly' : 'monthly',
    priority: n.href === '/' ? 1 : 0.7,
  }));
}
