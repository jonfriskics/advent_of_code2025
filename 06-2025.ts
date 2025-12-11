import { resolveTripleslashReference } from "typescript";
import { readFile, readFileAsString } from "./lib/fileUtils.js";

let star1 = 0;
let star2 = 0;

let testCase: string | undefined;
testCase = `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  
`;

let input = await readFile("puzzles/06-2025.txt", testCase);
// console.log(input);

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

// console.log(columnLength);

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

// console.log(numbersAsColumns);
// console.log(operators);

for (let i = 0; i < operators.length; i++) {
  if (operators[i] == "+") {
    let numbersToAdd = numbersAsColumns.get(i);
    // console.log(`numbers to add ${numbersToAdd}`);
    let sum = 0;
    numbersToAdd?.forEach((number) => {
      sum += number;
      // console.log(sum);
    });
    star1 += sum;
  } else if (operators[i] == "*") {
    let numbersToMultiply = numbersAsColumns.get(i);
    // console.log(`numbers to multiply ${numbersToMultiply}`);
    let product = 1;
    numbersToMultiply?.forEach((number) => {
      product *= number;
      // console.log(product);
    });
    star1 += product;
  }
}

let input_p2 = await readFileAsString("puzzles/06-2025.txt", testCase);

let ordered = input_p2
  .split("\n")
  .map((line) => [...line].join(""))
  .join("\n");

const orderedMatrix: string[][] = ordered.split("\n").map((line) => [...line]);
printMatrix(orderedMatrix);

console.log("------");

const reversed = input_p2
  .split("\n")
  .map((line) => [...line].reverse().join(""))
  .join("\n");

const reversedMatrix: string[][] = reversed.split("\n").map((line) => [...line]);

// console.log(reversed);
// console.log(JSON.stringify(reversedMatrix));
function printMatrix(m: string[][]): void {
  for (let l = 0; l < m.length; l++) {
    console.log(JSON.stringify(m[l]));
  }
}

printMatrix(reversedMatrix);
console.log("------");

let maxRowLength = 0;
for (let row = 0; row < reversedMatrix.length; row++) {
  if (maxRowLength < reversedMatrix[0].length) {
    maxRowLength = reversedMatrix[0].length;
  }
}
// console.log(`maxRowLength ${maxRowLength}`);

for (let row = 0; row < reversedMatrix.length; row++) {
  // console.log(reversedMatrix[row]);
  if (reversedMatrix[row].length < maxRowLength) {
    for (let i = reversedMatrix[row].length; i < maxRowLength; i++) {
      reversedMatrix[row].push(" ");
    }
  }
}

reversedMatrix.unshift(reversedMatrix.pop()!);

printMatrix(reversedMatrix);

let currentOperator = "OP";
let operationsString = "0+";
outer: for (let col = 0; col < reversedMatrix[0].length; col++) {
  if (reversedMatrix[0][col] == "+") {
    if (currentOperator == "*") {
      operationsString = operationsString.slice(0, operationsString.length - 1);
      operationsString += "+";
    }
    currentOperator = "+";
  } else if (reversedMatrix[0][col] == "*") {
    if (currentOperator == "+") {
      // operationsString = operationsString.slice(0, operationsString.length);
    }
    currentOperator = "*";
  } else {
    // nothing, keep operator the same
  }
  // let numberString = `${reversedMatrix[1][col]}${reversedMatrix[2][col]}${reversedMatrix[3][col]}${reversedMatrix[4][col]}`;
  // if (reversedMatrix[0][col] == " " && reversedMatrix[1][col] == " " && reversedMatrix[2][col] == " " && reversedMatrix[3][col] == " " && reversedMatrix[4][col] == " ") {
  let numberString = `${reversedMatrix[1][col]}${reversedMatrix[2][col]}${reversedMatrix[3][col]}`;
  if (reversedMatrix[0][col] == " " && reversedMatrix[1][col] == " " && reversedMatrix[2][col] == " " && reversedMatrix[3][col] == " ") {
    // console.log(`found gap`);
    operationsString = operationsString.slice(0, operationsString.length - 1);
    operationsString += "+";
  } else if (currentOperator == "+") {
    // console.log(`adding ${Number(numberString)}`);
    operationsString += `${Number(numberString)}+`;
    operationsString = operationsString.slice(0, operationsString.length);
  } else if (currentOperator == "*") {
    // console.log(`multiplying ${Number(numberString)}`);
    operationsString += `${Number(numberString)}*`;
    operationsString = operationsString.slice(0, operationsString.length);
  }
}

// 8518396406 too low
// 5348001767111
// 11418629042091 too high

operationsString = operationsString.slice(0, operationsString.length - 1);
console.log(operationsString);
let star2_string = eval(operationsString) as string;
console.log(star2_string);

console.log(`star1: ${star1}\nstar2: ${star2}`);
