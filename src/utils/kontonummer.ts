import { RADIX_DECIMAL } from "./formattering";

const mod11OfNumberWithControlDigit = (input: string) => {
  let controlNumber: number = 2,
    sumForMod = 0,
    i;

  for (i = input.length - 2; i >= 0; --i) {
    sumForMod += parseInt(input.charAt(i), RADIX_DECIMAL) * controlNumber;
    if (++controlNumber > 7) {
      controlNumber = 2;
    }
  }
  var result = 11 - (sumForMod % 11);

  return result === 11 ? 0 : result;
};

export const validerKontonummer = (accountNumber: string) => {
  if (!accountNumber) {
    return false;
  }
  accountNumber = accountNumber.toString().replace(/\./g, "");
  if (accountNumber.length !== 11) {
    return false;
  }
  return (
    parseInt(accountNumber.charAt(accountNumber.length - 1), 10) ===
    mod11OfNumberWithControlDigit(accountNumber)
  );
};