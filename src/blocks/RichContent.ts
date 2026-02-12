import type { Block } from 'payload'

export const RichContent: Block = {
  slug: 'richContent',
  labels: { singular: 'Rich Content', plural: 'Rich Content' },
  fields: [
    { name: 'content', type: 'richText', required: true },
  ],
}
