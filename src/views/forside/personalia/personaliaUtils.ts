import type { Language } from "@/language/language";
import { text } from "./personaliaText";

export const formatterPersonident = (personident?: { verdi: string; type: string }) =>
    personident && personident.verdi.length === 11 ? { ...personident, verdi: personident.verdi.replace(/^(.{6})(.*)$/, "$1 $2") } : personident;

export const fornavnTittel = (fornavn: string | undefined, language: Language) =>
    fornavn && fornavn.indexOf(" ") === -1 ? text.fornavn[language] : text.forOgMellomnavn[language];
