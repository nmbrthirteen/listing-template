import type { Block } from 'payload'

export const CTABanner: Block = {
  slug: 'ctaBanner',
  labels: { singular: 'CTA Banner', plural: 'CTA Banners' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'text' },
    { name: 'buttonText', type: 'text', required: true },
    { name: 'buttonUrl', type: 'text', required: true },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Accent', value: 'accent' },
      ],
    },
  ],
}
