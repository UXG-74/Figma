import type { Metadata } from 'next'
import { getProductsByCategory } from '@/lib/products'
import ProductListingPage from '@/components/ProductListingPage'

export const metadata: Metadata = { title: 'Gifts' }

export default function GiftsPage() {
  return <ProductListingPage title="Gifts"
    subtitle="For the woman who deserves something beautiful. All orders arrive in Lucille's signature packaging."
    products={getProductsByCategory('gifts')} />
}
