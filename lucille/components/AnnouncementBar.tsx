'use client'
import { useState } from 'react'

const messages = [
  'FREE SHIPPING ON ALL ORDERS',
  'COMPLIMENTARY GIFT WRAPPING ON EVERY ORDER',
  'NEW ARRIVALS — LA BELLE ÉPOQUE COLLECTION',
]

export default function AnnouncementBar() {
  const [idx, setIdx] = useState(0)
  return (
    <div className="bg-[#1a1a1a] text-white flex items-center justify-center gap-8 px-4"
      style={{ height: 'var(--announce-height, 36px)' }}>
      <button onClick={() => setIdx(i => (i - 1 + messages.length) % messages.length)}
        className="opacity-40 hover:opacity-100 transition-opacity text-xs">‹</button>
      <p className="text-label text-[10px] tracking-widest">{messages[idx]}</p>
      <button onClick={() => setIdx(i => (i + 1) % messages.length)}
        className="opacity-40 hover:opacity-100 transition-opacity text-xs">›</button>
    </div>
  )
}
