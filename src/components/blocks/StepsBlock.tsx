import { RichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  title?: string
  steps: { heading: string; description?: any; image?: any }[]
}

export function StepsBlock({ title, steps }: Props) {
  if (!steps || steps.length === 0) return null

  return (
    <section>
      {title && <h2 className="text-2xl sm:text-3xl font-bold text-heading mb-8">{title}</h2>}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10 hidden sm:block" />

        <div className="space-y-8">
          {steps.map((step, i) => {
            const image = typeof step.image === 'object' ? step.image : null
            return (
              <div key={i} className="flex gap-6">
                {/* Step number */}
                <div className="relative z-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {i + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-heading mb-2">{step.heading}</h3>
                  {step.description && (
                    <div className="prose prose-invert prose-sm max-w-none mb-4">
                      <RichText data={step.description} />
                    </div>
                  )}
                  {image && (
                    <div className="rounded-xl overflow-hidden border border-white/10 max-w-lg">
                      <img
                        src={image.sizes?.medium?.url || image.url}
                        alt={image.alt || step.heading}
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
