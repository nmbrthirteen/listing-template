import Link from 'next/link'

type Props = {
  footer: any
  siteSettings: any
}

export function Footer({ footer, siteSettings }: Props) {
  const columns = footer?.columns || []
  const copyrightText = (footer?.copyrightText || '© {year} All rights reserved.').replace(
    '{year}',
    new Date().getFullYear().toString(),
  )

  return (
    <footer className="border-t border-white/10 bg-bg mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {columns.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {columns.map((col: any, i: number) => (
              <div key={i}>
                <h3 className="text-sm font-semibold text-heading mb-4">{col.title}</h3>
                <ul className="space-y-2">
                  {col.links?.map((link: any, j: number) => (
                    <li key={j}>
                      <Link
                        href={link.url}
                        className="text-sm text-text/70 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {footer?.disclaimer && (
          <div className="text-xs text-text/50 border-t border-white/10 pt-6 mb-6 prose prose-invert prose-sm max-w-none">
            {/* Render disclaimer as plain text fallback */}
            <p>
              {typeof footer.disclaimer === 'string'
                ? footer.disclaimer
                : 'Please gamble responsibly.'}
            </p>
          </div>
        )}
        <div className="text-center text-sm text-text/50">{copyrightText}</div>
      </div>
    </footer>
  )
}
