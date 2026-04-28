import Image from 'next/image'

const gradients: Record<string, string> = {
  blush:     'linear-gradient(135deg, #f2e0e0 0%, #e5c3c3 50%, #c9a0a0 100%)',
  noir:      'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #0d0d0d 100%)',
  ivory:     'linear-gradient(135deg, #fdf9f5 0%, #f5f0eb 50%, #ede4db 100%)',
  champagne: 'linear-gradient(135deg, #e8d5a3 0%, #c8a96e 50%, #a88850 100%)',
  midnight:  'linear-gradient(135deg, #3d3d55 0%, #2d2d3f 50%, #1e1e2e 100%)',
  stone:     'linear-gradient(135deg, #b5ada5 0%, #9e9188 50%, #857870 100%)',
  sand:      'linear-gradient(135deg, #d9c5a8 0%, #c4aa8a 50%, #a88e6d 100%)',
  default:   'linear-gradient(135deg, #f2e0e0 0%, #e5c3c3 50%, #c9a0a0 100%)',
}

type Props = {
  name: string
  colour?: string
  className?: string
  showLabel?: boolean
  src?: string
}

export function ProductImage({ name, colour = 'blush', className = '', showLabel = false, src }: Props) {
  if (src) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <Image src={src} alt={name} fill className="object-cover object-center" />
      </div>
    )
  }

  const key = colour.toLowerCase().split(' ')[0]
  const gradient = gradients[key] ?? gradients.default

  return (
    <div className={`relative w-full h-full ${className}`}
      style={{ background: gradient }}>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <span className="font-display text-white/80 text-sm font-medium leading-tight">{name}</span>
        </div>
      )}
    </div>
  )
}
