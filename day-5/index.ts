const decoder = new TextDecoder('utf-8');
const file = Deno.readFileSync(import.meta.dirname + '/input2.txt');
const data = decoder.decode(file);

const separator = data.indexOf('\n\n');
const orderingRules = data.slice(0, separator).match(/(\d+)\|(\d+)/g)?.map(group => group.split('|').map(integer => +integer))!;
const pageUpdates = data.slice(separator + 1).match(/[(\d+),?]+/g)?.map(suite => suite.split(',').map(integer => +integer))!;

function confirmOrderingRule(a: number, b:number) {
  return orderingRules.filter(([ca, cb]) => a === cb && ca === b).length === 0;
}

function isValidUpdate(arr: number[]) {
  for(let i = 0; i < arr.length; i++) {
    const curr = arr[i];

    for (let j = i + 1; j < arr.length; j++) {
      const compared = arr[j];

      if (!confirmOrderingRule(curr, compared)) return false;
    }
  }

  return true;
}

// Part 1
function scanValidPages(pages: Array<number[]>) {
  const res = pages.filter(isValidUpdate);
  return res.reduce((total, arr) => {
    const center = arr.length / 2 << 0;
    return total + arr[center];
  }, 0)
}

// Part 2
function orderInvalidPages(pages: Array<number[]>) {
  return pages.reduce<Array<number[]>>((res, page) => {
    const isValid = isValidUpdate(page);

    if (isValid) return res;

    const pageReOrdered = page.sort((a, b) => {
      if (confirmOrderingRule(a, b)) {
        return -1;
      }
      return 1;
    })

    return [...res, pageReOrdered];
  }, []);
}

const part1 = scanValidPages(pageUpdates);
const part2 = scanValidPages(orderInvalidPages(pageUpdates));

console.log('-<[part1, part2]>-', part1, part2)