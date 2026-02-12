type Props = {
  title?: string
  pros?: { text: string }[]
  cons?: { text: string }[]
}

export function ProsConsBlock({ title, pros, cons }: Props) {
  return (
    <section>
      {title && <h2 className="text-2xl sm:text-3xl font-bold text-heading mb-6">{title}</h2>}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-success/20 p-6">
          <h3 className="text-lg font-semibold text-success mb-4">Pros</h3>
          <ul className="space-y-2">
            {pros?.map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text">
                <span className="text-success mt-0.5">+</span>
                {pro.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card rounded-xl border border-red-400/20 p-6">
          <h3 className="text-lg font-semibold text-red-400 mb-4">Cons</h3>
          <ul className="space-y-2">
            {cons?.map((con, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text">
                <span className="text-red-400 mt-0.5">-</span>
                {con.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
