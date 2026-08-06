import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CueBall({ position = [0, 0.14, 0], interactive = true, onClick }) {
  const ref = useRef()
  const velocity = useRef({ x: 0, z: 0 })
  const hovered = useRef(false)

  useFrame((state, delta) => {
    if (!ref.current) return
    const ball = ref.current

    velocity.current.x *= 0.98
    velocity.current.z *= 0.98

    ball.position.x += velocity.current.x * delta
    ball.position.z += velocity.current.z * delta

    const bounds = { x: 1.5, z: 0.65 }
    if (Math.abs(ball.position.x) > bounds.x) {
      ball.position.x = Math.sign(ball.position.x) * bounds.x
      velocity.current.x *= -0.7
    }
    if (Math.abs(ball.position.z) > bounds.z) {
      ball.position.z = Math.sign(ball.position.z) * bounds.z
      velocity.current.z *= -0.7
    }

    ball.rotation.x += (velocity.current.z * 3 + 0.2) * delta
    ball.rotation.z -= (velocity.current.x * 3) * delta

    if (hovered.current) {
      ball.scale.lerp(new THREE.Vector3(1.08, 1.08, 1.08), 0.1)
    } else {
      ball.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  const handleClick = (e) => {
    e.stopPropagation()
    velocity.current.x = (Math.random() - 0.5) * 4
    velocity.current.z = (Math.random() - 0.5) * 4
    onClick?.()
  }

  return (
    <group ref={ref} position={position}>
      <mesh
        castShadow
        onClick={interactive ? handleClick : undefined}
        onPointerOver={interactive ? () => { hovered.current = true; document.body.style.cursor = 'pointer' } : undefined}
        onPointerOut={interactive ? () => { hovered.current = false; document.body.style.cursor = '' } : undefined}
      >
        <sphereGeometry args={[0.057, 64, 64]} />
        <meshPhysicalMaterial
          color="#fafaf5"
          roughness={0.04}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.02}
          envMapIntensity={2}
          reflectivity={1}
        />
      </mesh>
    </group>
  )
}
