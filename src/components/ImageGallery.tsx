'use client'

import { useState, useEffect, useCallback } from 'react'

type GalleryItem = {
  image: any
  caption?: string
}

type Props = {
  items: GalleryItem[]
}

export function ImageGallery({ items }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  if (!items || items.length === 0) return null

  const resolved = items
    .map((item) => ({
      image: typeof item.image === 'object' ? item.image : null,
      caption: item.caption,
    }))
    .filter((item) => item.image)

  if (resolved.length === 0) return null

  return (
    <>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {resolved.map((item, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className="shrink-0 rounded-xl overflow-hidden border border-white/10 hover:border-primary/30 transition-colors cursor-pointer"
          >
            <img
              src={item.image.sizes?.medium?.url || item.image.url}
              alt={item.image.alt || item.caption || `Gallery image ${i + 1}`}
              className="h-40 w-auto object-cover"
            />
            {item.caption && (
              <div className="px-2 py-1 text-xs text-text/60 bg-card">{item.caption}</div>
            )}
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <Lightbox
          items={resolved}
          selectedIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={setSelectedIndex}
        />
      )}
    </>
  )
}

function Lightbox({
  items,
  selectedIndex,
  onClose,
  onNavigate,
}: {
  items: { image: any; caption?: string }[]
  selectedIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}) {
  const goPrev = useCallback(() => {
    onNavigate((selectedIndex - 1 + items.length) % items.length)
  }, [selectedIndex, items.length, onNavigate])

  const goNext = useCallback(() => {
    onNavigate((selectedIndex + 1) % items.length)
  }, [selectedIndex, items.length, onNavigate])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, goPrev, goNext])

  const current = items[selectedIndex]

  return (
    <div
      role="dialog"
      aria-label="Image gallery lightbox"
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl cursor-pointer"
      >
        &times;
      </button>
      <div className="max-w-5xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
        <img
          src={current.image.sizes?.large?.url || current.image.url}
          alt={current.image.alt || current.caption || ''}
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
        />
        {current.caption && (
          <div className="text-center text-sm text-white/70 mt-3">{current.caption}</div>
        )}
        {items.length > 1 && (
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 pointer-events-none">
            <button
              onClick={(e) => {
                e.stopPropagation()
                goPrev()
              }}
              aria-label="Previous image"
              className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
            >
              &#8249;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goNext()
              }}
              aria-label="Next image"
              className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
            >
              &#8250;
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
