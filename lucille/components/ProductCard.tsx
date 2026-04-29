'use client'
import Link from 'next/link'
import { useState } from 'react'
import type { Product } from '@/lib/products'
import { ProductImage } from './ProductImage'
import { useCartStore } from '@/lib/store'

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)
  const defaultColour = product.colours[0]?.name ?? 'Blush'
  const defaultSize   = product.sizes[0] ?? 'S'

  return (
    <div className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <Link href={`/${product.category}/${product.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-[var(--c-bg-soft)]">
          <ProductImage
            name={product.name}
            colour={hovered && product.colours[1] ? product.colours[1].name : defaultColour}
            src={product.photoUrl}
            className="transition-transform duration-700 group-hover:scale-105"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-[#1a1a1a] text-white text-label text-[9px] px-2 py-1">NEW</span>
            )}
            {product.isBestseller && (
              <span className="bg-[#e5c3c3] text-[#1a1a1a] text-label text-[9px] px-2 py-1">BESTSELLER</span>
            )}
          </div>
          {/* Quick add */}
          <div className={`absolute bottom-0 left-0 right-0 bg-[var(--c-bg)] backdrop-blur-sm p-3 transition-all duration-300 ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            <button
              onClick={e => { e.preventDefault(); addItem(product, defaultSize, defaultColour) }}
              className="btn-primary w-full text-[10px] py-2.5">
              Quick Add — {defaultSize}
            </button>
          </div>
        </div>
      </Link>
      <div className="mt-3 space-y-1">
        <p className="text-body-sm font-medium">{product.name}</p>
        {product.collection && (
          <p className="text-body-sm text-[var(--c-text-muted)] text-[11px] italic font-display">{product.collection}</p>
        )}
        <p className="text-body-sm">£{product.price}</p>
        {/* Colour dots */}
        <div className="flex gap-1.5 mt-2">
          {product.colours.map(c => (
            <div key={c.name} title={c.name}
              className="w-3 h-3 rounded-full border border-[#e8e0dc]"
              style={{ background: c.hex }} />
          ))}
        </div>
      </div>
    </div>
  )
}
