import run from "aocrunner"
import { splitLines } from "../utils/index.js"

type ScratchCard = {
  winningNumbers: Array<string>
  myNumbers: Array<string>
  myWinningNumberCount: number
  value: number
  multiplier?: number
}

function parseCard(line: string) {
  const cardNumbers = line.split(': ')[1]
  const [winningNumbers, myNumbers] = cardNumbers.split(' | ').map(numbers => numbers.split(' ').filter(number => number !== ''))
  const myWinningNumberCount = winningNumbers.filter(winningNumber => myNumbers.includes(winningNumber)).length
  const value = myWinningNumberCount ? Math.pow(2, myWinningNumberCount - 1) : 0
  return { winningNumbers, myNumbers, myWinningNumberCount, value, multiplier: 1 }
}
const parseInput = (rawInput) => splitLines<ScratchCard>(rawInput, { mapper: parseCard})

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const result = input.reduce<number>((acc, card) => acc + card.value, 0)
  return String(result)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const inputWithMultipliers = [...input]
  for (let index = 0; index < inputWithMultipliers.length; index++) {
    const card = inputWithMultipliers[index];
    for (let cardMultipliers = 1; cardMultipliers <= (card.myWinningNumberCount); cardMultipliers++) {
      const currentMultiplier = inputWithMultipliers[index + cardMultipliers]?.multiplier || 1
      if (inputWithMultipliers[index + cardMultipliers]) {
        inputWithMultipliers[index + cardMultipliers].multiplier = currentMultiplier + (1 * card.multiplier)
      }
    }
  }
  const result = input.reduce<number>((acc, card) => acc + card.multiplier, 0)
  return String(result)
}

const exampleInput = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: '13',
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: '30',
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})