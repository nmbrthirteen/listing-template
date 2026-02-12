export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function absoluteUrl(path: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}
