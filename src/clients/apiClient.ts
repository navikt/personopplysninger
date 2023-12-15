import { logApiError } from '../utils/logger';
import { OutboundTlfnummer } from '../pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/telefonnummer/Telefonnummer';
import { TPSResponse } from '../types/tps-response';
import { Feilmelding } from '../components/httpFeilmelding/HttpFeilmelding';
import { getLoginRedirectUrl } from '../utils/redirects';
import { OutboundNorskKontonummer, OutboundUtenlandsbankonto } from '../pages/forside/sections/4-personinfo/4-utbetalinger/endring/types';
import { Locale } from '../store/Store';

const parseJson = (data: Response) => data.json();

const { REACT_APP_API_URL, REACT_APP_LOGIN_URL, REACT_APP_DSOP_URL, REACT_APP_INNLOGGINGSSTATUS_URL } = process.env;

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

export const fetchInnloggingsStatus = () => sjekkAuthHentJson(REACT_APP_INNLOGGINGSSTATUS_URL || '');

export const fetchKontaktInfo = () => sjekkAuthHentJson(`${REACT_APP_API_URL}/kontaktinformasjon`);

export const fetchRetningsnumre = () => sjekkAuthHentJson(`${REACT_APP_API_URL}/retningsnumre`);

export const fetchInstInfo = () => sjekkAuthHentJson(`${REACT_APP_API_URL}/institusjonsopphold`);

export const fetchMedlInfo = () => sjekkAuthHentJson(`${REACT_APP_API_URL}/medl`);

export const fetchPersonInfo = () => sjekkAuthHentJson(`${REACT_APP_API_URL}/personalia`);

export const fetchLand = () => sjekkAuthHentJson(`${REACT_APP_API_URL}/land`);

export const fetchValutaer = () => sjekkAuthHentJson(`${REACT_APP_API_URL}/valuta`);

export const fetchDsopInfo = () => sjekkAuthHentJson(`${REACT_APP_DSOP_URL}/get`);

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

export const postTlfnummer = (data: OutboundTlfnummer) => postJson(`${REACT_APP_API_URL}/endreTelefonnummer`, data);

export const slettTlfnummer = (data: OutboundTlfnummer) => postJson(`${REACT_APP_API_URL}/slettTelefonnummer`, data);

export const postKontonummer = (data: OutboundNorskKontonummer | OutboundUtenlandsbankonto, locale: Locale) =>
    postJson(`${REACT_APP_API_URL}/endreKontonummer`, data);
// reauthenticate(`${REACT_APP_API_URL}/endreKontonummer`, data, locale);

export const slettKontaktadresse = () => postJson(`${REACT_APP_API_URL}/slettKontaktadresse`);

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
    window.location.assign(`${REACT_APP_LOGIN_URL}?redirect=${redirectUrl}&level=Level4`);
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
