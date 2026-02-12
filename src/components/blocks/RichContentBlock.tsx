import { RichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  content: any
}

export function RichContentBlock({ content }: Props) {
  if (!content) return null

  return (
    <section className="prose prose-invert prose-lg max-w-none prose-headings:text-heading prose-a:text-primary">
      <RichText data={content} />
    </section>
  )
}
