import run from "aocrunner"
import { splitLines } from "../utils/index.js"

const parseInput = (rawInput) => splitLines(rawInput)

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const result = ''
  return String(result)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  const result = ''
  return String(result)
}

const exampleInput = `

`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "",
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