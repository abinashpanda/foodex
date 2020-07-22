import { useState, useEffect } from 'react'
import { isEqual } from 'lodash-es'
import usePrevious from './usePrevious'

const useStateFromProp = <T extends any>(
  prop: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(prop)

  const prevProp = usePrevious(prop)

  useEffect(() => {
    if (prop && !isEqual(prop, prevProp)) {
      setState(prop)
    }
  }, [prevProp, prop])

  return [state, setState]
}

export default useStateFromProp
