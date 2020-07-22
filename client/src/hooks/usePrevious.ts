import { useRef, useEffect } from 'react'

const usePrevious = <T extends any>(value: T) => {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default usePrevious
