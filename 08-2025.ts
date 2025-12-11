import { readFile } from "./lib/fileUtils.js";

let star1 = 0;
let star2 = 0;

let testCase: string | undefined;
// testCase = `
// 162,817,812
// 57,618,57
// 906,360,560
// 592,479,940
// 352,342,300
// 466,668,158
// 542,29,236
// 431,825,988
// 739,650,466
// 52,470,668
// 216,146,977
// 819,987,18
// 117,168,530
// 805,96,715
// 346,949,466
// 970,615,88
// 941,993,340
// 862,61,35
// 984,92,344
// 425,690,689
// `;

let pairCount = 0;
if (testCase) {
  pairCount = 10 + 1;
} else {
  pairCount = 1000 + 1;
}

let puzzleLines = await readFile("puzzles/08-2025.txt", testCase);

type Point = { x: number; y: number; z: number };

function distance3D(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

let allCoordinates: Point[] = [];
puzzleLines.forEach((puzzleLine) => {
  let match;
  const coords = /(\d+),(\d+),(\d+)/g;

  while ((match = coords.exec(puzzleLine)) !== null) {
    let x = parseInt(match[1]);
    let y = parseInt(match[2]);
    let z = parseInt(match[3]);
    // console.log(x, y, x);
    allCoordinates.push({ x: x, y: y, z: z });
  }
});

const distances: {
  distance: number;
  pointA: string;
  pointB: string;
}[] = [];

function turnIntoString(point: Point): string {
  let x = point.x;
  let y = point.y;
  let z = point.z;
  return `${x}-${y}-${z}`;
}

for (let i = 0; i < allCoordinates.length - 1; i++) {
  for (let j = i + 1; j < allCoordinates.length; j++) {
    distances.push({
      distance: distance3D(allCoordinates[i], allCoordinates[j]),
      pointA: turnIntoString(allCoordinates[i]),
      pointB: turnIntoString(allCoordinates[j]),
    });
  }
}

distances.sort((a, b) => a.distance - b.distance);

let tenShortest = distances.slice(0, pairCount);
console.log(tenShortest);

const clusters: string[][] = [];

for (const obj of tenShortest) {
  let a = obj.pointA;
  let b = obj.pointB;
  let cluster: string[] | undefined;
  for (const c of clusters) {
    if (c.includes(a) || c.includes(b)) {
      cluster = c;
      break;
    }
  }

  if (!cluster) {
    clusters.push([a, b]);
  } else {
    cluster.push(a, b);
  }
}

clusters.forEach((cluster, index) => {
  clusters[index] = [...new Set(cluster)];
});

console.log(clusters);

let lengths: number[] = [];
clusters.forEach((cluster) => {
  lengths.push(cluster.length);
});

lengths.sort((a, b) => b - a);

console.log(lengths);

star1 = lengths[0] * lengths[1] * lengths[2];

console.log(`star1: ${star1}\nstar2: ${star2}`);
