import { getKlientConfig } from "@/config/klientConfig";

const redirectPathParam = "path";

export const redirects: {
    [key: string]: {
        beskrivelseFoer: string;
        beskrivelseUthevet: string;
        beskrivelseEtter: string;
        knapp: string;
    };
} = {
    "skjema/alderspensjonssoknad": {
        beskrivelseFoer: "Du har blitt sendt fra alderspensjon. Her kan du legge til eller endre ",
        beskrivelseUthevet: "kontaktinformasjon og kontonummer",
        beskrivelseEtter: ".",
        knapp: "Gå tilbake til alderspensjon",
    },
    "skjema/alderspensjon": {
        beskrivelseFoer: "Du har blitt sendt fra alderspensjon. Her kan du legge til eller endre ",
        beskrivelseUthevet: "kontaktinformasjon og kontonummer",
        beskrivelseEtter: ".",
        knapp: "Gå tilbake til alderspensjon",
    },
};

export const tillatteTjenester = Object.keys(redirects);

const navnoUrlPattern = new RegExp("^https:\\/\\/((?:[a-z0-9_.-]+\\.(?!$))+)*nav\\.no($|/)", "i");

export const validateAndDecodeRedirectUrl = (encodedUrl?: string) => {
    if (!encodedUrl) {
        return null;
    }

    try {
        const decodedUrl = decodeURIComponent(encodedUrl);

        const url = new URL(decodedUrl);
        const sanitizedUrl = `${url.protocol}//${url.host}${url.pathname}${url.search}`;

        return navnoUrlPattern.test(sanitizedUrl) ? sanitizedUrl : null;
    } catch {
        return null;
    }
};

export const getLoginRedirectUrl = () => {
    const encodedPath = btoa(window.location.pathname + window.location.hash);
    return `${getKlientConfig().appUrl}?${redirectPathParam}=${encodeURIComponent(encodedPath)}`;
};

export const resolveLoginReturnPath = (encodedPath: string | null, basePath: string) => {
    if (!encodedPath) {
        return null;
    }

    try {
        const path = atob(encodedPath);
        const prefix = `${basePath}/`;

        if (!path.startsWith(prefix) || path.startsWith(`${prefix}/`) || path.includes("\\")) {
            return null;
        }

        const url = new URL(path, "http://localhost");

        if (url.origin !== "http://localhost" || !url.pathname.startsWith(prefix) || url.pathname.split("/").includes("..")) {
            return null;
        }

        return `${url.pathname}${url.search}${url.hash}`;
    } catch {
        return null;
    }
};
