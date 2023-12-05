import run from "aocrunner"
import { sorting, splitIntoChunks, splitLines } from "../utils/index.js"

const part1 = (rawInput) => {
  const input = splitLines(rawInput, { delimiter: '\n\n'})
  const seeds = input[0].split(': ')[1].split(' ').reduce((seedNumbers, potentialSeed) => {
    if (potentialSeed !== '') {
      seedNumbers.push(Number(potentialSeed))
    }
    return seedNumbers
  }, [])

  const almanac = input.slice(1).map(rawMap => {
    const mapLines = splitLines(rawMap)
    const name = mapLines[0].replace(' map:', '')
    const [source, target] = name.split('-to-')
    const ranges = mapLines.slice(1).map(line => line.split(/[ ]+/).map(Number))
    return {name, source, target, ranges}
  })
  const locationNumbers = seeds.map(seed => {
    const steps = [seed]
    almanac.forEach(map => {
      let foundMatchingRange = false
      map.ranges.forEach(range => {
        const lastStep = steps[steps.length - 1]
        const [destination, source, length] = range
        const difference = source - destination
        const isWithinRange = lastStep >= source && lastStep <= source + length
        if (isWithinRange && !foundMatchingRange) {
          steps.push(lastStep - difference)
          foundMatchingRange = true
        }
      })
    })
    return steps[steps.length - 1]
  })
  const result = locationNumbers.sort(sorting.ascending)[0]
  return String(result)
}

const part2 = (rawInput) => {
  const input = splitLines(rawInput, { delimiter: '\n\n' })
  const seedRanges = input[0]
    .split(': ')[1]
    .split(' ')
    .reduce((seedNumbers, potentialSeed) => {
      if (potentialSeed !== '') {
        seedNumbers.push(Number(potentialSeed))
      }
      return seedNumbers
    }, [])
  const seedRangePairs = splitIntoChunks(seedRanges, 2)
  const almanac = input.slice(1).map((rawMap) => {
    const mapLines = splitLines(rawMap)
    const name = mapLines[0].replace(' map:', '')
    const [source, target] = name.split('-to-')
    const ranges = mapLines.slice(1).map((line) => line.split(/[ ]+/).map(Number))
    return { name, source, target, ranges }
  })

  let lowestLocationNumber = 0
  seedRangePairs.forEach((seedRange, index) => {
    const [start, length] = seedRange
    console.log('checking range of ', length, ' seeds, starting at ', start)
    console.log(seedRangePairs.length - index, ' pairs to go')
    for (let currentSeed = start; currentSeed < start + length - 1; currentSeed++) {
        let lastStep = currentSeed
        almanac.forEach((map) => {
          let foundMatchingRange = false
          map.ranges.forEach((range) => {
            const [destination, source, length] = range
            const difference = source - destination
            const isWithinRange = lastStep >= source && lastStep <= source + length
            if (isWithinRange && !foundMatchingRange) {
              lastStep = lastStep - difference
              foundMatchingRange = true
            }
          })
        })
        if (!lowestLocationNumber || lastStep < lowestLocationNumber) {
          lowestLocationNumber = lastStep
        }
    }
  })

  return String(lowestLocationNumber)
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
        expected: "46",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})