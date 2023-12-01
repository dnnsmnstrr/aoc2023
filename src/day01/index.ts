import run from "aocrunner"
import { add, splitLines } from "../utils/index.js"

const parseInput = (rawInput) => splitLines(rawInput)

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const numbers = input.map((line: string) => {
    const digits = line.match(/\d/g)
    const digitCount = (digits || []).length
    const firstDigit = digits[0]
    const lastDigit = digits[digitCount - 1]
    let numberString = firstDigit + lastDigit
    return parseInt(numberString)
  })

  const result = add(...numbers)

  return String(result)
}

const part2 = (rawInput) => {
  const numberStrings = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  const input = parseInput(rawInput)
  const numbers = input.map((line: string) => {
    let wordsToNumbers = line
    numberStrings.forEach((numberString, index) => {
      const numberValue = index + 1
      const replacement = `${numberString.slice(0, 1)}${numberValue}${numberString.slice(-1)}` // keep first and last letters that could be part of another number
      wordsToNumbers = wordsToNumbers.replaceAll(numberString, replacement)
    })
    const digits = wordsToNumbers.match(/\d/g)
    const digitCount = (digits || []).length
    const firstDigit = digits[0]
    const lastDigit = digits[digitCount - 1]
    let numberString = firstDigit + lastDigit
    return parseInt(numberString)
  })

  const result = add(...numbers)
  return String(result)
}

const exampleInput = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: '142',
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          two1nine
          eightwothree
          abcone2threexyz
          xtwone3four
          4nineeightseven2
          zoneight234
          7pqrstsixteen
        `,
        expected: '281',
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