import type { CollectionConfig } from 'payload'
import { seoFields } from '@/lib/seoFields'
import { Hero } from '@/blocks/Hero'
import { ListingTable } from '@/blocks/ListingTable'
import { RichContent } from '@/blocks/RichContent'
import { FAQ } from '@/blocks/FAQ'
import { ProsCons } from '@/blocks/ProsCons'
import { ComparisonTable } from '@/blocks/ComparisonTable'
import { CTABanner } from '@/blocks/CTABanner'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [Hero, ListingTable, RichContent, FAQ, ProsCons, ComparisonTable, CTABanner],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      required: true,
      admin: { position: 'sidebar' },
    },
    seoFields,
  ],
}
