import { RichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  title?: string
  items: { question: string; answer: any }[]
}

export function FAQBlock({ title, items }: Props) {
  if (!items || items.length === 0) return null

  return (
    <section>
      {title && <h2 className="text-2xl sm:text-3xl font-bold text-heading mb-6">{title}</h2>}
      <div className="space-y-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="group bg-card rounded-xl border border-white/10 overflow-hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-heading font-medium hover:bg-white/5 transition-colors">
              {item.question}
              <span className="ml-2 text-text/50 group-open:rotate-180 transition-transform">
                &#9662;
              </span>
            </summary>
            <div className="px-6 pb-4 prose prose-invert prose-sm max-w-none">
              <RichText data={item.answer} />
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
