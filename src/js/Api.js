// import conf from 'js/Config';
import Environment from './utils/Environments';

function sjekkAuthOgRedirect(res) {
  if (res.status === 401 || res.status === 403 || (res.status === 0 && !res.ok)) {
    window.location.assign(`${Environment().loginUrl}?redirect=${window.location.href}`);
    return false;
  }
  return true;
}

const fetchJSONAndCheckForErrors = (url) => {
  const p = new Promise((res, rej) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      credentials: 'include',
    }).then((response) => {
      sjekkAuthOgRedirect(response);
      if (response.status === 200) {
        res(response.json());
      } else {
        res({ status: response.status });
      }
    })
      .catch((e) => {
        rej(e);
      });
  });
  return p;
};

const fetchPersonInfo = () => fetchJSONAndCheckForErrors(`${Environment().apiUrl}`);

export default {
  fetchPersonInfo,
};
