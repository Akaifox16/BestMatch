const titleCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const range = (start: number, end: number) =>
  Array.from(Array(end - start + 1).keys()).map((x) => x + start);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const exhaustiveMatchingGuard = (_: never): never => {
  throw new Error('Should not have reached here, please recheck the case');
};

const flattenedTimerange = (
  timerange: { start: number; stop: number }[]
): string[] => {
  return timerange.reduce((acc, { start, stop }) => {
    for (let i = start; i <= stop; i++) {
      acc.push(i.toString());
    }
    return acc;
  }, [] as string[]);
};

const changeRange = (timerange: string[]) => {
  return (
    timerange
      .map((timeStr) => {
        const start = parseInt(timeStr);
        // const next = parseInt(arr[idx + 1]);
        // if (next - start !== 1) return { start, stop: start + 1 };
        // return null;
        return { start, stop: start + 1 };
      })
      // .filter((range) => range !== null)
      .reduce((acc, range) => {
        const prevRange = acc[acc.length - 1];
        if (prevRange && prevRange.stop === range.start)
          prevRange.stop = range.stop;
        else acc.push(range);
        return acc;
      }, [] as { start: number; stop: number }[])
  );
};

export {
  titleCase,
  range,
  exhaustiveMatchingGuard,
  flattenedTimerange,
  changeRange,
};
