import type { Block } from 'payload'

export const ListingTable: Block = {
  slug: 'listingTable',
  labels: { singular: 'Listing Table', plural: 'Listing Tables' },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    { name: 'limit', type: 'number', defaultValue: 10 },
    { name: 'showRating', type: 'checkbox', defaultValue: true },
    { name: 'showBadges', type: 'checkbox', defaultValue: true },
    { name: 'showRank', type: 'checkbox', defaultValue: true },
  ],
}
