import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import PoolTable from './PoolTable'
import FloatingParticles from './FloatingParticles'
import SpatialPins from './SpatialPins'

function DynamicCameraRig({ cameraMode }) {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(0.4, 1.85, 5.4))
  const targetLook = useRef(new THREE.Vector3(0, -0.22, 0))

  /* eslint-disable react-hooks/immutability */
  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (cameraMode === 'overhead') {
      targetPos.current.set(0, 5.8, 0.01)
      targetLook.current.set(0, 0, 0)
      camera.fov = THREE.MathUtils.lerp(camera.fov, 30, 0.05)
    } else if (cameraMode === 'pov') {
      targetPos.current.set(1.15, 0.42, 1.7)
      targetLook.current.set(-0.35, 0.05, -0.3)
      camera.fov = THREE.MathUtils.lerp(camera.fov, 46, 0.05)
    } else {
      // 'hero' 3/4 angle default with cinematic drift
      targetPos.current.set(0.4 + Math.sin(t * 0.12) * 0.15, 1.85, 5.4)
      targetLook.current.set(0, -0.22, 0)
      camera.fov = THREE.MathUtils.lerp(camera.fov, 34, 0.05)
    }

    camera.near = 0.1
    camera.far = 50

    camera.position.lerp(targetPos.current, 0.06)

    const currentLook = camera.userData.lookAt || new THREE.Vector3(0, -0.22, 0)
    currentLook.lerp(targetLook.current, 0.06)
    camera.userData.lookAt = currentLook.clone()
    camera.lookAt(currentLook)

    camera.updateProjectionMatrix()
  })
  /* eslint-enable react-hooks/immutability */

  return null
}

function DynamicLightingSystem({ lightingTheme }) {
  const light1 = useRef()
  const light2 = useRef()

  const colors = {
    midnight: { c1: '#fff5e6', c2: '#c9a96e', rim: '#dfc99a' },
    gold: { c1: '#ffe6a5', c2: '#ffc107', rim: '#ffd700' },
    emerald: { c1: '#a7f3d0', c2: '#10b981', rim: '#34d399' },
    neon: { c1: '#38bdf8', c2: '#a855f7', rim: '#e879f9' },
  }

  const themeColors = colors[lightingTheme] || colors.midnight

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
        color={themeColors.c1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        ref={light2}
        position={[-3, 4, -1]}
        angle={0.5}
        penumbra={1}
        intensity={1.5}
        color={themeColors.c2}
      />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 3, 0]} intensity={0.6} color={themeColors.rim} distance={8} />
      <pointLight position={[1.6, 0.6, 2.4]} intensity={0.8} color={themeColors.c2} distance={6} />
    </>
  )
}

function SceneContent({
  onCueBallInteract,
  cameraMode,
  lightingTheme,
  showPins,
  activePin,
  setActivePin,
}) {
  return (
    <>
      <DynamicCameraRig cameraMode={cameraMode} />
      <DynamicLightingSystem lightingTheme={lightingTheme} />
      <PoolTable onCueBallInteract={onCueBallInteract} />
      {showPins && <SpatialPins activePin={activePin} setActivePin={setActivePin} />}
      <FloatingParticles count={90} />
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

export default function Scene3D({
  className = '',
  onCueBallInteract,
  cameraMode = 'hero',
  lightingTheme = 'midnight',
  showPins = true,
  activePin = null,
  setActivePin = () => {},
}) {
  const dprCap = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)

  return (
    <div className={`scene-3d ${className}`}>
      <Canvas
        shadows
        dpr={[1, dprCap]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent', touchAction: 'none' }}
      >
        <Suspense fallback={null}>
          <SceneContent
            onCueBallInteract={onCueBallInteract}
            cameraMode={cameraMode}
            lightingTheme={lightingTheme}
            showPins={showPins}
            activePin={activePin}
            setActivePin={setActivePin}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
