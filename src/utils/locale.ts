import type { Locale } from "@/store/Store";

const locales: Locale[] = ["nb", "nn", "en"];

/**
 * Gamle lenker uten språk i stien (f.eks. /dsop eller /endre-opplysninger/sendt-fra/...)
 * skal fortsatt virke. Returnerer stien med bokmål lagt til, eller null når stien skal håndteres som vanlig.
 */
export const getLocaleRedirect = (pathname: string, search: string, basePath: string) => {
    if (!pathname.startsWith(`${basePath}/`)) {
        return null;
    }

    const rest = pathname.slice(basePath.length).replace(/^\/+/, "");
    const [firstSegment] = rest.split("/");

    if (!rest || firstSegment === "api" || locales.includes(firstSegment as Locale)) {
        return null;
    }

    return `${basePath}/nb/${rest}${search}`;
};
