import run from "aocrunner"
import { splitLines } from "../utils/index.js"

const cardLabels = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
type Card = typeof cardLabels[number]
const handTypes = ['fiveOfAKind', 'fourOfAKind', 'fullHouse', 'threeOfAKind', 'twoPair', 'onePair', 'highCard'] as const
type HandType = typeof handTypes[number]
type Hand = {
  id: string
  cards: Card[]
  bid: number
}

function getHandType(cards: Card[]): HandType {
  const cardCounts: Record<string, number> = {}
  cards.forEach(card => {
    if (cardCounts[card]) {
      cardCounts[card] = cardCounts[card] + 1
    } else {
      cardCounts[card] = 1
    }
  })
  const sortedCounts = Object.entries(cardCounts).sort((a, b) => b[1] - a[1])
  if (sortedCounts.length === 1) {
    return 'fiveOfAKind'
  }

}
function mapper(line: string): Hand {
  const [hand, bid] = line.split(' ')
  const cards = hand.split('')
  const bidNumber = Number(bid)
  const type: HandType = getHandType(cards)
  return { id: hand, cards, bid: bidNumber}
}

const part1 = (rawInput) => {
  const input = splitLines(rawInput, { mapper })

  const result = ''
  return String(result)
}

const part2 = (rawInput) => {
  const input = splitLines(rawInput, { mapper })

  const result = ''
  return String(result)
}

const exampleInput = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "6440",
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