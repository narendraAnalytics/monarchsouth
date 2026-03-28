import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function FloatingGeometry() {
  const icoRef = useRef<THREE.Mesh>(null)
  const crownRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (icoRef.current) {
      icoRef.current.rotation.x += delta * 0.18
      icoRef.current.rotation.y += delta * 0.12
    }
    if (crownRef.current) {
      crownRef.current.rotation.y += delta * 0.08
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
          color="#d4a017"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* 3D Crown — gold wireframe, left side — "Wear Your Crown" */}
      <group ref={crownRef} position={[-2.5, 0, -2.5]}>
        {/* Base band (horizontal torus ring) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.75, 0.05, 8, 80]} />
          <meshBasicMaterial color="#d4a017" wireframe transparent opacity={0.55} />
        </mesh>

        {/* Front center point — tallest */}
        <mesh position={[0, 0.4, 0.75]}>
          <cylinderGeometry args={[0.01, 0.09, 0.8, 5]} />
          <meshBasicMaterial color="#d4a017" wireframe transparent opacity={0.55} />
        </mesh>

        {/* Front-right point */}
        <mesh position={[0.714, 0.275, 0.232]}>
          <cylinderGeometry args={[0.01, 0.07, 0.55, 5]} />
          <meshBasicMaterial color="#d4a017" wireframe transparent opacity={0.55} />
        </mesh>

        {/* Front-left point */}
        <mesh position={[-0.714, 0.275, 0.232]}>
          <cylinderGeometry args={[0.01, 0.07, 0.55, 5]} />
          <meshBasicMaterial color="#d4a017" wireframe transparent opacity={0.55} />
        </mesh>

        {/* Back-right point — shorter */}
        <mesh position={[0.441, 0.175, -0.607]}>
          <cylinderGeometry args={[0.01, 0.055, 0.35, 5]} />
          <meshBasicMaterial color="#d4a017" wireframe transparent opacity={0.4} />
        </mesh>

        {/* Back-left point — shorter */}
        <mesh position={[-0.441, 0.175, -0.607]}>
          <cylinderGeometry args={[0.01, 0.055, 0.35, 5]} />
          <meshBasicMaterial color="#d4a017" wireframe transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Thin wireframe ring — gold, large background element */}
      <mesh ref={ringRef} position={[0, 0, -4]} rotation={[0.4, 0, 0]}>
        <torusGeometry args={[3.5, 0.015, 8, 100]} />
        <meshBasicMaterial
          color="#d4a017"
          transparent
          opacity={0.12}
        />
      </mesh>
    </>
  )
}
