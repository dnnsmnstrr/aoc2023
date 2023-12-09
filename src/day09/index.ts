import run from "aocrunner"
import { add, splitLines } from "../utils/index.js"

function mapper(line: string) {
  return line.split(' ').map(Number)
}

function getDifferences(history: number[]) {
  const differences = history.reduce<number[]>((differenceList, currentNumber, currentIndex) => {
    if (currentIndex === 0) {
      return differenceList
    }
    differenceList.push(currentNumber - history[currentIndex - 1])
    return differenceList
  }, [])
  return differences
}

type DifferenceLevels = number[][]
function predictNextHistoryValue(differenceLevels: DifferenceLevels) {
  let previousLastValue = 0
  for (let level = differenceLevels.length - 1; level >= 0; level--) {
    const currentLevel = differenceLevels[level];
    const lastValue = currentLevel.slice(-1)[0]
    previousLastValue += lastValue
  }
  return previousLastValue
}

const part1 = (rawInput) => {
  const input = splitLines(rawInput, { mapper })
  const predictedValues = []
  input.forEach(history => {
    let differenceLevels: DifferenceLevels = [history]
    let currentLevel = 0
    while (differenceLevels[currentLevel].some(number => number !== 0)) {
      const nextDifferences = getDifferences(differenceLevels[currentLevel])
      currentLevel += 1
      differenceLevels[currentLevel] = nextDifferences
    }
    const predictedValue = predictNextHistoryValue(differenceLevels)
    predictedValues.push(predictedValue)
  })
  const result = add(...predictedValues)
  return String(result)
}

function predictPreviousHistoryValue(differenceLevels: DifferenceLevels) {
  let previousFirstValue = 0
  for (let level = differenceLevels.length - 1; level >= 0; level--) {
    const currentLevel = differenceLevels[level];
    const firstValue = currentLevel[0]
    previousFirstValue = firstValue - previousFirstValue
  }
  return previousFirstValue
}

const part2 = (rawInput) => {
  const input = splitLines(rawInput, { mapper })
  const predictedValues = []
  input.forEach(history => {
    let differenceLevels: DifferenceLevels = [history]
    let currentLevel = 0
    while (differenceLevels[currentLevel].some(number => number !== 0)) {
      const nextDifferences = getDifferences(differenceLevels[currentLevel])
      currentLevel += 1
      differenceLevels[currentLevel] = nextDifferences
    }
    const predictedValue = predictPreviousHistoryValue(differenceLevels)
    predictedValues.push(predictedValue)
  })
  const result = add(...predictedValues)
  return String(result)
}

const exampleInput = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "114",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: "2",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})