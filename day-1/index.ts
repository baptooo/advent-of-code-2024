const decoder = new TextDecoder('utf-8');
const file = Deno.readFileSync(import.meta.dirname + '/sample.txt');
const data = decoder.decode(file);

const listA: number[] = []
const listB: number[] = []
data.match(/\d+/g)?.forEach((val, idx) => {
  (idx % 2 ? listB : listA).push(+val);
})

console.log('-<[listA, listB]>-', listA, listB)

function getMin(arr: number[], after: number = 0) {
  return arr.reduce<[number, number]>((res, val, idx) => (
    val > after && res[0] > val ? [val, idx] : res
  ), [Infinity, -1])
}

function findPos() {
  const listACopy = [...listA];
  const listBCopy = [...listB];
  let length = listA.length;
  let totalDistances = 0;

  while(length) {
    const [minA, minAIdx] = getMin(listACopy);
    const [minB, minBIdx] = getMin(listBCopy);

    const distance = Math.abs(minB - minA);

    totalDistances += distance;

    listACopy.splice(minAIdx, 1);
    listBCopy.splice(minBIdx, 1);

    length--;
  }

  return totalDistances;
}

function findSim() {
  return listA.reduce((res, val) => {
    const simB = listB.filter(valB => valB === val);

    return res + (val * simB.length);
  }, 0)
}

const result = findSim();

console.log('-<[result]>-', result)