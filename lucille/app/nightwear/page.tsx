import type { Metadata } from 'next'
import { getProductsByCategory } from '@/lib/products'
import ProductListingPage from '@/components/ProductListingPage'

export const metadata: Metadata = { title: 'Nightwear' }

export default function NightwearPage() {
  return <ProductListingPage title="Nightwear"
    subtitle="Pure silk robes, chemises and nightdresses for mornings worth lingering in."
    products={getProductsByCategory('nightwear')} />
}
