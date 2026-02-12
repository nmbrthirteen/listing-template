import { formatRating } from '@/lib/utils'

type Props = {
  rating: number
}

export function RatingBadge({ rating }: Props) {
  const color =
    rating >= 8 ? 'text-success bg-success/20' : rating >= 6 ? 'text-warning bg-warning/20' : 'text-red-400 bg-red-400/20'

  return (
    <div className={`inline-flex items-center rounded-lg px-3 py-1.5 text-lg font-bold ${color}`}>
      {formatRating(rating)}
    </div>
  )
}
