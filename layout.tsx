import './globals.css'
import type { ReactNode } from 'react'

export const metadata = { title: 'admit one' }
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' as const }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;600&family=Caveat:wght@600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
