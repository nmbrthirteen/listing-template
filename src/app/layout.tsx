import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Listing Site',
  description: 'Find the best options reviewed and ranked',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
