import Link from 'next/link'

type NavItem = {
  label: string
  url: string
  openInNewTab?: boolean
  children?: { label: string; url: string }[]
}

type Props = {
  siteSettings: any
  navigation: any
}

export function Header({ siteSettings, navigation }: Props) {
  const siteName = siteSettings?.siteName || 'Listing Site'
  const items: NavItem[] = navigation?.items || []

  return (
    <header className="border-b border-white/10 bg-bg/80 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-heading">
            {siteSettings?.logo && typeof siteSettings.logo === 'object' ? (
              <img
                src={siteSettings.logo.url}
                alt={siteSettings.logo.alt || siteName}
                className="h-8"
              />
            ) : (
              siteName
            )}
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {items.map((item, i) => (
              <div key={i} className="relative group">
                <Link
                  href={item.url}
                  target={item.openInNewTab ? '_blank' : undefined}
                  className="text-sm font-medium text-text hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && item.children.length > 0 && (
                  <div className="absolute top-full left-0 pt-2 hidden group-hover:block">
                    <div className="bg-card rounded-lg border border-white/10 py-2 min-w-[180px] shadow-xl">
                      {item.children.map((child, j) => (
                        <Link
                          key={j}
                          href={child.url}
                          className="block px-4 py-2 text-sm text-text hover:bg-white/5"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
