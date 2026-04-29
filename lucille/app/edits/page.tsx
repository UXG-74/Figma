import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/lib/products'
import { ProductImage } from '@/components/ProductImage'

export const metadata: Metadata = { title: 'Edits — The Lucille Journal' }

export default function EditsPage() {
  const [featured, ...rest] = blogPosts
  return (
    <>
      {/* Header */}
      <section className="py-20 text-center border-b border-[var(--c-border)] bg-[var(--c-bg-soft)]">
        <p className="text-label text-[9px] text-[var(--c-text-muted)] mb-3">A Lifestyle Journal</p>
        <h1 className="font-display text-5xl md:text-6xl font-medium">Edits</h1>
        <p className="text-body-sm text-[var(--c-text-muted)] mt-4 max-w-md mx-auto">
          On beauty, style, interiors and the quiet luxury of an intentional life.
        </p>
      </section>

      {/* Featured */}
      <section className="grid md:grid-cols-2 min-h-[60vh]">
        <div className="relative overflow-hidden">
          <ProductImage name={featured.title} colour="blush" className="absolute inset-0" src={featured.photoUrl} />
        </div>
        <div className="flex flex-col justify-center p-12 md:p-16 bg-[#1a1a1a] text-white">
          <p className="text-label text-[9px] text-[#e5c3c3] mb-4">{featured.category} · {featured.date}</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight mb-3">{featured.title}</h2>
          <p className="font-display italic text-xl text-white/60 mb-5">{featured.subtitle}</p>
          <p className="text-body-sm text-white/50 mb-8 leading-relaxed">{featured.excerpt}</p>
          <Link href={`/edits/${featured.slug}`} className="btn-outline-white self-start">Read Story</Link>
        </div>
      </section>

      {/* Grid */}
      <section className="px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {rest.map(post => (
            <Link key={post.id} href={`/edits/${post.slug}`} className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--c-bg-soft)] mb-5">
                <ProductImage name={post.title} colour="blush" src={post.photoUrl}
                  className="group-hover:scale-105 transition-transform duration-700" />
              </div>
              <p className="text-label text-[9px] text-[#e5c3c3] mb-2">{post.category} · {post.date}</p>
              <h3 className="font-display text-2xl leading-tight mb-2 group-hover:opacity-70 transition-opacity">{post.title}</h3>
              <p className="font-display italic text-[var(--c-text-muted)] mb-3">{post.subtitle}</p>
              <p className="text-body-sm text-[var(--c-text-muted)] leading-relaxed line-clamp-3">{post.excerpt}</p>
              <p className="text-label text-[9px] text-[var(--c-text-muted)] mt-4">{post.readTime}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
