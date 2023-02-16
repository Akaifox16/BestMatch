const titleCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const range = (start: number, end: number) =>
  Array.from(Array(end - start + 1).keys()).map((x) => x + start);

const exhaustiveMatchingGuard = (_: never): never => {
  throw new Error('Should not have reached here, please recheck the case');
};

export { titleCase, range, exhaustiveMatchingGuard };
