'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from './products'

export type CartItem = {
  product: Product
  quantity: number
  size: string
  colour: string
}

type CartStore = {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (product: Product, size: string, colour: string) => void
  removeItem: (productId: string, size: string, colour: string) => void
  updateQuantity: (productId: string, size: string, colour: string, qty: number) => void
  clearCart: () => void
  total: () => number
  count: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (product, size, colour) => {
        const items = get().items
        const existing = items.find(
          i => i.product.id === product.id && i.size === size && i.colour === colour
        )
        if (existing) {
          set({ items: items.map(i =>
            i.product.id === product.id && i.size === size && i.colour === colour
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ), isOpen: true })
        } else {
          set({ items: [...items, { product, quantity: 1, size, colour }], isOpen: true })
        }
      },
      removeItem: (productId, size, colour) =>
        set({ items: get().items.filter(
          i => !(i.product.id === productId && i.size === size && i.colour === colour)
        )}),
      updateQuantity: (productId, size, colour, qty) => {
        if (qty <= 0) { get().removeItem(productId, size, colour); return }
        set({ items: get().items.map(i =>
          i.product.id === productId && i.size === size && i.colour === colour
            ? { ...i, quantity: qty } : i
        )})
      },
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'lucille-cart' }
  )
)
