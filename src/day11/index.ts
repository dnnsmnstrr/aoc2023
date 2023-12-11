import run from 'aocrunner'
import { makeMatrix, splitLines } from '../utils/index.js'

function containsGalaxy(line: string[]) {
  return line.some((field) => field === '#')
}

const part1 = (rawInput) => {
  const input = splitLines(rawInput, { mapper: makeMatrix() })
  for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    const row = input[rowIndex]
    if (!containsGalaxy(row)) {
      input.splice(rowIndex, 0, [].fill('.', 0, row.length))
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
      input.forEach((row) => row.splice(columnIndex, 0, '.'))
      columnIndex++
    }
  }
  // console.log(input[0].length)

  const galaxyPositions = []
  for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < input[rowIndex].length; columnIndex++) {
      if (input[rowIndex][columnIndex] === '#') {
        galaxyPositions.push({ row: rowIndex, column: columnIndex })
      }
    }
  }
  let totalDistance = 0
  for (let i = 0; i < galaxyPositions.length - 1; i++) {
    for (let j = i + 1; j < galaxyPositions.length; j++) {
      const distance =
        Math.abs(galaxyPositions[i].row - galaxyPositions[j].row) +
        Math.abs(galaxyPositions[i].column - galaxyPositions[j].column)
      totalDistance += distance
    }
  }
  const result = totalDistance
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
        expected: '374',
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: '',
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
