import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <p className="text-8xl font-bold text-primary/20">404</p>
      <h1 className="mt-4 text-3xl font-bold text-heading">Page not found</h1>
      <p className="mt-3 text-text/60">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-secondary transition-colors"
      >
        Back to home
      </Link>
    </div>
  )
}
