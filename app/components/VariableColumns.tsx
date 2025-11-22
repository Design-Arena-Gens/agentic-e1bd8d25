import { useMemo } from 'react'
import * as THREE from 'three'

export default function VariableColumns() {
  const columns = useMemo(() => {
    const positions = [
      [-8, -8], [8, -8], [-8, 8], [8, 8],
      [0, -8], [0, 8], [-8, 0], [8, 0]
    ]

    return positions.map(([x, z]) => {
      const height = 12
      const segments = 20
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, height * 0.25, 0),
        new THREE.Vector3(0, height * 0.5, 0),
        new THREE.Vector3(0, height * 0.75, 0),
        new THREE.Vector3(0, height, 0),
      ])

      const points = curve.getPoints(segments)
      const geometry = new THREE.BufferGeometry()

      const vertices = []
      const indices = []
      const radialSegments = 8

      for (let i = 0; i <= segments; i++) {
        const t = i / segments
        const radius = 0.3 + Math.sin(t * Math.PI) * 0.2
        const y = points[i].y

        for (let j = 0; j <= radialSegments; j++) {
          const angle = (j / radialSegments) * Math.PI * 2
          const vx = Math.cos(angle) * radius
          const vz = Math.sin(angle) * radius
          vertices.push(vx, y, vz)
        }
      }

      for (let i = 0; i < segments; i++) {
        for (let j = 0; j < radialSegments; j++) {
          const a = i * (radialSegments + 1) + j
          const b = a + radialSegments + 1
          const c = a + 1
          const d = b + 1

          indices.push(a, b, c)
          indices.push(c, b, d)
        }
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
      geometry.setIndex(indices)
      geometry.computeVertexNormals()

      return { geometry, position: [x, 0, z] as [number, number, number] }
    })
  }, [])

  return (
    <group>
      {columns.map((column, i) => (
        <mesh
          key={i}
          position={column.position}
          geometry={column.geometry}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#5a7a8a"
            roughness={0.4}
            metalness={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}
