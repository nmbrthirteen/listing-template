import type { CollectionConfig } from 'payload'
import { seoFields } from '@/lib/seoFields'

export const Listings: CollectionConfig = {
  slug: 'listings',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'rank', 'rating', 'status'],
  },
  fields: [
    {
      name: 'name',
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
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 10,
      admin: { step: 0.1 },
    },
    {
      name: 'rank',
      type: 'number',
      admin: { description: 'Display order (lower = higher)' },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
    },
    {
      name: 'badges',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Success', value: 'success' },
            { label: 'Warning', value: 'warning' },
            { label: 'Info', value: 'info' },
          ],
        },
      ],
    },
    {
      name: 'pros',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'cons',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Visit Site',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      admin: { description: 'Affiliate link' },
    },
    {
      name: 'detailedReview',
      type: 'richText',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
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
