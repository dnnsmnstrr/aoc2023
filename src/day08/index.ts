import run from "aocrunner"
import { splitLines } from "../utils/index.js"

function mapper(line: string) {
  const [node, connections] = line.split(' = ')
  const [L, R] = connections.replaceAll(/[()]/g, '').split(', ')
  return { node, L, R }
}

const part1 = (rawInput) => {
  const [instructions, mapLines] = splitLines(rawInput, { delimiter: '\n\n' })
  const maps = splitLines(mapLines, { mapper })
  const mapsById = maps.reduce((acc, map) => {
    acc[map.node] = map
    return acc
  }, {})
  console.log(instructions, mapsById)
  let currentNode = 'AAA'
  let stepCount = 0
  while (currentNode !== 'ZZZ') {
    for (const instruction of instructions) {
      currentNode = mapsById[currentNode][instruction]
      stepCount += 1
    }
  }
  // const result = ''
  return String(stepCount)
}

const gcd = (a: number, b: number) => {
  while (b > 0) [a, b] = [b, a % b]
  return a
}
const lcm = (a: number, b: number) => (a * b) / gcd(a, b)

const part2 = (rawInput) => {
  const [instructions, mapLines] = splitLines(rawInput, { delimiter: '\n\n' })
  const maps = splitLines(mapLines, { mapper })
  const startingNodeMaps = maps.filter((map) => map.node.endsWith('A'))
  const mapsById = maps.reduce((acc, map) => {
    acc[map.node] = map
    return acc
  }, {})

  let ghostPositions = startingNodeMaps.map((map) => map.node)

  const steps = ghostPositions.map(position => {
    let stepCount = 0
    let currentNode = position
    while (!currentNode.endsWith('Z')) {
      for (const instruction of instructions) {
        currentNode = mapsById[currentNode][instruction]
        stepCount += 1
      }
    }
    // for (const instruction of instructions) {
    //   for (let pos = 0; pos < ghostPositions.length; pos++) {
    //     const currentPos = ghostPositions[pos];
    //     console.log('currentPos', currentPos, 'step', stepCount)

    //     // if (!currentPos.endsWith('Z')) {
    //       ghostPositions[pos] = mapsById[currentPos][instruction]
    //     // }
    //   }
    //   stepCount += 1
    // }
    return stepCount
  })

  const result = steps.reduce((n, x) => lcm(x, n), 1)
  return String(result)
}

const exampleInput = `
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`

const secondExample = `
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`
run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: '2',
      },
      {
        input: secondExample,
        expected: `6`,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
        `,
        expected: '6',
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})