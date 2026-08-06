import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float,
} from '@react-three/drei'

import PoolTable from './PoolTable'
import FloatingParticles from './FloatingParticles'

function SceneContent() {
  return (
    <>
      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        position={[0, 2.1, 6]}
        fov={40}
      />

      {/* Lights */}
      <ambientLight intensity={0.45} />

      <directionalLight
        position={[6, 8, 5]}
        intensity={2.4}
        castShadow
      />

      <pointLight
        position={[-3, 4, 2]}
        intensity={1}
        color="#d8b36a"
      />

      <spotLight
        position={[4, 6, 4]}
        angle={0.45}
        penumbra={1}
        intensity={2}
        color="#ffe8c0"
      />

      {/* Floating Table */}
      <Float
        speed={1.4}
        rotationIntensity={0.08}
        floatIntensity={0.18}
      >
        <group
          position={[2.6, -0.35, 0]}
          rotation={[0, -0.48, 0]}
          scale={0.9}
        >
          <PoolTable />
        </group>
      </Float>

      {/* Particles */}
      <FloatingParticles count={180} />

      {/* Shadow */}
      <ContactShadows
        position={[2.6, -0.72, 0]}
        opacity={0.45}
        blur={3}
        far={5}
        scale={8}
      />

      {/* HDRI */}
      <Environment preset="warehouse" />
    </>
  )
}

export default function Scene3D({ className = '' }) {
  return (
    <div className={`scene-3d ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: [0, 2.1, 6],
          fov: 40,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}