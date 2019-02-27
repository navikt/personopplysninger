// import conf from 'js/Config';
import Environment from "./utils/Environments";

const sjekkAuth = response =>
  response.status === 401 ||
  response.status === 403 ||
  (response.status === 0 && !response.ok)
    ? window.location.assign(
      `${Environment().loginUrl}?redirect=${window.location.href}`
    )
    : true;

const hentJsonOgSjekkAuth = url =>
  new Promise((resolve, reject) =>
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      credentials: "include"
    })
      .then(response => sjekkAuth(response) && resolve(response.json()))
      .catch(error => reject(error))
  );

const fetchPersonInfo = () => hentJsonOgSjekkAuth(`${Environment().apiUrl}`);

export default {
  fetchPersonInfo
};
