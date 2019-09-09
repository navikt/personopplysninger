export const isValueEqual = (a: string, b: string) => a === b;
export const inString = (a: string, b: string) =>
  a
    .toLocaleLowerCase()
    .search(b.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&").toLocaleLowerCase()) >
  -1;
