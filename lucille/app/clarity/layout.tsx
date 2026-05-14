import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clarity — See through the pattern',
  description: 'Understand your habits. Break the hook.',
}

export default function ClarityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
