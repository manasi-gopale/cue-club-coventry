import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function createCircleTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(128, 128, 100, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#111111'
  ctx.font = 'bold 120px Inter, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('8', 128, 132)

  const tex = new THREE.CanvasTexture(canvas)
  tex.anisotropy = 16
  return tex
}

export default function EightBall({ position = [-0.4, 0.14, -0.15], interactive = true }) {
  const ref = useRef()
  const hovered = useRef(false)
  const circleTex = useMemo(() => createCircleTexture(), [])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.15
    const scale = hovered.current ? 1.08 : 1
    ref.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
  })

  return (
    <group ref={ref} position={position}>
      <mesh
        castShadow
        onPointerOver={interactive ? () => { hovered.current = true } : undefined}
        onPointerOut={interactive ? () => { hovered.current = false } : undefined}
      >
        <sphereGeometry args={[0.057, 64, 64]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          roughness={0.08}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.8}
        />
      </mesh>
      <mesh position={[0, 0.048, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.028, 32]} />
        <meshBasicMaterial map={circleTex} transparent />
      </mesh>
      <mesh position={[0, 0.052, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.028, 0.032, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}
