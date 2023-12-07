# 🎄 Advent of Code 2023 - day 6 🎄

## Info

Task description: [link](https://adventofcode.com/2023/day/6)

## Notes

This was such a nice puzzle. Really refreshing after the previous days, which felt way more difficult than usual for the beginning days.

Learned a way to make the return type of a function conditional in TypeScript while writing a function to extract all numbers from a line of text:

```typescript
export function extractNumbers<T extends boolean = true> (stringWithNumbers: string, parseToNumber?: T): Array<T extends true ? number : string> {
  let numbers: Array<string|number> = stringWithNumbers.match(/\d+/g) as Array<string>
  if (parseToNumber && numbers.length) {
    numbers = numbers.map(Number)
  }
  return numbers as Array<T extends true ? number : string>
}
```
