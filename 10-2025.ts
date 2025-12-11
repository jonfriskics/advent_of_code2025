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

let input = await readFile("puzzles/10-2025.txt", testCase);

// input.forEach((line) => {
//   let match;
//   const re = /(\d+)-(\d+)/g;

//   while ((match = re.exec(line)) !== null) {
//     let lights =
//   }
// });

console.log(`star1: ${star1}\nstar2: ${star2}`);

const nums = [0, 1, 2, 3, 4];

function combinationsInOrder<T>(arr: T[]): T[][] {
  const result: T[][] = [];

  function backtrack(start: number, path: T[]) {
    if (path.length > 0) {
      result.push([...path]);
    }

    for (let i = start; i < arr.length; i++) {
      path.push(arr[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }

  backtrack(0, []);
  return result;
}

const combos = combinationsInOrder(nums);

console.log(combos);

function tryButtonPresses(combos: number[][], lightTarget: string[], buttons: Map<number, number[]>[]) {
  let lowestPresses = 999;
  combos.forEach((combo) => {
    let totalPresses = 0;
    let lights = [".", ".", ".", ".", ".", "."];
    console.log(`next combo ${combo} ${lights.join("")}`);
    // console.log(combo);
    combo.forEach((num) => {
      // console.log(`num ${num}`);
      buttons.forEach((button) => {
        // console.log(button);
        let presses = button.get(num);
        console.log(`presses to try ${presses} total ${totalPresses}`);
        totalPresses += 1;
        presses?.forEach((press) => {
          if (lights[press] == ".") {
            lights[press] = "#";
          } else {
            lights[press] = ".";
          }
          // console.log(`${lights.join("")}`);
        });
        // console.log(JSON.stringify(lights), JSON.stringify(lightTarget));
        if (JSON.stringify(lights) === JSON.stringify(lightTarget)) {
          if (totalPresses < lowestPresses) {
            lowestPresses = totalPresses;
          }
          console.log(`found a match total presses ${totalPresses} lowest ${lowestPresses}`);
        }
      });
    });
  });

  return {
    lowestPresses: lowestPresses,
  };
}

// let { lowestPresses } = tryButtonPresses(
//   combos,
//   [".", "#", "#", "."],
//   [
//     new Map([
//       [0, [3]],
//       [1, [1, 3]],
//       [2, [2]],
//       [3, [2, 3]],
//       [4, [0, 2]],
//       [5, [0, 1]],
//     ]),
//   ],
// );

// let { lowestPresses } = tryButtonPresses(
//   combos,
//   [".", ".", ".", "#", "."],
//   [
//     new Map([
//       [0, [0, 2, 3, 4]],
//       [1, [2, 3]],
//       [2, [0, 4]],
//       [3, [0, 1, 2]],
//       [4, [1, 2, 3, 4]],
//     ]),
//   ],
// );

let { lowestPresses } = tryButtonPresses(
  combos,
  [".", "#", "#", "#", ".", "#"],
  [
    new Map([
      [0, [0, 1, 2, 3, 4]],
      [1, [0, 3, 4]],
      [2, [0, 1, 2, 4, 5]],
      [3, [1, 2]],
    ]),
  ],
);

console.log(lowestPresses);
