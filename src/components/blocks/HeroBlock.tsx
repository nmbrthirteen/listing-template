import Link from 'next/link'
import { Badge } from '../Badge'

type Props = {
  heading: string
  subtitle?: string
  badges?: { label: string }[]
  ctaText?: string
  ctaUrl?: string
  backgroundImage?: any
}

export function HeroBlock({ heading, subtitle, badges, ctaText, ctaUrl, backgroundImage }: Props) {
  const bgImage = typeof backgroundImage === 'object' ? backgroundImage : null

  return (
    <section
      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-hero-start to-hero-end py-16 sm:py-24 px-6 sm:px-12 text-center"
      style={
        bgImage
          ? { backgroundImage: `url(${bgImage.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : undefined
      }
    >
      {bgImage && <div className="absolute inset-0 bg-black/50" />}
      <div className="relative z-10">
        {badges && badges.length > 0 && (
          <div className="flex justify-center gap-2 mb-4 flex-wrap">
            {badges.map((b, i) => (
              <Badge key={i} label={b.label} variant="info" />
            ))}
          </div>
        )}
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">{heading}</h1>
        {subtitle && <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8">{subtitle}</p>}
        {ctaText && ctaUrl && (
          <Link
            href={ctaUrl}
            className="inline-flex items-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-black hover:bg-accent/90 transition-colors"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}
