import Environment from "../utils/Environments";
import { logApiError } from "../utils/logger";
import { FeatureToggles } from "../providers/Store";
import { HTTPError } from "../components/error/Error";

const { apiUrl, loginUrl, baseUrl } = Environment();
const parseJson = (data: any) => data.json();

export const sendTilLogin = () => {
  window.location.assign(`${loginUrl}?redirect=${window.location.href}`);
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

export const fetchPersonInfo = () =>
  hentJsonOgSjekkAuth(`${apiUrl}/personalia`);

export const fetchKontaktInfo = () =>
  hentJsonOgSjekkAuth(`${apiUrl}/kontaktinformasjon`);

export const fetchAuthInfo = () =>
  hentJsonOgSjekkAuth(`${baseUrl}/innloggingslinje-api/auth`);

export const getFeatureToggleUrl = (featureToggles: FeatureToggles) =>
  Object.keys(featureToggles)
    .map((feature: string, i: number) => `${!i ? `?` : ``}feature=${feature}`)
    .join("&");

export const fetchFeatureToggles = (featureToggles: FeatureToggles) =>
  hentJsonOgSjekkAuth(
    `${apiUrl}/feature-toggles${getFeatureToggleUrl(featureToggles)}`
  );
