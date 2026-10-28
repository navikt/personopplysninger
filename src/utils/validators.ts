import type { OptionType } from "@/types/option";
import type { Tlfnr } from "../types/personalia";
import { normalizeNummer } from "./formattering";
import { isMod11 } from "./kontonummer";

export const isNormalizedLength = (value: string, length: number) => normalizeNummer(value).length === length;

export const isNormalizedMod11 = (value: string) => isMod11(normalizeNummer(value));

export const hasMultipleCombinedSpaces = (value: string) => !!value.match(/\s\s/);

export const isFirstCharNotSpace = (value: string) => value.charAt(0) !== " ";

export const isNumeric = (value: string) => {
    return !!value.match(regExpPattern.onlyNumeric);
};

export const isLettersAndDigits = (value: string) => {
    return !!value.match(regExpPattern.onlyAlphaNumeric);
};

export const isBlacklistedCommon = (value: string) => BLACKLISTED_WORDS.some((substring) => value.toLowerCase().includes(substring));

export const isIBANCountryCompliant = (value: string, land?: OptionType) => {
    const ibanPrefix = value && value.substring(0, 2);
    const selectedCountryAlpha2 = land?.value;
    const selectedCountryPrefixAlternative = land?.alternativLandkode;

    return ibanPrefix === selectedCountryAlpha2 || ibanPrefix === selectedCountryPrefixAlternative;
};

export const isBICCountryCompliant = (value: string, land?: OptionType) =>
    value.substring(4, 6) === land?.value || value.substring(4, 6) === land?.alternativLandkode;

export const isBankkodeValidLength = (value: string, land?: OptionType) => value.length === land?.bankkodeLengde;

export const isOnlyNonLetters = (value: string) => !!normalizeInput(value).match(regExpPattern.onlyNonLetters);

export const isOnlySignsSpace = (value: string) => !!normalizeInput(value).match(regExpPattern.onlySignsSpace);

export const isValidBanknavn = (value: string) => !!normalizeInput(value).match(regExpPattern.validBanknavn);

export const isValidAdresselinje = (value: string) => !!normalizeInput(value).match(regExpPattern.validBankadresselinje);

export const isNotAlreadyRegistered = (value: string, tlfnr: Tlfnr) => {
    return ![tlfnr.telefonHoved, tlfnr.telefonAlternativ].includes(value);
};

export const isNorwegianNumber = (landskode: OptionType) => landskode.value === "+47";

const LATIN_LETTERS = "A-Za-z";
const NORWEGIAN_LETTERS = LATIN_LETTERS + "ÆØÅæøå";
const SPECIAL_LETTERS = "ıłŁŊŋŦŧƁɓƊɗƓɠƘƙƤƥƬƭÞþßԈБ\\u0189\\u0256\\u00D0\\u00F0\\u00F0\\u0111\\u01E4\\u01E5\\u0187\\u0188\\u01B3\\u01B4";
const ALL_LETTERS = NORWEGIAN_LETTERS + SPECIAL_LETTERS;
const DIGITS = "0-9";
const SPACE = " ";
const HYPHEN = "\\-";
const PERIOD = ".";
const APOSTROPHE = "'";
const FORWARD_SLASH = "/";
const COMMA = ",";
const COLON = ":";
const NUMBER_SIGN = "#";
const AMPERSAND = "&";

const regExpCreator = (regExpAsArray: string[], flag = "i"): RegExp => new RegExp(regExpAsArray.join(""), flag);

const regExpPattern = {
    onlyNonLetters: regExpCreator(["^[^", ALL_LETTERS, "]+$"]),
    onlySignsSpace: regExpCreator(["^[^", ALL_LETTERS, DIGITS, "]+$"]),
    onlyAlphaNumeric: regExpCreator(["^[", NORWEGIAN_LETTERS, DIGITS, "]+$"]),
    onlyNumeric: regExpCreator(["^[", DIGITS, "]+$"]),
    validBankadresselinje: regExpCreator([
        "^[",
        ALL_LETTERS,
        DIGITS,
        SPACE,
        HYPHEN,
        PERIOD,
        COMMA,
        COLON,
        APOSTROPHE,
        FORWARD_SLASH,
        AMPERSAND,
        NUMBER_SIGN,
        "]+$",
    ]),
    validBanknavn: regExpCreator(["^[", ALL_LETTERS, DIGITS, SPACE, HYPHEN, PERIOD, COMMA, APOSTROPHE, FORWARD_SLASH, AMPERSAND, "]+$"]),
};

const BLACKLISTED_WORDS = ["ukjent", "ikke kjent", "vet ikke", "uoppgitt", "n.n.", "nomen nescio"];

const normalizeInput = (val: string): string => {
    const dekomponert = val.normalize("NFD");
    return dekomponert.replace(/[\u0300-\u036f]/g, "");
};
