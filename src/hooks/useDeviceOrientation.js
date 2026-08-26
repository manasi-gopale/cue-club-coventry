import { useState, useEffect } from 'react'

export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState({ tiltX: 0, tiltY: 0, supported: false })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.DeviceOrientationEvent) return

    let currentTiltX = 0
    let currentTiltY = 0

    const handleOrientation = (event) => {
      const { gamma, beta } = event
      if (gamma === null || beta === null) return

      // Clamp gamma (-30..30) and beta (-30..30) for subtle parallax effect
      const clampedGamma = Math.max(-30, Math.min(30, gamma))
      const clampedBeta = Math.max(-30, Math.min(30, beta - 45)) // 45 degree holding offset

      const targetX = clampedGamma / 30
      const targetY = clampedBeta / 30

      currentTiltX += (targetX - currentTiltX) * 0.1
      currentTiltY += (targetY - currentTiltY) * 0.1

      setOrientation({
        tiltX: currentTiltX,
        tiltY: currentTiltY,
        supported: true,
      })
    }

    // Handle iOS 13+ permission if required
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      setOrientation((prev) => ({ ...prev, supported: true }))
    } else {
      window.addEventListener('deviceorientation', handleOrientation, true)
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true)
    }
  }, [])

  return orientation
}
