export const formatName = (str?: string) =>
  str
    ? str
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
    : "";

export const mergeAddress = (
  adresse1?: string,
  adresse2?: string,
  adresse3?: string
) => `${adresse1 || ""}${adresse2 || ""}${adresse3 || ""}`;

export const print = (tekst?: string) => (tekst ? tekst : "");

export const UNKNOWN = "ukjent-verdi";
