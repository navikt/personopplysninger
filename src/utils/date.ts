import moment from "moment";

export const dateOneYearAhead = new Date(
  new Date().setFullYear(new Date().getFullYear() + 1)
);
export const oneYearAhead = moment(dateOneYearAhead).format("YYYY-MM-DD");
