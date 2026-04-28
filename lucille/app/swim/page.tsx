import type { Metadata } from 'next'
import { getProductsByCategory } from '@/lib/products'
import ProductListingPage from '@/components/ProductListingPage'

export const metadata: Metadata = { title: 'Swim' }

export default function SwimPage() {
  return <ProductListingPage title="Swim"
    subtitle="Minimalist swimwear in Italian Lycra. Made for effortless days by the water."
    products={getProductsByCategory('swim')} />
}
