import { readFile } from "./lib/fileUtils.js";

let star1 = 0;
let star2 = 0;

let testCase: string | undefined;
// testCase = `
//   11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124
// `;

let puzzleLines = await readFile("puzzles/02-2025.txt", testCase);

puzzleLines[0].split(",").forEach((range) => {
  let match;
  const re = /(\d+)-(\d+)/g;

  while ((match = re.exec(range)) !== null) {
    const rangeStart = parseInt(match[1]);
    const rangeEnd = parseInt(match[2]);
    for (let i = rangeStart; i <= rangeEnd; i++) {
      let len = i.toString().length;
      if (len % 2 === 0) {
        let firstHalf = i.toString().slice(0, len / 2);
        let secondHalf = i.toString().slice(len / 2);
        if (parseInt(firstHalf) == parseInt(secondHalf)) {
          star1 += i;
        }
      }
      const re_star2 = /^(\d+)\1+$/;
      if (re_star2.test(i.toString())) {
        star2 += i;
      }
    }
  }
});

console.log(`star1: ${star1}\nstar2: ${star2}`);
