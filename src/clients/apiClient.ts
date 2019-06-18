import Environment from "../utils/Environments";
import { logApiError } from "../utils/logger";
import { FeatureToggles } from "../providers/Store";

const { apiUrl, loginUrl } = Environment();
const parseJson = (data: any) => data.json();

const sendTilLogin = () =>
  new Promise(() =>
    window.location.assign(`${loginUrl}?redirect=${window.location.href}`)
  );

const sjekkAuth = (response: Response): Response | Promise<any> =>
  response.status === 401 ||
  response.status === 403 ||
  (response.status === 0 && !response.ok)
    ? sendTilLogin()
    : response;

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

export const fetchFeatureToggles = (featureToggles: FeatureToggles) =>
  hentJsonOgSjekkAuth(
    `${apiUrl}/feature-toggles?${Object.keys(featureToggles).map(
      (feature: string) => `feature=${feature}&`
    )}`
  );
