import { readFile } from "./lib/fileUtils.js";

let star1 = 0;
let star2 = 0;

let testCase: string | undefined;
testCase = `
0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2
`;

let input = await readFile("puzzles/11-2025.txt", testCase);

console.log(`star1: ${star1}\nstar2: ${star2}`);
