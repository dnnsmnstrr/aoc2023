// String helpers

export const splitInHalf = (value: string) => {
  const half = value.length / 2
  return [value.slice(0, half), value.slice(half)]
}

export const isUpperCase = (value: string) => /^[A-Z]*$/.test(value)
