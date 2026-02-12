type Props = {
  author: any
}

export function AuthorCard({ author }: Props) {
  if (!author || typeof author !== 'object') return null

  const avatar = typeof author.avatar === 'object' ? author.avatar : null

  return (
    <div className="bg-card rounded-xl border border-white/10 p-6">
      <div className="flex items-start gap-4">
        {avatar && (
          <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-white/5">
            <img
              src={avatar.sizes?.thumbnail?.url || avatar.url}
              alt={avatar.alt || author.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-heading">{author.name}</span>
            {author.role && (
              <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">{author.role}</span>
            )}
          </div>
          {author.bio && <p className="mt-2 text-sm text-text/70">{author.bio}</p>}
          {author.socialLinks && author.socialLinks.length > 0 && (
            <div className="mt-3 flex gap-3">
              {author.socialLinks.map((link: any, i: number) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:text-secondary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
