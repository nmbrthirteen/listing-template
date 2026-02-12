import Link from 'next/link'

type Item = {
  image: any
  title: string
  description?: string
  link?: string
}

type Props = {
  items: Item[]
  columns?: '2' | '3' | '4'
}

const colsClass: Record<string, string> = {
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

function Card({ image, title, description, link }: Item) {
  const img = typeof image === 'object' ? image : null
  if (!img) return null

  const content = (
    <div className="group relative rounded-xl overflow-hidden border border-white/10 aspect-[4/3]">
      <img
        src={img.sizes?.medium?.url || img.url}
        alt={img.alt || title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        {description && <p className="text-sm text-white/80 line-clamp-3">{description}</p>}
      </div>
    </div>
  )

  if (link) {
    return (
      <Link href={link} className="block">
        {content}
      </Link>
    )
  }

  return content
}

export function ImageCardBlock({ items, columns = '3' }: Props) {
  if (!items || items.length === 0) return null

  return (
    <div className={`grid ${colsClass[columns] || colsClass['3']} gap-4`}>
      {items.map((item, i) => (
        <Card key={i} {...item} />
      ))}
    </div>
  )
}
