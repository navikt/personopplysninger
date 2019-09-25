import fetchMock from "fetch-mock";
import personInformasjon from "./app/fetch/person-info.json";
import kontaktInformasjon from "./app/fetch/kontakt-info.json";
import featureToggles from "./app/fetch/feature-toggles.json";
import authInfo from "./app/fetch/auth-info.json";
import dsopInfo from "./app/fetch/dsop-info.json";
import retningsnumre from "./app/fetch/retningsnumre.json";
import valutaer from "./app/fetch/valutaer.json";
import postnummer from "./app/fetch/postnummer.json";
import endrePostnummer from "./app/post/endre-postnummer.json";
import landInfo from "./app/fetch/land.json";
import Environment from "../../Environments";

const { apiUrl, baseUrl, dsopUrl } = Environment();

// Config
fetchMock.config.fallbackToNetwork = true;

const mockFetchKontaktinfo = true;
const mockFetchPersonalia = true;
const mockFetchFeatureToggles = true;
const mockFetchAuthInfo = true;
const mockFetchDsopInfo = true;
const mockFetchRetningsnumre = true;
const mockFetchLand = true;
const mockFetchValutaer = true;
const mockFetchPostnummer = true;

const mockPostGateadresse = true;
const mockPostSlettTlfnr = true;
const mockPostEndreTelefonnr = true;
const mockPostEndrePostnummer = true;

export const setUpMock = async () => {
  /*
    Fetch
   */
  mockFetchKontaktinfo &&
    fetchMock.get(`${apiUrl}/kontaktinformasjon`, () =>
      delay(200, 750).then(() => kontaktInformasjon)
    );
  mockFetchPersonalia &&
    fetchMock.get(`${apiUrl}/personalia`, () =>
      delay(200, 750).then(() => personInformasjon)
    );
  mockFetchFeatureToggles &&
    fetchMock.get(`begin:${apiUrl}/feature-toggles`, () =>
      delay(200, 750).then(() => featureToggles)
    );
  mockFetchAuthInfo &&
    fetchMock.get(`${baseUrl}/innloggingslinje-api/auth`, () =>
      delay(50, 100).then(() => authInfo)
    );
  mockFetchRetningsnumre &&
    fetchMock.get(`${apiUrl}/retningsnumre`, () =>
      delay(400, 500).then(() => retningsnumre)
    );
  mockFetchPostnummer &&
    fetchMock.get(`${apiUrl}/postnummer`, () =>
      delay(10, 50).then(() => postnummer)
    );
  mockFetchValutaer &&
    fetchMock.get(`${apiUrl}/valuta`, () =>
      delay(100, 200).then(() => valutaer)
    );
  mockFetchDsopInfo &&
    fetchMock.get(`${dsopUrl}/get`, () =>
      delay(1000, 1500).then(() => dsopInfo)
    );
  mockFetchLand &&
    fetchMock.get(`${apiUrl}/land`, () =>
      delay(1000, 2000).then(() => landInfo)
    );

  /*
    POST
   */
  mockPostGateadresse &&
    fetchMock.post(`${apiUrl}/endreGateadresse`, () =>
      delay(2000, 3000).then(() => ({ statusType: "PENDING" }))
    );
  mockPostEndreTelefonnr &&
    fetchMock.post(`${apiUrl}/endreTelefonnummer`, () =>
      delay(2000, 3000).then(() => ({ statusType: "OK" }))
    );
  mockPostSlettTlfnr &&
    fetchMock.post(`${apiUrl}/slettTelefonnummer`, () =>
      delay(2000, 3000).then(() => ({ statusType: "OK" }))
    );
  mockPostEndrePostnummer &&
    fetchMock.post(`${apiUrl}/endreKontonummer`, () =>
      delay(2000, 3000).then(() => endrePostnummer)
    );
};

const delay = (min: number, max: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};
