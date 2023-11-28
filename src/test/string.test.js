import { expect, test } from 'vitest'
import { splitInHalf, isUpperCase } from "../utils/string"

test("Should split string in half", () => {
  expect(splitInHalf('ab')).toStrictEqual(['a', 'b'])
})

test("Should check if string is uppercase", () => {
  expect(isUpperCase('AB')).toBe(true)
  expect(isUpperCase('Ab')).toBe(false)
  expect(isUpperCase('aB')).toBe(false)
})