import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const FELT_Y = 0.095
const BOUNDS = { x: 1.14, z: 0.52 }
const BALL_RADIUS = 0.057

export default function CueBall({
  ballData,
  onInteract,
}) {
  const meshRef = useRef()
  const [isDragging, setIsDragging] = useState(false)
  const [hovered, setHovered] = useState(false)
  const dragStart = useRef(new THREE.Vector3())
  const dragCurrent = useRef(new THREE.Vector3())
  const aimVector = useRef(new THREE.Vector3())

  const { raycaster, camera, gl } = useThree()
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), -FELT_Y)).current
  const planeIntersect = useRef(new THREE.Vector3())

  const getPlanePoint = (e) => {
    const rect = gl.domElement.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    raycaster.setFromCamera({ x, y }, camera)
    raycaster.ray.intersectPlane(plane, planeIntersect)
    return planeIntersect.clone()
  }

  useFrame((state, delta) => {
    if (!meshRef.current || !ballData) return
    const ball = meshRef.current

    if (isDragging) {
      aimVector.current.subVectors(dragStart.current, dragCurrent.current)
      if (aimVector.current.length() > 0.8) {
        aimVector.current.normalize().multiplyScalar(0.8)
      }
    } else {
      // Rotation based on movement
      ball.rotation.x += ballData.vel.z * delta * 5
      ball.rotation.z -= ballData.vel.x * delta * 5
    }

    ball.position.set(ballData.pos.x, FELT_Y, ballData.pos.z)

    const targetScale = isDragging ? 1.18 : hovered ? 1.1 : 1
    ball.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15)
  })

  const handlePointerDown = (e) => {
    e.stopPropagation()
    onInteract?.()
    try {
      e.target.setPointerCapture(e.pointerId)
    } catch (_) {}

    const pt = getPlanePoint(e)
    dragStart.current.set(ballData.pos.x, FELT_Y, ballData.pos.z)
    dragCurrent.current.copy(pt)
    setIsDragging(true)
    document.body.style.cursor = 'grabbing'
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    e.stopPropagation()
    const pt = getPlanePoint(e)
    dragCurrent.current.copy(pt)
  }

  const handlePointerUp = (e) => {
    if (!isDragging) return
    e.stopPropagation()
    try {
      e.target.releasePointerCapture(e.pointerId)
    } catch (_) {}

    setIsDragging(false)
    document.body.style.cursor = hovered ? 'pointer' : ''

    const pullDist = aimVector.current.length()
    if (pullDist > 0.03) {
      const force = pullDist * 7.5
      const dir = aimVector.current.clone().normalize()
      ballData.vel.x = dir.x * force
      ballData.vel.z = dir.z * force
    } else {
      // Single click/tap default strike towards table center/rack
      ballData.vel.x = -2.5
      ballData.vel.z = (Math.random() - 0.5) * 1.5
    }
  }

  const aimLength = isDragging ? aimVector.current.length() * 3 : 0
  const aimEnd = isDragging
    ? new THREE.Vector3(
        ballData.pos.x + aimVector.current.x * 3,
        FELT_Y,
        ballData.pos.z + aimVector.current.z * 3
      )
    : new THREE.Vector3()

  return (
    <group>
      {/* Cue Ball Sphere */}
      <mesh
        ref={meshRef}
        castShadow
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerOver={() => {
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          if (!isDragging) document.body.style.cursor = ''
        }}
      >
        <sphereGeometry args={[BALL_RADIUS, 64, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.03}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.02}
          envMapIntensity={2.2}
        />
      </mesh>

      {/* Ring visual indicator beneath cue ball */}
      {ballData && (
        <mesh
          position={[ballData.pos.x, FELT_Y - 0.035, ballData.pos.z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.07, 0.085, 32]} />
          <meshBasicMaterial
            color={isDragging ? '#4ade80' : '#c9a96e'}
            transparent
            opacity={isDragging ? 0.9 : hovered ? 0.75 : 0.4}
          />
        </mesh>
      )}

      {/* Trajectory Aim Line while dragging */}
      {isDragging && aimLength > 0.05 && (
        <line>
          <bufferGeometry
            attach="geometry"
            onUpdate={(self) => {
              self.setFromPoints([
                new THREE.Vector3(ballData.pos.x, FELT_Y + 0.005, ballData.pos.z),
                aimEnd,
              ])
            }}
          />
          <lineBasicMaterial attach="material" color="#4ade80" linewidth={3} />
        </line>
      )}
    </group>
  )
}
