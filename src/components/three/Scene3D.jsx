import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import PoolTable from './PoolTable'
import FloatingParticles from './FloatingParticles'

/**
 * Owns the camera directly instead of relying on drei's <PerspectiveCamera>
 * with a bare position. A camera only gets a position from that component —
 * it does NOT automatically aim itself at the table, so without an explicit
 * lookAt() the table can render partially off-frame or "too low" depending
 * on viewport size. This rig sets the frame once and re-aims every tick,
 * plus adds a very slow cinematic drift for a premium, alive feel.
 */
function CameraRig() {
  const { camera } = useThree()

  // Mutating the three.js camera instance every frame is the standard,
  // required r3f pattern for imperative camera control — not a React state
  // mutation. The react-hooks/immutability rule doesn't know that, so it's
  // disabled for this block rather than fighting it with extra indirection.
  /* eslint-disable react-hooks/immutability */
  useFrame((state) => {
    const t = state.clock.elapsedTime
    camera.fov = 34
    camera.near = 0.1
    camera.far = 50
    camera.position.set(0.4 + Math.sin(t * 0.12) * 0.15, 1.85, 5.4)
    camera.lookAt(0, -0.22, 0)
    camera.updateProjectionMatrix()
  })
  /* eslint-enable react-hooks/immutability */

  return null
}

function DynamicLight() {
  const light1 = useRef()
  const light2 = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (light1.current) {
      light1.current.intensity = 2.2 + Math.sin(t * 0.5) * 0.3
      light1.current.position.x = Math.sin(t * 0.3) * 3
    }
    if (light2.current) {
      light2.current.intensity = 1.5 + Math.cos(t * 0.4) * 0.2
      light2.current.position.z = Math.cos(t * 0.25) * 2
    }
  })

  return (
    <>
      <spotLight
        ref={light1}
        position={[2, 5, 2]}
        angle={0.4}
        penumbra={0.8}
        intensity={2.2}
        color="#fff5e6"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        ref={light2}
        position={[-3, 4, -1]}
        angle={0.5}
        penumbra={1}
        intensity={1.5}
        color="#c9a96e"
      />
      <ambientLight intensity={0.18} />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#4ade80" distance={8} />
      {/* Warm gold rim light so the table reads as premium against the dark hero bg */}
      <pointLight position={[1.6, 0.6, 2.4]} intensity={0.8} color="#dfc99a" distance={6} />
    </>
  )
}

function SceneContent() {
  return (
    <>
      <CameraRig />
      <DynamicLight />
      <PoolTable />
      <FloatingParticles count={110} />
      <ContactShadows
        position={[0, -0.83, 0]}
        opacity={0.55}
        scale={9}
        blur={2.6}
        far={4}
        color="#000000"
      />
      <Environment preset="night" />
    </>
  )
}

export default function Scene3D({ className = '' }) {
  return (
    <div className={`scene-3d ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}
