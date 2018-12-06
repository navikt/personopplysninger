// import conf from 'js/Config';

const fetchJSONAndCheckForErrors = (url) => {
  const p = new Promise((res, rej) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      credentials: 'include',
    }).then((r) => {
      if (r.status === 401) {
        window.location.href = /* ${conf.personopplysninger.LOGIN_URL} */`https://loginservice-q.nav.no/login?redirect=${window.location.href}`; // eslint-disable-line no-undef
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

const fetchPersonInfo = () => fetchJSONAndCheckForErrors('https://tjenester-q6.nav.no/personopplysninger-api/personalia/hent'/*'https://personopplysninger-api-q6.nais.oera-q.local/api/personalia/hent'  conf.personopplysninger.API_URL */);

export default {
  fetchPersonInfo,
};
