'use client'

import dynamic from 'next/dynamic'

const Scene3D = dynamic(() => import('./components/Scene3D'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#1a1a1a',
      color: '#fff'
    }}>
      Chargement du modèle 3D...
    </div>
  ),
})

export default function Home() {
  return <Scene3D />
}
