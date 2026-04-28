'use client'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'New',        href: '/new' },
  { label: 'Lingerie',   href: '/lingerie' },
  { label: 'Nightwear',  href: '/nightwear' },
  { label: 'Swim',       href: '/swim' },
  { label: 'Gifts',      href: '/gifts' },
  { label: 'Collection', href: '/collection' },
  { label: 'Edits',      href: '/edits' },
]

export default function Navigation() {
  const count    = useCartStore(s => s.count)
  const openCart = useCartStore(s => s.openCart)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="flex flex-col items-center pt-4 pb-0 px-8">
        {/* Top row: utility icons */}
        <div className="w-full flex items-center justify-between mb-2">
          {/* Search */}
          <button className="p-2 opacity-60 hover:opacity-100 transition-opacity" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center">
              <span className="font-display text-[2rem] tracking-tight leading-none font-medium">Lucille</span>
              <span className="text-label text-[8px] tracking-[0.3em] mt-0.5">LONDON</span>
            </div>
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 opacity-60 hover:opacity-100 transition-opacity" aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
            <Link href="/store-locator" className="p-2 opacity-60 hover:opacity-100 transition-opacity" aria-label="Store">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
            </Link>
            <button onClick={openCart} className="p-2 opacity-60 hover:opacity-100 transition-opacity relative" aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {count() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#1a1a1a] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {count()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-10 pb-3 border-t border-[#e8e0dc] w-full justify-center pt-3">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              className="text-label text-[10px] hover:opacity-60 transition-opacity">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
