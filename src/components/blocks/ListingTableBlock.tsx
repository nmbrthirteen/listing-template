import { getPayload } from '@/lib/payload'
import { ListingCard } from '../ListingCard'

type Props = {
  title?: string
  category?: any
  limit?: number
  showRating?: boolean
  showBadges?: boolean
  showRank?: boolean
}

export async function ListingTableBlock({
  title,
  category,
  limit = 10,
  showRating = true,
  showBadges = true,
  showRank = true,
}: Props) {
  const payload = await getPayload()

  const categoryId = typeof category === 'object' ? category?.id : category

  const where: any = { status: { equals: 'published' } }
  if (categoryId) {
    where['categories'] = { contains: categoryId }
  }

  const { docs: listings } = await payload.find({
    collection: 'listings',
    where,
    sort: 'rank',
    limit,
  })

  return (
    <section>
      {title && <h2 className="text-2xl sm:text-3xl font-bold text-heading mb-6">{title}</h2>}
      <div className="space-y-4">
        {listings.map((listing: any, i: number) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            rank={showRank ? i + 1 : undefined}
            showRating={showRating}
            showBadges={showBadges}
            showRank={showRank}
          />
        ))}
      </div>
      {listings.length === 0 && (
        <p className="text-center text-text/50 py-8">No listings found.</p>
      )}
    </section>
  )
}
