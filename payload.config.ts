import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import { Listings } from '@/collections/Listings'
import { Pages } from '@/collections/Pages'
import { Categories } from '@/collections/Categories'
import { BlogPosts } from '@/collections/BlogPosts'
import { Authors } from '@/collections/Authors'
import { SiteSettings } from '@/globals/SiteSettings'
import { Navigation } from '@/globals/Navigation'
import { Footer } from '@/globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: ({ data, collectionConfig }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

        if (collectionConfig) {
          const preview = '?preview=true'
          switch (collectionConfig.slug) {
            case 'pages':
              return data.slug === 'home'
                ? `${baseUrl}${preview}`
                : `${baseUrl}/${data.slug || ''}${preview}`
            case 'blog-posts':
              return `${baseUrl}/blog/${data.slug || ''}${preview}`
            case 'listings':
              return `${baseUrl}/review/${data.slug || ''}${preview}`
          }
        }

        return baseUrl
      },
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
      collections: ['pages', 'blog-posts', 'listings'],
    },
  },
  collections: [Users, Media, Categories, Listings, Pages, BlogPosts, Authors],
  globals: [SiteSettings, Navigation, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-key',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || `file:${path.resolve(dirname, 'data/database.db')}`,
    },
  }),
  sharp,
})
