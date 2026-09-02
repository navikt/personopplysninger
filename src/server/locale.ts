export type Locale = "nb" | "nn" | "en";

const locales: readonly Locale[] = ["nb", "nn", "en"];

/** Astro.currentLocale is a plain string; narrow it to our supported locales. */
export const getLocale = (currentLocale: string | undefined): Locale => {
    if (currentLocale && (locales as readonly string[]).includes(currentLocale)) {
        return currentLocale as Locale;
    }
    return "nb";
};
