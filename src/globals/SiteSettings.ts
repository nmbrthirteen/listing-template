import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Listing Site',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'theme',
      type: 'group',
      label: 'Theme',
      fields: [
        { name: 'primaryColor', type: 'text', defaultValue: '#6366f1' },
        { name: 'secondaryColor', type: 'text', defaultValue: '#4f46e5' },
        { name: 'accentColor', type: 'text', defaultValue: '#f59e0b' },
        { name: 'heroGradientStart', type: 'text', defaultValue: '#1e1b4b' },
        { name: 'heroGradientEnd', type: 'text', defaultValue: '#312e81' },
        { name: 'backgroundColor', type: 'text', defaultValue: '#0f0e1a' },
        { name: 'cardBackground', type: 'text', defaultValue: '#1a1830' },
        { name: 'textColor', type: 'text', defaultValue: '#e2e8f0' },
        { name: 'headingColor', type: 'text', defaultValue: '#ffffff' },
        {
          name: 'fontFamily',
          type: 'select',
          defaultValue: 'Inter',
          options: [
            { label: 'Inter', value: 'Inter' },
            { label: 'DM Sans', value: 'DM Sans' },
            { label: 'System', value: 'system-ui' },
          ],
        },
      ],
    },
    {
      name: 'defaultSeo',
      type: 'group',
      label: 'Default SEO',
      fields: [
        { name: 'defaultMetaTitle', type: 'text' },
        { name: 'defaultMetaDescription', type: 'textarea' },
        { name: 'defaultOgImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      label: 'Analytics',
      fields: [
        { name: 'googleAnalyticsId', type: 'text', label: 'Google Analytics ID' },
        { name: 'googleTagManagerId', type: 'text', label: 'Google Tag Manager ID' },
      ],
    },
  ],
}
