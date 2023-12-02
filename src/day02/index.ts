import run from "aocrunner"
import { add, multiply, splitLines } from "../utils/index.js"

const parseInput = (rawInput) => splitLines(rawInput)

const cubeColors = ['red', 'green', 'blue'] as const;
type CubeColor = typeof cubeColors[number]
type CubeCount = Record<CubeColor, number>
type Game = {
  id: number
  totalColors: CubeCount,
  setColors: CubeCount[]
  isPossible: boolean
  minCubes?: CubeCount
  power?: number
}
const emptyBag: CubeCount = { red: 0, green: 0, blue: 0 }

const availableCubes: CubeCount = {
  red: 12,
  green: 13,
  blue: 14
}

function findColor(cube:string) {
  return cubeColors.find(color => cube.includes(color))
}

function parseColors(set: string): CubeCount {
  const cubes = set.split(', ')
  const cubeCount = { ...emptyBag }
  cubes.forEach(cube => {
    const cubeColor = findColor(cube)
    const currentCount = parseInt(cube.replace(' ' + cubeColor, ''))
    cubeCount[cubeColor] += currentCount
  })
  return cubeCount
}

function fillBag(bag: CubeCount, cubes: CubeCount): CubeCount {
  const filledBag = { ...emptyBag }
  Object.keys(bag).forEach(key => {
    filledBag[key] = bag[key] + (cubes[key] || 0);
  })
  return filledBag
}

function updateMinCubes(minCubes: CubeCount, newCubes: CubeCount): CubeCount {
  const updatedMinCubes = { ...minCubes }
  Object.keys(minCubes).forEach(key => {
    if (minCubes[key] < newCubes[key]) {
      updatedMinCubes[key] = newCubes[key]
    }
  })
  return updatedMinCubes
}

function verifyGame(record: CubeCount, rules: CubeCount) {
  return Object.keys(record).every((key) => {
    if (record[key] > rules[key]) {
      return false
    }
    return true
  })
}

function calculatePower(cubeCount: CubeCount) {
  return multiply(...Object.values(cubeCount))
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const games: Game[] = input.reduce<Game[]>((acc, current: string) => {
    const [game, record] = current.split(': ')
    const id = parseInt(game.replace('Game ', ''))
    const sets = record.split('; ')
    const setColors = []
    let isPossible = true
    const totalColors: CubeCount = sets.reduce<CubeCount>((bag, currentSet): CubeCount => {
      const newCubes = parseColors(currentSet)
      if (!verifyGame(newCubes, availableCubes)) {
        isPossible = false
      }
      setColors.push(newCubes)
      return fillBag(bag, newCubes)
    }, emptyBag)
    acc.push({ id, totalColors, setColors, isPossible })
    return acc
  }, [])
  const possibleGames = games.filter(game => game.isPossible)
  const possibleGameIdSum = add(...possibleGames.map(game => game.id))
  return String(possibleGameIdSum)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const games: Game[] = input.reduce<Game[]>((acc, current: string) => {
    const [game, record] = current.split(': ')
    const id = parseInt(game.replace('Game ', ''))
    const sets = record.split('; ')
    const setColors = []
    let isPossible = true
    let minCubes = { ...emptyBag }
    const totalColors: CubeCount = sets.reduce<CubeCount>((bag, currentSet): CubeCount => {
      const newCubes = parseColors(currentSet)
      minCubes = updateMinCubes(minCubes, newCubes)
      if (!verifyGame(newCubes, availableCubes)) {
        isPossible = false
      }
      setColors.push(newCubes)
      return fillBag(bag, newCubes)
    }, emptyBag)
    const power = calculatePower(minCubes)
    acc.push({ id, totalColors, setColors, isPossible, minCubes, power })
    return acc
  }, [])

  const totalGamePowers = add(...games.map(game => game.power))
  return String(totalGamePowers)
}

const exampleInput = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "8",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: "2286",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})