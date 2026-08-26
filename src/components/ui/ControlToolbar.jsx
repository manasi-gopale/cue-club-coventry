import { motion } from 'framer-motion'
import {
  FiCamera,
  FiSun,
  FiMapPin,
  FiVolume2,
  FiVolumeX,
  FiRefreshCw,
} from 'react-icons/fi'

export default function ControlToolbar({
  cameraMode,
  setCameraMode,
  lightingTheme,
  setLightingTheme,
  showPins,
  setShowPins,
  soundEnabled,
  toggleSound,
  onResetView,
}) {
  const cameraLabels = {
    hero: '3/4 HERO',
    overhead: 'OVERHEAD',
    pov: 'CUE POV',
  }

  const lightingLabels = {
    midnight: 'MIDNIGHT',
    gold: 'GOLD VIP',
    emerald: 'EMERALD',
    neon: 'NEON',
  }

  const nextCamera = () => {
    const modes = ['hero', 'overhead', 'pov']
    const idx = modes.indexOf(cameraMode)
    setCameraMode(modes[(idx + 1) % modes.length])
  }

  const nextLighting = () => {
    const themes = ['midnight', 'gold', 'emerald', 'neon']
    const idx = themes.indexOf(lightingTheme)
    setLightingTheme(themes[(idx + 1) % themes.length])
  }

  return (
    <motion.div
      className="control-toolbar"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        type="button"
        className="control-btn"
        onClick={nextCamera}
        title="Cycle Camera View"
      >
        <FiCamera className="control-btn__icon" />
        <span className="control-btn__label">VIEW</span>
        <span className="control-btn__val">{cameraLabels[cameraMode]}</span>
      </button>

      <div className="control-toolbar__divider" />

      <button
        type="button"
        className="control-btn"
        onClick={nextLighting}
        title="Cycle Lighting Ambience"
      >
        <FiSun className="control-btn__icon" />
        <span className="control-btn__label">LIGHT</span>
        <span className="control-btn__val">{lightingLabels[lightingTheme]}</span>
      </button>

      <div className="control-toolbar__divider" />

      <button
        type="button"
        className={`control-btn ${showPins ? 'control-btn--active' : ''}`}
        onClick={() => setShowPins(!showPins)}
        title="Toggle Spatial Telemetry Pins"
      >
        <FiMapPin className="control-btn__icon" />
        <span className="control-btn__label">PINS</span>
        <span className="control-btn__val">{showPins ? 'ON' : 'OFF'}</span>
      </button>

      <div className="control-toolbar__divider" />

      <button
        type="button"
        className={`control-btn ${soundEnabled ? 'control-btn--active' : ''}`}
        onClick={toggleSound}
        title="Toggle Audio FX"
      >
        {soundEnabled ? (
          <FiVolume2 className="control-btn__icon" />
        ) : (
          <FiVolumeX className="control-btn__icon" />
        )}
        <span className="control-btn__label">SOUND</span>
        <span className="control-btn__val">{soundEnabled ? 'ON' : 'OFF'}</span>
      </button>

      <div className="control-toolbar__divider" />

      <button
        type="button"
        className="control-btn control-btn--reset"
        onClick={onResetView}
        title="Reset Camera & Scene"
      >
        <FiRefreshCw className="control-btn__icon" />
        <span className="control-btn__label">RESET</span>
      </button>
    </motion.div>
  )
}
