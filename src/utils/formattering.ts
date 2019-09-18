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
  landskode: { label: string; value: string },
  input: string
) => {
  input = input.trim();
  if (landskode.value === "+47") {
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

export const RADIX_DECIMAL = 10;
