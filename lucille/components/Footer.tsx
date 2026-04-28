'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white mt-24">
      {/* Newsletter */}
      <div className="border-b border-white/10 py-16 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-label text-[10px] text-[#e5c3c3] mb-3">THE LUCILLE JOURNAL</p>
          <h3 className="font-display text-2xl mb-2">Stay in the world of Lucille</h3>
          <p className="text-body-sm text-white/50 mb-6">New collections, private events and the edit — delivered discreetly.</p>
          <form className="flex gap-0 max-w-sm mx-auto" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 text-[13px] outline-none focus:border-white/60 transition-colors font-[var(--font-body)]" />
            <button type="submit" className="bg-[#e5c3c3] text-[#1a1a1a] px-5 py-3 text-label text-[9px] hover:bg-white transition-colors shrink-0">
              JOIN
            </button>
          </form>
        </div>
      </div>

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
          <div className="mt-6 p-4 border border-white/10">
            <p className="text-label text-[9px] text-white/40 mb-2">KENSINGTON BOUTIQUE</p>
            <p className="text-body-sm text-white/50">12 Montpelier Walk<br />London W8 4HT</p>
            <p className="text-body-sm text-white/50 mt-2">Mon–Sat 10–6<br />Sun 11–5</p>
          </div>
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
