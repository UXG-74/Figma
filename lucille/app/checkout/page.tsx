'use client'
import { useState } from 'react'
import { useCartStore } from '@/lib/store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ProductImage } from '@/components/ProductImage'

type Step = 'information' | 'shipping' | 'payment'

type Info = {
  email: string; firstName: string; lastName: string
  address: string; city: string; postcode: string; country: string; phone: string
}

const COUNTRIES = ['United Kingdom', 'Ireland', 'France', 'Germany', 'United States', 'Australia']

const SHIPPING = [
  { id: 'standard', label: 'Standard Delivery', sub: '3–5 business days', price: 0 },
  { id: 'express',  label: 'Express Delivery',  sub: 'Next business day',  price: 10 },
  { id: 'saturday', label: 'Saturday Delivery', sub: 'Order by Friday 1pm', price: 14 },
]

// Test Stripe card numbers for reference display
const TEST_CARDS = [
  { num: '4242 4242 4242 4242', type: 'Visa — succeeds' },
  { num: '4000 0025 0000 3155', type: 'Visa — 3D Secure' },
  { num: '4000 0000 0000 9995', type: 'Visa — declined' },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCartStore()
  const [step,     setStep]     = useState<Step>('information')
  const [shipping, setShipping] = useState(SHIPPING[0])
  const [loading,  setLoading]  = useState(false)
  const [info, setInfo] = useState<Info>({
    email: '', firstName: '', lastName: '',
    address: '', city: '', postcode: '', country: 'United Kingdom', phone: '',
  })
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '', name: '' })
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({})

  const orderTotal = total() + shipping.price

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-8">
        <p className="font-display text-2xl">Your bag is empty</p>
        <Link href="/" className="btn-outline">Continue Shopping</Link>
      </div>
    )
  }

  const validateInfo = () => {
    const e: typeof errors = {}
    if (!info.email)     e.email     = 'Email is required'
    if (!info.firstName) e.firstName = 'First name is required'
    if (!info.lastName)  e.lastName  = 'Last name is required'
    if (!info.address)   e.address   = 'Address is required'
    if (!info.city)      e.city      = 'City is required'
    if (!info.postcode)  e.postcode  = 'Postcode is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateInfo()) setStep('shipping')
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate Stripe processing
    await new Promise(r => setTimeout(r, 2000))
    clearCart()
    router.push('/checkout/confirmation')
  }

  const handleApplePay = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    clearCart()
    router.push('/checkout/confirmation')
  }

  return (
    <div className="min-h-screen bg-[var(--c-bg-soft)]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_420px] min-h-screen">

        {/* ── Left: Form ── */}
        <div className="bg-[var(--c-bg)] px-8 md:px-16 py-12">
          {/* Logo */}
          <Link href="/" className="block mb-10">
            <p className="font-display text-2xl">Lucille</p>
            <p className="text-label text-[8px] tracking-widest text-[var(--c-text-muted)]">LONDON</p>
          </Link>

          {/* Breadcrumb steps */}
          <div className="flex items-center gap-2 mb-10">
            {(['information', 'shipping', 'payment'] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                {i > 0 && <span className="text-[var(--c-border)]">›</span>}
                <button
                  onClick={() => {
                    if (s === 'information') setStep('information')
                    if (s === 'shipping' && step === 'payment') setStep('shipping')
                  }}
                  className={`text-label text-[9px] capitalize transition-colors ${step === s ? 'text-[var(--c-text)]' : 'text-[var(--c-text-muted)] hover:text-[var(--c-text)]'}`}>
                  {s}
                </button>
              </div>
            ))}
          </div>

          {/* ── Step: Information ── */}
          {step === 'information' && (
            <form onSubmit={handleInfoSubmit} className="space-y-6">
              <div>
                <p className="text-label text-[9px] text-[var(--c-text-muted)] mb-4">Contact</p>
                <input type="email" placeholder="Email address"
                  value={info.email} onChange={e => setInfo(i => ({...i, email: e.target.value}))}
                  className="input-lucille" />
                {errors.email && <p className="text-[#c9a0a0] text-body-sm mt-1">{errors.email}</p>}
                <label className="flex items-center gap-2 mt-3 cursor-pointer">
                  <input type="checkbox" className="accent-[#1a1a1a]" defaultChecked />
                  <span className="text-body-sm text-[var(--c-text-muted)]">Email me with news and exclusive offers</span>
                </label>
              </div>

              <div>
                <p className="text-label text-[9px] text-[var(--c-text-muted)] mb-4">Delivery Address</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input placeholder="First name" value={info.firstName}
                      onChange={e => setInfo(i => ({...i, firstName: e.target.value}))}
                      className="input-lucille" />
                    {errors.firstName && <p className="text-[#c9a0a0] text-body-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <input placeholder="Last name" value={info.lastName}
                      onChange={e => setInfo(i => ({...i, lastName: e.target.value}))}
                      className="input-lucille" />
                    {errors.lastName && <p className="text-[#c9a0a0] text-body-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="mt-3">
                  <input placeholder="Address" value={info.address}
                    onChange={e => setInfo(i => ({...i, address: e.target.value}))}
                    className="input-lucille" />
                  {errors.address && <p className="text-[#c9a0a0] text-body-sm mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <input placeholder="City" value={info.city}
                      onChange={e => setInfo(i => ({...i, city: e.target.value}))}
                      className="input-lucille" />
                    {errors.city && <p className="text-[#c9a0a0] text-body-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <input placeholder="Postcode" value={info.postcode}
                      onChange={e => setInfo(i => ({...i, postcode: e.target.value}))}
                      className="input-lucille" />
                    {errors.postcode && <p className="text-[#c9a0a0] text-body-sm mt-1">{errors.postcode}</p>}
                  </div>
                </div>
                <select value={info.country}
                  onChange={e => setInfo(i => ({...i, country: e.target.value}))}
                  className="input-lucille mt-3 cursor-pointer">
                  {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <input placeholder="Phone (optional)" value={info.phone}
                  onChange={e => setInfo(i => ({...i, phone: e.target.value}))}
                  className="input-lucille mt-3" />
              </div>

              <button type="submit" className="btn-primary w-full">Continue to Shipping</button>
            </form>
          )}

          {/* ── Step: Shipping ── */}
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="space-y-6">
              {/* Contact summary */}
              <div className="border border-[var(--c-border)] p-4 flex justify-between items-center">
                <div>
                  <p className="text-label text-[9px] text-[var(--c-text-muted)] mb-1">Contact</p>
                  <p className="text-body-sm">{info.email}</p>
                </div>
                <button type="button" onClick={() => setStep('information')}
                  className="text-label text-[9px] text-[var(--c-text-muted)] underline hover:text-[var(--c-text)] transition-colors">Change</button>
              </div>
              <div className="border border-[var(--c-border)] p-4 flex justify-between items-center">
                <div>
                  <p className="text-label text-[9px] text-[var(--c-text-muted)] mb-1">Ship to</p>
                  <p className="text-body-sm">{info.address}, {info.city}, {info.postcode}</p>
                </div>
                <button type="button" onClick={() => setStep('information')}
                  className="text-label text-[9px] text-[var(--c-text-muted)] underline hover:text-[var(--c-text)] transition-colors">Change</button>
              </div>

              <div>
                <p className="text-label text-[9px] text-[var(--c-text-muted)] mb-4">Shipping Method</p>
                <div className="space-y-2">
                  {SHIPPING.map(s => (
                    <label key={s.id}
                      className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                        shipping.id === s.id ? 'border-[var(--c-text)]' : 'border-[var(--c-border)] hover:border-[#8c7b7b]'
                      }`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" value={s.id}
                          checked={shipping.id === s.id}
                          onChange={() => setShipping(s)}
                          className="accent-[#1a1a1a]" />
                        <div>
                          <p className="text-body-sm font-medium">{s.label}</p>
                          <p className="text-body-sm text-[var(--c-text-muted)]">{s.sub}</p>
                        </div>
                      </div>
                      <p className="text-body-sm font-medium">{s.price === 0 ? 'Free' : `£${s.price}`}</p>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary w-full">Continue to Payment</button>
            </form>
          )}

          {/* ── Step: Payment ── */}
          {step === 'payment' && (
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Apple Pay */}
              <button type="button" onClick={handleApplePay} disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 font-medium text-sm hover:bg-[#1a1a1a] transition-colors disabled:opacity-50">
                <svg viewBox="0 0 38 12" width="38" height="12" fill="white">
                  <text x="0" y="10" fontFamily="system-ui" fontSize="10" fontWeight="600"> Pay</text>
                </svg>
                {loading ? 'Processing…' : '  Apple Pay'}
              </button>

              <div className="relative flex items-center gap-3">
                <div className="h-px flex-1 bg-[#e8e0dc]" />
                <span className="text-body-sm text-[var(--c-text-muted)]">or pay by card</span>
                <div className="h-px flex-1 bg-[#e8e0dc]" />
              </div>

              {/* Test card hint */}
              <div className="bg-[var(--c-bg-soft)] border border-[var(--c-border)] p-4">
                <p className="text-label text-[9px] text-[var(--c-text-muted)] mb-2">TEST CARD NUMBERS</p>
                {TEST_CARDS.map(c => (
                  <p key={c.num} className="text-body-sm text-[var(--c-text-mid)]">
                    <span className="font-mono">{c.num}</span>
                    <span className="text-[var(--c-text-muted)]"> — {c.type}</span>
                  </p>
                ))}
                <p className="text-body-sm text-[var(--c-text-muted)] mt-1">Any future expiry · any 3-digit CVC</p>
              </div>

              <div>
                <p className="text-label text-[9px] text-[var(--c-text-muted)] mb-4">Payment</p>
                <div className="space-y-3">
                  <div>
                    <input placeholder="Card number" value={card.number}
                      onChange={e => setCard(c => ({...c, number: e.target.value}))}
                      className="input-lucille font-mono" maxLength={19} required />
                  </div>
                  <input placeholder="Name on card" value={card.name}
                    onChange={e => setCard(c => ({...c, name: e.target.value}))}
                    className="input-lucille" required />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="MM / YY" value={card.expiry}
                      onChange={e => setCard(c => ({...c, expiry: e.target.value}))}
                      className="input-lucille font-mono" maxLength={5} required />
                    <input placeholder="CVC" value={card.cvc}
                      onChange={e => setCard(c => ({...c, cvc: e.target.value}))}
                      className="input-lucille font-mono" maxLength={3} required />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="btn-primary w-full disabled:opacity-50">
                {loading ? 'Processing payment…' : `Pay £${orderTotal.toFixed(2)}`}
              </button>

              {/* Security badges */}
              <p className="text-center text-body-sm text-[var(--c-text-muted)] flex items-center justify-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Payments are encrypted and secure
              </p>
            </form>
          )}
        </div>

        {/* ── Right: Order Summary ── */}
        <div className="bg-[var(--c-bg-soft)] border-l border-[var(--c-border)] px-8 py-12">
          <h2 className="font-display text-xl mb-8">Order Summary</h2>

          {/* Items */}
          <div className="space-y-5 mb-8">
            {items.map(item => (
              <div key={`${item.product.id}-${item.size}-${item.colour}`}
                className="flex gap-4">
                <div className="w-16 h-20 shrink-0 relative">
                  <div className="relative w-full h-full overflow-hidden">
                    <ProductImage name={item.product.name} colour={item.colour} />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-[#8c7b7b] text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body-sm font-medium leading-tight">{item.product.name}</p>
                  <p className="text-body-sm text-[var(--c-text-muted)]">{item.colour} · {item.size}</p>
                  <p className="text-body-sm font-medium mt-1">£{(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Promo */}
          <div className="flex gap-2 mb-6">
            <input placeholder="Gift card or discount code" className="input-lucille flex-1 text-xs" />
            <button className="btn-outline text-[9px] px-4 py-2 shrink-0">Apply</button>
          </div>

          {/* Totals */}
          <div className="space-y-3 border-t border-[var(--c-border)] pt-5">
            <div className="flex justify-between text-body-sm">
              <span className="text-[var(--c-text-muted)]">Subtotal</span>
              <span>£{total().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-body-sm">
              <span className="text-[var(--c-text-muted)]">Shipping</span>
              <span>{shipping.price === 0 ? 'Free' : `£${shipping.price}`}</span>
            </div>
            <div className="flex justify-between text-body-sm">
              <span className="text-[var(--c-text-muted)]">Gift wrapping</span>
              <span className="text-[var(--c-text-muted)] italic">Complimentary</span>
            </div>
            <div className="flex justify-between font-display text-lg border-t border-[var(--c-border)] pt-3 mt-1">
              <span>Total</span>
              <span>£{orderTotal.toFixed(2)} <span className="text-body-sm text-[var(--c-text-muted)] font-normal">GBP</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
