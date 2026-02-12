import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import { absoluteUrl } from '@/lib/utils'
import { RefreshRouteOnSave } from '@/components/LivePreview/RefreshRouteOnSave'

type Args = { params: Promise<{ slug: string }>; searchParams: Promise<{ preview?: string }> }

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload()

  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
  }).then((res) => res.docs[0]).catch(() => null) as any

  if (!page) {
    // Try categories
    const category = await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
      limit: 1,
    }).then((res) => res.docs[0]).catch(() => null) as any

    if (category) {
      const title = category.seo?.metaTitle || category.name
      const description = category.seo?.metaDescription || category.description || ''
      return {
        title,
        description,
        robots: { index: !category.seo?.noIndex, follow: !category.seo?.noFollow },
        alternates: { canonical: category.seo?.canonicalUrl || absoluteUrl(`/${slug}`) },
      }
    }
    return { title: 'Not Found' }
  }

  const title = page.seo?.metaTitle || page.title
  const description = page.seo?.metaDescription || ''

  return {
    title,
    description,
    openGraph: {
      title: page.seo?.ogTitle || title,
      description: page.seo?.ogDescription || description,
      url: absoluteUrl(`/${slug}`),
    },
    robots: { index: !page.seo?.noIndex, follow: !page.seo?.noFollow },
    alternates: { canonical: page.seo?.canonicalUrl || absoluteUrl(`/${slug}`) },
  }
}

export default async function DynamicPage({ params, searchParams }: Args) {
  const { slug } = await params
  const { preview } = await searchParams
  const isPreview = preview === 'true'
  const payload = await getPayload()

  // Try pages first
  const pageWhere: any = { slug: { equals: slug } }
  if (!isPreview) pageWhere.status = { equals: 'published' }

  const page = await payload.find({
    collection: 'pages',
    where: pageWhere,
    limit: 1,
    depth: 2,
  }).then((res) => res.docs[0]).catch(() => null) as any

  if (page) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <RefreshRouteOnSave />
        <BreadcrumbStructuredData items={[{ name: 'Home', url: '/' }, { name: page.title, url: `/${slug}` }]} />
        <RenderBlocks blocks={page.layout || []} />
      </div>
    )
  }

  // Try categories
  const category = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  }).then((res) => res.docs[0]).catch(() => null) as any

  if (category) {
    const { docs: listings } = await payload.find({
      collection: 'listings',
      where: {
        status: { equals: 'published' },
        categories: { contains: category.id },
      },
      sort: 'rank',
      limit: 50,
    })

    const { ListingCard } = await import('@/components/ListingCard')

    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbStructuredData items={[{ name: 'Home', url: '/' }, { name: category.name, url: `/${slug}` }]} />
        <h1 className="text-3xl sm:text-4xl font-bold text-heading mb-4">{category.name}</h1>
        {category.description && <p className="text-text/70 mb-8 max-w-3xl">{category.description}</p>}
        <div className="space-y-4">
          {listings.map((listing: any, i: number) => (
            <ListingCard key={listing.id} listing={listing} rank={i + 1} />
          ))}
        </div>
        {listings.length === 0 && <p className="text-text/50 py-8">No listings in this category yet.</p>}
      </div>
    )
  }

  notFound()
}
