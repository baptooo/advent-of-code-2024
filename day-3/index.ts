const decoder = new TextDecoder('utf-8');
const file = Deno.readFileSync(import.meta.dirname + '/input2.txt');
const data = decoder.decode(file);

function matchMul(str: string) {
    return str.match(/mul\(\d+,\d+\)/g)
        ?.reduce((total, pattern) => {
            const [a, b] = pattern.match(/\d+/g) ?? [1, 0];

            return total + (+a * +b)
        }, 0) ?? 0;
}

function matchEnabledMul(str: string) {
    const doReg = /(do|don't)\(\)/g
    let regRes: RegExpExecArray | null;
    const indices: Array<[number, string]> = [[0, 'do()']]

    while ((regRes = doReg.exec(str))) {
        indices.push([regRes.index, regRes[0]]);
    }

    indices.push([str.length - 1, 'do()'])

    let res = 0;
    for (let i = 0; i < indices.length; i++) {
        const [idx, instruction] = indices[i];
        const [nextIdx, nextInstruction] = indices[i + 1] ?? [str.length - 1, 'do()'];

        if (instruction === 'do()') {
            res += matchMul(str.slice(idx, nextIdx) ?? '');
        }
    }

    return res
}

const result = matchEnabledMul(data);

console.log('-<[result]>-', result);