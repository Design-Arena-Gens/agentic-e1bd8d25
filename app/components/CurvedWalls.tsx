import { useMemo } from 'react'
import * as THREE from 'three'

export default function CurvedWalls() {
  const walls = useMemo(() => {
    const createCurvedWall = (startAngle: number, endAngle: number, radius: number, yPos: number) => {
      const segments = 40
      const height = 3.5
      const thickness = 0.15

      const curve = new THREE.EllipseCurve(
        0, 0,
        radius, radius,
        startAngle, endAngle,
        false,
        0
      )

      const points = curve.getPoints(segments)
      const shape = new THREE.Shape()

      shape.moveTo(points[0].x, 0)
      for (let i = 1; i < points.length; i++) {
        shape.lineTo(points[i].x, 0)
      }
      shape.lineTo(points[points.length - 1].x, height)
      for (let i = points.length - 1; i >= 0; i--) {
        shape.lineTo(points[i].x, height)
      }
      shape.lineTo(points[0].x, 0)

      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: thickness,
        bevelEnabled: false,
      })

      geometry.rotateX(Math.PI / 2)

      return { geometry, yPos }
    }

    return [
      createCurvedWall(0, Math.PI, 10, 0.15),
      createCurvedWall(Math.PI, Math.PI * 2, 10, 4.15),
      createCurvedWall(Math.PI * 0.5, Math.PI * 1.5, 7, 8.15),
    ]
  }, [])

  return (
    <group>
      {walls.map((wall, i) => (
        <mesh
          key={i}
          position={[0, wall.yPos, 0]}
          geometry={wall.geometry}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#4a6a7a"
            roughness={0.5}
            metalness={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}
