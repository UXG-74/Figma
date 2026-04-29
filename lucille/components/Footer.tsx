'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Links */}
      <div className="max-w-6xl mx-auto px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <p className="font-display text-xl mb-1">Lucille</p>
          <p className="text-label text-[9px] text-white/40 tracking-widest mb-4">LONDON</p>
          <p className="text-body-sm text-white/50 leading-relaxed">
            A refined, intimate space in the heart of Kensington.
          </p>
          <div className="flex gap-4 mt-5">
            {['Instagram', 'Pinterest'].map(s => (
              <a key={s} href="#" className="text-label text-[9px] text-white/40 hover:text-[#e5c3c3] transition-colors">{s}</a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <p className="text-label text-[9px] text-white/40 mb-4">SHOP</p>
          <ul className="space-y-3">
            {[['New Arrivals', '/new'], ['Lingerie', '/lingerie'], ['Nightwear', '/nightwear'],
              ['Swim', '/swim'], ['Gifts', '/gifts'], ['Collection', '/collection']].map(([l, h]) => (
              <li key={h}><Link href={h} className="text-body-sm text-white/60 hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <p className="text-label text-[9px] text-white/40 mb-4">INFORMATION</p>
          <ul className="space-y-3">
            {[['Edits', '/edits'], ['Our Story', '/about'], ['Store', '/store'],
              ['Sustainability', '/sustainability'], ['Careers', '/careers']].map(([l, h]) => (
              <li key={h}><Link href={h} className="text-body-sm text-white/60 hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <p className="text-label text-[9px] text-white/40 mb-4">HELP</p>
          <ul className="space-y-3">
            {[['Shipping & Returns', '/shipping'], ['Size Guide', '/size-guide'],
              ['Care Guide', '/care'], ['Contact Us', '/contact'],
              ['FAQs', '/faqs']].map(([l, h]) => (
              <li key={h}><Link href={h} className="text-body-sm text-white/60 hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Legal */}
      <div className="border-t border-white/10 px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-body-sm text-white/30">© 2025 Lucille London. All rights reserved.</p>
        <div className="flex gap-6">
          {['Privacy Policy', 'Cookie Policy', 'Terms & Conditions'].map(l => (
            <a key={l} href="#" className="text-body-sm text-white/30 hover:text-white/60 transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
