import { absoluteUrl } from '@/lib/utils'

type Props = {
  data: Record<string, any>
}

export function StructuredData({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function WebsiteStructuredData({ siteName }: { siteName: string }) {
  return (
    <StructuredData
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: absoluteUrl('/'),
      }}
    />
  )
}

export function BreadcrumbStructuredData({ items }: { items: { name: string; url: string }[] }) {
  return (
    <StructuredData
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItemAction',
          position: i + 1,
          name: item.name,
          item: absoluteUrl(item.url),
        })),
      }}
    />
  )
}

export function FAQStructuredData({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <StructuredData
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }}
    />
  )
}

export function ReviewStructuredData({
  name,
  rating,
  description,
  url,
}: {
  name: string
  rating: number
  description?: string
  url: string
}) {
  return (
    <StructuredData
      data={{
        '@context': 'https://schema.org',
        '@type': 'Review',
        itemReviewed: {
          '@type': 'Thing',
          name,
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: rating,
          bestRating: 10,
        },
        description,
        url: absoluteUrl(url),
      }}
    />
  )
}

export function BlogPostingStructuredData({
  title,
  description,
  url,
  publishedAt,
  imageUrl,
}: {
  title: string
  description?: string
  url: string
  publishedAt?: string
  imageUrl?: string
}) {
  return (
    <StructuredData
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        url: absoluteUrl(url),
        ...(publishedAt && { datePublished: publishedAt }),
        ...(imageUrl && { image: imageUrl }),
      }}
    />
  )
}
