const decoder = new TextDecoder('utf-8');
const file = Deno.readFileSync(import.meta.dirname + '/input2.txt');
const data = decoder.decode(file);

const aPos: Array<[number, number]> = [];
const lines = data.split('\n').map((line, lineIdx) => {
  const str = line.split('');

  let index = 0;
  while ((index = str.indexOf('A', index)) !== -1) {
    aPos.push([index, lineIdx])
    index++;
  }

  return str;
});

function findMas(x: number, y: number) {
  let valid = true;
  const tl = lines[y - 1] && lines[y - 1][x - 1]
  const tr = lines[y - 1] && lines[y - 1][x + 1]
  const bl = lines[y + 1] && lines[y + 1][x - 1]
  const br = lines[y + 1] && lines[y + 1][x + 1]

  valid &&= ((tl === 'M' && br === 'S') || (tl === 'S' && br === 'M'));
  valid &&= ((tr === 'M' && bl === 'S') || (tr === 'S' && bl === 'M'));

  return valid ? 1 : 0;
}

let count = 0;
for (let i = 0; i < aPos.length; i++) {
  count += findMas(...aPos[i]);
}

console.log('-<[count]>-', count)