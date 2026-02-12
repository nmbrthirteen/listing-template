import { formatRating } from '@/lib/utils'

type Props = {
  title?: string
  listings?: any[]
  features?: { label: string }[]
}

export function ComparisonTableBlock({ title, listings, features }: Props) {
  if (!listings || listings.length === 0) return null

  const resolvedListings = listings
    .map((l) => (typeof l === 'object' ? l : null))
    .filter(Boolean)

  return (
    <section>
      {title && <h2 className="text-2xl sm:text-3xl font-bold text-heading mb-6">{title}</h2>}
      <div className="overflow-x-auto">
        <table className="w-full bg-card rounded-xl border border-white/10 overflow-hidden">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-sm font-medium text-text/70">Feature</th>
              {resolvedListings.map((listing: any) => (
                <th key={listing.id} className="px-6 py-4 text-center text-sm font-semibold text-heading">
                  {listing.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/10">
              <td className="px-6 py-3 text-sm text-text/70">Rating</td>
              {resolvedListings.map((listing: any) => (
                <td key={listing.id} className="px-6 py-3 text-center text-sm font-semibold text-accent">
                  {listing.rating != null ? formatRating(listing.rating) : '-'}
                </td>
              ))}
            </tr>
            {features?.map((feature, i) => (
              <tr key={i} className="border-b border-white/10 last:border-0">
                <td className="px-6 py-3 text-sm text-text/70">{feature.label}</td>
                {resolvedListings.map((listing: any) => {
                  const spec = listing.specs?.find(
                    (s: any) => s.label?.toLowerCase() === feature.label.toLowerCase(),
                  )
                  return (
                    <td key={listing.id} className="px-6 py-3 text-center text-sm text-text">
                      {spec?.value || '-'}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
