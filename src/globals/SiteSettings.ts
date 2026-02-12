import type { GlobalConfig } from 'payload'

const colorField = (name: string, label: string, defaultValue: string) => ({
  name,
  type: 'text' as const,
  label,
  defaultValue,
  admin: {
    components: {
      afterInput: ['/src/components/admin/ColorPickerInput#ColorPickerInput'],
    },
  },
})

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
        {
          name: 'palettePreview',
          type: 'ui',
          admin: {
            components: {
              Field: '/src/components/admin/ThemePalette#ThemePalette',
            },
          },
        },
        colorField('primaryColor', 'Primary Color', '#6366f1'),
        colorField('secondaryColor', 'Secondary Color', '#4f46e5'),
        colorField('accentColor', 'Accent Color', '#f59e0b'),
        colorField('heroGradientStart', 'Hero Gradient Start', '#1e1b4b'),
        colorField('heroGradientEnd', 'Hero Gradient End', '#312e81'),
        colorField('backgroundColor', 'Background Color', '#0f0e1a'),
        colorField('cardBackground', 'Card Background', '#1a1830'),
        colorField('textColor', 'Text Color', '#e2e8f0'),
        colorField('headingColor', 'Heading Color', '#ffffff'),
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
