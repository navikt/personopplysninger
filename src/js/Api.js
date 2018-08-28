import conf from 'js/Config';

const fetchJSONAndCheckForErrors = (url) => {
  const p = new Promise((res, rej) => {
    fetch(url) // eslint-disable-line no-undef
      .then((r) => {
        if (r.status === 401) {
          window.location.href = `${conf.personopplysninger.LOGIN_URL}?redirect=${window.location.href}`; // eslint-disable-line no-undef
          rej(new Error('Unauthorized'));
        }
        if (!r.ok) {
          rej(new Error('Error happened on requesting a resource'));
        }
        res(r.json());
      })
      .catch((e) => {
        rej(e);
      });
  });
  return p;
};

const fetchPersonInfo = () => fetchJSONAndCheckForErrors(conf.personopplysninger.API_URL);

export default {
  fetchPersonInfo,
};
