import { readFile } from "./lib/fileUtils.js";

let star1 = 0;
let star2 = 0;

let testCase: string | undefined;
// testCase = `
//   987654321111111
//   811111111111119
//   234234234234278
//   818181911112111
// `;

let batteryBanks = await readFile("puzzles/03-2025.txt", testCase);

batteryBanks.forEach((batteryBank) => {
  let batteries = batteryBank.trim().split("");
  let maxPair = 0;
  for (let i = 0; i < batteries.length; i++) {
    for (let j = i + 1; j < batteries.length; j++) {
      if (parseInt(batteries[i]) * 10 + parseInt(batteries[j]) > maxPair) {
        maxPair = parseInt(batteries[i]) * 10 + parseInt(batteries[j]);
      }
    }
  }
  star1 += maxPair;
});

batteryBanks.forEach((batteryBank) => {
  let batteryString = batteryBank.trim();
  let pos = 0;
  let largestString = "";

  for (let i = 0; i < 12; i++) {
    let remainingChars = 12 - i;
    let maxPos = batteryString.length - remainingChars + 1;

    let nextBest = "";
    let nextBestIndex = pos;

    for (let j = pos; j < maxPos; j++) {
      if (batteryString[j] > nextBest) {
        nextBest = batteryString[j];
        nextBestIndex = j;
      }
    }

    largestString += nextBest;
    pos = nextBestIndex + 1;
  }
  star2 += parseInt(largestString);
});

// batteryBanks.forEach((batteryBank) => {
//   console.log(`bank ${bankCount}`);
//   let batteries = batteryBank.trim().split("");
//   let maxPair = 0;
//   for (let a = 0; a < batteries.length; a++) {
//     for (let b = a + 1; b < batteries.length; b++) {
//       for (let c = b + 1; c < batteries.length; c++) {
//         for (let d = c + 1; d < batteries.length; d++) {
//           for (let e = d + 1; e < batteries.length; e++) {
//             for (let f = e + 1; f < batteries.length; f++) {
//               for (let g = f + 1; g < batteries.length; g++) {
//                 for (let h = g + 1; h < batteries.length; h++) {
//                   for (let i = h + 1; i < batteries.length; i++) {
//                     for (let j = i + 1; j < batteries.length; j++) {
//                       for (let k = j + 1; k < batteries.length; k++) {
//                         for (let l = k + 1; l < batteries.length; l++) {
//                           let num =
//                             parseInt(batteries[a]) * 10 ** 11 +
//                             parseInt(batteries[b]) * 10 ** 10 +
//                             parseInt(batteries[c]) * 10 ** 9 +
//                             parseInt(batteries[d]) * 10 ** 8 +
//                             parseInt(batteries[e]) * 10 ** 7 +
//                             parseInt(batteries[f]) * 10 ** 6 +
//                             parseInt(batteries[g]) * 10 ** 5 +
//                             parseInt(batteries[h]) * 10 ** 4 +
//                             parseInt(batteries[i]) * 10 ** 3 +
//                             parseInt(batteries[j]) * 10 ** 2 +
//                             parseInt(batteries[k]) * 10 ** 1 +
//                             parseInt(batteries[l]) * 10 ** 0;
//                           if (num > maxPair) {
//                             maxPair = num;
//                           }
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
//   star2 += maxPair;
// });

console.log(`star1: ${star1}\nstar2: ${star2}`);
