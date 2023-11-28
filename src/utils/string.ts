// String helpers

export const splitInHalf = (value: string) => {
  const half = value.length / 2
  let firstHalf = value.slice(0, half)
  return [value.slice(0, half), value.slice(half)]
}

export const isUpperCase = (value: string) => /^[A-Z]*$/.test(value)
