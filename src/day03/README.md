# 🎄 Advent of Code 2023 - day 3 🎄

## Info

Task description: [link](https://adventofcode.com/2023/day/3)

## Notes

Accidentally almost deleted everything I wrote by committing without being on a branch. Had to use `git reflog` to find my commit and merge it into my main branch.
[2023 Day 3] Another sample grid to use

Given that it looks like 2023 is Advent of Parsing, here's some test data for Day 3 which checks some common parsing errors I've seen other people raise:

    12.......*..
    +.........34
    .......-12..
    ..78........
    ..*....60...
    78..........
    .......23...
    ....90*12...
    ............
    2.2......12.
    .*.........*
    1.1.......56

My code gives these values (please correct me if it turns out these are wrong!):

    Part 1: 413
    Part 2: 6756

Test cases covered:

- Number with no surrounding symbol
- Number with symbol before and after on same line
- Number with symbol vertically above and below
- Number with diagonal symbol in all 4 possible diagonals
- Possible gear with 1, 2, 3 and 4 surrounding numbers
- Gear with different numbers
- Gear with same numbers
- Non gear with 2 unique surrounding numbers
- Number at beginning/end of line
- Number at beginning/end of grid


EDIT1:

Here's an updated grid that covers a few more test cases:

    12.......*..
    +.........34
    .......-12..
    ..78........
    ..*....60...
    78.........9
    .5.....23..$
    8...90*12...
    ............
    2.2......12.
    .*.........*
    1.1..503+.56

- Numbers need to have a symbol adjacent to be a valid part, not another number
- Single digit numbers at the end of a row can be valid parts
- An odd Javascript parsing error (co /u/anopse )

The values are now

    Part 1: 925
    Part 2: 6756

Direct links to other interesting test cases in this thread:
- /u/IsatisCrucifer 's test case for repeated digits in the same line ( https://www.reddit.com/r/adventofcode/comments/189q9wv/comment/kbt0vh8/?utm_source=share&utm_medium=web2x&context=3 )

- /u/musifter 's test case where numbers have more than one symbol attached ( https://www.reddit.com/r/adventofcode/comments/189q9wv/comment/kbsrno0/?utm_source=share&utm_medium=web2x&context=3 )