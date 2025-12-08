import { readFile } from "./lib/fileUtils.js";
import util from "node:util";

let star1 = 0;
let star2 = 0;

let testCase: string | undefined;
// testCase = `
// .......S.......
// ...............
// .......^.......
// ...............
// ......^.^......
// ...............
// .....^.^.^.....
// ...............
// ....^.^...^....
// ...............
// ...^.^...^.^...
// ...............
// ..^...^.....^..
// ...............
// .^.^.^.^.^...^.
// ...............
// `;

let input = await readFile("puzzles/07-2025.txt", testCase);

function printMatrix(m: string[][]): void {
  for (let l = 0; l < m.length; l++) {
    console.log(JSON.stringify(m[l]));
  }
}

let matrix: string[][] = [];
input.forEach((paperRollRow) => {
  for (const i of paperRollRow.trim().split("\n")) {
    const l: string[] = [];
    for (const s of i) {
      l.push(s);
    }
    matrix.push(l);
  }
});

let s_row = -1;
let s_col = -1;
for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[row].length; col++) {
    if (matrix[row][col] == "S") {
      s_row = row;
      s_col = col;
    }
  }
}

let beams = new Map<string, { row: number; col: number }>();
beams.set(`${s_row}-${s_col}`, { row: s_row, col: s_col });

let steps = 1;
let foundSplitters = new Set<string>();
while (beams.size > 0) {
  // console.log(`                                       step ${steps} splits ${star1}`);
  let newBeams = new Map<
    string,
    {
      row: number;
      col: number;
    }
  >();

  // console.log(`*************** start new foreach`, beams);
  beams.forEach((beam) => {
    // console.log(`////////// current beam`, beam);
    let foundSplitter = false;
    let b_row = beam.row;
    let b_col = beam.col;
    while (!foundSplitter) {
      // console.log(`no splitter found yet for ${b_row + 1} ${b_col}`);
      // console.log(`row ${beam.row}, row length ${matrix.length - 1}, col ${beam.col}, col length ${matrix[beam.row].length - 1}`);
      if (b_row >= 0 && b_row < matrix.length - 1 && b_col >= 0 && b_col < matrix[b_row].length - 1) {
        if (matrix[b_row + 1][b_col] == ".") {
          // console.log(`found dot at ${beam.row + 1} ${beam.col} NO SPLIT`);
          b_row += 1;
        } else if (matrix[b_row + 1][b_col] == "^") {
          // console.log(`splitter found at ${b_row + 1} ${b_col}`);
          newBeams.set(`${b_row + 1}-${b_col - 1}`, { row: b_row + 1, col: b_col - 1 });
          newBeams.set(`${b_row + 1}-${b_col + 1}`, { row: b_row + 1, col: b_col + 1 });
          // console.log(`delete ${beam.row} ${beam.col}`);
          newBeams.delete(`${beam.row}-${beam.col}`);
          foundSplitter = true;
          foundSplitters.add(`${b_row + 1}-${b_col}`);
          star1 += 1;
          // console.log(`                                                                           SPLIT ------- ${star1}`);
        }
      } else {
        // console.log(`reached end of map ${b_row} ${b_col}`);
        foundSplitter = true;
      }
    }
  });
  beams = newBeams;
  steps += 1;
}

star1 = foundSplitters.size;

console.log(`star1: ${star1}\nstar2: ${star2}`);
