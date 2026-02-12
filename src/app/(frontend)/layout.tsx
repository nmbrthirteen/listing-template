import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Listing Site',
  description: 'Find the best options reviewed and ranked',
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload()

  const siteSettings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)
  const navigation = await payload.findGlobal({ slug: 'navigation' }).catch(() => null)
  const footer = await payload.findGlobal({ slug: 'footer' }).catch(() => null)

  const theme = (siteSettings as any)?.theme || {}

  const themeVars = {
    '--theme-primary': theme.primaryColor || '#6366f1',
    '--theme-secondary': theme.secondaryColor || '#4f46e5',
    '--theme-accent': theme.accentColor || '#f59e0b',
    '--theme-hero-start': theme.heroGradientStart || '#1e1b4b',
    '--theme-hero-end': theme.heroGradientEnd || '#312e81',
    '--theme-bg': theme.backgroundColor || '#0f0e1a',
    '--theme-card': theme.cardBackground || '#1a1830',
    '--theme-text': theme.textColor || '#e2e8f0',
    '--theme-heading': theme.headingColor || '#ffffff',
  } as React.CSSProperties

  const fontFamily = theme.fontFamily || 'Inter'
  const fontUrl =
    fontFamily !== 'system-ui'
      ? `https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:wght@400;500;600;700&display=swap`
      : null

  return (
    <html lang="en">
      <head>
        {fontUrl && (
          <link rel="stylesheet" href={fontUrl} />
        )}
      </head>
      <body>
        <div style={{ ...themeVars, fontFamily }} className="min-h-screen bg-bg text-text">
          <Header siteSettings={siteSettings} navigation={navigation} />
          <main>{children}</main>
          <Footer footer={footer} siteSettings={siteSettings} />
        </div>
      </body>
    </html>
  )
}
