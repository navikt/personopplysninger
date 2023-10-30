export const formatterKontonr = (kontonummer: string) =>
    kontonummer && kontonummer.length === 11 ? kontonummer.replace(/^(.{4})(.{2})(.*)$/, '$1 $2 $3') : kontonummer;
