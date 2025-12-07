import { readFileAsString } from "./lib/fileUtils.js";

let star1 = 0;
let star2 = 0;

let testCase: string | undefined;
testCase = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32
`;

// testCase = `
// 3-5
// 4-5
// 10-14
// 16-20
// 12-18
// 13-16
// 30-50
// 35-55

// 1
// 5
// 8
// 11
// 17
// 32
// `;

let input = await readFileAsString("puzzles/05-2025.txt", testCase);

let all_ranges = input.split("\n\n")[0];
let all_ingredients = input.split("\n\n")[1];

// console.log(all_ranges);
// console.log(all_ingred ients);

let ingredients: number[] = [];
all_ingredients.split("\n").forEach((ingredient) => {
  ingredients.push(parseInt(ingredient));
});

let ranges: string[] = [];
all_ranges.split("\n").forEach((range) => {
  ranges.push(range);
});

// console.log(ingredients, ranges);

let fresh_ingredients = new Set<number>();
ingredients.forEach((ingredient) => {
  ranges.forEach((range) => {
    let rangeStart = parseInt(range.split("-")[0]);
    let rangeEnd = parseInt(range.split("-")[1]);
    if (ingredient >= rangeStart && ingredient <= rangeEnd) {
      // console.log(ingredient);
      fresh_ingredients.add(ingredient);
    }
  });
});

star1 = fresh_ingredients.size;

let sorted = ranges.slice().sort((a, b) => {
  const [aStart] = a.split("-").map(Number);
  const [bStart] = b.split("-").map(Number);
  return aStart - bStart;
});

console.log(sorted);

let someAction = 1;
let i = 0;
let islands = [];
let runCount = 1;
while (someAction > 0 && sorted.length > 1) {
  someAction = 0;
  console.log(`i ${i}, sorted.length ${sorted.length}`);
  if (i <= sorted.length) {
    console.log(`reset i`);
    i = 0;
  }
  console.log(`======================================= run ${runCount}`);
  let range1Start = parseInt(sorted[i].split("-")[0]);
  let range1End = parseInt(sorted[i].split("-")[1]);
  let range2Start = parseInt(sorted[i + 1].split("-")[0]);
  let range2End = parseInt(sorted[i + 1].split("-")[1]);
  console.log(range1Start, range1End, range2Start, range2End);
  if (range2Start > range1End) {
    console.log(` ------- these are separate ranges ------- `);
    console.log(`range2Start ${range2Start} > range1End ${range1End}`);
    islands.push(`${range1Start}-${range1End}`);
    const indexToRemove = sorted.findIndex((r) => r === `${range1Start}-${range1End}`);
    if (indexToRemove !== -1) {
      sorted.splice(indexToRemove, 1);
    }

    someAction += 1;
    i += 1;
  } else {
    console.log(`------- these ranges overlap somehow ------- `);
    if (range1Start == range2Start && range1End >= range2End) {
      console.log(`------- r1s r1e wins ------- `);
      const indexToRemove = sorted.findIndex((r) => r === `${range2Start}-${range2End}`);
      if (indexToRemove !== -1) {
        sorted.splice(indexToRemove, 1);
      }
      i += 1;
      someAction += 1;
    } else if (range1Start < range2Start && range1End == range2End) {
      console.log(`------- r1s r1e wins ------- `);
      const indexToRemove = sorted.findIndex((r) => r === `${range2Start}-${range2End}`);
      if (indexToRemove !== -1) {
        sorted.splice(indexToRemove, 1);
      }
      i += 1;
      someAction += 1;
    } else if (range1Start < range2Start && range1End > range2End) {
      console.log(`------- r1s r1e wins ------- `);
      const indexToRemove = sorted.findIndex((r) => r === `${range2Start}-${range2End}`);
      if (indexToRemove !== -1) {
        sorted.splice(indexToRemove, 1);
      }
      i += 1;
      someAction += 1;
    } else if (range1Start < range2Start && range1End < range2End) {
      console.log(`------- r1s r2e wins ------- `);
      const indexToRemove1 = sorted.findIndex((r) => r === `${range1Start}-${range1End}`);
      if (indexToRemove1 !== -1) {
        sorted.splice(indexToRemove1, 1);
      }
      const indexToRemove2 = sorted.findIndex((r) => r === `${range2Start}-${range2End}`);
      if (indexToRemove2 !== -1) {
        sorted.splice(indexToRemove2, 1);
      }
      sorted.splice(indexToRemove1, 0, `${range1Start}-${range2End}`);
      i += 1;
      someAction += 1;
    } else if (range1Start > range2Start && range1End < range2End) {
      console.log(`------- r2s r1e wins ------- `);
      const indexToRemove1 = sorted.findIndex((r) => r === `${range1Start}-${range1End}`);
      if (indexToRemove1 !== -1) {
        sorted.splice(indexToRemove1, 1);
      }
      const indexToRemove2 = sorted.findIndex((r) => r === `${range2Start}-${range2End}`);
      if (indexToRemove2 !== -1) {
        sorted.splice(indexToRemove2, 1);
      }
      sorted.splice(indexToRemove1, 0, `${range1Start}-${range2End}`);
      i += 1;
      someAction += 1;
    } else if (range1Start == range2Start && range1End > range2End) {
      console.log(`------- r1s r1e wins ------- `);
      const indexToRemove = sorted.findIndex((r) => r === `${range2Start}-${range2End}`);
      if (indexToRemove !== -1) {
        sorted.splice(indexToRemove, 1);
      }
      i += 1;
      someAction += 1;
    } else if (range1Start == range2Start && range1End <= range2End) {
      console.log(`------- r1s r2e wins ------- `);
      const indexToRemove1 = sorted.findIndex((r) => r === `${range1Start}-${range1End}`);
      if (indexToRemove1 !== -1) {
        sorted.splice(indexToRemove1, 1);
      }
      const indexToRemove2 = sorted.findIndex((r) => r === `${range2Start}-${range2End}`);
      if (indexToRemove2 !== -1) {
        sorted.splice(indexToRemove2, 1);
      }
      sorted.splice(indexToRemove1, 0, `${range1Start}-${range2End}`);
      i += 1;
      someAction += 1;
    }
  }
  runCount += 1;
  console.log(islands, sorted);
}

let combinedRanges = [...islands, ...sorted];

combinedRanges.forEach((range) => {
  let range1Start = parseInt(range.split("-")[0]);
  let range1End = parseInt(range.split("-")[1]);
  star2 += range1End - range1Start + 1;
});

console.log(`star1: ${star1}\nstar2: ${star2}`);
