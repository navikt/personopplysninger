import Environment from "../Environments";
import { logApiError } from "../utils/logger";
import { FeatureToggles } from "../providers/Store";
import { HTTPError } from "../components/error/Error";
import { OutboundTlfnummer } from "../pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/telefonnummer/Utils";
import { OutboundNorskKontonummer } from "../pages/forside/sections/4-personinfo/5-utbetalinger/endring/NorskKontonummer";
import { OutboundUtenlandsbankonto } from "../pages/forside/sections/4-personinfo/5-utbetalinger/endring/UtenlandsBankkonto";
import { OutboundUtenlandskAdresse } from "../pages/forside/sections/4-personinfo/3-adresser/midlertidig-adresse/endring/UtenlandskAdresse";
import { OutboundGateadresse } from "../pages/forside/sections/4-personinfo/3-adresser/midlertidig-adresse/endring/norske-adresser/Gateadresse";
import { OutboundPostboksadresse } from "../pages/forside/sections/4-personinfo/3-adresser/midlertidig-adresse/endring/norske-adresser/Postboksadresse";
import { OutboundStedsadresse } from "../pages/forside/sections/4-personinfo/3-adresser/midlertidig-adresse/endring/norske-adresser/Stedsadresse";

const { apiUrl, loginUrl, baseUrl, dsopUrl, appUrl } = Environment();
const parseJson = (data: Response) => data.json();

/*
    FETCH
 */

const hentJsonOgSjekkAuth = (url: string) => {
  console.log(url);
  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    credentials: "include"
  })
    .then(sjekkAuth)
    .then(sjekkForFeil)
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

export const fetchPersonInfoDummy = () =>
  hentJsonOgSjekkAuth(`${apiUrl}/personalia-dummy`);

export const fetchKontaktInfo = () =>
  hentJsonOgSjekkAuth(`${apiUrl}/kontaktinformasjon`);

export const fetchAuthInfo = () =>
  hentJsonOgSjekkAuth(`${baseUrl}/innloggingslinje-api/auth`);

export const fetchRetningsnumre = () =>
  hentJsonOgSjekkAuth(`${apiUrl}/retningsnumre`);

export const fetchPostnummer = () =>
  hentJsonOgSjekkAuth(`${apiUrl}/postnummer`);

export const fetchFeatureToggles = (featureToggles: FeatureToggles) =>
  hentJsonOgSjekkAuth(
    `${apiUrl}/feature-toggles${getFeatureToggleUrl(featureToggles)}`
  );

export const fetchLand = () => hentJsonOgSjekkAuth(`${apiUrl}/land`);
export const fetchValutaer = () => hentJsonOgSjekkAuth(`${apiUrl}/valuta`);
export const fetchDsopInfo = () => hentJsonOgSjekkAuth(`${dsopUrl}/get`);

/*
    POST
 */

type Outbound =
  | OutboundTlfnummer
  | OutboundGateadresse
  | OutboundPostboksadresse
  | OutboundStedsadresse
  | OutboundUtenlandskAdresse
  | OutboundNorskKontonummer
  | OutboundUtenlandsbankonto;

const sendJson = (url: string, data: Outbound) => {
  console.log(url, data);
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  })
    .then(sjekkForFeil)
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

export const postTlfnummer = (data: OutboundTlfnummer) =>
  sendJson(`${apiUrl}/endreTelefonnummer`, data);

export const postKontonummer = (
  data: OutboundNorskKontonummer | OutboundUtenlandsbankonto
) => sendJson(`${apiUrl}/endreKontonummer`, data);

export const postUtenlandskAdresse = (data: OutboundUtenlandskAdresse) =>
  sendJson(`${apiUrl}/endreUtenlandsadresse`, data);

export const postGateadresse = (data: OutboundGateadresse) =>
  sendJson(`${apiUrl}/endreGateadresse`, data);

export const postPostboksadresse = (data: OutboundPostboksadresse) =>
  sendJson(`${apiUrl}/endrePostboksadresse`, data);

export const postStedsadresse = (data: OutboundStedsadresse) =>
  sendJson(`${apiUrl}/endreStedsadresse`, data);

export const slettTlfnummer = (data: OutboundTlfnummer) =>
  sendJson(`${apiUrl}/slettTelefonnummer`, data);

/*
    UTILS
 */

const sjekkAuth = (response: Response): any => {
  if (response.status === 401 || response.status === 403) {
    sendTilLogin();
  }
  return response;
};

export const sendTilLogin = () => {
  const { pathname } = window.location;
  if (pathname.includes("arbeidsforhold")) {
    window.location.assign(`${loginUrl}?redirect=${appUrl}/arbeidsforhold`);
  } else {
    window.location.assign(`${loginUrl}?redirect=${appUrl}`);
  }
};

const sjekkForFeil = (response: Response) => {
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

export const getFeatureToggleUrl = (featureToggles: FeatureToggles) =>
  Object.keys(featureToggles)
    .map((feature: string, i: number) => `${!i ? `?` : ``}feature=${feature}`)
    .join("&");
