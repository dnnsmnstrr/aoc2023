// Array helper methods
export const sorting = {
  ascending: <T>(a: T, b: T) => Number(a) - Number(b),
  descending: <T>(a: T, b: T) => Number(b) - Number(a),
  alphabetically: (a: string, b: string) => a.localeCompare(b),
}

export function sortByKey(values: any[], key: string) {
  return values.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1
    }

    if (a[key] > b[key]) {
      return 1
    }

    return 0
  })
}

export const splitLines = (input: string, splitter = '\n', trim = true) => {
  const splitLines = input.split(splitter)
  const trimmedLines = splitLines.map((line) => trim ? line.trim() : line)
  const filteredLines = trimmedLines.filter(Boolean)
  return filteredLines
}

export const splitIntoChunks = (array: Array<any>, chunkSize: number) => {
  const chunks = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}