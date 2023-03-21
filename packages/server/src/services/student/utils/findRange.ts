type TimeRange = {
  start: number;
  stop: number;
};

export default function findRange(timerange: string[]): TimeRange[] {
  return timerange.reduce((ranges: TimeRange[], t: string) => {
    const num = parseInt(t);

    if (ranges.length === 0 || num !== ranges[ranges.length - 1].stop + 1) {
      ranges.push({ start: num, stop: num });
    } else {
      ranges[ranges.length - 1].stop = num;
    }

    return ranges;
  }, []);
}
