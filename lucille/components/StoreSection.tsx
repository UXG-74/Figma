'use client'
import { useState } from 'react'
import StoreMapModal from './StoreMapModal'

export default function StoreSection() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <section className="bg-[#1a1a1a] text-white py-16 px-8 text-center">
        <p className="text-label text-[9px] text-[#e5c3c3] mb-3">Visit Us</p>
        <div className="mb-4">
          <p className="font-display text-3xl font-medium leading-none">Lucille</p>
          <p className="text-label text-[9px] text-white/40 tracking-[0.3em] mt-1">LONDON</p>
        </div>
        <p className="text-body-sm text-white/50 mb-1">91 Pelham Street, Knightsbridge</p>
        <p className="text-body-sm text-white/50 mb-6">Mon–Sat 10–6 &nbsp;·&nbsp; Sun 11–5</p>
        <button onClick={() => setOpen(true)} className="btn-outline-white">
          Get Directions
        </button>
      </section>
      <StoreMapModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
