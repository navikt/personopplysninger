import fetchMock from 'fetch-mock';
import Cookies from 'js-cookie';
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

const { VITE_API_URL, VITE_DSOP_URL, VITE_INNLOGGINGSSTATUS_URL } = import.meta.env;

export const setUpMock = async () => {
    /*
    Fetch
   */
    const globalMock = fetchMock.mockGlobal();
    globalMock.get(`${VITE_INNLOGGINGSSTATUS_URL}`, () => delay(1000, 2000).then(() => auth));
    globalMock.get(`${VITE_API_URL}/kontaktinformasjon`, () => delay(200, 750).then(() => kontaktInformasjon));
    globalMock.get(`${VITE_API_URL}/personalia`, () => delay(200, 750).then(() => personInformasjon));
    globalMock.get(`${VITE_API_URL}/retningsnumre`, () => delay(400, 500).then(() => retningsnumre));
    globalMock.get(`${VITE_API_URL}/postnummer`, () => delay(10, 50).then(() => postnummer));
    globalMock.get(`${VITE_API_URL}/valuta`, () => delay(100, 200).then(() => valutaer));
    globalMock.get(`${VITE_DSOP_URL}/get`, () => delay(1000, 1500).then(() => dsopInfo));
    globalMock.get(`${VITE_API_URL}/land`, () => delay(1000, 2000).then(() => landInfo));
    globalMock.get(`${VITE_API_URL}/institusjonsopphold`, () => delay(1000, 2000).then(() => instInfo));
    globalMock.get(`${VITE_API_URL}/medl`, () => delay(1000, 2000).then(() => medlInfo));
    /*
    POST
   */
    globalMock.post(`${VITE_API_URL}/endreGateadresse`, () => delay(2000, 3000).then(() => ({ statusType: 'PENDING' })));
    globalMock.post(`${VITE_API_URL}/endreTelefonnummer`, () => delay(2000, 3000).then(() => ({ statusType: 'REJECTED' })));
    globalMock.post(`${VITE_API_URL}/slettTelefonnummer`, () => delay(2000, 3000).then(() => ({ statusType: 'OK' })));
    globalMock.post(`${VITE_API_URL}/endreKontonummer`, () =>
            delay(200, 500).then(() => {
                Cookies.set('kontonr-result', 'success');
                return endreKontonr;
        }),
        );
};

const delay = (min: number, max: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, Math.random() * (max - min) + min);
    });
};
