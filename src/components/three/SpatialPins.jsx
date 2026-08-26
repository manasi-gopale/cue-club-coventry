import { Html } from '@react-three/drei'

export default function SpatialPins({ activePin, setActivePin }) {
  const pins = [
    { id: 'cueball', pos: [0.35, 0.25, 0.2], label: 'CUE BALL' },
    { id: 'eightball', pos: [-0.35, 0.25, -0.1], label: '8-BALL' },
    { id: 'felt', pos: [0, 0.15, 0], label: 'SIMONIS FELT' },
    { id: 'slate', pos: [0.95, 0.08, 0.45], label: '1.5" SLATE' },
    { id: 'pocket', pos: [-1.22, 0.18, -0.6], label: 'POCKET' },
  ]

  return (
    <group>
      {pins.map((pin) => {
        const isSelected = activePin === pin.id

        return (
          <group key={pin.id} position={pin.pos}>
            <Html
              center
              distanceFactor={8}
              zIndexRange={[100, 0]}
              style={{ pointerEvents: 'auto' }}
            >
              <button
                type="button"
                className={`spatial-pin ${isSelected ? 'spatial-pin--active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setActivePin(isSelected ? null : pin.id)
                }}
              >
                <div className="spatial-pin__reticle">
                  <span className="spatial-pin__pulse" />
                  <span className="spatial-pin__dot" />
                </div>
                <span className="spatial-pin__label">{pin.label}</span>
              </button>
            </Html>
          </group>
        )
      })}
    </group>
  )
}
