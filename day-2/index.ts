const decoder = new TextDecoder('utf-8');
const file = Deno.readFileSync(import.meta.dirname + '/input.txt');
const data = decoder.decode(file);

const reports = data.split('\n').map(v => v.split(' ').map(dv => +dv));

function isSafe(report: number[]) {
  let direction: -1 | 1 | 0 = 0;

  for (let i = 0; i < report.length; i++) {
    const curr = report[i];
    const next = report[i + 1];

    if (next == null) continue;

    const dir = (next - curr) < 0 ? -1 : 1;
    const diff = Math.abs(next - curr);

    // Increase / decrease check
    if (direction === 0) direction = dir;
    else if (direction !== dir) return false; // changing direction is unsafe

    if (diff === 0 || diff > 3) return false; // No diff or too big is unsafe
  }

  return true;
}

function isSafeWithOneBadLevel(report: number[]) {
  const safe = isSafe(report);

  if (!safe) { // Only debunk unsafe
    for (let i = 0; i < report.length; i++) {
      const portion = report.filter((_, idx) => idx !== i);

      if (isSafe(portion)) return true
    }
  }

  return safe;
}

const countSafe = reports.filter(isSafeWithOneBadLevel);

console.log('-<[countSafe]>-', countSafe)
console.log('-<[countSafe.length]>-', countSafe.length)