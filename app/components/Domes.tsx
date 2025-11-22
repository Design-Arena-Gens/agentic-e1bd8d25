import { useMemo } from 'react'
import * as THREE from 'three'

export default function Domes() {
  const domes = useMemo(() => {
    const createDome = (radius: number, position: [number, number, number]) => {
      const geometry = new THREE.SphereGeometry(
        radius,
        32,
        32,
        0,
        Math.PI * 2,
        0,
        Math.PI / 2
      )

      return { geometry, position }
    }

    return [
      createDome(4, [0, 12.15, 0]),
      createDome(2, [-6, 8.15, -6]),
      createDome(2, [6, 8.15, 6]),
    ]
  }, [])

  return (
    <group>
      {domes.map((dome, i) => (
        <mesh
          key={i}
          position={dome.position}
          geometry={dome.geometry}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#3a5a6a"
            roughness={0.3}
            metalness={0.8}
            side={THREE.DoubleSide}
            transparent
            opacity={0.95}
          />
        </mesh>
      ))}
    </group>
  )
}
