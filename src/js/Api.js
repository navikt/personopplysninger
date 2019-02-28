// import conf from 'js/Config';
import Environment from "./utils/Environments";

const parseJson = data => data.json();
const sjekkAuth = response =>
  response.status === 401 ||
  response.status === 403 ||
  (response.status === 0 && !response.ok)
    ? window.location.assign(
      `${Environment().loginUrl}?redirect=${window.location.href}`
    )
    : response;

const hentJsonOgSjekkAuth = url =>
  new Promise((resolve, reject) =>
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      credentials: "include"
    })
      .then(sjekkAuth)
      .then(parseJson)
      .then(resolve)
      .catch(reject)
  );

const fetchPersonInfo = () =>
  hentJsonOgSjekkAuth(`${Environment().apiUrl}/personalia`);

export default {
  fetchPersonInfo
};
