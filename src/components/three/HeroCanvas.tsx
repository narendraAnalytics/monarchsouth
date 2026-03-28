import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import ParticleField from './ParticleField'
import FloatingGeometry from './FloatingGeometry'

interface HeroCanvasProps {
  mouseX: number  // -0.5 to 0.5
  mouseY: number  // -0.5 to 0.5
}

export default function HeroCanvas({ mouseX, mouseY }: HeroCanvasProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    // Smooth lerp toward mouse position for parallax
    groupRef.current.rotation.y +=
      (mouseX * 0.4 - groupRef.current.rotation.y) * 0.04
    groupRef.current.rotation.x +=
      (-mouseY * 0.25 - groupRef.current.rotation.x) * 0.04
  })

  return (
    <>
      {/* Scene lighting */}
      <ambientLight intensity={0.15} color="#3d8bff" />
      <directionalLight position={[5, 5, 3]} intensity={1.0} color="#f0b429" />
      <pointLight position={[-5, -3, -5]} intensity={0.4} color="#3d8bff" />
      <pointLight position={[0, 5, 0]} intensity={0.2} color="#f0f4ff" />

      {/* Scene group for mouse parallax */}
      <group ref={groupRef}>
        <ParticleField />
        <FloatingGeometry />
      </group>

      {/* Post-processing — must come last */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          intensity={1.8}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}
