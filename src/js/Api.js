// import conf from 'js/Config';
import Environment from "./utils/Environments";

const { apiUrl, loginUrl } = Environment();
const parseJson = data => data.json();

const sendTilLogin = () =>
  new Promise(() =>
    window.location.assign(`${loginUrl}?redirect=${window.location.href}`)
  );

const sjekkAuth = response =>
  response.status === 401 ||
  response.status === 403 ||
  (response.status === 0 && !response.ok)
    ? sendTilLogin()
    : response;

const sjekkForFeil = (response, reject) =>
  response.ok
    ? response
    : reject({
      error: {
        code: response.status,
        text: response.statusText
      }
    });

const hentJsonOgSjekkAuth = url =>
  new Promise((resolve, reject) =>
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      credentials: "include"
    })
      .then(sjekkAuth)
      .then(response => sjekkForFeil(response, reject))
      .then(parseJson)
      .then(resolve)
      .catch(reject)
  );

const fetchPersonInfo = () => hentJsonOgSjekkAuth(`${apiUrl}/personalia`);
export default {
  fetchPersonInfo
};
