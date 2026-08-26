import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScrollProgress } from '../../context/ScrollContext'
import { useMouse } from '../../context/MouseContext'
import { useDeviceOrientation } from '../../hooks/useDeviceOrientation'
import { soundEngine } from '../../utils/audio'
import CueBall from './CueBall'
import EightBall from './EightBall'

const WOOD = { color: '#4a3020', roughness: 0.55, metalness: 0.05 }
const FELT = { color: '#0f4d2e', roughness: 0.95, metalness: 0 }
const CUSHION = { color: '#1a6b40', roughness: 0.85, metalness: 0 }

const FELT_Y = 0.095
const BOUNDS = { x: 1.14, z: 0.52 }
const BALL_DIAMETER = 0.114

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

function RackBall({ ballData, color }) {
  const meshRef = useRef()

  useFrame((_, delta) => {
    if (!meshRef.current || !ballData) return
    const ball = meshRef.current
    ball.rotation.x += ballData.vel.z * delta * 5
    ball.rotation.z -= ballData.vel.x * delta * 5
    ball.position.set(ballData.pos.x, FELT_Y, ballData.pos.z)
  })

  return (
    <mesh ref={meshRef} position={[ballData.pos.x, FELT_Y, ballData.pos.z]} castShadow>
      <sphereGeometry args={[0.057, 32, 32]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.06}
        clearcoat={0.9}
        envMapIntensity={1.5}
      />
    </mesh>
  )
}

export default function PoolTable({ onCueBallInteract }) {
  const group = useRef()
  const { progress } = useScrollProgress()
  const mouse = useMouse()
  const orientation = useDeviceOrientation()

  const ballsRef = useRef([
    { pos: { x: 0.35, z: 0.2 }, vel: { x: 0, z: 0 } },
    { pos: { x: -0.35, z: -0.1 }, vel: { x: 0, z: 0 } },
    { pos: { x: 0, z: -0.35 }, vel: { x: 0, z: 0 } },
    { pos: { x: -0.06, z: -0.42 }, vel: { x: 0, z: 0 } },
    { pos: { x: 0.06, z: -0.42 }, vel: { x: 0, z: 0 } },
    { pos: { x: -0.12, z: -0.49 }, vel: { x: 0, z: 0 } },
    { pos: { x: 0, z: -0.49 }, vel: { x: 0, z: 0 } },
    { pos: { x: 0.12, z: -0.49 }, vel: { x: 0, z: 0 } },
  ])

  const tableW = 2.54
  const tableD = 1.27
  const railH = 0.055
  const railW = 0.09
  const cushionH = 0.028

  const BASE_ROT_Y = 0.42

  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    const scroll = progress.current

    const inputX = orientation.supported ? orientation.tiltX : mouse.normalized.x
    const inputY = orientation.supported ? orientation.tiltY : mouse.normalized.y

    const targetRotY = BASE_ROT_Y + inputX * 0.12 + scroll * 0.4
    const targetRotX = inputY * 0.04 + Math.sin(t * 0.2) * 0.012

    group.current.rotation.y += (targetRotY - group.current.rotation.y) * 0.05
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.05

    const float = Math.sin(t * 0.6) * 0.035
    group.current.position.y = -0.3 - scroll * 0.5 + float

    // --- Physics Simulation Loop ---
    const balls = ballsRef.current
    const n = balls.length

    for (let i = 0; i < n; i++) {
      const b = balls[i]
      b.pos.x += b.vel.x * delta
      b.pos.z += b.vel.z * delta

      b.vel.x *= 0.985
      b.vel.z *= 0.985

      if (Math.abs(b.pos.x) > BOUNDS.x) {
        const speed = Math.abs(b.vel.x)
        b.pos.x = Math.sign(b.pos.x) * BOUNDS.x
        b.vel.x *= -0.75
        if (speed > 0.3) soundEngine.playCushionBounce(speed)
      }
      if (Math.abs(b.pos.z) > BOUNDS.z) {
        const speed = Math.abs(b.vel.z)
        b.pos.z = Math.sign(b.pos.z) * BOUNDS.z
        b.vel.z *= -0.75
        if (speed > 0.3) soundEngine.playCushionBounce(speed)
      }
    }

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const b1 = balls[i]
        const b2 = balls[j]
        const dx = b1.pos.x - b2.pos.x
        const dz = b1.pos.z - b2.pos.z
        const dist = Math.sqrt(dx * dx + dz * dz)

        if (dist < BALL_DIAMETER && dist > 0.0001) {
          const nx = dx / dist
          const nz = dz / dist
          const overlap = BALL_DIAMETER - dist

          b1.pos.x += nx * overlap * 0.5
          b1.pos.z += nz * overlap * 0.5
          b2.pos.x -= nx * overlap * 0.5
          b2.pos.z -= nz * overlap * 0.5

          const vx = b1.vel.x - b2.vel.x
          const vz = b1.vel.z - b2.vel.z
          const vn = vx * nx + vz * nz

          if (vn < 0) {
            const impulse = -1.85 * vn / 2
            b1.vel.x += impulse * nx
            b1.vel.z += impulse * nz
            b2.vel.x -= impulse * nx
            b2.vel.z -= impulse * nz

            const impactSpeed = Math.abs(vn)
            if (impactSpeed > 0.1) {
              soundEngine.playBallCollision(impactSpeed)
            }
          }
        }
      }
    }
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

  const rackColors = ['#cc1a1a', '#1a1acc', '#cccc1a', '#cc1acc', '#1acccc', '#cc661a']

  return (
    <group ref={group} position={[0, -0.3, 0]}>
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

      {/* Interactive Cue Ball */}
      <CueBall ballData={ballsRef.current[0]} onInteract={onCueBallInteract} />

      {/* Interactive Eight Ball */}
      <EightBall ballData={ballsRef.current[1]} />

      {/* Interactive Rack Triangle Balls */}
      {ballsRef.current.slice(2).map((ballData, idx) => (
        <RackBall key={idx} ballData={ballData} color={rackColors[idx % rackColors.length]} />
      ))}
    </group>
  )
}
