import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function generateDust(count) {
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const phases = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 14
    positions[i * 3 + 1] = Math.random() * 10 - 1
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14
    sizes[i] = 0.5 + Math.random() * 2
    phases[i] = Math.random() * Math.PI * 2
  }
  return { positions, sizes, phases }
}

export default function DustParticles({ count = 400 }) {
  const mesh = useRef()
  const data = useMemo(() => generateDust(count), [count])

  useFrame((state) => {
    if (!mesh.current) return
    const pos = mesh.current.geometry.attributes.position.array
    const t = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(t * 0.3 + data.phases[i]) * 0.001
      pos[i * 3] += Math.cos(t * 0.2 + data.phases[i]) * 0.0005
      if (pos[i * 3 + 1] > 8) pos[i * 3 + 1] = -1
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
    mesh.current.rotation.y = t * 0.008
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={data.positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#c9a96e"
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export function AmbientDust({ count = 800 }) {
  const mesh = useRef()
  const data = useMemo(() => generateDust(count), [count])

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.y = state.clock.elapsedTime * 0.005
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={data.positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.008}
        color="#ffffff"
        transparent
        opacity={0.12}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
