type TimeRange = {
  start: number;
  stop: number;
};

export default function findRange(timerange: string[]): TimeRange[] {
  const ranges: TimeRange[] = [];

  for (let i = 0; i < timerange.length; i++) {
    const num = parseInt(timerange[i]);

    if (i === 0 || num !== parseInt(timerange[i - 1]) + 1) {
      // start a new range
      ranges.push({ start: num, stop: num });
    } else {
      // continue the current range
      ranges[ranges.length - 1].stop = num;
    }
  }

  return ranges;
}
