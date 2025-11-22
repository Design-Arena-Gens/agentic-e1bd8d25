import { useMemo } from 'react'
import * as THREE from 'three'

export default function Floors() {
  const floors = useMemo(() => {
    const floorLevels = [0, 4, 8, 12]
    return floorLevels.map((y, index) => {
      const geometry = new THREE.BoxGeometry(20, 0.3, 20)
      return {
        y,
        geometry,
        color: index % 2 === 0 ? '#2a4858' : '#1e3a47'
      }
    })
  }, [])

  return (
    <group>
      {floors.map((floor, i) => (
        <mesh
          key={i}
          position={[0, floor.y, 0]}
          geometry={floor.geometry}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial
            color={floor.color}
            roughness={0.3}
            metalness={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}
