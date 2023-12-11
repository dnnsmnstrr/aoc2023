import run from "aocrunner"
import { makeMatrix, splitLines } from "../utils/index.js"

function containsGalaxy(line: string[]) {
  return line.some(field => field === '#')
}

const part1 = (rawInput) => {
  const input = splitLines(rawInput, { mapper: makeMatrix() })
  for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    const row = input[rowIndex]
    if (!containsGalaxy(row)) {
      input.splice(rowIndex,0, [].fill('.', 0, row.length))
      rowIndex++
    }
  }
  // console.log(input.length)

  for (let columnIndex = 0; columnIndex < input[0].length; columnIndex++) {
    const column = []
    for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
      const columnitem = input[rowIndex][columnIndex]
      if (columnitem !== '#') {
        column.push(columnitem)
      }
    }
    if (column.length === input.length) {
      input.forEach(row => row.splice(columnIndex, 0, '.'))
      columnIndex++
    }

  }
  // console.log(input[0].length)

  const result = ''
  return String(result)
}

const part2 = (rawInput) => {
  const input = splitLines(rawInput, { mapper: makeMatrix() })

  const result = ''
  return String(result)
}

const exampleInput = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "374",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})