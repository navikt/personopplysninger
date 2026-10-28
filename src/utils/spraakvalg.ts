import type { Language } from "@/language/language";

const spraak: Language[] = ["nb", "nn", "en"];

export const getSpraakvalg = (appUrl: string, sti: string) =>
    spraak.map((locale) => ({ locale, url: appUrl + sti.replace(/^\/(nb|nn|en)(\/|$)/, `/${locale}$2`) }));
