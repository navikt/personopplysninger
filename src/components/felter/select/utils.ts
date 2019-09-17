export const inString = (a?: string, b?: string) =>
  a && b
    ? a
        .toLocaleLowerCase()
        .search(
          b.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&").toLocaleLowerCase()
        ) > -1
    : false;
