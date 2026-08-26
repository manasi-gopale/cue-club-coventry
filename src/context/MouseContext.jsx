import { createContext, useContext, useState, useEffect } from 'react'

const MouseContext = createContext({ x: 0, y: 0, normalized: { x: 0, y: 0 } })

export function MouseProvider({ children }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0, normalized: { x: 0, y: 0 } })

  useEffect(() => {
    const updateCoord = (clientX, clientY) => {
      setMouse({
        x: clientX,
        y: clientY,
        normalized: {
          x: (clientX / window.innerWidth) * 2 - 1,
          y: -(clientY / window.innerHeight) * 2 + 1,
        },
      })
    }

    const onMove = (e) => updateCoord(e.clientX, e.clientY)
    const onTouch = (e) => {
      if (e.touches && e.touches[0]) {
        updateCoord(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  return <MouseContext.Provider value={mouse}>{children}</MouseContext.Provider>
}

export function useMouse() {
  return useContext(MouseContext)
}
