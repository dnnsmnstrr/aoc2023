import run from "aocrunner"
import { add, hasDuplicates, isNumeric, splitLines } from "../utils/index.js"

function checkForSymbol(index: number, lines: Array<string>) {
  const relevantSlices = lines.map(line => line ? line.slice(index ? index - 1 : index, index + 2) : '')
  return relevantSlices.some(line => line.split('').some(char => !isNumeric(char) && char !== '.'))
}

function getSurroundingLines(lines: Array<string>, lineIndex: number): Array<string> {
  const surroundingLines = []
  if (lines[lineIndex - 1]) {
    surroundingLines.push(lines[lineIndex - 1])
  }
  if (lines[lineIndex + 1]) {
    surroundingLines.push(lines[lineIndex + 1])
  }
  return surroundingLines
}

function checkLine(line: string, lineIndex: number, lines: Array<string>): number[] {
  const partNumbers: Array<number> = []

  let currentNumberString = ''
  let isPartNumber = false
  let previousSymbol = false
  line.split('').forEach((char, index, chars) => {
    const isNumber = isNumeric(char)

    const hasAdjacentSymbol = checkForSymbol(index, getSurroundingLines(lines, lineIndex))
    if (isNumber) {
      currentNumberString += char
      const nextSymbol = chars[index + 1] && !isNumeric(chars[index + 1]) && chars[index + 1] !== '.'
      if (previousSymbol || nextSymbol || hasAdjacentSymbol) {
        isPartNumber = true
      }
    } else if (char !== '.') {
      previousSymbol = true

    } else { // is period
      if (isPartNumber) {
        partNumbers.push(parseInt(currentNumberString))
      }
      currentNumberString = ''
      isPartNumber = false
      previousSymbol = false
    }
  })
  return partNumbers
}
const parseInput = (rawInput: string) => splitLines<Array<number>>(rawInput, { mapper: checkLine })

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const uniquePartNumbers = [...new Set<number>(input.flat())]
  console.log(hasDuplicates(uniquePartNumbers))
  const result = add(...uniquePartNumbers)
  return String(result)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  const result = ''
  return String(result)
}

const exampleInput = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "4361",
      },
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: "",
      },
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})