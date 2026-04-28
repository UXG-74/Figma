import type { Metadata } from 'next'
import { newArrivals } from '@/lib/products'
import ProductListingPage from '@/components/ProductListingPage'

export const metadata: Metadata = { title: 'New Arrivals' }

export default function NewPage() {
  return <ProductListingPage title="New Arrivals"
    subtitle="The latest pieces to join the Lucille collection."
    products={newArrivals} />
}
