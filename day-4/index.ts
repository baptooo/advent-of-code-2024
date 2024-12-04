const decoder = new TextDecoder('utf-8');
const file = Deno.readFileSync(import.meta.dirname + '/input.txt');
const data = decoder.decode(file);

const lines = data.split('\n').map((str) => str.split(''))

function countInString(str: string) {
  const toRight = str.match(/XMAS/g)?.length ?? 0;
  const toLeft = str.match(/SAMX/g)?.length ?? 0;

  return toRight + toLeft;
}

function scanHorizontal(y: number) {
  return countInString(lines[y].join(''));
}

function scanVertical(x: number) {
  const verticalLine = lines.map(line => line[x]).join('');
  
  return countInString(verticalLine);
}

function scanDiagonals() {
  const lineSize = lines[0].length;
  const loopLen = lines.length + lineSize;
  const diagonals = [];

  for (let i = 0; i < loopLen; i++) {
    let y = i < lineSize ? 0 : i - lineSize + 1;
    let rightX = Math.min(lineSize - 1, i);
    let leftX = Math.max(0, lineSize - i - 1);
    let rightStr = '';
    let leftStr = '';

    while (lines[y] != null && lines[y][rightX] != null && (rightStr += lines[y][rightX])) {
      rightX--;
      y++;
    }

    y = i < lineSize ? 0 : i - lineSize + 1;

    while (lines[y] != null && lines[y][leftX] != null && (leftStr += lines[y][leftX])) {
      leftX++;
      y++;
    }

    diagonals.push(rightStr);
    diagonals.push(leftStr);
  }

  return diagonals.reduce<number>((total, str) => total + countInString(str), 0)
}

let horizontal = 0;
let vertical = 0;
const diagonals = scanDiagonals();

for (let i = 0; i < lines.length; i++) {
  horizontal += scanHorizontal(i);
  vertical += scanVertical(i);
}

const total = horizontal + vertical + diagonals;

console.log('-<[total]>-', total)