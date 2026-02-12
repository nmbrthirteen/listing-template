import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import { RatingBadge } from '@/components/RatingBadge'

type Props = {
  title?: string
  category?: any
  limit?: number
  columns?: '2' | '3' | '4'
}

const colsClass: Record<string, string> = {
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export async function ListingGridBlock({ title, category, limit = 12, columns = '3' }: Props) {
  const payload = await getPayload()

  const where: any = { status: { equals: 'published' } }
  const categoryId = typeof category === 'object' ? category?.id : category
  if (categoryId) {
    where.categories = { contains: categoryId }
  }

  const { docs: listings } = await payload.find({
    collection: 'listings',
    where,
    sort: 'rank',
    limit: limit || 12,
    depth: 1,
  })

  if (listings.length === 0) return null

  return (
    <section>
      {title && <h2 className="text-2xl sm:text-3xl font-bold text-heading mb-6">{title}</h2>}
      <div className={`grid ${colsClass[columns] || colsClass['3']} gap-4`}>
        {listings.map((listing: any) => {
          const logo = typeof listing.logo === 'object' ? listing.logo : null
          return (
            <Link
              key={listing.id}
              href={`/review/${listing.slug}`}
              className="bg-card rounded-xl border border-white/10 p-5 hover:border-primary/30 transition-colors block"
            >
              <div className="flex items-center gap-3 mb-3">
                {logo && (
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src={logo.sizes?.thumbnail?.url || logo.url}
                      alt={logo.alt || listing.name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-heading truncate">{listing.name}</h3>
                {listing.rating != null && <RatingBadge rating={listing.rating} />}
              </div>
              {listing.shortDescription && (
                <p className="text-sm text-text/70 line-clamp-2">{listing.shortDescription}</p>
              )}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
