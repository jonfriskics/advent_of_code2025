import { readFile } from "./lib/fileUtils.js";

let star1 = 0;
let star2 = 0;

let testCase: string | undefined;
// testCase = `
//   L68
//   L30
//   R48
//   L5
//   R60
//   L55
//   L1
//   L99
//   R14
//   L82

// `;
// testCase = `R1000`;

let puzzleLines = await readFile("puzzles/01-2025.txt", testCase);

let currentPosition = 50;
puzzleLines.forEach((puzzleLine) => {
  let match;
  const detailedRegex = /([RL])(\d+)/g;

  while ((match = detailedRegex.exec(puzzleLine)) !== null) {
    const direction = match[1];
    const steps = parseInt(match[2]);
    if (direction == "L") {
      for (let i = 0; i < steps; i++) {
        if (currentPosition > 0) {
          currentPosition -= 1;
        } else {
          currentPosition = 99;
        }

        if (currentPosition == 0) {
          star2 += 1;
        }
      }
    } else if (direction == "R") {
      for (let i = 0; i < steps; i++) {
        if (currentPosition < 99) {
          currentPosition += 1;
        } else {
          currentPosition = 0;
        }

        if (currentPosition == 0) {
          star2 += 1;
        }
      }
    }
    if (currentPosition == 0) {
      star1 += 1;
    }
  }
});

console.log(`star1: ${star1}\nstar2: ${star2}`);
