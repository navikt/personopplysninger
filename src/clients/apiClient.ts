import type { Feilmelding } from "@/components/httpFeilmelding/HttpFeilmelding";
import { PAAGAAENDE_ENDRING } from "@/components/httpFeilmelding/httpFeilmeldingText";
import { getRuntimeConfig } from "@/config/runtimeConfig";
import type { Language } from "@/language/language";
import type { TPSResponse } from "@/types/tps-response";
import { logApiError } from "@/utils/logger";
import { getLoginRedirectUrl } from "@/utils/redirects";
import type { OutboundNorskKontonummer, OutboundUtenlandsbankonto } from "@/views/endre-kontonummer/endring/types";
import type { OutboundTlfnummer } from "@/views/forside/sections/4-personinfo/2-kontaktinfo/subsections/telefonnummer/Telefonnummer";

const parseJson = (data: Response) => data.json();

const apiUrl = () => getRuntimeConfig().apiUrl;

const sjekkAuthHentJson = (url: string) =>
    fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        credentials: "include",
    })
        .then(sjekkAuth)
        .then(sjekkHttpFeil)
        .then(parseJson)
        .catch((err: string & Feilmelding) => {
            const error = {
                code: err.code || 404,
                type: err.type || "feil",
                text: err.text ?? err,
            };
            logApiError(url, error);
            throw error;
        });

export const fetchRetningsnumre = () => sjekkAuthHentJson(`${apiUrl()}/retningsnumre`);

export const fetchPersonInfo = () => sjekkAuthHentJson(`${apiUrl()}/personalia`);

export const fetchLand = () => sjekkAuthHentJson(`${apiUrl()}/land`);

export const fetchValutaer = () => sjekkAuthHentJson(`${apiUrl()}/valuta`);

type Outbound = OutboundTlfnummer | OutboundNorskKontonummer | OutboundUtenlandsbankonto;

const postJson = (url: string, data?: Outbound) => {
    return fetch(url, {
        method: "POST",
        ...(data && {
            body: JSON.stringify(data),
        }),
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        credentials: "include",
    })
        .then(sjekkHttpFeil)
        .then(parseJson)
        .then(sjekkTPSFeil)
        .catch((err: string & Feilmelding) => {
            const error = {
                code: err.code || 404,
                type: err.type || "feil",
                text: err.text ?? err,
            };
            logApiError(url, error);
            throw error;
        });
};

const reauthenticate = (url: string, data: Outbound, language: Language) => {
    return fetch(url, {
        method: "POST",
        ...(data && {
            body: JSON.stringify(data),
        }),
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            locale: language,
        },
        credentials: "include",
    })
        .then(sjekkHttpFeil)
        .then(sjekkRedirect)
        .catch((err: string & Feilmelding) => {
            const error = {
                code: err.code || 404,
                type: err.type || "feil",
                text: err.text ?? err,
            };
            logApiError(url, error);
            throw error;
        });
};

export const postTlfnummer = (data: OutboundTlfnummer) => postJson(`${apiUrl()}/endreTelefonnummer`, data);

export const slettTlfnummer = (data: OutboundTlfnummer) => postJson(`${apiUrl()}/slettTelefonnummer`, data);

export const postKontonummer = (data: OutboundNorskKontonummer | OutboundUtenlandsbankonto, language: Language) =>
    reauthenticate(`${getRuntimeConfig().endreKontonummerUrl}/endreKontonummer`, data, language);

export const slettKontaktadresse = () => postJson(`${apiUrl()}/slettKontaktadresse`);

const sjekkRedirect = async (response: Response) => {
    if (response.ok) {
        const data = response.json();
        data.then((data) => {
            window.location.assign(data.redirect || "");
        });
        return response;
    }

    throw {
        code: response.status,
        text: response.status === 400 ? await response.text() : "Oisann, noe gikk galt! Prøv igjen senere.",
    };
};

const sjekkAuth = (response: Response): Response => {
    if (response.status === 401 || response.status === 403) {
        sendTilLogin();
    }
    return response;
};

const sendTilLogin = () => {
    const redirectUrl = getLoginRedirectUrl();
    window.location.assign(`${getRuntimeConfig().loginUrl}?redirect=${redirectUrl}&level=Level4`);
};

const sjekkHttpFeil = async (response: Response) => {
    if (response.ok) {
        return response;
    } else {
        throw {
            code: response.status,
            text: response.status === 400 ? await response.text() : "Oisann, noe gikk galt! Prøv igjen senere.",
        };
    }
};

const sjekkTPSFeil = (response: TPSResponse) => {
    if (response.statusType === "OK") {
        return response;
    } else {
        throw {
            PENDING: {
                type: "info",
                text: "Vi har sendt inn endringen din",
            },
            REJECTED: {
                type: "feil",
                text: PAAGAAENDE_ENDRING,
            },
            ERROR: {
                type: "feil",
                text: `${response.error && response.error.message}${
                    response.error && response.error.details
                        ? `\n${Object.values(response.error.details)
                              .map((details) => details.join("\n"))
                              .join("\n")}`
                        : ""
                }`,
            },
        }[response.statusType];
    }
};
