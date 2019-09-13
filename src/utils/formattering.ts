export const normalizeNummer = (input: string) => {
  return input.replace(/\D/g, "");
};

export const formatKontonummer = (input: string) => {
  if (input.length > 6) {
    return input.replace(/^(.{4})(.{2})(.*)$/, "$1 $2 $3");
  }
  if (input.length > 4) {
    return input.replace(/^(.{4})(.*)$/, "$1 $2");
  }
  return input;
};

export const formatTelefonnummer = (
  type: string,
  landskode: string,
  input: string
) => {
  input = input.trim();
  if (landskode === "+47") {
    switch (type) {
      case "MOBIL":
        if (input.length > 8) {
          return input.replace(/^(.{3})(.{2})(.{3})(.*)$/, "$1 $2 $3");
        }
        if (input.length > 5) {
          return input.replace(/^(.{3})(.{2})(.*)$/, "$1 $2 $3");
        }
        if (input.length > 3) {
          return input.replace(/^(.{3})(.*)$/, "$1 $2");
        }
        break;
      case "HJEM":
      case "ARBEID":
        if (input.length > 8) {
          return input.replace(/^(.{2})(.{2})(.{2})(.{2})(.*)$/, "$1 $2 $3 $4");
        }
        if (input.length > 6) {
          return input.replace(/^(.{2})(.{2})(.{2})(.*)$/, "$1 $2 $3 $4");
        }
        if (input.length > 4) {
          return input.replace(/^(.{2})(.{2})(.*)$/, "$1 $2 $3");
        }
        if (input.length > 2) {
          return input.replace(/^(.{2})(.*)$/, "$1 $2");
        }
        break;
    }
  }

  return input;
};

export const erInteger = (str: string) => {
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n >= 0;
};

export const visDersomInteger = (value?: string) =>
  value ? parseInt(value, RADIX_DECIMAL) : undefined;

export const settDersomInteger = (value: string) =>
  erInteger(value) ? parseInt(value, RADIX_DECIMAL) : undefined;

export const RADIX_DECIMAL = 10;
