import { readFile } from "./lib/fileUtils.js";

let star1 = 0;
let star2 = 0;

let testCase: string | undefined;
// testCase = `
// 123 328  51 64
//   45 64  387 23
//   6 98  215 314
// *   +   *   +
// `;

let input = await readFile("puzzles/06-2025.txt", testCase);
console.log(input);

let runAgain = true;
let columnLength = 0;
input.forEach((line) => {
  if (runAgain) {
    let match;
    const numberRegex = /\d+/g;

    let columns = [];
    while ((match = numberRegex.exec(line)) !== null) {
      columns.push(match[0]);
    }
    columnLength = columns.length;
  }
  runAgain = false;
});

console.log(columnLength);

let lineCounter = 0;
let numbersAsColumns: Map<number, number[]> = new Map();
let operators: string[] = [];
input.forEach((line) => {
  if (lineCounter == input.length - 1) {
    let opMatch;
    const operatorRegex = /[\*\+]/g;
    while ((opMatch = operatorRegex.exec(line)) !== null) {
      operators.push(opMatch[0]);
    }
  }

  let match;
  const numberRegex = /\d+/g;

  let columnCounter = 0;
  while ((match = numberRegex.exec(line)) !== null) {
    let currentColumnNumbers: number[];
    if (numbersAsColumns.get(columnCounter) == undefined) {
      currentColumnNumbers = [];
      currentColumnNumbers.push(parseInt(match[0]));
    } else {
      const retrieved = numbersAsColumns.get(columnCounter);
      currentColumnNumbers = retrieved !== undefined ? retrieved : [];
      currentColumnNumbers.push(parseInt(match[0]));
    }
    numbersAsColumns.set(columnCounter, currentColumnNumbers);

    columnCounter += 1;
  }

  lineCounter += 1;
});

console.log(numbersAsColumns);
console.log(operators);

for (let i = 0; i < operators.length; i++) {
  if (operators[i] == "+") {
    let numbersToAdd = numbersAsColumns.get(i);
    console.log(`numbers to add ${numbersToAdd}`);
    let sum = 0;
    numbersToAdd?.forEach((number) => {
      sum += number;
      console.log(sum);
    });
    star1 += sum;
  } else if (operators[i] == "*") {
    let numbersToMultiply = numbersAsColumns.get(i);
    console.log(`numbers to multiply ${numbersToMultiply}`);
    let product = 1;
    numbersToMultiply?.forEach((number) => {
      product *= number;
      console.log(product);
    });
    star1 += product;
  }
}

console.log(`----------`);
// console.log(numbersAsColumns);
let numbersAsStringColumns: Map<number, string[]> = new Map();
let idx = 0;
for (let e of numbersAsColumns.entries()) {
  let largestNumLength = 0;
  e[1].forEach((num) => {
    if (String(num).length > largestNumLength) {
      largestNumLength = String(num).length;
    }
  });

  let paddedNumbers: string[] = [];
  e[1].forEach((num) => {
    if (String(num).length == 1) {
      paddedNumbers.push("000" + num);
    } else if (String(num).length == 2) {
      paddedNumbers.push("00" + num);
    } else if (String(num).length == 3) {
      paddedNumbers.push("0" + num);
    }
  });

  console.log(paddedNumbers);
  numbersAsStringColumns.set(idx, paddedNumbers);

  // console.log(largestNumLength, numbersAsColumns);
  // console.log(e[1]);
  idx += 1;
}

console.log(numbersAsStringColumns);

// for(let e of numbersAsStringColumns) {

// }

console.log(`star1: ${star1}\nstar2: ${star2}`);
