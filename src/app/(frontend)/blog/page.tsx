import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import { BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import { absoluteUrl } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload()
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null) as any
  const siteName = siteSettings?.siteName || 'Blog'

  return {
    title: `Blog | ${siteName}`,
    description: `Latest articles and guides from ${siteName}`,
    alternates: { canonical: absoluteUrl('/blog') },
  }
}

export default async function BlogIndexPage() {
  const payload = await getPayload()

  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 20,
    depth: 1,
  })

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <BreadcrumbStructuredData items={[{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }]} />
      <h1 className="text-3xl sm:text-4xl font-bold text-heading mb-8">Blog</h1>
      {posts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => {
            const image = typeof post.featuredImage === 'object' ? post.featuredImage : null
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="bg-card rounded-xl border border-white/10 overflow-hidden hover:border-primary/30 transition-colors group"
              >
                {image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={image.sizes?.medium?.url || image.url}
                      alt={image.alt || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && <p className="text-sm text-text/70 line-clamp-3">{post.excerpt}</p>}
                  {post.publishedAt && (
                    <time className="block mt-3 text-xs text-text/50">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <p className="text-text/50 py-8">No blog posts yet.</p>
      )}
    </div>
  )
}
