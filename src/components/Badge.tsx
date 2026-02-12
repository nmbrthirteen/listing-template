const variantClasses: Record<string, string> = {
  default: 'bg-white/10 text-text',
  success: 'bg-success/20 text-success',
  warning: 'bg-warning/20 text-warning',
  info: 'bg-info/20 text-info',
}

type Props = {
  label: string
  variant?: string
}

export function Badge({ label, variant = 'default' }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant] || variantClasses.default}`}
    >
      {label}
    </span>
  )
}
