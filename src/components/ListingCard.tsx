import Link from 'next/link'
import { Badge } from './Badge'
import { RatingBadge } from './RatingBadge'

type Props = {
  listing: any
  rank?: number
  showRating?: boolean
  showBadges?: boolean
  showRank?: boolean
}

export function ListingCard({
  listing,
  rank,
  showRating = true,
  showBadges = true,
  showRank = true,
}: Props) {
  const logo = typeof listing.logo === 'object' ? listing.logo : null

  return (
    <div className="bg-card rounded-xl border border-white/10 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-primary/30 transition-colors">
      {showRank && rank != null && (
        <div className="text-2xl font-bold text-primary w-8 text-center shrink-0">#{rank}</div>
      )}
      {logo && (
        <div className="w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={logo.sizes?.thumbnail?.url || logo.url}
            alt={logo.alt || listing.name}
            className="w-12 h-12 object-contain"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Link href={`/review/${listing.slug}`} className="text-lg font-semibold text-heading hover:text-primary transition-colors">
            {listing.name}
          </Link>
          {showBadges &&
            listing.badges?.map((badge: any, i: number) => (
              <Badge key={i} label={badge.label} variant={badge.variant} />
            ))}
        </div>
        {listing.shortDescription && (
          <p className="mt-1 text-sm text-text/70 line-clamp-2">{listing.shortDescription}</p>
        )}
        {listing.pros && listing.pros.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {listing.pros.slice(0, 3).map((pro: any, i: number) => (
              <span key={i} className="text-xs text-success flex items-center gap-1">
                <span>+</span> {pro.text}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 shrink-0">
        {showRating && listing.rating != null && <RatingBadge rating={listing.rating} />}
        {listing.ctaUrl && (
          <a
            href={listing.ctaUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-secondary transition-colors"
          >
            {listing.ctaLabel || 'Visit Site'}
          </a>
        )}
      </div>
    </div>
  )
}
