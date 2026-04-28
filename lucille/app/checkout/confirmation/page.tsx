'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState('LUC-XXXXX')
  useEffect(() => {
    setOrderNumber(`LUC-${Math.floor(10000 + Math.random() * 90000)}`)
  }, [])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-8 text-center py-20">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#faf7f5] border border-[#e5c3c3] flex items-center justify-center mx-auto mb-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a0a0" strokeWidth="1.5">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>

        <p className="text-label text-[9px] text-[#8c7b7b] mb-3">Thank you</p>
        <h1 className="font-display text-4xl md:text-5xl font-medium mb-4">Your order is confirmed</h1>
        <p className="text-body-sm text-[#8c7b7b] mb-2">A confirmation has been sent to your email address.</p>
        <p className="text-body-sm text-[#8c7b7b] mb-8">
          Order reference: <span className="font-medium text-[#1a1a1a]">{orderNumber}</span>
        </p>

        <div className="bg-[#faf7f5] border border-[#e8e0dc] p-6 text-left mb-8 space-y-4">
          {[
            ['Delivery', '3–5 business days'],
            ['Packaging', 'Signature Lucille gift box'],
            ['Gift wrapping', 'Complimentary, as always'],
            ['Returns', '30 days from receipt'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-body-sm text-[#8c7b7b]">{k}</span>
              <span className="text-body-sm font-medium">{v}</span>
            </div>
          ))}
        </div>

        <p className="font-display text-lg italic text-[#8c7b7b] mb-10">
          &ldquo;Every Lucille piece arrives as a gift — because that is what it is.&rdquo;
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">Continue Shopping</Link>
          <Link href="/edits" className="btn-outline">Read the Edit</Link>
        </div>
      </div>
    </div>
  )
}
