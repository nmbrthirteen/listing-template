import type { MetadataRoute } from 'next'
import { getPayload } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const payload = await getPayload()

  const entries: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  ]

  // Pages
  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: { status: { equals: 'published' } },
    limit: 1000,
    select: { slug: true, updatedAt: true },
  })

  for (const page of pages) {
    if ((page as any).slug === 'home') continue
    entries.push({
      url: `${siteUrl}/${(page as any).slug}`,
      lastModified: new Date(page.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  }

  // Listings
  const { docs: listings } = await payload.find({
    collection: 'listings',
    where: { status: { equals: 'published' } },
    limit: 1000,
    select: { slug: true, updatedAt: true },
  })

  for (const listing of listings) {
    entries.push({
      url: `${siteUrl}/review/${(listing as any).slug}`,
      lastModified: new Date(listing.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  // Categories
  const { docs: categories } = await payload.find({
    collection: 'categories',
    limit: 1000,
    select: { slug: true, updatedAt: true },
  })

  for (const category of categories) {
    entries.push({
      url: `${siteUrl}/${(category as any).slug}`,
      lastModified: new Date(category.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  }

  // Blog posts
  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    where: { status: { equals: 'published' } },
    limit: 1000,
    select: { slug: true, updatedAt: true },
  })

  for (const post of posts) {
    entries.push({
      url: `${siteUrl}/blog/${(post as any).slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  return entries
}
