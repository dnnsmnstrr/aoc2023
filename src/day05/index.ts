import run from "aocrunner"
import { sorting, splitLines } from "../utils/index.js"

function mapper(line: string) {
  return line
}

const part1 = (rawInput) => {
  const input = splitLines(rawInput, { delimiter: '\n\n'})
  const seeds = input[0].split(': ')[1].split(' ').reduce((seedNumbers, potentialSeed) => {
    if (potentialSeed !== '') {
      seedNumbers.push(Number(potentialSeed))
    }
    return seedNumbers
  }, [])
  // console.log(seeds)

  const almanac = input.slice(1).map(rawMap => {
    const mapLines = splitLines(rawMap)
    const name = mapLines[0].replace(' map:', '')
    const [source, target] = name.split('-to-')
    const ranges = mapLines.slice(1).map(line => line.split(/[ ]+/).map(Number))
    console.log(ranges)
    return {name, source, target, ranges}
  })
  // console.log(almanac)
  const locationNumbers = seeds.map(seed => {
    console.log('processing seed ' + seed)
    const steps = [seed]
    almanac.forEach(map => {
      map.ranges.forEach(range => {
        const lastStep = steps[steps.length - 1]
        const [destination, source, length] = range
        const difference = source - destination
        const isWithinRange = lastStep >= source && lastStep <= source + length
        if (isWithinRange) {
          steps.push(lastStep - difference)
        }
      })
    })
    console.log('steps:', steps)
    return steps[steps.length - 1]
  })
  // const sortedLocationNumbers = locationNumbers.sort(sorting.ascending)[1]
  const result = locationNumbers.sort(sorting.ascending)[1]
  return String(result)
}

const part2 = (rawInput) => {
  const input = splitLines(rawInput, { mapper })

  const result = ''
  return String(result)
}

const exampleInput = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "35",
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