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

/**
 * @typedef {Object} SplitOptions
 * @property {string|false} [delimiter='\n'] - a delimiter to split the input by (false will omit the splitting and return the entire input)
 * @property {funcion(string, number, string[]): *|false} [mapper=Number] - a function that will be used to map the splitted input (false will omit the mapping and return the splitted input)
 */
interface SplitOptions<T> {
  delimiter?: string;
  trim: boolean;
  mapper?: ((e: string, i: number, a: string[]) => T) | false;
}

export const splitLines = <T>(input: string, options: SplitOptions<T> = { trim: true }) => {
  let resultLines = input.split(options?.delimiter ?? '\n')
  if (options?.trim) {
    const trimmedLines = resultLines.map((line) => line.trim())
    const filteredLines = trimmedLines.filter(Boolean)
    resultLines = filteredLines
  }
  const mapper = options?.mapper
  return mapper === false ? resultLines : resultLines.map((...args) => mapper?.(...args) ?? args[0])
}

export const splitIntoChunks = (array: Array<any>, chunkSize: number) => {
  const chunks = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}
