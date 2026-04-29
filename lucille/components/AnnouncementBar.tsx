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
      <span className="flex items-center gap-2">
        {idx === 0 && (
          <svg width="14" height="14" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.6667 28.9734C15.0721 29.2074 15.5319 29.3306 16 29.3306C16.4681 29.3306 16.9279 29.2074 17.3333 28.9734L26.6667 23.64C27.0717 23.4062 27.408 23.07 27.6421 22.6651C27.8761 22.2603 27.9995 21.801 28 21.3334V10.6667C27.9995 10.1991 27.8761 9.73978 27.6421 9.33492C27.408 8.93005 27.0717 8.59385 26.6667 8.36003L17.3333 3.0267C16.9279 2.79265 16.4681 2.66943 16 2.66943C15.5319 2.66943 15.0721 2.79265 14.6667 3.0267L5.33333 8.36003C4.92835 8.59385 4.59197 8.93005 4.35795 9.33492C4.12392 9.73978 4.00048 10.1991 4 10.6667V21.3334C4.00048 21.801 4.12392 22.2603 4.35795 22.6651C4.59197 23.07 4.92835 23.4062 5.33333 23.64L14.6667 28.9734Z" stroke="currentColor" strokeWidth="1.99951" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 29.3333V16" stroke="currentColor" strokeWidth="1.99951" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.38672 9.3335L16.0001 16.0002L27.6134 9.3335" stroke="currentColor" strokeWidth="1.99951" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 5.69336L22 12.56" stroke="currentColor" strokeWidth="1.99951" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        <p className="text-label text-[10px] tracking-widest">{messages[idx]}</p>
      </span>
      <button onClick={() => setIdx(i => (i + 1) % messages.length)}
        className="opacity-40 hover:opacity-100 transition-opacity text-xs">›</button>
    </div>
  )
}
