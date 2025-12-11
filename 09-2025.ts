import { readFile } from "./lib/fileUtils.js";

let star1 = 0;
let star2 = 0;

let testCase: string | undefined;
// testCase = `
// 7,1
// 11,1
// 11,7
// 9,7
// 9,5
// 2,5
// 2,3
// 7,3
// `;

let input = await readFile("puzzles/09-2025.txt", testCase);

let largestAreaFound = 0;
input.forEach((coords) => {
  let x1 = Number(coords.split(",")[0]);
  let y1 = Number(coords.split(",")[1]);
  // console.log(`${x1} ${y1}`);
  for (let i = 0; i < input.length - 1; i++) {
    let x2 = Number(input[i].split(",")[0]);
    let y2 = Number(input[i].split(",")[1]);
    if (x1 == x2 && y1 == y2) {
      // console.log(`found a match ${x1},${y1} ${x2},${y2}`);
      continue;
    }
    // console.log(`rect from ${x1},${y1} to ${x2},${y2}`);
    let area = 0;
    // if (x2 > x1 && y2 > y1) {
    // x2 - x1 + 1 times y2 - y1 + 1
    area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
    // } else if (x2 <= x1 && y2 >= y1) {
    // }
    if (area >= largestAreaFound) {
      largestAreaFound = area;
    }
    // console.log(`area ${area} ${x1},${y1} to ${x2},${y2}`);
  }
});

star1 = largestAreaFound;

function printMatrix(m: Uint8Array[][]): void {
  for (let l = 0; l < m.length; l++) {
    console.log(JSON.stringify(m[l]));
  }
}

let all_x: number[] = [];
let all_y: number[] = [];
input.forEach((coords) => {
  let x1 = Number(coords.split(",")[0]);
  let y1 = Number(coords.split(",")[1]);
  all_x.push(x1);
  all_y.push(y1);
});

let min_x = Math.min(...all_x);
let max_x = Math.max(...all_x);
let min_y = Math.min(...all_y);
let max_y = Math.max(...all_y);

console.log(max_x, max_y);

const numRows = max_y - min_y + 5;
const numCols = max_x - min_x + 5;

console.log(`pre-generating array with dots`);

//let matrix: string[][] = Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => blank));
let matrix: Uint8Array[][] = Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => new Uint8Array(0)));

console.log(`post-generating array with dots`);

input.forEach((coords) => {
  let x1 = Number(coords.split(",")[0]);
  let y1 = Number(coords.split(",")[1]);
  // console.log(x1, y1);
  // matrix[y1][x1] = "#";
  matrix[y1][x1] = new Uint8Array(1);
});

console.log(`pre-drawing connections`);

// printMatrix(matrix);

for (let i = 0; i < input.length - 1; i++) {
  let col1 = Number(input[i].split(",")[0]);
  let row1 = Number(input[i].split(",")[1]);
  let col2 = Number(input[i + 1].split(",")[0]);
  let row2 = Number(input[i + 1].split(",")[1]);
  // console.log(`from: ${row1},${col1} to: ${row2},${col2}`);
  if (row1 == row2) {
    if (col1 < col2) {
      // console.log(`horizontal move right`);
      for (let nextCol = col1 + 1; nextCol < col2; nextCol++) {
        // console.log(`add X to ${row1},${nextCol}`);
        if (nextCol != col2) {
          // matrix[row1][nextCol] = "X";
          matrix[row1][nextCol] = new Uint8Array(2);
        }
      }
    } else {
      // console.log(`horizontal move left`);
      for (let nextCol = col1 - 1; nextCol > col2; nextCol--) {
        // console.log(`add X to ${row1},${nextCol}`);
        if (nextCol != col1) {
          matrix[row1][nextCol] = new Uint8Array(2);
          // matrix[row1][nextCol] = "X";
        }
      }
    }
  } else if (col1 == col2) {
    if (row1 < row2) {
      // console.log(`horizontal move down`);
      for (let nextRow = row1 + 1; nextRow < row2; nextRow++) {
        // console.log(`add X to ${nextRow},${col1}`);
        if (nextRow != row2) {
          matrix[nextRow][col1] = new Uint8Array(2);
          // matrix[nextRow][col1] = "X";
        }
      }
    } else {
      // console.log(`horizontal move up`);
      for (let nextRow = row1 - 1; nextRow > row2; nextRow--) {
        // console.log(`add X to ${nextRow},${col1}`);
        if (nextRow != row1) {
          matrix[nextRow][col1] = new Uint8Array(2);
          // matrix[nextRow][col1] = "X";
        }
      }
    }
  }
  // printMatrix(matrix);
}

