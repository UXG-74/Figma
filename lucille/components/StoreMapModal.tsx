'use client'
import { useEffect } from 'react'

const EMBED_URL   = 'https://maps.google.com/maps?q=Kensington+Road+Knightsbridge+London&t=&z=16&ie=UTF8&iwloc=&output=embed'
const GOOGLE_URL  = 'https://www.google.com/maps/dir/?api=1&destination=Kensington+Road,+Knightsbridge,+London'
const APPLE_URL   = 'https://maps.apple.com/?daddr=Kensington+Road+Knightsbridge+London'

export default function StoreMapModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full md:max-w-5xl bg-[var(--c-bg)] overflow-hidden animate-slide-up shadow-2xl">

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close map"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-[#1a1a1a] text-white opacity-80 hover:opacity-100 transition-opacity"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>

        <div className="grid md:grid-cols-[320px_1fr]">

          {/* ── Info panel ── */}
          <div className="bg-[#1a1a1a] text-white p-10 flex flex-col justify-between min-h-0">
            <div>
              <p className="text-label text-[9px] text-[#e5c3c3] mb-5">Visit Us</p>
              <h2 className="font-display text-3xl leading-tight mb-8">
                Kensington<br />Boutique
              </h2>
              <div className="space-y-5 text-body-sm text-white/60">
                <div>
                  <p className="text-white/40 text-label text-[9px] mb-1">Address</p>
                  <p>Kensington Road<br />Knightsbridge, London</p>
                </div>
                <div>
                  <p className="text-white/40 text-label text-[9px] mb-1">Hours</p>
                  <p>Mon – Sat &nbsp; 10:00 – 18:00</p>
                  <p>Sunday &nbsp;&nbsp;&nbsp;&nbsp; 11:00 – 17:00</p>
                </div>
                <div>
                  <p className="text-white/40 text-label text-[9px] mb-1">Contact</p>
                  <p>boutique@lucillelondon.com</p>
                </div>
              </div>
            </div>

            {/* Directions CTA */}
            <div className="mt-10 space-y-3">
              <a
                href={GOOGLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 border border-white/20 text-label text-[9px] hover:bg-white/10 transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                Google Maps
              </a>
              <a
                href={APPLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 border border-white/20 text-label text-[9px] hover:bg-white/10 transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                Apple Maps
              </a>
            </div>
          </div>

          {/* ── Map ── */}
          <div className="h-[320px] md:h-[520px]">
            <iframe
              src={EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lucille London — Kensington Boutique"
            />
          </div>

        </div>
      </div>
    </div>
  )
}
