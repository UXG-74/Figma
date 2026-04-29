'use client'
import { useCartStore } from '@/lib/store'
import Link from 'next/link'
import { ProductImage } from './ProductImage'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } = useCartStore()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={closeCart} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[var(--c-bg)] z-50 flex flex-col animate-slide-in shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[var(--c-border)]">
          <div>
            <h2 className="font-display text-xl">Your Bag</h2>
            <p className="text-body-sm text-[var(--c-text-muted)] mt-0.5">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
          </div>
          <button onClick={closeCart} className="p-2 opacity-60 hover:opacity-100 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[var(--c-bg-soft)] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8c7b7b" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <p className="font-display text-lg">Your bag is empty</p>
              <p className="text-body-sm text-[var(--c-text-muted)]">Discover something beautiful</p>
              <button onClick={closeCart} className="btn-outline mt-2">Continue Shopping</button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map(item => (
                <div key={`${item.product.id}-${item.size}-${item.colour}`}
                  className="flex gap-4">
                  {/* Image */}
                  <div className="w-20 h-24 shrink-0 overflow-hidden bg-[#faf7f5]">
                    <ProductImage name={item.product.name} colour={item.colour} />
                  </div>
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-medium leading-tight">{item.product.name}</p>
                    <p className="text-body-sm text-[var(--c-text-muted)] mt-1">{item.colour} · {item.size}</p>
                    <p className="text-body-sm font-medium mt-2">£{item.product.price}</p>
                    {/* Qty */}
                    <div className="flex items-center gap-3 mt-3">
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.colour, item.quantity - 1)}
                        className="w-6 h-6 border border-[var(--c-border)] flex items-center justify-center text-sm hover:border-[var(--c-text)] transition-colors">−</button>
                      <span className="text-body-sm w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.colour, item.quantity + 1)}
                        className="w-6 h-6 border border-[var(--c-border)] flex items-center justify-center text-sm hover:border-[var(--c-text)] transition-colors">+</button>
                      <button onClick={() => removeItem(item.product.id, item.size, item.colour)}
                        className="ml-auto text-[var(--c-text-muted)] hover:text-[var(--c-text)] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M18 6 6 18M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 py-6 border-t border-[var(--c-border)] space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-body-sm text-[var(--c-text-muted)]">Subtotal</span>
              <span className="font-display text-lg">£{total().toFixed(2)}</span>
            </div>
            <p className="text-body-sm text-[var(--c-text-muted)] text-center">Shipping & taxes calculated at checkout</p>
            <Link href="/checkout" onClick={closeCart} className="btn-primary w-full block text-center">
              Checkout
            </Link>
            <button onClick={closeCart} className="btn-outline w-full">Continue Shopping</button>
          </div>
        )}
      </div>
    </>
  )
}
