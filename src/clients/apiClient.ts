import { logApiError, logEvent } from "../utils/logger";
import { FeatureToggles } from "../store/Store";
import { OutboundTlfnummer } from "../pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/telefonnummer/EndreNummer";
import { OutboundNorskKontonummer } from "../pages/forside/sections/4-personinfo/4-utbetalinger/endring/NorskKontonummer";
import { OutboundUtenlandsbankonto } from "../pages/forside/sections/4-personinfo/4-utbetalinger/endring/utenlandsk-bankkonto/UtenlandsBankkonto";
import { OutboundUtenlandskVegadresse } from "../pages/forside/sections/4-personinfo/3-adresser/kontaktadresse/endring/utenlanske-adresser/Vegadresse";
import { OutboundUtenlandskPostboksadresse } from "../pages/forside/sections/4-personinfo/3-adresser/kontaktadresse/endring/utenlanske-adresser/Postboksadresse";
import { OutboundNorskVegadresse } from "../pages/forside/sections/4-personinfo/3-adresser/kontaktadresse/endring/norske-adresser/Vegadresse";
import { OutboundPostboksadresse } from "../pages/forside/sections/4-personinfo/3-adresser/kontaktadresse/endring/norske-adresser/Postboksadresse";
import { TPSResponse } from "../types/tps-response";
import { AlertType } from "../components/alert/Alert";
import { getLoginserviceRedirectUrl } from "../utils/redirects";

const parseJson = (data: Response) => data.json();

const {
  REACT_APP_API_URL,
  REACT_APP_LOGIN_URL,
  REACT_APP_DSOP_URL,
  REACT_APP_INNLOGGINGSSTATUS_URL,
} = process.env;

/*
   GET
 */

const sjekkAuthHentJson = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    credentials: "include",
  })
    .then(sjekkAuth)
    .then(sjekkHttpFeil)
    .then(parseJson)
    .catch((err: string & AlertType) => {
      const error = {
        code: err.code || 404,
        type: err.type || "feil",
        text: err.text || err,
      };
      logApiError(url, error);
      throw error;
    });

export const fetchInnloggingsStatus = () => sjekkAuthHentJson(REACT_APP_INNLOGGINGSSTATUS_URL || "");

export const fetchFeatureToggles = (featureToggles: FeatureToggles) =>
  sjekkAuthHentJson(
    `${REACT_APP_API_URL}/feature-toggles${getFeatureToggleUrl(featureToggles)}`
  );

export const fetchKontaktInfo = () =>
  sjekkAuthHentJson(`${REACT_APP_API_URL}/kontaktinformasjon`);

export const fetchRetningsnumre = () =>
  sjekkAuthHentJson(`${REACT_APP_API_URL}/retningsnumre`);

export const fetchInstInfo = () =>
  sjekkAuthHentJson(`${REACT_APP_API_URL}/institusjonsopphold`);

export const fetchskattetrekksmeldinger = () =>
  sjekkAuthHentJson(`${REACT_APP_API_URL}/skattetrekksmeldinger`);

export const fetchMedlInfo = () =>
  sjekkAuthHentJson(`${REACT_APP_API_URL}/medl`);

export const fetchPostnummer = () =>
  sjekkAuthHentJson(`${REACT_APP_API_URL}/postnummer`);

export const fetchPersonInfo = () =>
  sjekkAuthHentJson(`${REACT_APP_API_URL}/personalia`);

export const fetchLand = () => sjekkAuthHentJson(`${REACT_APP_API_URL}/land`);

export const fetchValutaer = () =>
  sjekkAuthHentJson(`${REACT_APP_API_URL}/valuta`);

export const fetchDsopInfo = () =>
  sjekkAuthHentJson(`${REACT_APP_DSOP_URL}/get`);

/*
    POST
 */

type Outbound =
  | OutboundTlfnummer
  | OutboundNorskVegadresse
  | OutboundPostboksadresse
  | OutboundUtenlandskVegadresse
  | OutboundNorskKontonummer
  | OutboundUtenlandsbankonto;

const postJson = (url: string, data?: Outbound) => {
  console.log(url, data);
  logEvent({ url });
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
    .catch((err: string & AlertType) => {
      const error = {
        code: err.code || 404,
        type: err.type || "feil",
        text: err.text || err,
      };
      logApiError(url, error);
      throw error;
    });
};

export const postTlfnummer = (data: OutboundTlfnummer) =>
  postJson(`${REACT_APP_API_URL}/endreTelefonnummer`, data);

export const slettTlfnummer = (data: OutboundTlfnummer) =>
  postJson(`${REACT_APP_API_URL}/slettTelefonnummer`, data);

export const postKontonummer = (
  data: OutboundNorskKontonummer | OutboundUtenlandsbankonto
) => postJson(`${REACT_APP_API_URL}/endreKontonummer`, data);

export const postVegadresse = (data: OutboundNorskVegadresse) =>
  postJson(`${REACT_APP_API_URL}/endreKontaktadresse/vegadresse`, data);

export const postPostboksadresse = (data: OutboundPostboksadresse) =>
  postJson(`${REACT_APP_API_URL}/endreKontaktadresse/postboksadresse`, data);

export const postUtenlandskAdresse = (
  data: OutboundUtenlandskVegadresse | OutboundUtenlandskPostboksadresse
) =>
  postJson(`${REACT_APP_API_URL}/endreKontaktadresse/utenlandskAdresse`, data);

export const slettKontaktadresse = () =>
  postJson(`${REACT_APP_API_URL}/slettKontaktadresse`);

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
  const redirectUrl = getLoginserviceRedirectUrl();
  window.location.assign(`${REACT_APP_LOGIN_URL}?redirect=${redirectUrl}&level=Level4`);
};

const sjekkHttpFeil = (response: Response) => {
  if (response.ok) {
    return response;
  } else {
    const error = {
      code: response.status,
      text: response.statusText,
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
        type: `info`,
        text: `Vi har sendt inn endringen din`,
      },
      REJECTED: {
        type: `info`,
        text: `Det eksisterer en pågående endring`,
      },
      ERROR: {
        type: `feil`,
        text: `${response.error && response.error.message}${
          response.error && response.error.details
            ? `\n${Object.values(response.error.details)
                .map((details) => details.join("\n"))
                .join("\n")}`
            : ``
        }`,
      },
    }[response.statusType];
    throw error;
  }
};

export const getFeatureToggleUrl = (featureToggles: FeatureToggles) =>
  Object.keys(featureToggles)
    .map((feature: string, i: number) => `${!i ? `?` : ``}feature=${feature}`)
    .join("&");
