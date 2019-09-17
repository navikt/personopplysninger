import fetchMock from "fetch-mock";
import personInformasjon from "./data/personInfo.json";
import kontaktInformasjon from "./data/kontaktInfo.json";
import featureToggles from "./data/featureToggles.json";
import authInfo from "./data/authInfo.json";
import dsopInfo from "./data/dsopInfo.json";
import retningsnumre from "./data/retningsnumre.json";
import valutaer from "./data/valutaer.json";
import postnummer from "./data/postnummer.json";
import land from "./data/land.json";
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
const mockPostgateadresse = true;

export const setUpMock = async () => {
  /*
    Fetch
   */
  mockFetchKontaktinfo &&
    fetchMock.get(
      `${apiUrl}/kontaktinformasjon`,
      delay(200, 750).then(() => kontaktInformasjon)
    );
  mockFetchPersonalia &&
    fetchMock.get(
      `${apiUrl}/personalia`,
      delay(200, 750).then(() => personInformasjon)
    );
  mockFetchFeatureToggles &&
    fetchMock.get(
      `begin:${apiUrl}/feature-toggles`,
      delay(200, 750).then(() => featureToggles)
    );
  mockFetchAuthInfo &&
    fetchMock.get(
      `${baseUrl}/innloggingslinje-api/auth`,
      delay(10, 50).then(() => authInfo)
    );
  mockFetchRetningsnumre &&
    fetchMock.get(
      `${apiUrl}/retningsnumre`,
      delay(10, 50).then(() => retningsnumre)
    );
  mockFetchPostnummer &&
    fetchMock.get(`${apiUrl}/postnummer`, delay(10, 50).then(() => postnummer));
  mockFetchValutaer &&
    fetchMock.get(`${apiUrl}/valuta`, delay(10, 50).then(() => valutaer));
  mockFetchDsopInfo &&
    fetchMock.get(`${dsopUrl}/get`, delay(10, 50).then(() => dsopInfo));
  mockFetchLand &&
    fetchMock.get(`${apiUrl}/land`, delay(10, 50).then(() => land));

  /*
    POST
   */
  mockPostgateadresse &&
    fetchMock.post(
      `${apiUrl}/endreGateadresse`,
      delay(10, 50).then(() => ({ statusType: "OK" }))
    );
};

const delay = (min: number, max: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};
