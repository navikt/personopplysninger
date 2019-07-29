import moment from "moment";

export const sortDateStringDesc = (a?: string, b?: string) =>
  a && b ? moment(b).diff(moment(a)) : !a && b ? -1 : a && !b ? 1 : 0;
