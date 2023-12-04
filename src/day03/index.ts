import run from "aocrunner"
import { add, isNumeric, splitLines } from "../utils/index.js"

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
    const nextSymbol = chars[index + 1] && !isNumeric(chars[index + 1]) && chars[index + 1] !== '.'
    if (isNumber) {
      currentNumberString += char
      if (previousSymbol || nextSymbol || hasAdjacentSymbol) {
        isPartNumber = true
      }
    } else if (char !== '.') {
      previousSymbol = true
    }
    if (char === '.' || nextSymbol || index === chars.length - 1) {
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

  const result = add(...input.flat())
  return String(result)
}

function checkForGear(index: number, lines: Array<string>) {
  const relevantSlices = lines.map((line) => (line ? line.slice(index ? index - 1 : index, index + 2) : ''))
  return relevantSlices.some((line) => line.split('').some((char) => char === '*'))
}

let previousGear = 0
let couldBeGear = false
let lastLineHadRatio = false
function checkForGears(line: string, lineIndex: number, lines: Array<string>): number[] {
  const partNumbers: Array<number> = []

  let currentNumberString = ''
  let isGearRatio = false
  line.split('').forEach((char, index, chars) => {

    const isNumber = isNumeric(char)

    const hasAdjacentGearSymbol = checkForGear(index, getSurroundingLines(lines, lineIndex))
    const nextSymbol = chars[index + 1] && !isNumeric(chars[index + 1])
    if (isNumber) {
      currentNumberString += char
      if (hasAdjacentGearSymbol) {
        if (previousGear && !lastLineHadRatio) {
          isGearRatio = true
        } else {
          couldBeGear = true
        }
      }
    }
    const endOfLine = index === chars.length - 1
    if (nextSymbol || endOfLine) {
      if (isGearRatio) {
        partNumbers.push(parseInt(currentNumberString), previousGear)
        isGearRatio = false
        couldBeGear = false
        previousGear = 0
      }
      if (!previousGear && couldBeGear) {
        previousGear = parseInt(currentNumberString)
        console.log('previousGear', previousGear)

      }
      currentNumberString = ''
    }
    // console.log('previousGear', previousGear)
    console.log('char', char, couldBeGear, isGearRatio, previousGear)

  })
  couldBeGear = false
  return partNumbers
}
const part2 = (rawInput) => {
  const input = splitLines<Array<number>>(rawInput, { mapper: checkForGears })
  console.log(input)
  // const result = input.reduce((sum, gearRatio) => {
  //   return sum + (gearRatio)
  // }, 0)
  const result = add(...input.flat())
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
        expected: '4361',
      },
      {
        input: `
    12.......*..
    +.........34
    .......-12..
    ..78........
    ..*....60...
    78..........
    .......23...
    ....90*12...
    ............
    2.2......12.
    .*.........*
    1.1.......56`,
        expected: `413`,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: exampleInput,
      //   expected: '467835',
      // },
      {
        input: `
    12.......*..
    +.........34
    .......-12..
    ..78........
    ..*....60...
    78..........
    .......23...
    ....90*12...
    ............
    2.2......12.
    .*.........*
    1.1.......56`,
        expected: `6756`,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})