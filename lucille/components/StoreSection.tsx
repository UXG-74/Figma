'use client'
import { useState } from 'react'
import StoreMapModal from './StoreMapModal'

export default function StoreSection() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <section className="bg-[#1a1a1a] text-white py-16 px-8 text-center">
        <p className="text-label text-[9px] text-[#e5c3c3] mb-3">Visit Us</p>
        <h2 className="font-display text-3xl mb-2">Kensington Boutique</h2>
        <p className="text-body-sm text-white/50 mb-1">12 Montpelier Walk, London W8 4HT</p>
        <p className="text-body-sm text-white/50 mb-6">Mon–Sat 10–6 &nbsp;·&nbsp; Sun 11–5</p>
        <button onClick={() => setOpen(true)} className="btn-outline-white">
          Get Directions
        </button>
      </section>
      <StoreMapModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
