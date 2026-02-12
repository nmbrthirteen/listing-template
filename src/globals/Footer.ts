import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  fields: [
    {
      name: 'columns',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'disclaimer',
      type: 'richText',
    },
    {
      name: 'copyrightText',
      type: 'text',
      defaultValue: '© {year} All rights reserved.',
    },
  ],
}
