'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import VariableColumns from './VariableColumns'
import CurvedWalls from './CurvedWalls'
import Domes from './Domes'
import Floors from './Floors'

export default function Scene3D() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a0a' }}>
      <Canvas
        camera={{ position: [25, 20, 25], fov: 60 }}
        shadows
      >
        <color attach="background" args={['#0a0a0a']} />

        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />

        <Suspense fallback={null}>
          <Floors />
          <VariableColumns />
          <CurvedWalls />
          <Domes />

          <Grid
            args={[50, 50]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#444444"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#666666"
            fadeDistance={50}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid={true}
          />

          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>

      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '14px',
        background: 'rgba(0,0,0,0.7)',
        padding: '15px',
        borderRadius: '8px',
        userSelect: 'none',
        pointerEvents: 'none'
      }}>
        <h1 style={{ fontSize: '20px', marginBottom: '10px' }}>Modèle Analytique 3D</h1>
        <div style={{ fontSize: '12px', opacity: 0.8 }}>
          <div>• Poteaux à section variable</div>
          <div>• Voiles courbes</div>
          <div>• Coupoles</div>
          <div>• Planchers</div>
          <div style={{ marginTop: '10px', fontSize: '11px' }}>
            Clic gauche + glisser : rotation<br/>
            Molette : zoom<br/>
            Clic droit + glisser : déplacement
          </div>
        </div>
      </div>
    </div>
  )
}
