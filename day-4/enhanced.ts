const decoder = new TextDecoder('utf-8');
const file = Deno.readFileSync(import.meta.dirname + '/sample.txt');
const data = decoder.decode(file);

const xPos: Array<number[]> = []
const lines = data.split('\n').map((line, lineIdx) => {
  const arr = line.split('');

  let index = 0;

  while ((index = arr.indexOf('X', index)) !== -1) {
    xPos.push([index, lineIdx])
    index++;
  }

  return arr;
});

function getXMatrix(x: number, y: number, size: number) {
  const roundHalf = size / 2 << 0;
  const res = new Array(size).fill([]).map((_, idx) => {
    const line = lines[y + idx - roundHalf] ?? [];
    const vals = line.slice(x - roundHalf, x + roundHalf);

    return vals;
  })

  console.log('-<[res]>-', res)
  // const res = new Array(size).fill([]);

  // for (let i = 0; i < size * size; i++) {
  //   const currX = (x - size / 2) << 0 + (i % size);
  //   const currY = (y - size / 2) << 0 + (i / size) << 0

  //   res[currY]?.push((lines[currY] ?? [])[currX] ?? undefined);
  // }

  // return res
}

function scanXOccurences() {
  for (const [x, y] of xPos) {
    const matrix = getXMatrix(x, y, 7);

    console.log('-<[matrix]>-', matrix, x, y)
  }
}
scanXOccurences();