import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScrollProgress } from '../../context/ScrollContext'
import { useMouse } from '../../context/MouseContext'
import CueBall from './CueBall'
import EightBall from './EightBall'

const WOOD = { color: '#4a3020', roughness: 0.55, metalness: 0.05 }
const FELT = { color: '#0f4d2e', roughness: 0.95, metalness: 0 }
const CUSHION = { color: '#1a6b40', roughness: 0.85, metalness: 0 }

function Rail({ position, size }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial {...WOOD} />
    </mesh>
  )
}

function Cushion({ position, size }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial {...CUSHION} />
    </mesh>
  )
}

function Pocket({ position }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.085, 0.09, 0.06, 24]} />
        <meshStandardMaterial color="#050505" roughness={1} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <torusGeometry args={[0.085, 0.008, 8, 24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
    </group>
  )
}

function Diamond({ position }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
      <planeGeometry args={[0.012, 0.012]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </mesh>
  )
}

function Leg({ position }) {
  return (
    <mesh position={position} castShadow>
      <cylinderGeometry args={[0.04, 0.05, 0.72, 12]} />
      <meshStandardMaterial {...WOOD} />
    </mesh>
  )
}

export default function PoolTable() {
  const group = useRef()
  const { progress } = useScrollProgress()
  const mouse = useMouse()

  const tableW = 2.54
  const tableD = 1.27
  const railH = 0.055
  const railW = 0.09
  const cushionH = 0.028

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    const scroll = progress.current

    const targetRotY = mouse.normalized.x * 0.12 + scroll * 0.4
    const targetRotX = mouse.normalized.y * 0.04 + Math.sin(t * 0.2) * 0.015

    group.current.rotation.y += (targetRotY - group.current.rotation.y) * 0.04
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.04
    
  })

  const pockets = [
    [-tableW / 2 + 0.04, 0.035, -tableD / 2 + 0.04],
    [0, 0.035, -tableD / 2 + 0.02],
    [tableW / 2 - 0.04, 0.035, -tableD / 2 + 0.04],
    [-tableW / 2 + 0.04, 0.035, tableD / 2 - 0.04],
    [0, 0.035, tableD / 2 - 0.02],
    [tableW / 2 - 0.04, 0.035, tableD / 2 - 0.04],
  ]

  const diamonds = []
  for (let i = -2; i <= 2; i++) {
    if (i === 0) continue
    diamonds.push([i * 0.42, 0.038, -tableD / 2 + 0.01])
    diamonds.push([i * 0.42, 0.038, tableD / 2 - 0.01])
  }

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Cabinet */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[tableW + 0.18, 0.2, tableD + 0.18]} />
        <meshStandardMaterial {...WOOD} />
      </mesh>

      {/* Apron */}
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[tableW + 0.14, 0.04, tableD + 0.14]} />
        <meshStandardMaterial color="#3d2818" roughness={0.5} metalness={0.08} />
      </mesh>

      {/* Slate */}
      <mesh position={[0, 0.045, 0]} receiveShadow>
        <boxGeometry args={[tableW, 0.025, tableD]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Felt */}
      <mesh position={[0, 0.058, 0]} receiveShadow>
        <boxGeometry args={[tableW - 0.02, 0.008, tableD - 0.02]} />
        <meshStandardMaterial {...FELT} />
      </mesh>

      {/* Cushions */}
      <Cushion position={[0, 0.058 + cushionH / 2, -tableD / 2 + 0.02]} size={[tableW - 0.16, cushionH, 0.04]} />
      <Cushion position={[0, 0.058 + cushionH / 2, tableD / 2 - 0.02]} size={[tableW - 0.16, cushionH, 0.04]} />
      <Cushion position={[-tableW / 2 + 0.02, 0.058 + cushionH / 2, 0]} size={[0.04, cushionH, tableD - 0.16]} />
      <Cushion position={[tableW / 2 - 0.02, 0.058 + cushionH / 2, 0]} size={[0.04, cushionH, tableD - 0.16]} />

      {/* Rails */}
      <Rail position={[0, railH / 2 + 0.06, -tableD / 2 - railW / 2 + 0.02]} size={[tableW + railW * 2, railH, railW]} />
      <Rail position={[0, railH / 2 + 0.06, tableD / 2 + railW / 2 - 0.02]} size={[tableW + railW * 2, railH, railW]} />
      <Rail position={[-tableW / 2 - railW / 2 + 0.02, railH / 2 + 0.06, 0]} size={[railW, railH, tableD]} />
      <Rail position={[tableW / 2 + railW / 2 - 0.02, railH / 2 + 0.06, 0]} size={[railW, railH, tableD]} />

      {/* Pockets */}
      {pockets.map((pos, i) => (
        <Pocket key={i} position={pos} />
      ))}

      {/* Diamonds */}
      {diamonds.map((pos, i) => (
        <Diamond key={i} position={pos} />
      ))}

      {/* Legs */}
      <Leg position={[-tableW / 2 + 0.15, -0.46, -tableD / 2 + 0.1]} />
      <Leg position={[tableW / 2 - 0.15, -0.46, -tableD / 2 + 0.1]} />
      <Leg position={[-tableW / 2 + 0.15, -0.46, tableD / 2 - 0.1]} />
      <Leg position={[tableW / 2 - 0.15, -0.46, tableD / 2 - 0.1]} />

      {/* Balls */}
      <CueBall position={[0.35, 0.095, 0.2]} />
      <EightBall position={[-0.35, 0.095, -0.1]} />

      {/* Rack triangle */}
      {[
        [0, 0, -0.35],
        [-0.06, 0, -0.42],
        [0.06, 0, -0.42],
        [-0.12, 0, -0.49],
        [0, 0, -0.49],
        [0.12, 0, -0.49],
      ].map(([x, , z], i) => (
        <mesh key={i} position={[x, 0.095, z]} castShadow>
          <sphereGeometry args={[0.057, 32, 32]} />
          <meshPhysicalMaterial
            color={['#cc1a1a', '#1a1acc', '#cccc1a', '#cc1acc', '#1acccc', '#cc661a'][i]}
            roughness={0.06}
            clearcoat={0.9}
            envMapIntensity={1.5}
          />
        </mesh>
      ))}
    </group>
  )
}
