'use client'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import { useState } from 'react'
import { getProductBySlug, products } from '@/lib/products'
import { ProductImage } from '@/components/ProductImage'
import { useCartStore } from '@/lib/store'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'

export default function ProductPage() {
  const params = useParams()
  const slug = params?.slug as string

  // Support all categories via the lingerie route (generic handler)
  const product = products.find(p => p.slug === slug)
  if (!product) return notFound()

  const [selectedSize,   setSelectedSize]   = useState(product.sizes[0])
  const [selectedColour, setSelectedColour] = useState(product.colours[0])
  const [qty,            setQty]            = useState(1)
  const [added,          setAdded]          = useState(false)
  const addItem = useCartStore(s => s.addItem)

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product, selectedSize, selectedColour.name)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      {/* Breadcrumb */}
      <nav className="px-8 md:px-16 py-4 border-b border-[var(--c-border)]">
        <div className="flex items-center gap-2 text-body-sm text-[var(--c-text-muted)]">
          <Link href="/" className="hover:text-[var(--c-text)] transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${product.category}`} className="hover:text-[var(--c-text)] transition-colors capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-[var(--c-text)]">{product.name}</span>
        </div>
      </nav>

      {/* Product */}
      <section className="grid md:grid-cols-2 min-h-[80vh]">
        {/* Images */}
        <div className="grid grid-cols-2 gap-1 bg-[var(--c-bg-soft)] p-1">
          {[0, 1].map(i => (
            <div key={i} className="aspect-[3/4] overflow-hidden">
              <ProductImage name={product.name}
                colour={product.colours[i]?.name ?? product.colours[0].name} />
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="p-10 md:p-16 flex flex-col justify-center">
          {product.collection && (
            <p className="text-label text-[9px] text-[#e5c3c3] mb-3 italic font-display">{product.collection}</p>
          )}
          <h1 className="font-display text-3xl md:text-4xl mb-2">{product.name}</h1>
          <p className="font-display text-2xl mb-6">£{product.price}</p>
          <p className="text-body-sm text-[var(--c-text-muted)] leading-relaxed mb-8">{product.description}</p>

          {/* Colour selector */}
          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <span className="text-label text-[9px]">Colour</span>
              <span className="text-body-sm text-[var(--c-text-muted)]">{selectedColour.name}</span>
            </div>
            <div className="flex gap-3">
              {product.colours.map(c => (
                <button key={c.name} title={c.name} onClick={() => setSelectedColour(c)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColour.name === c.name ? 'border-[var(--c-text)] scale-110' : 'border-transparent'}`}
                  style={{ background: c.hex, boxShadow: '0 0 0 1px var(--c-border)' }} />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <span className="text-label text-[9px]">Size</span>
              <Link href="/size-guide" className="text-label text-[9px] text-[var(--c-text-muted)] underline">Size Guide</Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)}
                  className={`px-3 py-2 text-body-sm border transition-all ${
                    selectedSize === s
                      ? 'border-[var(--c-text)] bg-[#1a1a1a] text-white'
                      : 'border-[var(--c-border)] hover:border-[var(--c-text)]'
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add */}
          <div className="flex gap-3 mb-6">
            <div className="flex border border-[var(--c-border)]">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-11 h-11 flex items-center justify-center hover:bg-[var(--c-bg-soft)] transition-colors">−</button>
              <span className="w-10 flex items-center justify-center text-body-sm">{qty}</span>
              <button onClick={() => setQty(q => q + 1)}
                className="w-11 h-11 flex items-center justify-center hover:bg-[var(--c-bg-soft)] transition-colors">+</button>
            </div>
            <button onClick={handleAddToCart}
              className={`btn-primary flex-1 ${added ? 'bg-[#c9a0a0] border-[#c9a0a0]' : ''}`}>
              {added ? 'Added to Bag ✓' : 'Add to Bag'}
            </button>
          </div>

          {/* Trust */}
          <div className="space-y-2 border-t border-[var(--c-border)] pt-6">
            {[
              ['Free Shipping', 'On all UK orders'],
              ['Gift Wrapping', 'Complimentary on every order'],
              ['Easy Returns', 'Within 30 days'],
            ].map(([title, sub]) => (
              <div key={title} className="flex gap-3 items-start">
                <span className="text-[#e5c3c3] mt-0.5">✦</span>
                <div>
                  <p className="text-body-sm font-medium">{title}</p>
                  <p className="text-body-sm text-[var(--c-text-muted)]">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Details accordion stub */}
          <details className="mt-6 border-t border-[var(--c-border)] pt-4">
            <summary className="text-label text-[9px] cursor-pointer hover:opacity-60 transition-opacity">Product Details</summary>
            <ul className="mt-3 space-y-1">
              {product.details.map(d => (
                <li key={d} className="text-body-sm text-[var(--c-text-muted)] flex gap-2"><span>—</span>{d}</li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="px-8 md:px-16 py-16 border-t border-[var(--c-border)]">
          <h2 className="font-display text-2xl mb-10">You May Also Love</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </>
  )
}
