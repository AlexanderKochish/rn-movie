import { useEffect, useState } from 'react'

export const useDebounce = (value: string, delay: number = 500) => {
  const [debounceValue, setDebounceValue] = useState<string>(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [value, delay])

  return debounceValue
}
