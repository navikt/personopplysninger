import { logApiError } from '@/utils/logger';
import { OutboundTlfnummer } from '@/pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/telefonnummer/Telefonnummer';
import { TPSResponse } from '@/types/tps-response';
import { Feilmelding } from '@/components/httpFeilmelding/HttpFeilmelding';
import { getLoginRedirectUrl } from '@/utils/redirects';
import { OutboundNorskKontonummer, OutboundUtenlandsbankonto } from '@/pages/forside/sections/4-personinfo/4-utbetalinger/endring/types';
import { Locale } from '@/store/Store';

const parseJson = (data: Response) => data.json();

const { VITE_API_URL, VITE_LOGIN_URL, VITE_DSOP_URL, VITE_INNLOGGINGSSTATUS_URL } = import.meta.env;

/*
   GET
 */

const sjekkAuthHentJson = (url: string) =>
    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        credentials: 'include',
    })
        .then(sjekkAuth)
        .then(sjekkHttpFeil)
        .then(parseJson)
        .catch((err: string & Feilmelding) => {
            const error = {
                code: err.code || 404,
                type: err.type || 'feil',
                text: err.text ?? err,
            };
            logApiError(url, error);
            throw error;
        });

export const fetchInnloggingsStatus = () => sjekkAuthHentJson(VITE_INNLOGGINGSSTATUS_URL || '');

export const fetchKontaktInfo = () => sjekkAuthHentJson(`${VITE_API_URL}/kontaktinformasjon`);

export const fetchRetningsnumre = () => sjekkAuthHentJson(`${VITE_API_URL}/retningsnumre`);

export const fetchInstInfo = () => sjekkAuthHentJson(`${VITE_API_URL}/institusjonsopphold`);

export const fetchMedlInfo = () => sjekkAuthHentJson(`${VITE_API_URL}/medl`);

export const fetchPersonInfo = () => sjekkAuthHentJson(`${VITE_API_URL}/personalia`);

export const fetchLand = () => sjekkAuthHentJson(`${VITE_API_URL}/land`);

export const fetchValutaer = () => sjekkAuthHentJson(`${VITE_API_URL}/valuta`);

export const fetchDsopInfo = () => sjekkAuthHentJson(`${VITE_DSOP_URL}/get`);

/*
    POST
 */

type Outbound = OutboundTlfnummer | OutboundNorskKontonummer | OutboundUtenlandsbankonto;

const postJson = (url: string, data?: Outbound) => {
    return fetch(url, {
        method: 'POST',
        ...(data && {
            body: JSON.stringify(data),
        }),
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        credentials: 'include',
    })
        .then(sjekkHttpFeil)
        .then(parseJson)
        .then(sjekkTPSFeil)
        .catch((err: string & Feilmelding) => {
            const error = {
                code: err.code || 404,
                type: err.type || 'feil',
                text: err.text ?? err,
            };
            logApiError(url, error);
            throw error;
        });
};

const reauthenticate = (url: string, data: Outbound, locale: Locale) => {
    return fetch(url, {
        method: 'POST',
        ...(data && {
            body: JSON.stringify(data),
        }),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            locale: locale,
        },
        credentials: 'include',
    })
        .then(sjekkHttpFeil)
        .then(sjekkRedirect)
        .catch((err: string & Feilmelding) => {
            const error = {
                code: err.code || 404,
                type: err.type || 'feil',
                text: err.text ?? err,
            };
            logApiError(url, error);
            throw error;
        });
};

export const postTlfnummer = (data: OutboundTlfnummer) => postJson(`${VITE_API_URL}/endreTelefonnummer`, data);

export const slettTlfnummer = (data: OutboundTlfnummer) => postJson(`${VITE_API_URL}/slettTelefonnummer`, data);

export const postKontonummer = (data: OutboundNorskKontonummer | OutboundUtenlandsbankonto, locale: Locale) =>
    reauthenticate(`${VITE_API_URL}/endreKontonummer`, data, locale);

export const slettKontaktadresse = () => postJson(`${VITE_API_URL}/slettKontaktadresse`);

/*
    UTILS
 */

const sjekkRedirect = async (response: Response) => {
    if (response.ok) {
        const data = response.json();
        data.then((data) => {
            window.location.assign(data.redirect || '');
        });
        return response;
    }

    throw {
        code: response.status,
        text: response.status === 400 ? await response.text() : 'Oisann, noe gikk galt! Prøv igjen senere.',
    };
};

const sjekkAuth = (response: Response): Response => {
    if (response.status === 401 || response.status === 403) {
        sendTilLogin();
    }
    return response;
};

export const sendTilLogin = () => {
    const redirectUrl = getLoginRedirectUrl();
    window.location.assign(`${VITE_LOGIN_URL}?redirect=${redirectUrl}&level=Level4`);
};

const sjekkHttpFeil = async (response: Response) => {
    if (response.ok) {
        return response;
    } else {
        throw {
            code: response.status,
            text: response.status === 400 ? await response.text() : 'Oisann, noe gikk galt! Prøv igjen senere.',
        };
    }
};

const sjekkTPSFeil = (response: TPSResponse) => {
    if (response.statusType === 'OK') {
        return response;
    } else {
        throw {
            PENDING: {
                type: 'info',
                text: 'Vi har sendt inn endringen din',
            },
            REJECTED: {
                type: 'feil',
                text: 'personalia.tlfnr.paagaaendeendring.feilmelding',
            },
            ERROR: {
                type: 'feil',
                text: `${response.error && response.error.message}${
                    response.error && response.error.details
                        ? `\n${Object.values(response.error.details)
                              .map((details) => details.join('\n'))
                              .join('\n')}`
                        : ''
                }`,
            },
        }[response.statusType];
    }
};
