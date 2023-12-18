import fetchMock from 'fetch-mock';
import personInformasjon from './app/fetch/person-info.json';
import kontaktInformasjon from './app/fetch/kontakt-info.json';
import dsopInfo from './app/fetch/dsop-info.json';
import retningsnumre from './app/fetch/retningsnumre.json';
import valutaer from './app/fetch/valutaer.json';
import postnummer from './app/fetch/postnummer.json';
import endreKontonr from './app/post/endre-kontonummer.json';
import landInfo from './app/fetch/land.json';
import instInfo from './app/fetch/inst-info.json';
import medlInfo from './app/fetch/medl-info.json';
import auth from './app/fetch/auth.json';
import Cookies from 'js-cookie';

const { REACT_APP_API_URL, REACT_APP_DSOP_URL, REACT_APP_INNLOGGINGSSTATUS_URL } = process.env;

// Config
fetchMock.config.fallbackToNetwork = true;

const mockFetchKontaktinfo = true;
const mockFetchPersonalia = true;
const mockFetchDsopInfo = true;
const mockFetchRetningsnumre = true;
const mockFetchLand = true;
const mockFetchValutaer = true;
const mockFetchPostnummer = true;
const mockFetchInst = true;
const mockFetchMedl = true;
const mockFetchAuth = true;

const mockPostGateadresse = true;
const mockPostSlettTlfnr = true;
const mockPostEndreTelefonnr = true;
const mockPostEndreKontonummer = true;

export const setUpMock = async () => {
    /*
    Fetch
   */
    mockFetchKontaktinfo && fetchMock.get(`${REACT_APP_API_URL}/kontaktinformasjon`, () => delay(200, 750).then(() => kontaktInformasjon));
    mockFetchPersonalia && fetchMock.get(`${REACT_APP_API_URL}/personalia`, () => delay(200, 750).then(() => personInformasjon));
    mockFetchRetningsnumre && fetchMock.get(`${REACT_APP_API_URL}/retningsnumre`, () => delay(400, 500).then(() => retningsnumre));
    mockFetchPostnummer && fetchMock.get(`${REACT_APP_API_URL}/postnummer`, () => delay(10, 50).then(() => postnummer));
    mockFetchValutaer && fetchMock.get(`${REACT_APP_API_URL}/valuta`, () => delay(100, 200).then(() => valutaer));
    mockFetchDsopInfo && fetchMock.get(`${REACT_APP_DSOP_URL}/get`, () => delay(1000, 1500).then(() => dsopInfo));
    mockFetchLand && fetchMock.get(`${REACT_APP_API_URL}/land`, () => delay(1000, 2000).then(() => landInfo));
    mockFetchInst && fetchMock.get(`${REACT_APP_API_URL}/institusjonsopphold`, () => delay(1000, 2000).then(() => instInfo));
    mockFetchMedl && fetchMock.get(`${REACT_APP_API_URL}/medl`, () => delay(1000, 2000).then(() => medlInfo));
    mockFetchAuth && fetchMock.get(`${REACT_APP_INNLOGGINGSSTATUS_URL}`, () => delay(1000, 2000).then(() => auth));
    /*
    POST
   */
    mockPostGateadresse && fetchMock.post(`${REACT_APP_API_URL}/endreGateadresse`, () => delay(2000, 3000).then(() => ({ statusType: 'PENDING' })));
    mockPostEndreTelefonnr &&
        fetchMock.post(`${REACT_APP_API_URL}/endreTelefonnummer`, () => delay(2000, 3000).then(() => ({ statusType: 'REJECTED' })));
    mockPostSlettTlfnr && fetchMock.post(`${REACT_APP_API_URL}/slettTelefonnummer`, () => delay(2000, 3000).then(() => ({ statusType: 'OK' })));
    mockPostEndreKontonummer &&
        fetchMock.post(`${REACT_APP_API_URL}/endreKontonummer`, () =>
            delay(200, 500).then(() => {
                Cookies.set('kontonr-result', 'success');
                return endreKontonr;
            })
        );
};

const delay = (min: number, max: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, Math.random() * (max - min) + min);
    });
};
