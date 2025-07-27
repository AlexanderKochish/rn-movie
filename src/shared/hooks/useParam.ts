import { useLocalSearchParams } from 'expo-router'

export const useParam = <T extends string = string>(
  key: string
): T | undefined => {
  const params = useLocalSearchParams()
  const value = params[key]

  return typeof value === 'string' ? (value as T) : undefined
}
