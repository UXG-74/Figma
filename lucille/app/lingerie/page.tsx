import type { Metadata } from 'next'
import { getProductsByCategory } from '@/lib/products'
import ProductListingPage from '@/components/ProductListingPage'

export const metadata: Metadata = { title: 'Lingerie' }

export default function LingerieePage() {
  return <ProductListingPage title="Lingerie"
    subtitle="French lace, silk satin and the enduring art of fine lingerie."
    products={getProductsByCategory('lingerie')} />
}
