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
  type: HandType
}

function getHandType(cards: Card[], wildcard = ''): { type: HandType, cardCounts: Record<Card, number>, sortedCounts: Array<[Card, number]> } {
  const cardCounts: Record<string, number> = {}
  cards.forEach(card => {
    if (cardCounts[card]) {
      cardCounts[card] = cardCounts[card] + 1
    } else {
      cardCounts[card] = 1
    }
  })
  let sortedCounts = Object.entries(cardCounts).sort((a, b) => b[1] - a[1])
  const wildcardIndex = sortedCounts.findIndex(cardCount => cardCount[0] === wildcard)
  const wildcardCount = wildcardIndex >= 0 ? sortedCounts[wildcardIndex][1] : 0

  if (wildcardCount) {
    if (sortedCounts.length === 2) {
      if (wildcardIndex === 0) {
        sortedCounts = [[sortedCounts[1][0], sortedCounts[1][1] + wildcardCount]]
      } else {
        sortedCounts = [[sortedCounts[0][0], sortedCounts[0][1] + wildcardCount]]
      }
    } else if (sortedCounts.length > 2) {
      if (wildcardIndex === 0) {
        sortedCounts = [[sortedCounts[1][0], sortedCounts[1][1] + wildcardCount], ...sortedCounts.slice(2)]
      } else {
        sortedCounts[0] = [sortedCounts[0][0], sortedCounts[0][1] + wildcardCount]
        sortedCounts.splice(wildcardIndex, 1)
      }
    }
  }
  let type: HandType = 'highCard'
  if (sortedCounts.length === 1) {
    type = 'fiveOfAKind'
  }
  if (sortedCounts.length === 2 && sortedCounts[0][1] === 4) {
    type = 'fourOfAKind'
  } else if (sortedCounts.length === 2) {
    type = 'fullHouse'
  }
  if (sortedCounts.length === 3 && sortedCounts[0][1] === 3) {
    type = 'threeOfAKind'
  }
  if (sortedCounts.length === 3 && sortedCounts[0][1] === 2 && sortedCounts[1][1] === 2) {
    type = 'twoPair'
  }
  if (sortedCounts.length === 4 && sortedCounts[0][1] === 2) {
    type = 'onePair'
  }

  return { type, cardCounts, sortedCounts }
}

function mapper(line: string): Hand {
  const [hand, bid] = line.split(' ')
  const cards = hand.split('')
  const bidNumber = Number(bid)
  const { type } = getHandType(cards)
  return { id: hand, cards, bid: bidNumber, type }
}

const part1 = (rawInput) => {
  const input = splitLines(rawInput, { mapper })
  const sortedHands = input.sort((leftHand, rightHand) => {
    const leftHandValue = handTypes.indexOf(leftHand.type)
    const rightHandValue = handTypes.indexOf(rightHand.type)
    if (leftHandValue > rightHandValue) {
      return -1
    }
    if (rightHandValue > leftHandValue) {
      return 1
    }
    for (let index = 0; index < 5; index++) {
      const leftCardValue = cardLabels.indexOf(leftHand.cards[index])
      const rightCardValue = cardLabels.indexOf(rightHand.cards[index])
      if (leftCardValue > rightCardValue) {
        return -1
      }
      if (rightCardValue > leftCardValue) {
        return 1
      }
    }
  })
  const result = sortedHands.reduce((totalWinnings, hand, index) => {
    const rank = index + 1
    return totalWinnings + rank * hand.bid
  }, 0)
  return String(result)
}

function mapperWithWildcard(line: string): Hand {
  const [hand, bid] = line.split(' ')
  const cards = hand.split('')
  const bidNumber = Number(bid)
  const { type } = getHandType(cards, 'J')
  return { id: hand, cards, bid: bidNumber, type }
}
const part2 = (rawInput) => {
  const input = splitLines(rawInput, { mapper: mapperWithWildcard })
  const sortedHands = input.sort((leftHand, rightHand) => {
  const leftHandValue = handTypes.indexOf(leftHand.type)
  const rightHandValue = handTypes.indexOf(rightHand.type)
  if (leftHandValue > rightHandValue) {
    return -1
  }
  if (rightHandValue > leftHandValue) {
    return 1
  }
  for (let index = 0; index < 5; index++) {
    const leftCardValue = leftHand.cards[index] === 'J' ? cardLabels.length : cardLabels.indexOf(leftHand.cards[index])
    const rightCardValue = rightHand.cards[index] === 'J' ? cardLabels.length : cardLabels.indexOf(rightHand.cards[index])
    if (leftCardValue > rightCardValue) {
      return -1
    }
    if (rightCardValue > leftCardValue) {
      return 1
    }
  }
})

const result = sortedHands.reduce((totalWinnings, hand, index) => {
  const rank = index + 1
  return totalWinnings + rank * hand.bid
}, 0)
  return String(result)
}

const exampleInput = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`

// https://www.reddit.com/r/adventofcode/comments/18cr4xr/2023_day_7_better_example_input_not_a_spoiler/
const betterExample = `
2345A 1
Q2KJJ 13
Q2Q2Q 19
T3T3J 17
T3Q33 11
2345J 3
J345A 2
32T3K 5
T55J5 29
KK677 7
KTJJT 34
QQQJA 31
JJJJJ 37
JAAAA 43
AAAAJ 59
AAAAA 61
2AAAA 23
2JJJJ 53
JJJJ2 41
`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: '6440',
      },
      {
        input: betterExample,
        expected: '6592',
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: '5905',
      },
      {
        input: betterExample,
        expected: `6839`,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})