import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
  weight: ['300', '400', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Lucille London — Fine Lingerie & Nightwear',
    template: '%s | Lucille London',
  },
  description: "A refined, intimate space in the heart of Kensington. Discover Lucille's collection of fine lingerie, nightwear and swim.",
  keywords: ['luxury lingerie', 'London', 'Kensington', 'fine lingerie', 'silk nightwear'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body>
        <AnnouncementBar />
        <Navigation />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  )
}
