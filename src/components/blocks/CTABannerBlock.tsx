type Props = {
  heading: string
  description?: string
  buttonText: string
  buttonUrl: string
  variant?: 'primary' | 'accent'
}

export function CTABannerBlock({ heading, description, buttonText, buttonUrl, variant = 'primary' }: Props) {
  const bgClass = variant === 'accent' ? 'bg-accent/10 border-accent/20' : 'bg-primary/10 border-primary/20'
  const btnClass = variant === 'accent' ? 'bg-accent text-black hover:bg-accent/90' : 'bg-primary text-white hover:bg-secondary'

  return (
    <section className={`rounded-2xl border ${bgClass} p-8 sm:p-12 text-center`}>
      <h2 className="text-2xl sm:text-3xl font-bold text-heading mb-3">{heading}</h2>
      {description && <p className="text-text/80 mb-6 max-w-xl mx-auto">{description}</p>}
      <a
        href={buttonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center rounded-lg px-6 py-3 text-base font-semibold transition-colors ${btnClass}`}
      >
        {buttonText}
      </a>
    </section>
  )
}
