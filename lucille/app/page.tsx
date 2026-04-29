import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import { ProductImage } from '@/components/ProductImage'
import StoreSection from '@/components/StoreSection'
import { newArrivals, bestsellers, blogPosts } from '@/lib/products'

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <Image src="/homepage.png" alt="Lucille London — La Belle Époque" fill
          className="object-cover object-[55%_50%] md:object-center" priority />
        {/* Gradient overlay */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)' }} />
        {/* Hero copy */}
        <div className="absolute bottom-0 left-0 right-0 p-12 md:p-20 text-white">
          <p className="text-label text-[9px] tracking-widest text-white/70 mb-3">New Collection</p>
          <h1 className="font-display text-5xl md:text-7xl font-medium leading-[1.05] mb-2">
            Fall <em>in love</em><br />with lace
          </h1>
          <p className="text-body-sm text-white/70 mt-3 mb-7 max-w-sm">
            La Belle Époque — an ode to Parisian sensuality, crafted in the finest French Chantilly lace.
          </p>
          <Link href="/lingerie" className="btn-outline-white">Shop Lingerie</Link>
        </div>
      </section>

      {/* ── Brand strip ── */}
      <section className="py-10 px-8 text-center border-b border-[var(--c-border)]">
        <p className="text-label text-[9px] text-[var(--c-text-muted)] tracking-widest">
          Free Shipping &nbsp;·&nbsp; Complimentary Gift Wrapping &nbsp;·&nbsp; Returns within 30 Days &nbsp;·&nbsp; Kensington Boutique Open Daily
        </p>
      </section>

      {/* ── New Arrivals ── */}
      <section className="py-20 px-8 md:px-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-label text-[9px] text-[var(--c-text-muted)] mb-2">Just Arrived</p>
            <h2 className="font-display text-3xl md:text-4xl">New Arrivals</h2>
          </div>
          <Link href="/new" className="text-label text-[9px] hover:opacity-60 transition-opacity">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ── Editorial split: Nightwear ── */}
      <section className="grid md:grid-cols-2 min-h-[600px]">
        <div className="relative overflow-hidden bg-[var(--c-bg-soft)]">
          <ProductImage name="Silk Robe" colour="ivory" className="absolute inset-0"
            src="/IMG_%201964.jpg" />
        </div>
        <div className="bg-[#1a1a1a] text-white flex flex-col items-start justify-center p-14 md:p-20">
          <p className="text-label text-[9px] text-[#e5c3c3] mb-4">Nightwear</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium leading-[1.1] mb-5">
            The art of<br /><em>doing nothing</em>
          </h2>
          <p className="text-body-sm text-white/60 mb-8 max-w-xs leading-relaxed">
            Pure silk robes, chemises and nightdresses for the mornings you want to last forever.
          </p>
          <Link href="/nightwear" className="btn-outline-white">Explore Nightwear</Link>
        </div>
      </section>

      {/* ── Bestsellers ── */}
      <section className="py-20 px-8 md:px-16 bg-[var(--c-bg-soft)]">
        <div className="text-center mb-12">
          <p className="text-label text-[9px] text-[var(--c-text-muted)] mb-2">Perennially Beloved</p>
          <h2 className="font-display text-3xl md:text-4xl">The Favourites</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {bestsellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ── Swim editorial ── */}
      <section className="grid md:grid-cols-2 min-h-[500px]">
        <div className="bg-[var(--c-bg-soft)] flex flex-col items-start justify-center p-14 md:p-20 order-2 md:order-1">
          <p className="text-label text-[9px] text-[var(--c-text-muted)] mb-4">Swim</p>
          <h2 className="font-display text-4xl font-medium leading-[1.1] mb-5">
            Sun, <em>sea</em><br />and Italian Lycra
          </h2>
          <p className="text-body-sm text-[var(--c-text-muted)] mb-8 max-w-xs leading-relaxed">
            Minimalist swimwear with the same attention to fit and fabric that defines all of Lucille.
          </p>
          <Link href="/swim" className="btn-outline">Shop Swim</Link>
        </div>
        <div className="relative overflow-hidden order-1 md:order-2 min-h-[350px]">
          <ProductImage name="Halter Bikini" colour="sand" className="absolute inset-0"
            src="https://plus.unsplash.com/premium_photo-1677687190438-040daa5d5337?w=1200&auto=format&fit=crop&q=80" />
        </div>
      </section>

      {/* ── Collection banner ── */}
      <section className="relative py-28 px-8 text-center overflow-hidden bg-[#e5c3c3]">
        <p className="text-label text-[9px] text-white/70 mb-3">Exclusive</p>
        <h2 className="font-display text-4xl md:text-6xl font-medium text-[#1a1a1a] mb-4">
          La Belle Époque
        </h2>
        <p className="text-body-sm text-[#1a1a1a]/70 mb-8 max-w-sm mx-auto">
          Our most romantic collection to date. French lace, silk charmeuse and the timeless elegance of another era.
        </p>
        <Link href="/collection" className="btn-outline">Discover the Collection</Link>
      </section>

      {/* ── Edits / Blog ── */}
      <section className="py-20 px-8 md:px-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-label text-[9px] text-[var(--c-text-muted)] mb-2">The Lucille Edit</p>
            <h2 className="font-display text-3xl md:text-4xl">Life, Beautifully Lived</h2>
          </div>
          <Link href="/edits" className="text-label text-[9px] hover:opacity-60 transition-opacity">Read All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map(post => (
            <Link key={post.id} href={`/edits/${post.slug}`} className="group">
              <div className="aspect-[4/3] bg-[var(--c-bg-soft)] overflow-hidden mb-4">
                <ProductImage name={post.title} colour="blush" src={post.photoUrl}
                  className="group-hover:scale-105 transition-transform duration-700" />
              </div>
              <p className="text-label text-[9px] text-[#e5c3c3] mb-2">{post.category}</p>
              <h3 className="font-display text-lg leading-tight mb-1 group-hover:opacity-70 transition-opacity">{post.title}</h3>
              <p className="text-body-sm text-[var(--c-text-muted)] line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Store locator ── */}
      <StoreSection />
    </>
  )
}
