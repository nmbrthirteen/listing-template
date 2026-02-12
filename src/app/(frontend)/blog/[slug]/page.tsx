import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { BreadcrumbStructuredData, BlogPostingStructuredData } from '@/components/seo/StructuredData'
import { absoluteUrl } from '@/lib/utils'

type Args = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload()

  const post = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
  }).then((res) => res.docs[0]).catch(() => null) as any

  if (!post) return { title: 'Not Found' }

  const title = post.seo?.metaTitle || post.title
  const description = post.seo?.metaDescription || post.excerpt || ''

  return {
    title,
    description,
    openGraph: {
      title: post.seo?.ogTitle || title,
      description: post.seo?.ogDescription || description,
      url: absoluteUrl(`/blog/${slug}`),
      type: 'article',
      ...(post.publishedAt && { publishedTime: post.publishedAt }),
    },
    robots: { index: !post.seo?.noIndex, follow: !post.seo?.noFollow },
    alternates: { canonical: post.seo?.canonicalUrl || absoluteUrl(`/blog/${slug}`) },
  }
}

export default async function BlogPostPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload()

  const post = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    depth: 2,
  }).then((res) => res.docs[0]).catch(() => null) as any

  if (!post) notFound()

  const image = typeof post.featuredImage === 'object' ? post.featuredImage : null

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${slug}` },
        ]}
      />
      <BlogPostingStructuredData
        title={post.title}
        description={post.excerpt}
        url={`/blog/${slug}`}
        publishedAt={post.publishedAt}
        imageUrl={image?.url}
      />

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-heading mb-4">{post.title}</h1>
        {post.publishedAt && (
          <time className="text-sm text-text/50">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        )}
      </header>

      {image && (
        <div className="aspect-video rounded-xl overflow-hidden mb-8">
          <img
            src={image.sizes?.large?.url || image.url}
            alt={image.alt || post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {post.content && (
        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-heading prose-a:text-primary">
          <RichText data={post.content} />
        </div>
      )}
    </article>
  )
}
