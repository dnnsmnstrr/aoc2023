import run from "aocrunner"
import { makeMatrix, splitLines } from "../utils/index.js"

const compass = ['n', 'e', 's', 'w'] as const
type Direction = typeof compass[number]

const pipes = ['F', '7', '|', 'J', '-', 'L', 'S'] as const
type Pipe = typeof pipes[number]
type Tile = Pipe | '.' | 'S'
type Coordinate = [number, number] // [x, y]

const validPipesForDirection: Record<Direction, Pipe[]> = {
  n: ['F', '7', '|'],
  e: ['J', '-', '7'],
  s: ['|', 'J', 'L'],
  w: ['-', 'L', 'F']
}
const validDirectionsForPipe: Record<Pipe, Direction[]> = {
  '|': ['n', 's'],
  '-': ['e', 'w'],
  L: ['n', 'e'],
  7: ['w', 's'],
  F: ['s', 'e'],
  J: ['n', 'w'],
  S: [...compass]
}

function checkPipesAroundPosition(map: Tile[][], position: Coordinate, previousPosition?: Coordinate) {
  const [posX, posY] = position
  const [prevX, prevY] = previousPosition || position
  const currentPipe = map[posY][posX]

  const north = posY > 0 && prevY !== posY - 1 ? map[posY-1][posX] : null
  const east = posX < map[posY].length - 1 && prevX !== posX + 1 ? map[posY][posX+1] : null
  const south = posY < map.length - 1 && prevY !== posY + 1 ? map[posY+1][posX] : null
  const west = posX > 0 && prevX !== posX - 1 ? map[posY][posX-1] : null
  const possibleDirections = [north, east, south, west].map((direction, needle) => {
    // ensure direction is allowed for current pipe
    if(validDirectionsForPipe[currentPipe].includes(compass[needle])) return direction
    return null
  })
  const nextValidDirection = possibleDirections.findIndex((direction, index) => {
    return direction && validPipesForDirection[compass[index]] && validPipesForDirection[compass[index]].includes(direction as Pipe)
  })
  return compass[nextValidDirection]
}

function updatePosition(position: Coordinate, direction: Direction): Coordinate {
  let newPosition: Coordinate = [...position]
  switch (direction) {
    case 'n':
      newPosition[1] -= 1
      break
    case 'e':
      newPosition[0] += 1
      break
    case 's':
      newPosition[1] += 1
      break
    case 'w':
      newPosition[0] -= 1
      break
  }
  return newPosition
}

const part1 = (rawInput) => {
  const input = splitLines(rawInput, { mapper: makeMatrix() }) as Tile[][]
  let startX = 0
  const startY = input.findIndex(line => {
    const foundIndex = line.findIndex(char => char === 'S')
    if (foundIndex >= 0 ) {
      startX = foundIndex
      return true
    }
    return false
  })

  const startPosition: Coordinate = [startX, startY]
  let previousPosition: Coordinate = null
  let currentPosition: Coordinate = [...startPosition]
  let stepCount = 0

  do {
    const nextValidDirection = checkPipesAroundPosition(input, currentPosition, previousPosition)
    console.log(nextValidDirection);
    if (!nextValidDirection) {
      console.log('reached end')
      break
    }
    previousPosition = [...currentPosition]
    currentPosition = updatePosition(currentPosition, nextValidDirection)
    console.log(currentPosition)

    stepCount += 1
  } while ((startPosition[0] !== currentPosition[0] || startPosition[1] !== currentPosition[1]))

  const result = (stepCount + 1) / 2
  return String(result)
}

const part2 = (rawInput) => {
  const input = splitLines(rawInput, { mapper: makeMatrix() })

  const result = ''
  return String(result)
}

const exampleInput = `
7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ
`

run({
  part1: {
    tests: [
      {
        input: `
-L|F7
7S-7|
L|7||
-L-J|
L|-JF`,
        expected: `4`
      },
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
        input: `
...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........
        `,
        expected: "4",
      },
      {
        input: `
.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`,
        expected: `10`
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})