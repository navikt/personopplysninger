import Environment from "../utils/Environments";
import { logApiError } from "../utils/logger";
import { FeatureToggles } from "../providers/Store";

const { apiUrl, loginUrl, baseUrl } = Environment();
const parseJson = (data: any) => data.json();

const sendTilLogin = () =>
  window.location.assign(`${loginUrl}?redirect=${window.location.href}`);

const sjekkAuth = (response: Response): Promise<any> =>
  new Promise(resolve =>
    response.status === 401 ||
    response.status === 403 ||
    (response.status === 0 && !response.ok)
      ? sendTilLogin()
      : resolve(response)
  );

const sjekkForFeil = (
  url: string,
  response: Response,
  reject: (reason?: any) => void
) =>
  response.ok
    ? response
    : (logApiError(url, response),
      reject({
        code: response.status,
        text: response.statusText
      }));

const hentJsonOgSjekkAuth = (url: string) =>
  new Promise((resolve, reject) =>
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      credentials: "include"
    })
      .then(sjekkAuth)
      .then(response => sjekkForFeil(url, response, reject))
      .then(parseJson)
      .then(resolve)
      .catch(reject)
  );

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
