import type { HentetData } from "@/types/hentetData";

type ServerResult<T> = HentetData<T> | { status: "UNAUTHORIZED" };

interface Logger {
    warn: (message: string) => void;
    error: (message: string) => void;
}

export interface ApiDeps {
    baseUrl: string;
    getOboToken: () => Promise<string>;
    logger: Logger;
}

const standardFeiltekst = "Oisann, noe gikk galt! Prøv igjen senere.";

const feil = (code: number, text = standardFeiltekst): ServerResult<never> => ({ status: "ERROR", error: { code, text } });

export const hentFraApi = async <T>(path: string, deps: ApiDeps): Promise<ServerResult<T>> => {
    const { baseUrl, getOboToken, logger } = deps;

    let token: string;
    try {
        token = await getOboToken();
    } catch (error: any) {
        logger.error(`API-kall ${path}: ${error.message}`);
        return feil(500);
    }

    let response: Response;
    try {
        response = await fetch(`${baseUrl}${path}`, {
            headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
            signal: AbortSignal.timeout(5000),
        });
    } catch (error: any) {
        if (error instanceof DOMException && error.name === "TimeoutError") {
            logger.error(`API-kall ${path} fikk ikke svar innen 5000 ms`);
            return feil(504);
        }
        logger.error(`API-kall ${path} kunne ikke nå API-et: ${error.message}`);
        return feil(502);
    }

    if (response.status === 401 || response.status === 403) {
        logger.warn(`API-kall ${path} ga ${response.status}, sender til innlogging`);
        return { status: "UNAUTHORIZED" };
    }

    try {
        if (!response.ok) {
            logger.error(`API-kall ${path} feilet med status ${response.status}`);
            return response.status === 400 ? feil(400, await response.text()) : feil(response.status);
        }

        return { status: "RESULT", data: (await response.json()) as T };
    } catch (error) {
        if (error instanceof DOMException && error.name === "TimeoutError") {
            logger.error(`API-kall ${path} fikk ikke hele svaret innen 5000 ms`);
            return feil(504);
        }
        logger.error(`API-kall ${path} ga et svar som ikke kunne leses: ${error instanceof Error ? error.name : "ukjent feil"}`);
        return feil(502);
    }
};

export const loginUrlFor = (url: URL, basePath: string) =>
    `${basePath.replace(/\/$/, "")}/oauth2/login?redirect=${url.pathname}${encodeURIComponent(url.search)}`;
