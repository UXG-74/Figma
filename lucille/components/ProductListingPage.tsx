import type { Product } from '@/lib/products'
import ProductCard from './ProductCard'

type Props = {
  title: string
  subtitle?: string
  products: Product[]
  heroColour?: string
}

export default function ProductListingPage({ title, subtitle, products, heroColour = 'blush' }: Props) {
  return (
    <>
      {/* Category hero */}
      <section className="bg-[#faf7f5] py-20 text-center border-b border-[#e8e0dc]">
        <p className="text-label text-[9px] text-[#8c7b7b] mb-3">Lucille London</p>
        <h1 className="font-display text-5xl md:text-6xl font-medium">{title}</h1>
        {subtitle && <p className="text-body-sm text-[#8c7b7b] mt-4 max-w-md mx-auto">{subtitle}</p>}
      </section>

      {/* Filters bar */}
      <div className="flex items-center justify-between px-8 md:px-16 py-4 border-b border-[#e8e0dc]">
        <p className="text-body-sm text-[#8c7b7b]">{products.length} pieces</p>
        <div className="flex items-center gap-6">
          <span className="text-label text-[9px] text-[#8c7b7b]">Sort: Featured</span>
        </div>
      </div>

      {/* Grid */}
      <section className="px-8 md:px-16 py-14">
        {products.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl mb-2">Coming Soon</p>
            <p className="text-body-sm text-[#8c7b7b]">New pieces are on their way.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </>
  )
}
