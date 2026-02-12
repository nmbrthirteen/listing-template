import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Badge } from '@/components/Badge'
import { RatingBadge } from '@/components/RatingBadge'
import { ProsConsBlock } from '@/components/blocks/ProsConsBlock'
import { BreadcrumbStructuredData, ReviewStructuredData } from '@/components/seo/StructuredData'
import { absoluteUrl } from '@/lib/utils'
import { RefreshRouteOnSave } from '@/components/LivePreview/RefreshRouteOnSave'
import { SpecsBar } from '@/components/SpecsBar'
import { ImageGallery } from '@/components/ImageGallery'
import { AuthorCard } from '@/components/AuthorCard'
import { ListingCard } from '@/components/ListingCard'

type Args = { params: Promise<{ slug: string }>; searchParams: Promise<{ preview?: string }> }

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload()

  const listing = await payload.find({
    collection: 'listings',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
  }).then((res) => res.docs[0]).catch(() => null) as any

  if (!listing) return { title: 'Not Found' }

  const title = listing.seo?.metaTitle || `${listing.name} Review`
  const description = listing.seo?.metaDescription || listing.shortDescription || ''

  return {
    title,
    description,
    openGraph: {
      title: listing.seo?.ogTitle || title,
      description: listing.seo?.ogDescription || description,
      url: absoluteUrl(`/review/${slug}`),
    },
    robots: { index: !listing.seo?.noIndex, follow: !listing.seo?.noFollow },
    alternates: { canonical: listing.seo?.canonicalUrl || absoluteUrl(`/review/${slug}`) },
  }
}

export default async function ReviewPage({ params, searchParams }: Args) {
  const { slug } = await params
  const { preview } = await searchParams
  const isPreview = preview === 'true'
  const payload = await getPayload()

  const where: any = { slug: { equals: slug } }
  if (!isPreview) where.status = { equals: 'published' }

  const listing = await payload.find({
    collection: 'listings',
    where,
    limit: 1,
    depth: 2,
  }).then((res) => res.docs[0]).catch(() => null) as any

  if (!listing) notFound()

  const logo = typeof listing.logo === 'object' ? listing.logo : null
  const featuredImage = typeof listing.featuredImage === 'object' ? listing.featuredImage : null
  const author = typeof listing.author === 'object' ? listing.author : null

  // Resolve related listings
  let relatedListings: any[] = []
  if (listing.relatedListings && listing.relatedListings.length > 0) {
    relatedListings = listing.relatedListings
      .map((r: any) => (typeof r === 'object' ? r : null))
      .filter(Boolean)
  } else if (listing.categories && listing.categories.length > 0) {
    // Auto-query same-category listings
    const categoryIds = listing.categories.map((c: any) => (typeof c === 'object' ? c.id : c))
    const { docs } = await payload.find({
      collection: 'listings',
      where: {
        status: { equals: 'published' },
        categories: { in: categoryIds },
        id: { not_equals: listing.id },
      },
      sort: 'rank',
      limit: 4,
      depth: 1,
    })
    relatedListings = docs
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <RefreshRouteOnSave />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: listing.name, url: `/review/${slug}` },
        ]}
      />
      <ReviewStructuredData
        name={listing.name}
        rating={listing.rating}
        description={listing.shortDescription}
        url={`/review/${slug}`}
      />

      {/* Featured Image Banner */}
      {featuredImage && (
        <div className="rounded-2xl overflow-hidden mb-8 border border-white/10">
          <img
            src={featuredImage.sizes?.large?.url || featuredImage.url}
            alt={featuredImage.alt || listing.name}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
          />
        </div>
      )}

      {/* Specs Cards */}
      {listing.specs && listing.specs.length > 0 && (
        <div className="mb-8">
          <SpecsBar specs={listing.specs} />
        </div>
      )}

      {/* Gallery */}
      {listing.gallery && listing.gallery.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-heading mb-4">Screenshots</h2>
          <ImageGallery items={listing.gallery} />
        </div>
      )}

      {/* Header */}
      <div className="bg-card rounded-2xl border border-white/10 p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {logo && (
            <div className="w-20 h-20 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
              <img src={logo.sizes?.medium?.url || logo.url} alt={logo.alt || listing.name} className="w-16 h-16 object-contain" />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h1 className="text-3xl font-bold text-heading">{listing.name}</h1>
              {listing.rating != null && <RatingBadge rating={listing.rating} />}
            </div>
            {listing.badges && listing.badges.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-3">
                {listing.badges.map((badge: any, i: number) => (
                  <Badge key={i} label={badge.label} variant={badge.variant} />
                ))}
              </div>
            )}
            {listing.shortDescription && <p className="text-text/70">{listing.shortDescription}</p>}
          </div>
          {listing.ctaUrl && (
            <a
              href={listing.ctaUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white hover:bg-secondary transition-colors shrink-0"
            >
              {listing.ctaLabel || 'Visit Site'}
            </a>
          )}
        </div>
      </div>

      {/* Pros & Cons */}
      {((listing.pros && listing.pros.length > 0) || (listing.cons && listing.cons.length > 0)) && (
        <div className="mb-8">
          <ProsConsBlock pros={listing.pros} cons={listing.cons} />
        </div>
      )}

      {/* Detailed Review */}
      {listing.detailedReview && (
        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-heading prose-a:text-primary mb-8">
          <RichText data={listing.detailedReview} />
        </div>
      )}

      {/* FAQ */}
      {listing.faq && listing.faq.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-heading mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {listing.faq.map((item: any, i: number) => (
              <details
                key={i}
                className="group bg-card rounded-xl border border-white/10 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-heading font-medium hover:bg-white/5 transition-colors">
                  {item.question}
                  <span className="ml-2 text-text/50 group-open:rotate-180 transition-transform">
                    &#9662;
                  </span>
                </summary>
                <div className="px-6 pb-4 prose prose-invert prose-sm max-w-none">
                  <RichText data={item.answer} />
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* Author Card */}
      {author && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-heading mb-4">About the Author</h2>
          <AuthorCard author={author} />
        </div>
      )}

      {/* Related Listings */}
      {relatedListings.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-heading mb-6">Related Reviews</h2>
          <div className="space-y-4">
            {relatedListings.map((related: any, i: number) => (
              <ListingCard key={related.id} listing={related} rank={i + 1} showRank={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
