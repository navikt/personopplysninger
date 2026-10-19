import type { HTTPError } from "@/components/errorMessage/ErrorMessage";

export type ServerResult<T> = { status: "RESULT"; data: T } | { status: "ERROR"; error: HTTPError } | { status: "UNAUTHORIZED" };

interface Logger {
    warn: (message: string) => void;
    error: (message: string) => void;
}

export interface ApiDeps {
    baseUrl: string;
    getOboToken: () => Promise<string>;
    logger: Logger;
    timeoutMs?: number;
    fetch?: typeof fetch;
}

// Samme tekst som nettleserklienten viser, slik at feiltilstanden ser lik ut uansett hvor dataene hentes.
const standardFeiltekst = "Oisann, noe gikk galt! Prøv igjen senere.";

const feil = (code: number, text = standardFeiltekst): ServerResult<never> => ({ status: "ERROR", error: { code, text } });

const meldingFra = (error: unknown) => (error instanceof Error ? error.message : String(error));

// Logger bare sti, status og feiltype: svarinnhold og token kan inneholde persondata.
export const hentFraApi = async <T>(path: string, deps: ApiDeps): Promise<ServerResult<T>> => {
    const { baseUrl, getOboToken, logger, timeoutMs = 5000, fetch: fetchImpl = fetch } = deps;

    let token: string;
    try {
        token = await getOboToken();
    } catch (error) {
        logger.error(`API-kall ${path}: ${meldingFra(error)}`);
        return feil(500);
    }

    let response: Response;
    try {
        response = await fetchImpl(`${baseUrl}${path}`, {
            headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
            signal: AbortSignal.timeout(timeoutMs),
        });
    } catch (error) {
        if (error instanceof DOMException && error.name === "TimeoutError") {
            logger.error(`API-kall ${path} fikk ikke svar innen ${timeoutMs} ms`);
            return feil(504);
        }
        logger.error(`API-kall ${path} kunne ikke nå API-et: ${meldingFra(error)}`);
        return feil(502);
    }

    if (response.status === 401 || response.status === 403) {
        logger.warn(`API-kall ${path} ga ${response.status}, sender til innlogging`);
        return { status: "UNAUTHORIZED" };
    }

    if (!response.ok) {
        logger.error(`API-kall ${path} feilet med status ${response.status}`);
        return response.status === 400 ? feil(400, await response.text()) : feil(response.status);
    }

    return { status: "RESULT", data: (await response.json()) as T };
};

// Samme form som @navikt/astro-auth bruker når brukeren mangler gyldig token.
export const loginUrlFor = (url: URL, basePath: string) =>
    `${basePath.replace(/\/$/, "")}/oauth2/login?redirect=${url.pathname}${encodeURIComponent(url.search)}`;
