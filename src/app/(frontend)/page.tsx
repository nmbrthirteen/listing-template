import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { WebsiteStructuredData } from '@/components/seo/StructuredData'
import { absoluteUrl } from '@/lib/utils'
import { RefreshRouteOnSave } from '@/components/LivePreview/RefreshRouteOnSave'

type Args = { searchParams: Promise<{ preview?: string }> }

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload()
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null) as any

  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' }, status: { equals: 'published' } },
    limit: 1,
  }).then((res) => res.docs[0]).catch(() => null) as any

  const title = page?.seo?.metaTitle || page?.title || siteSettings?.defaultSeo?.defaultMetaTitle || siteSettings?.siteName || 'Home'
  const description = page?.seo?.metaDescription || siteSettings?.defaultSeo?.defaultMetaDescription || siteSettings?.siteDescription || ''

  return {
    title,
    description,
    openGraph: {
      title: page?.seo?.ogTitle || title,
      description: page?.seo?.ogDescription || description,
      url: absoluteUrl('/'),
    },
    robots: {
      index: !page?.seo?.noIndex,
      follow: !page?.seo?.noFollow,
    },
    alternates: {
      canonical: page?.seo?.canonicalUrl || absoluteUrl('/'),
    },
  }
}

export default async function HomePage({ searchParams }: Args) {
  const { preview } = await searchParams
  const isPreview = preview === 'true'
  const payload = await getPayload()
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null) as any

  const where: any = { slug: { equals: 'home' } }
  if (!isPreview) where.status = { equals: 'published' }

  const page = await payload.find({
    collection: 'pages',
    where,
    limit: 1,
    depth: 2,
  }).then((res) => res.docs[0]).catch(() => null) as any

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <RefreshRouteOnSave />
      <WebsiteStructuredData siteName={siteSettings?.siteName || 'Listing Site'} />
      {page?.layout ? (
        <RenderBlocks blocks={page.layout} />
      ) : (
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-heading mb-4">Welcome</h1>
          <p className="text-text/70">Create a page with slug &quot;home&quot; in the admin panel to get started.</p>
        </div>
      )}
    </div>
  )
}
