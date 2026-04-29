import type { Metadata } from 'next'
import Image from 'next/image'
import StoreSection from '@/components/StoreSection'

export const metadata: Metadata = { title: 'Our Store — Lucille London' }

export default function StorePage() {
  return (
    <>
      {/* ── Intro — above the image ── */}
      <section className="max-w-2xl mx-auto px-8 pt-20 pb-14 text-center">
        <p className="text-label text-[9px] text-[#e5c3c3] mb-5">Kensington Road, Knightsbridge</p>
        <h1 className="font-display text-5xl md:text-6xl font-medium leading-tight mb-8">
          Lucille London
        </h1>
        <p className="text-body-sm text-[var(--c-text-muted)] leading-relaxed max-w-xl mx-auto">
          Nestled on Kensington Road in Knightsbridge, Lucille London invites you into a world of quiet
          elegance and considered beauty. Every detail — from the soft blush tones to the delicate
          finishes — has been curated to elevate the everyday into something extraordinary.
        </p>
        <p className="font-display italic text-xl text-[var(--c-text-muted)] mt-6">
          Discover lingerie that feels as exquisite as it looks.
        </p>
      </section>

      {/* ── Store image ── */}
      <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <Image
          src="/store1.png"
          alt="Lucille London boutique interior"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.35) 100%)' }} />
      </section>

      {/* ── A Boutique Experience ── */}
      <section className="grid md:grid-cols-2 min-h-[480px]">
        <div className="bg-[var(--c-bg-soft)] flex flex-col justify-center p-14 md:p-20">
          <p className="text-label text-[9px] text-[#e5c3c3] mb-4">The Space</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight mb-6">
            A Boutique<br /><em>Experience</em>
          </h2>
          <p className="text-body-sm text-[var(--c-text-muted)] leading-relaxed mb-4 max-w-sm">
            Step inside and experience a space designed for calm, confidence, and connection.
            Our boutique offers a refined, personal atmosphere where time slows down and
            attention turns to you.
          </p>
          <p className="text-body-sm text-[var(--c-text-muted)] leading-relaxed max-w-sm">
            Whether you're selecting a signature piece or exploring something new, our team
            is here to guide you with discretion and care.
          </p>
        </div>
        <div className="relative overflow-hidden min-h-[380px]">
          <Image
            src="/store2.png"
            alt="Inside Lucille London"
            fill
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* ── Craft & Collection ── */}
      <section className="grid md:grid-cols-2 min-h-[480px]">
        <div className="relative overflow-hidden min-h-[380px] order-2 md:order-1">
          <Image
            src="/store3.png"
            alt="Lucille London collection"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="bg-[#1a1a1a] text-white flex flex-col justify-center p-14 md:p-20 order-1 md:order-2">
          <p className="text-label text-[9px] text-[#e5c3c3] mb-4">Craft &amp; Collection</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight mb-6">
            Designed with<br /><em>Intention</em>
          </h2>
          <p className="text-body-sm text-white/60 leading-relaxed mb-4 max-w-sm">
            Each Lucille London piece is thoughtfully crafted using the finest fabrics and
            meticulous attention to detail. Soft silhouettes, subtle structure, and timeless
            design come together to create lingerie that moves effortlessly with you.
          </p>
          <p className="font-display italic text-lg text-white/50 mt-2">
            Luxury, in its most intimate form.
          </p>
        </div>
      </section>

      {/* ── store4 image ── */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <Image
          src="/store4.png"
          alt="Lucille London boutique detail"
          fill
          className="object-cover object-center"
        />
      </section>

      {/* ── Map CTA ── */}
      <StoreSection />
    </>
  )
}
