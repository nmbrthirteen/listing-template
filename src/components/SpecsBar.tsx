type Props = {
  specs: { label: string; value: string }[]
}

export function SpecsBar({ specs }: Props) {
  if (!specs || specs.length === 0) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {specs.map((spec, i) => (
        <div key={i} className="bg-card rounded-xl border border-white/10 p-4 text-center">
          <div className="text-xs text-text/50 uppercase tracking-wide mb-1">{spec.label}</div>
          <div className="text-lg font-semibold text-heading">{spec.value}</div>
        </div>
      ))}
    </div>
  )
}
