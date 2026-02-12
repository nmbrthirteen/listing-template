'use client'

import { useState, useMemo } from 'react'
import { ListingCard } from './ListingCard'

type Props = {
  listings: any[]
  pageSize?: number
}

type SortOption = 'rank' | 'rating-desc' | 'name-asc' | 'name-desc'

export function FilterableListings({ listings, pageSize = 10 }: Props) {
  const [sort, setSort] = useState<SortOption>('rank')
  const [activeFilters, setActiveFilters] = useState<Record<string, Set<string>>>({})
  const [visibleCount, setVisibleCount] = useState(pageSize)

  // Extract unique spec labels and their values for filter pills
  const specFilters = useMemo(() => {
    const map = new Map<string, Set<string>>()
    for (const listing of listings) {
      if (listing.specs) {
        for (const spec of listing.specs) {
          if (!map.has(spec.label)) map.set(spec.label, new Set())
          map.get(spec.label)!.add(spec.value)
        }
      }
    }
    // Only show filters with 2+ distinct values
    return Array.from(map.entries())
      .filter(([, values]) => values.size >= 2)
      .map(([label, values]) => ({ label, values: Array.from(values).sort() }))
  }, [listings])

  // Filter + sort
  const filtered = useMemo(() => {
    let result = [...listings]

    // Apply spec filters
    for (const [label, values] of Object.entries(activeFilters)) {
      if (values.size === 0) continue
      result = result.filter((listing) => {
        const spec = listing.specs?.find((s: any) => s.label === label)
        return spec && values.has(spec.value)
      })
    }

    // Sort
    switch (sort) {
      case 'rating-desc':
        result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
        break
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'rank':
      default:
        result.sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))
        break
    }

    return result
  }, [listings, activeFilters, sort])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  function toggleFilter(label: string, value: string) {
    setActiveFilters((prev) => {
      const next = { ...prev }
      const set = new Set(prev[label] || [])
      if (set.has(value)) {
        set.delete(value)
      } else {
        set.add(value)
      }
      next[label] = set
      return next
    })
    setVisibleCount(pageSize)
  }

  const hasActiveFilters = Object.values(activeFilters).some((s) => s.size > 0)

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-text/60">Sort by:</label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortOption)
              setVisibleCount(pageSize)
            }}
            className="bg-card border border-white/10 rounded-lg px-3 py-1.5 text-sm text-heading focus:outline-none focus:border-primary"
          >
            <option value="rank">Rank</option>
            <option value="rating-desc">Rating (High to Low)</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
        </div>
        <div className="text-sm text-text/50 sm:ml-auto">
          Showing {visible.length} of {filtered.length}
          {filtered.length !== listings.length && ` (${listings.length} total)`}
        </div>
      </div>

      {/* Filter Pills */}
      {specFilters.length > 0 && (
        <div className="mb-6 space-y-3">
          {specFilters.map(({ label, values }) => (
            <div key={label} className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-text/50 uppercase tracking-wide min-w-[80px]">{label}:</span>
              {values.map((value) => {
                const isActive = activeFilters[label]?.has(value)
                return (
                  <button
                    key={value}
                    onClick={() => toggleFilter(label, value)}
                    aria-pressed={isActive}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'bg-card border-white/10 text-text/70 hover:border-white/20'
                    }`}
                  >
                    {value}
                  </button>
                )
              })}
            </div>
          ))}
          {hasActiveFilters && (
            <button
              onClick={() => {
                setActiveFilters({})
                setVisibleCount(pageSize)
              }}
              className="text-xs text-primary hover:text-secondary transition-colors cursor-pointer"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Listing Cards */}
      <div className="space-y-4">
        {visible.map((listing: any, i: number) => (
          <ListingCard key={listing.id} listing={listing} rank={sort === 'rank' ? i + 1 : undefined} showRank={sort === 'rank'} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="text-text/50 py-8 text-center">No listings match your filters.</p>
      )}

      {/* Show More */}
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + pageSize)}
            className="inline-flex items-center justify-center rounded-lg bg-card border border-white/10 px-8 py-3 text-sm font-medium text-heading hover:border-primary/30 transition-colors cursor-pointer"
          >
            Show More ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  )
}
