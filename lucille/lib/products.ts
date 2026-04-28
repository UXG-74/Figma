export type Product = {
  id: string
  slug: string
  name: string
  brand: string
  price: number
  category: 'lingerie' | 'nightwear' | 'swim' | 'gifts'
  isNew?: boolean
  isBestseller?: boolean
  description: string
  details: string[]
  sizes: string[]
  colours: { name: string; hex: string }[]
  images: string[]
  photoUrl?: string
  collection?: string
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  subtitle: string
  category: string
  date: string
  readTime: string
  excerpt: string
  content: string
  photoUrl?: string
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'silk-lace-balcony-bra',
    name: 'Silk & Lace Balcony Bra',
    brand: 'Lucille',
    price: 185,
    category: 'lingerie',
    isNew: true,
    description: 'Crafted from the finest French Chantilly lace with a silk satin underband, this balcony bra is the epitome of Parisian sensuality.',
    details: ['French Chantilly lace', 'Silk satin underband', 'Adjustable silk straps', 'Hook and eye fastening', 'Dry clean only'],
    sizes: ['32A', '32B', '32C', '34A', '34B', '34C', '34D', '36B', '36C', '36D'],
    colours: [{ name: 'Blush', hex: '#e5c3c3' }, { name: 'Noir', hex: '#1a1a1a' }, { name: 'Ivory', hex: '#f5f0eb' }],
    images: ['blush-lace', 'noir-lace', 'ivory-lace'],
    photoUrl: 'https://images.unsplash.com/photo-1770294758971-44fa1eae61a3?w=1200&auto=format&fit=crop&q=80',
    collection: 'La Belle Époque',
  },
  {
    id: '2',
    slug: 'silk-brief',
    name: 'Silk Brief',
    brand: 'Lucille',
    price: 95,
    category: 'lingerie',
    isNew: true,
    description: 'Pure silk briefs with delicate lace trim. An everyday luxury.',
    details: ['100% silk', 'Lace trim', 'Elasticated waistband', 'Hand wash'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colours: [{ name: 'Blush', hex: '#e5c3c3' }, { name: 'Noir', hex: '#1a1a1a' }, { name: 'Champagne', hex: '#c8a96e' }],
    images: ['blush-brief'],
    photoUrl: 'https://images.unsplash.com/photo-1750064144361-bc7d12be7a98?w=1200&auto=format&fit=crop&q=80',
    collection: 'La Belle Époque',
  },
  {
    id: '3',
    slug: 'lace-suspender-belt',
    name: 'Lace Suspender Belt',
    brand: 'Lucille',
    price: 125,
    category: 'lingerie',
    isBestseller: true,
    description: 'A heritage piece reimagined in gossamer-weight French lace.',
    details: ['French lace', 'Six adjustable suspenders', 'Silk bow detail', 'Hand wash'],
    sizes: ['XS', 'S', 'M', 'L'],
    colours: [{ name: 'Blush', hex: '#e5c3c3' }, { name: 'Noir', hex: '#1a1a1a' }],
    images: ['blush-suspender'],
    photoUrl: 'https://images.unsplash.com/photo-1606245455144-2243f0b4d97b?w=1200&auto=format&fit=crop&q=80',
    collection: 'La Belle Époque',
  },
  {
    id: '4',
    slug: 'silk-chemise',
    name: 'Silk Chemise',
    brand: 'Lucille',
    price: 295,
    category: 'nightwear',
    isNew: true,
    description: 'Cut from the weightiest silk charmeuse, this chemise drapes with effortless elegance.',
    details: ['100% silk charmeuse', 'Adjustable straps', 'Lace inserts', 'Dry clean recommended'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colours: [{ name: 'Ivory', hex: '#f5f0eb' }, { name: 'Blush', hex: '#e5c3c3' }, { name: 'Midnight', hex: '#2d2d3f' }],
    images: ['ivory-chemise'],
    photoUrl: 'https://images.unsplash.com/photo-1770294759006-356f25f4f156?w=1200&auto=format&fit=crop&q=80',
  },
  {
    id: '5',
    slug: 'silk-robe',
    name: 'Silk Robe',
    brand: 'Lucille',
    price: 445,
    category: 'nightwear',
    isBestseller: true,
    description: 'The ultimate in morning luxury. Weighted silk with contrast piping and a generous shawl collar.',
    details: ['100% silk', 'Kimono sleeve', 'Self-tie belt', 'Dry clean only'],
    sizes: ['XS/S', 'M/L', 'XL/XXL'],
    colours: [{ name: 'Ivory', hex: '#f5f0eb' }, { name: 'Blush', hex: '#e5c3c3' }, { name: 'Stone', hex: '#9e9188' }],
    images: ['ivory-robe'],
    photoUrl: 'https://images.unsplash.com/photo-1766056278976-87f269e3b69c?w=1200&auto=format&fit=crop&q=80',
  },
  {
    id: '6',
    slug: 'lace-nightdress',
    name: 'Lace Nightdress',
    brand: 'Lucille',
    price: 365,
    category: 'nightwear',
    description: 'Floor-length French lace nightdress with silk-lined bodice.',
    details: ['French lace', 'Silk-lined bodice', 'Button back', 'Dry clean only'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colours: [{ name: 'Ivory', hex: '#f5f0eb' }, { name: 'Noir', hex: '#1a1a1a' }],
    images: ['ivory-nightdress'],
    photoUrl: 'https://images.unsplash.com/photo-1750064164897-093dc853c98a?w=1200&auto=format&fit=crop&q=80',
  },
  {
    id: '7',
    slug: 'halter-bikini-top',
    name: 'Halter Bikini Top',
    brand: 'Lucille',
    price: 165,
    category: 'swim',
    isNew: true,
    description: 'Crafted in Italian Lycra with a minimalist aesthetic.',
    details: ['Italian Lycra', 'Halterneck tie', 'Removable padding', 'Rinse after use'],
    sizes: ['XS', 'S', 'M', 'L'],
    colours: [{ name: 'Noir', hex: '#1a1a1a' }, { name: 'Blush', hex: '#e5c3c3' }, { name: 'Sand', hex: '#c4aa8a' }],
    images: ['noir-bikini'],
    photoUrl: 'https://plus.unsplash.com/premium_photo-1677687190438-040daa5d5337?w=1200&auto=format&fit=crop&q=80',
  },
  {
    id: '8',
    slug: 'high-waist-bikini-brief',
    name: 'High Waist Bikini Brief',
    brand: 'Lucille',
    price: 125,
    category: 'swim',
    description: 'Vintage-inspired high waist brief with a flattering cut.',
    details: ['Italian Lycra', 'High waist', 'Lined'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colours: [{ name: 'Noir', hex: '#1a1a1a' }, { name: 'Blush', hex: '#e5c3c3' }, { name: 'Sand', hex: '#c4aa8a' }],
    images: ['noir-brief-swim'],
    photoUrl: 'https://images.unsplash.com/photo-1734292738994-3e5361c87227?w=1200&auto=format&fit=crop&q=80',
  },
  {
    id: '9',
    slug: 'lucille-gift-card',
    name: 'Lucille Gift Card',
    brand: 'Lucille',
    price: 100,
    category: 'gifts',
    description: 'The gift of choice. Available in denominations from £50 to £500.',
    details: ['Delivered in signature Lucille packaging', 'Valid 3 years from purchase', 'Can be used online and in-store'],
    sizes: ['£50', '£100', '£150', '£250', '£500'],
    colours: [{ name: 'Blush', hex: '#e5c3c3' }],
    images: ['gift-card'],
  },
  {
    id: '10',
    slug: 'silk-sleep-mask',
    name: 'Silk Sleep Mask',
    brand: 'Lucille',
    price: 65,
    category: 'gifts',
    isBestseller: true,
    description: 'Pure silk sleep mask with elasticated back. The perfect gift.',
    details: ['100% silk', 'Elasticated band', 'Gift boxed'],
    sizes: ['One size'],
    colours: [{ name: 'Blush', hex: '#e5c3c3' }, { name: 'Noir', hex: '#1a1a1a' }, { name: 'Ivory', hex: '#f5f0eb' }],
    images: ['blush-sleep-mask'],
    photoUrl: 'https://images.unsplash.com/photo-1607300110506-273ab1cf41f8?w=1200&auto=format&fit=crop&q=80',
  },
]

export const newArrivals = products.filter(p => p.isNew)
export const bestsellers = products.filter(p => p.isBestseller)

export const collections = [
  {
    id: 'la-belle-epoque',
    name: 'La Belle Époque',
    description: 'An ode to Parisian sensuality. French lace, silk charmeuse and the enduring elegance of a bygone era.',
    products: products.filter(p => p.collection === 'La Belle Époque'),
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'the-art-of-lingerie',
    title: 'The Art of Lingerie',
    subtitle: 'How intimate apparel became one of fashion\'s most powerful expressions',
    category: 'Culture',
    date: 'April 2025',
    readTime: '5 min read',
    excerpt: 'From the corsets of the Belle Époque to the silk slips of the nineties, lingerie has always told the story of women\'s relationship with their own bodies.',
    content: 'Full article content here.',
    photoUrl: 'https://plus.unsplash.com/premium_photo-1729004105169-5459b2e37344?w=1200&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    slug: 'inside-kensington',
    title: 'Inside Kensington',
    subtitle: 'A morning with our founder in London\'s most refined neighbourhood',
    category: 'Life',
    date: 'March 2025',
    readTime: '4 min read',
    excerpt: 'Kensington at dawn has a particular quality of light — silvery, hushed, expectant. We spent a morning with Lucille\'s founder to understand how place shapes design.',
    content: 'Full article content here.',
  },
  {
    id: '3',
    slug: 'the-silk-edit',
    title: 'The Silk Edit',
    subtitle: 'Everything you need to know about caring for silk',
    category: 'Style',
    date: 'February 2025',
    readTime: '6 min read',
    excerpt: 'Silk is the ultimate luxury fabric — and the most misunderstood. Our guide to washing, storing and wearing silk for a lifetime.',
    content: 'Full article content here.',
    photoUrl: 'https://images.unsplash.com/photo-1594631770635-f2915410b410?w=1200&auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    slug: 'gifting-guide',
    title: 'The Lucille Gifting Guide',
    subtitle: 'For the woman who has everything, and deserves more',
    category: 'Gift',
    date: 'January 2025',
    readTime: '3 min read',
    excerpt: 'Whether you\'re shopping for a milestone or simply because, our edit of the most giftable pieces from the Lucille collection.',
    content: 'Full article content here.',
    photoUrl: 'https://images.unsplash.com/photo-1594632047623-f825a96296f6?w=1200&auto=format&fit=crop&q=80',
  },
]

export function getProductsByCategory(category: Product['category']) {
  return products.filter(p => p.category === category)
}

export function getProductBySlug(slug: string) {
  return products.find(p => p.slug === slug)
}
