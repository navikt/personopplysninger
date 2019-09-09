import Environment from "../utils/Environments";
import { logApiError } from "../utils/logger";
import { FeatureToggles } from "../providers/Store";
import { HTTPError } from "../components/error/Error";
import { OutboundTlfnummer } from "../pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/telefonnummer/Utils";
import { OutboundNorskKontonummer } from "../pages/forside/sections/4-personinfo/5-utbetalinger/endring/NorskKontonummer";
import { OutboundUtenlandsbankonto } from "../pages/forside/sections/4-personinfo/5-utbetalinger/endring/UtenlandsBankkonto";

const { apiUrl, loginUrl, baseUrl, dsopUrl, appUrl } = Environment();
const parseJson = (data: any) => data.json();

export const sendTilLogin = () => {
  const { pathname } = window.location;

  if (pathname.includes("arbeidsforhold")) {
    window.location.assign(`${loginUrl}?redirect=${appUrl}/arbeidsforhold`);
  } else {
    window.location.assign(`${loginUrl}?redirect=${appUrl}`);
  }
};

const sjekkAuth = (response: Response): any => {
  if (response.status === 401 || response.status === 403) {
    sendTilLogin();
  }
  return response;
};

const sjekkForFeil = (url: string, response: Response) => {
  if (response.ok) {
    return response;
  } else {
    const error = {
      code: response.status,
      text: response.statusText
    };
    throw error;
  }
};

const hentJsonOgSjekkAuth = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    credentials: "include"
  })
    .then(sjekkAuth)
    .then(response => sjekkForFeil(url, response))
    .then(parseJson)
    .catch((err: string & HTTPError) => {
      const error = {
        code: err.code || 404,
        text: err.text || err
      };
      logApiError(url, error);
      throw error;
    });

type Outbound =
  | OutboundTlfnummer
  | OutboundNorskKontonummer
  | OutboundUtenlandsbankonto;

const sendJson = (url: string, data: Outbound) => {
  console.log(url, data);
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  })
    .then(response => sjekkForFeil(url, response))
    .then(parseJson)
    .catch((err: string & HTTPError) => {
      const error = {
        code: err.code || 404,
        text: err.text || err
      };
      logApiError(url, error);
      throw error;
    });
};

export const fetchPersonInfo = () =>
  hentJsonOgSjekkAuth(`${apiUrl}/personalia`);

export const fetchKontaktInfo = () =>
  hentJsonOgSjekkAuth(`${apiUrl}/kontaktinformasjon`);

export const fetchAuthInfo = () =>
  hentJsonOgSjekkAuth(`${baseUrl}/innloggingslinje-api/auth`);

export const fetchRetningsnumre = () =>
  hentJsonOgSjekkAuth(`${apiUrl}/retningsnumre`);

export const fetchLand = () => hentJsonOgSjekkAuth(`${apiUrl}/land`);
export const fetchValutaer = () => hentJsonOgSjekkAuth(`${apiUrl}/valuta`);
export const fetchDsopInfo = () => hentJsonOgSjekkAuth(`${dsopUrl}/get`);

export const postTlfnummer = (data: OutboundTlfnummer) =>
  sendJson(`${apiUrl}/endreTelefonnummer`, data);

export const postKontonummer = (
  data: OutboundNorskKontonummer | OutboundUtenlandsbankonto
) => sendJson(`${apiUrl}/endreKontonummer`, data);

export const slettTlfnummer = (data: OutboundTlfnummer) =>
  sendJson(`${apiUrl}/slettTelefonnummer`, data);

export const getFeatureToggleUrl = (featureToggles: FeatureToggles) =>
  Object.keys(featureToggles)
    .map((feature: string, i: number) => `${!i ? `?` : ``}feature=${feature}`)
    .join("&");

export const fetchFeatureToggles = (featureToggles: FeatureToggles) =>
  hentJsonOgSjekkAuth(
    `${apiUrl}/feature-toggles${getFeatureToggleUrl(featureToggles)}`
  );
