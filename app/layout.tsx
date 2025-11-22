import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Modèle Analytique 3D',
  description: 'Visualisation 3D de structures architecturales complexes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
