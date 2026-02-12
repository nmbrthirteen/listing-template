import type { Field } from 'payload'

export const seoFields: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
      admin: { description: 'Auto-generated from title if left empty' },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta Description',
      admin: { description: 'Auto-generated from content if left empty' },
    },
    {
      name: 'keywords',
      type: 'text',
      label: 'Keywords',
      admin: { description: 'Comma-separated keywords' },
    },
    {
      name: 'focusKeyword',
      type: 'text',
      label: 'Focus Keyword',
    },
    {
      name: 'canonicalUrl',
      type: 'text',
      label: 'Canonical URL',
      admin: { description: 'Auto-generated from slug if left empty' },
    },
    {
      name: 'ogTitle',
      type: 'text',
      label: 'OG Title',
      admin: { description: 'Falls back to Meta Title' },
    },
    {
      name: 'ogDescription',
      type: 'textarea',
      label: 'OG Description',
      admin: { description: 'Falls back to Meta Description' },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'OG Image',
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      label: 'No Index',
      defaultValue: false,
    },
    {
      name: 'noFollow',
      type: 'checkbox',
      label: 'No Follow',
      defaultValue: false,
    },
  ],
}
