import { blogPosts } from '@/lib/products'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ProductImage } from '@/components/ProductImage'

export default async function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return notFound()

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        <ProductImage name={post.title} colour="blush" className="absolute inset-0" src={post.photoUrl} />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.4)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-8">
          <p className="text-label text-[9px] text-[#e5c3c3] mb-4">{post.category} · {post.date} · {post.readTime}</p>
          <h1 className="font-display text-4xl md:text-6xl font-medium max-w-3xl leading-tight">{post.title}</h1>
          <p className="font-display italic text-xl text-white/70 mt-4">{post.subtitle}</p>
        </div>
      </section>

      {/* Article */}
      <article className="max-w-2xl mx-auto px-8 py-16">
        <p className="font-display text-xl italic text-[var(--c-text-muted)] leading-relaxed mb-8">{post.excerpt}</p>
        <div className="prose prose-neutral text-body-sm text-[var(--c-text-mid)] leading-relaxed space-y-6">
          <p>Lucille was conceived not as a brand, but as an idea — that intimacy deserves the same attention as any other dimension of a woman's life. That the garments closest to the skin should be the finest, the most considered, the most beautiful.</p>
          <p>Our Kensington boutique is a space apart: hushed, unhurried, its pale walls and silk-draped rails creating an atmosphere closer to a private apartment than a shop. Women come here not just to buy, but to be taken care of.</p>
          <p>This philosophy extends to every piece we make. The lace is sourced from the same mills in Calais that have supplied Parisian couturiers for over a century. The silk charmeuse arrives from Como, its weight and drape unmatched by anything produced at industrial scale. Each piece is finished by hand in our London atelier.</p>
          <p>There is a word in French — <em>raffinement</em> — that captures something English struggles to express: a refinement that is not merely aesthetic, but existential. A way of moving through the world with care and intention. This is what we are trying to make, piece by piece.</p>
        </div>

        {/* Back */}
        <div className="mt-14 pt-8 border-t border-[var(--c-border)]">
          <Link href="/edits" className="text-label text-[9px] hover:opacity-60 transition-opacity">← Back to Edits</Link>
        </div>
      </article>

      {/* More articles */}
      <section className="px-8 md:px-16 pb-16">
        <h2 className="font-display text-2xl mb-8">Continue Reading</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.filter(p => p.slug !== slug).slice(0, 3).map(p => (
            <Link key={p.id} href={`/edits/${p.slug}`} className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--c-bg-soft)] mb-4">
                <ProductImage name={p.title} colour="blush" src={p.photoUrl}
                  className="group-hover:scale-105 transition-transform duration-700" />
              </div>
              <p className="text-label text-[9px] text-[#e5c3c3] mb-2">{p.category}</p>
              <h3 className="font-display text-xl leading-tight group-hover:opacity-70 transition-opacity">{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
