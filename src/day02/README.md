# 🎄 Advent of Code 2023 - day 2 🎄

## Info

Task description: [link](https://adventofcode.com/2023/day/2)

## Notes

My initial understanding of the task was to calculate the total sum of cube colors drawn per game and apply that value to check if the game is possible. Unfortunately, that assumption did not cause the example test to fail, so I spent quite a bit of time trying to understand what was wrong with my code before reading the description again and finally getting it. Just had to move the validation into the loop that went over each set.

Part two was pretty easy, just had to add the `updateMinCubes` and `calculatePower` functions, as well as extend the types to include the newly required information.
