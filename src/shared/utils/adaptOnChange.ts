export const adaptOnChange =
  <T>(value: T, onChange: (val: T) => void) =>
  (input: T | ((prev: T) => T)) => {
    const newValue =
      typeof input === 'function' ? (input as (prev: T) => T)(value) : input
    onChange(newValue)
  }
