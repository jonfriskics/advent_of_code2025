import { readFile } from "./lib/fileUtils.js";

let star1 = 0;
let star2 = 0;

let testCase: string | undefined;
testCase = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`;

let input = await readFile("puzzles/04-2025.txt", testCase);

function printMatrix(m: string[][]): void {
  for (let l = 0; l < m.length; l++) {
    console.log(m[l]);
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

const directions: [number, number][] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[row].length; col++) {
    let totalRolls = 0;
    if (matrix[row][col] == "@") {
      directions.forEach((direction) => {
        let row_to_check = row + direction[0];
        let col_to_check = col + direction[1];
        if (
          row_to_check >= 0 &&
          row_to_check < matrix.length &&
          col_to_check >= 0 &&
          col_to_check < matrix[row].length
        ) {
          if (matrix[row_to_check][col_to_check] == "@") {
            totalRolls += 1;
          }
        }
      });
      if (totalRolls < 4) {
        star1 += 1;
      }
    }
  }
}

let removedRolls = 999999999;

while (removedRolls > 0) {
  removedRolls = 0;
  let rows_to_cut_later = new Map<string, { row: number; col: number }>();
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      let totalRolls = 0;
      if (matrix[row][col] == "@") {
        directions.forEach((direction) => {
          let row_to_check = row + direction[0];
          let col_to_check = col + direction[1];
          if (
            row_to_check >= 0 &&
            row_to_check < matrix.length &&
            col_to_check >= 0 &&
            col_to_check < matrix[row].length
          ) {
            if (matrix[row_to_check][col_to_check] == "@") {
              totalRolls += 1;
            }
          }
        });
        if (totalRolls < 4) {
          let key = `${row},${col}`;
          rows_to_cut_later.set(key, { row: row, col: col });
          star2 += 1;
        }
      }
    }
  }
  for (let e of rows_to_cut_later.entries()) {
    let k = e[0];
    let v = e[1];
    let row_to_cut = v.row;
    let col_to_cut = v.col;
    matrix[row_to_cut][col_to_cut] = ".";
    removedRolls += 1;
  }
}

console.log(`star1: ${star1}\nstar2: ${star2}`);
