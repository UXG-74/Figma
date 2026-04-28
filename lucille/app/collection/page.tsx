import type { Metadata } from 'next'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { ProductImage } from '@/components/ProductImage'
import { collections } from '@/lib/products'

export const metadata: Metadata = { title: 'Collections' }

export default function CollectionPage() {
  const col = collections[0]
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <ProductImage name="La Belle Époque" colour="blush" className="absolute inset-0" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%)' }} />
        <div className="relative z-10 p-12 md:p-20 text-white">
          <p className="text-label text-[9px] text-[#e5c3c3] mb-3">Exclusive Collection</p>
          <h1 className="font-display text-5xl md:text-7xl font-medium leading-tight">{col.name}</h1>
          <p className="text-body-sm text-white/70 mt-4 max-w-md">{col.description}</p>
        </div>
      </section>

      {/* Products */}
      <section className="px-8 md:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 gap-y-12">
          {col.products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  )
}
