export const normalizeNummer = (input: string) => {
  return input.replace(/\D/g, "");
};

export const formatOrgnr = (input: string) => input.replace(/(?=.{3}$)/, " ").replace(/(?=.{7}$)/, " ");

export const fjernMellorom = (value: string) => {
  if (value) {
    return value.replace(/\s+/g, "");
  }
  return value;
};

export const formatTelefonnummer = (prioritet: 1 | 2, input: string, landskode?: string) => {
  if (landskode === "+47") {
    switch (input.charAt(0)) {
      case "4":
      case "9":
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
      default:
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
    }
  }

  return input;
};

export const RADIX_DECIMAL = 10;
