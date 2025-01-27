import { useState, useEffect } from 'react'
import { getDataFromLocalStorage } from 'utils/localStorage'

const usePersistedSetState = <T extends any>(
  key: string,
  initialState: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState(getDataFromLocalStorage(key, initialState))

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

export default usePersistedSetState
