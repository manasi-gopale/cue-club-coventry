import { createContext, useContext, useRef } from 'react'

const ScrollContext = createContext({ progress: { current: 0 } })

export function ScrollProvider({ children }) {
  const progress = useRef(0)
  return <ScrollContext.Provider value={{ progress }}>{children}</ScrollContext.Provider>
}

export function useScrollProgress() {
  return useContext(ScrollContext)
}
