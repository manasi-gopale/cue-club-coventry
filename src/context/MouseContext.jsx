import { createContext, useContext, useState, useEffect } from 'react'

const MouseContext = createContext({ x: 0, y: 0, normalized: { x: 0, y: 0 } })

export function MouseProvider({ children }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0, normalized: { x: 0, y: 0 } })

  useEffect(() => {
    const onMove = (e) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
        normalized: {
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1,
        },
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return <MouseContext.Provider value={mouse}>{children}</MouseContext.Provider>
}

export function useMouse() {
  return useContext(MouseContext)
}
