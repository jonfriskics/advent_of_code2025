import { readFile } from "./lib/fileUtils.js";

let star1 = 0;
let star2 = 0;

let testCase: string | undefined;
// testCase = `
// aaa: you hhh
// you: bbb ccc
// bbb: ddd eee
// ccc: ddd eee fff
// ddd: ggg
// eee: out
// fff: out
// ggg: out
// hhh: ccc fff iii
// iii: out
// `;

testCase = `
  svr: aaa bbb
  aaa: fft
  fft: ccc
  bbb: tty
  tty: ccc
  ccc: ddd eee
  ddd: hub
  hub: fff
  eee: dac
  dac: fff
  fff: ggg hhh
  ggg: out
  hhh: out
`;

let input = await readFile("puzzles/11-2025.txt", testCase);

interface Graph {
  [key: string]: string[];
}

let graph: Graph = {};
input.forEach((line) => {
  let match;
  const re = /(\w+)\:([\w\s]+)/g;

  while ((match = re.exec(line)) !== null) {
    // console.log(match[1], match[2].trim().split(" "));
    graph[match[1]] = match[2].trim().split(" ");
  }
});
// console.log(graph);

const memo = new Map<string, number>();
const visited = new Set<string>();

function dfs(node: string): number {
  visited.add(node);

  if (node === "out") {
    return 1;
  }

  if (memo.has(node)) {
    return memo.get(node)!;
  }

  const neighbors = graph[node] ?? [];
  if (neighbors.length === 0) {
    memo.set(node, 0);
    return 0;
  }

  let total = 0;
  for (const next of neighbors) {
    total += dfs(next);
  }

  memo.set(node, total);

  return total;
}

console.log(dfs("svr"));
console.log(visited);
// console.log(dfs("svr"));

console.log(`star1: ${star1}\nstar2: ${star2}`);
