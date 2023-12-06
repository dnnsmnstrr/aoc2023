import run from "aocrunner"
import { extractNumbers, multiply, splitLines } from "../utils/index.js"

function mapper(line: string, index: number) {
  return extractNumbers(line)
}

function calculateWinningOptions(time: number, record: number) {
  const winningOptions = []
  for (let currentTime = 1; currentTime < time; currentTime++) {
    const resultingTime = currentTime * (time - currentTime)
    if (resultingTime > record) {
      winningOptions.push(resultingTime)
    }
  }
  return winningOptions
}
const part1 = (rawInput) => {
  const winningOptionsCount = []
  const [times, distances] = splitLines(rawInput, { mapper })
  for (let index = 0; index < times.length; index++) {
    const time = times[index];
    const distance = distances[index];
    const winningOptions = calculateWinningOptions(time, distance)
    winningOptionsCount.push(winningOptions.length)
  }
  const result = multiply(...winningOptionsCount)
  return String(result)
}

const part2 = (rawInput) => {
  const [time, distance] = splitLines(rawInput, { mapper: (line) => Number(line.split(':')[1].replaceAll(' ', ''))})
  const winningOptions = calculateWinningOptions(time, distance)
  const result = winningOptions.length
  return String(result)
}

const exampleInput = `
Time:      7  15   30
Distance:  9  40  200
`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "288",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: "71503",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})