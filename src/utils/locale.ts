import type { Language } from "@/language/language";

const locales: Language[] = ["nb", "nn", "en"];

export const getLocaleRedirect = (pathname: string, search: string, basePath: string) => {
    if (!pathname.startsWith(`${basePath}/`)) {
        return null;
    }

    const rest = pathname.slice(basePath.length).replace(/^\/+/, "");
    const [firstSegment] = rest.split("/");

    if (!rest || firstSegment === "api" || locales.includes(firstSegment as Language)) {
        return null;
    }

    return `${basePath}/nb/${rest}${search}`;
};
