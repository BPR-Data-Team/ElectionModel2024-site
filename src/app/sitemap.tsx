import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://24cast.org',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://24cast.org/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://24cast.org/methodology',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
        url: 'https://24cast.org/tos',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.2,
      },
      {
        url: 'https://24cast.org/privacy',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.2,
      }
  ]
}