console.log(`post-drawing connections`);

// printMatrix(matrix);

let first = input[0];
let last = input[input.length - 1];
let col1 = Number(first.split(",")[0]);
let row1 = Number(first.split(",")[1]);
let col2 = Number(last.split(",")[0]);
let row2 = Number(last.split(",")[1]);
// console.log(`from: ${row1},${col1} to: ${row2},${col2}`);
if (row1 == row2) {
  if (col1 < col2) {
    // console.log(`horizontal move right`);
    for (let nextCol = col1 + 1; nextCol < col2; nextCol++) {
      // console.log(`add X to ${row1},${nextCol}`);
      if (nextCol != col2) {
        matrix[row1][nextCol] = new Uint8Array(2);
        // matrix[row1][nextCol] = "X";
      }
    }
  } else {
    // console.log(`horizontal move left`);
    for (let nextCol = col1 - 1; nextCol > col2; nextCol--) {
      // console.log(`add X to ${row1},${nextCol}`);
      if (nextCol != col1) {
        matrix[row1][nextCol] = new Uint8Array(2);
        // matrix[row1][nextCol] = "X";
      }
    }
  }
} else if (col1 == col2) {
  if (row1 < row2) {
    // console.log(`horizontal move down`);
    for (let nextRow = row1 + 1; nextRow < row2; nextRow++) {
      // console.log(`add X to ${nextRow},${col1}`);
      if (nextRow != row2) {
        matrix[nextRow][col1] = new Uint8Array(2);
        // matrix[nextRow][col1] = "X";
      }
    }
  } else {
    // console.log(`horizontal move up`);
    for (let nextRow = row1 - 1; nextRow > row2; nextRow--) {
      // console.log(`add X to ${nextRow},${col1}`);
      if (nextRow != row1) {
        matrix[nextRow][col1] = new Uint8Array(2);
        // matrix[nextRow][col1] = "X";
      }
    }
  }
}

for (let row = 0; row < matrix.length; row++) {
  let first = -1;
  let last = -1;

  // find first and last border cell in this row
  for (let col = 0; col < matrix[row].length; col++) {
    if (matrix[row][col] == new Uint8Array(1) || matrix[row][col] == new Uint8Array(2)) {
      if (first == -1) {
        first = col;
      }
      last = col;
    }
  }

  // if we found a span, fill between
  if (first != -1 && last != -1 && last > first) {
    for (let col = first + 1; col < last; col++) {
      if (matrix[row][col] == new Uint8Array(0)) {
        matrix[row][col] = new Uint8Array(1);
      }
    }
  }
}

printMatrix(matrix);

let largestFilledAreaFound = 0;
let idx = 0;
input.forEach((coords) => {
  console.log(idx);
  let col1 = Number(coords.split(",")[0]);
  let row1 = Number(coords.split(",")[1]);
  // console.log(`${x1} ${y1}`);
  for (let i = 0; i < input.length - 1; i++) {
    let col2 = Number(input[i].split(",")[0]);
    let row2 = Number(input[i].split(",")[1]);
    if (col1 == col2 && row1 == row2) {
      // console.log(`found a match ${x1},${y1} ${x2},${y2}`);
      continue;
    }
    // console.log(`rect from ${x1},${y1} to ${x2},${y2}`);
    let area = 0;
    // if (x2 > x1 && y2 > y1) {
    // x2 - x1 + 1 times y2 - y1 + 1
    let allCharsInArea = [];
    let rows = [row1, row2];
    let cols = [col1, col2];
    let min_row = Math.min(...rows);
    let max_row = Math.max(...rows);
    let min_col = Math.min(...cols);
    let max_col = Math.max(...cols);
    for (let row = min_row; row < max_row; row++) {
      for (let col = min_col; col < max_col; col++) {
        allCharsInArea.push(matrix[row][col]);
      }
    }
    area = (Math.abs(col2 - col1) + 1) * (Math.abs(row2 - row1) + 1);
    // } else if (x2 <= x1 && y2 >= y1) {
    // }
    if (area >= largestFilledAreaFound && !allCharsInArea.includes(0)) {
      largestFilledAreaFound = area;
    }
    // console.log(`area ${area} ${x1},${y1} to ${x2},${y2}`);
  }
  idx += 1;
});

star1 = largestAreaFound;
star2 = largestFilledAreaFound;

console.log(`star1: ${star1}\nstar2: ${star2}`);
