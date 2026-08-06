import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function generateParticles(count) {
  const positions = new Float32Array(count * 3)
  const speeds = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12
    positions[i * 3 + 1] = Math.random() * 8 - 2
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12
    speeds[i] = 0.2 + Math.random() * 0.8
  }
  return { positions, speeds }
}

export default function FloatingParticles({ count = 200 }) {
  const mesh = useRef()
  const particles = useMemo(() => generateParticles(count), [count])

  useFrame((state) => {
    if (!mesh.current) return
    const pos = mesh.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(state.clock.elapsedTime * particles.speeds[i] + i) * 0.002
      if (pos[i * 3 + 1] > 6) pos[i * 3 + 1] = -2
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#c9a96e"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
