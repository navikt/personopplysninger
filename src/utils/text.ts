export const UNKNOWN = "ukjent-verdi";
export const print = (tekst?: string) => (tekst ? tekst : "");

export const formatName = (str?: string) =>
  str
    ? str
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
    : "";
