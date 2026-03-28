import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function FloatingGeometry() {
  const icoRef = useRef<THREE.Mesh>(null)
  const torusRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (icoRef.current) {
      icoRef.current.rotation.x += delta * 0.18
      icoRef.current.rotation.y += delta * 0.12
    }
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.1
      torusRef.current.rotation.z += delta * 0.14
    }
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.06
      ringRef.current.rotation.x += delta * 0.03
    }
  })

  return (
    <>
      {/* Wireframe icosahedron — gold, right side */}
      <mesh ref={icoRef} position={[2.5, 0.3, -1.5]}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshBasicMaterial
          color="#f0b429"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Distorted torus knot — electric blue, left side */}
      <mesh ref={torusRef} position={[-2.8, -0.4, -2.5]}>
        <torusKnotGeometry args={[0.7, 0.18, 120, 16]} />
        <MeshDistortMaterial
          color="#3d8bff"
          distort={0.35}
          speed={2.5}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Thin wireframe ring — gold, large background element */}
      <mesh ref={ringRef} position={[0, 0, -4]} rotation={[0.4, 0, 0]}>
        <torusGeometry args={[3.5, 0.015, 8, 100]} />
        <meshBasicMaterial
          color="#f0b429"
          transparent
          opacity={0.12}
        />
      </mesh>
    </>
  )
}
