const decoder = new TextDecoder('utf-8');
const file = Deno.readFileSync(import.meta.dirname + '/input2.txt');
const data = decoder.decode(file);

const character = /\^|<|>|V/;
const directionMap = ['^', '>', 'V', '<'];

const WHILE_SAFE = 1_000_000;

let start = [0, 0];
let matrixSize = 0;
const matrix = data.split('\n').map((line, lineIdx) => {
  const foundChar = character.exec(line);

  if (foundChar != null) {
    start = [foundChar.index, lineIdx];
  }

  matrixSize += line.length;
  
  return line.split('');
})

function getPathSize(localMatrix: Array<string[]>) {
  let [x, y] = start;
  let direction = localMatrix[y][x];
  let char: string | null= null;
  const movements = new Set<string>([`${x}-${y}`]);
  let whileSafe = WHILE_SAFE;
  const leastRepeated = new Map();

  while (whileSafe-- && (char = (localMatrix[y] ?? [])[x])) {
    const posStr = `${x}-${y}`;

    if (leastRepeated.has(posStr)) {
      const count = leastRepeated.get(posStr);

      if (count > 100) return -1; // Blocked

      leastRepeated.set(posStr, count + 1)
    } else {
      leastRepeated.set(posStr, 0);
    }

    if (char === '.') movements.add(posStr)
    if (char === '#' || char === 'O') {
      switch (direction) {
        case '^':
          y++;
          break;
        case '>':
          x--;
          break;
        case 'V':
          y--;
          break;
        case '<':
          x++;
          break;
      }
      direction = directionMap[(directionMap.indexOf(direction) + 1) % directionMap.length]
    }

    switch (direction) {
      case '^':
        y--;
        break;
      case '>':
        x++;
        break;
      case 'V':
        y++;
        break;
      case '<':
        x--;
        break;
    }
  }

  return movements.size;
}

function findInfiniteLoops() {
  let res = 0;

  for (let i = 0; i < matrixSize; i++) {
    const x = i % matrix[0].length;
    const y = (i / matrix.length) << 0;
    
    const char = matrix[y][x];

    if (char === '.') {
      const localMatrix = matrix.map((line, idx) => {
        if (idx === y) {
          const newLine = line.map((val, valIdx) => valIdx === x ? 'O' : val);

          return newLine;
        }
        return line;
      })

      if (getPathSize(localMatrix) === -1) {
        res++;
      };
    }
  }

  return res;
}

const res = findInfiniteLoops();

console.log('-<[res]>-', res)