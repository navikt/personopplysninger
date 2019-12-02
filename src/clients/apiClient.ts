import { logApiError, logEvent } from "../utils/logger";
import { FeatureToggles } from "../store/Store";
import { OutboundTlfnummer } from "../pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/telefonnummer/EndreNummer";
import { OutboundNorskKontonummer } from "../pages/forside/sections/4-personinfo/4-utbetalinger/endring/NorskKontonummer";
import { OutboundUtenlandsbankonto } from "../pages/forside/sections/4-personinfo/4-utbetalinger/endring/utenlandsk-bankkonto/UtenlandsBankkonto";
import { OutboundUtenlandskAdresse } from "../pages/forside/sections/4-personinfo/3-adresser/midlertidig-adresse/endring/UtenlandskAdresse";
import { OutboundGateadresse } from "../pages/forside/sections/4-personinfo/3-adresser/midlertidig-adresse/endring/norske-adresser/Gateadresse";
import { OutboundPostboksadresse } from "../pages/forside/sections/4-personinfo/3-adresser/midlertidig-adresse/endring/norske-adresser/Postboksadresse";
import { OutboundStedsadresse } from "../pages/forside/sections/4-personinfo/3-adresser/midlertidig-adresse/endring/norske-adresser/Stedsadresse";
import { TPSResponse } from "../types/tps-response";
import { AlertType } from "../components/alert/Alert";
import loginservice from "utils/loginservice";
import Environment from "../Environments";
const { apiUrl, loginUrl, dsopUrl, appUrl } = Environment();
const parseJson = (data: Response) => data.json();

/*
  AUTH
  Lettvekt kall for å sjekke autentisering
  Logger ikke 401 eller 403 feil da det forventes
 */

export const sjekkAuthHentNavn = () => {
  const url = `${apiUrl}/name`;
  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    credentials: "include"
  })
    .then(sjekkAuth)
    .then(sjekkHttpFeil)
    .then(parseJson)
    .catch((err: string & AlertType) => {
      const error = {
        code: err.code || 404,
        type: err.type || "feil",
        text: err.text || err
      };
      if (error.code !== 401 && error.code !== 403) {
        logApiError(url, error);
        throw error;
      }
    });
};

/*
   FETCH
 */

const sjekkAuthHentJson = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    credentials: "include"
  })
    .then(sjekkAuth)
    .then(sjekkHttpFeil)
    .then(parseJson)
    .catch((err: string & AlertType) => {
      const error = {
        code: err.code || 404,
        type: err.type || "feil",
        text: err.text || err
      };
      logApiError(url, error);
      throw error;
    });

export const fetchFeatureToggles = (featureToggles: FeatureToggles) =>
  sjekkAuthHentJson(
    `${apiUrl}/feature-toggles${getFeatureToggleUrl(featureToggles)}`
  );

export const fetchKontaktInfo = () =>
  sjekkAuthHentJson(`${apiUrl}/kontaktinformasjon`);

export const fetchRetningsnumre = () =>
  sjekkAuthHentJson(`${apiUrl}/retningsnumre`);

export const fetchInstInfo = () =>
  sjekkAuthHentJson(`${apiUrl}/hentInstitusjonsopphold`);

export const fetchSkattetreksmeldinger = () =>
  sjekkAuthHentJson(`${apiUrl}/skattetreksmeldinger`);

export const fetchPostnummer = () => sjekkAuthHentJson(`${apiUrl}/postnummer`);
export const fetchPersonInfo = () => sjekkAuthHentJson(`${apiUrl}/personalia`);
export const fetchLand = () => sjekkAuthHentJson(`${apiUrl}/land`);
export const fetchValutaer = () => sjekkAuthHentJson(`${apiUrl}/valuta`);
export const fetchDsopInfo = () => sjekkAuthHentJson(`${dsopUrl}/get`);

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

const postJson = (url: string, data: Outbound) => {
  console.log(url, data);
  logEvent({ url });
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    credentials: "include"
  })
    .then(sjekkHttpFeil)
    .then(parseJson)
    .then(sjekkTPSFeil)
    .catch((err: string & AlertType) => {
      const error = {
        code: err.code || 404,
        type: err.type || "feil",
        text: err.text || err
      };
      logApiError(url, error);
      throw error;
    });
};

export const postTlfnummer = (data: OutboundTlfnummer) =>
  postJson(`${apiUrl}/endreTelefonnummer`, data);

export const slettTlfnummer = (data: OutboundTlfnummer) =>
  postJson(`${apiUrl}/slettTelefonnummer`, data);

export const postKontonummer = (
  data: OutboundNorskKontonummer | OutboundUtenlandsbankonto
) => postJson(`${apiUrl}/endreKontonummer`, data);

export const postGateadresse = (data: OutboundGateadresse) =>
  postJson(`${apiUrl}/endreGateadresse`, data);

export const postPostboksadresse = (data: OutboundPostboksadresse) =>
  postJson(`${apiUrl}/endrePostboksadresse`, data);

export const postStedsadresse = (data: OutboundStedsadresse) =>
  postJson(`${apiUrl}/endreStedsadresse`, data);

export const postUtenlandskAdresse = (data: OutboundUtenlandskAdresse) =>
  postJson(`${apiUrl}/endreUtenlandsadresse`, data);

/*
    PUT
 */

const putJson = (url: string) => {
  logEvent({ url });
  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    credentials: "include"
  })
    .then(sjekkHttpFeil)
    .then(parseJson)
    .then(sjekkTPSFeil)
    .catch((err: string & AlertType) => {
      const error = {
        code: err.code || 404,
        type: err.type || "feil",
        text: err.text || err
      };
      logApiError(url, error);
      throw error;
    });
};

export const slettUtenlandsAdresse = () =>
  putJson(`${apiUrl}/opphoerUtenlandskKontaktadresse`);

export const slettMidlertidigAdresse = () =>
  putJson(`${apiUrl}/opphoerNorskKontaktadresse`);

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
  sessionStorage.setItem("redirect", window.location.pathname);
  window.location.assign(`${loginUrl}?redirect=${appUrl}`);
};

const sjekkHttpFeil = (response: Response) => {
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

const sjekkTPSFeil = (response: TPSResponse) => {
  if (response.statusType === "OK") {
    return response;
  } else {
    const error = {
      PENDING: {
        code: 534,
        type: `info`,
        text: `${(response.error && response.error.message) ||
          `Vi har sendt inn endringen din.`}`
      },
      ERROR: {
        code: 400,
        type: `feil`,
        text: `${response.error && response.error.message}${
          response.error && response.error.details
            ? `\n${Object.values(response.error.details)
                .map(details => details.join("\n"))
                .join("\n")}`
            : ``
        }`
      }
    }[response.statusType];
    throw error;
  }
};

export const getFeatureToggleUrl = (featureToggles: FeatureToggles) =>
  Object.keys(featureToggles)
    .map((feature: string, i: number) => `${!i ? `?` : ``}feature=${feature}`)
    .join("&");
