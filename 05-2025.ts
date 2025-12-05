import { readFileAsString } from "./lib/fileUtils.js";

let star1 = 0;
let star2 = 0;

let testCase: string | undefined;
// testCase = `
// 3-5
// 10-14
// 16-20
// 12-18

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

console.log(all_ranges);
console.log(all_ingredients);

let ingredients: number[] = [];
all_ingredients.split("\n").forEach((ingredient) => {
  ingredients.push(parseInt(ingredient));
});

let ranges: string[] = [];
all_ranges.split("\n").forEach((range) => {
  ranges.push(range);
});

console.log(ingredients, ranges);

let fresh_ingredients = new Set<number>();
ingredients.forEach((ingredient) => {
  ranges.forEach((range) => {
    let rangeStart = parseInt(range.split("-")[0]);
    let rangeEnd = parseInt(range.split("-")[1]);
    if (ingredient >= rangeStart && ingredient <= rangeEnd) {
      console.log(ingredient);
      fresh_ingredients.add(ingredient);
    }
  });
});

star1 = fresh_ingredients.size;

console.log(`star1: ${star1}\nstar2: ${star2}`);
