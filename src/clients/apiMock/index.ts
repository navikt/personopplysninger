import fetchMock from "fetch-mock";
import personInformasjon from "./data/personInfo.json";
import kontaktInformasjon from "./data/kontaktInfo.json";
import featureToggles from "./data/featureToggles.json";
import authInfo from "./data/authInfo.json";
import dsopInfo from "./data/dsopInfo.json";
import retningsnumre from "./data/retningsnumre.json";
import valutaer from "./data/valutaer.json";
import land from "./data/land.json";
import Environment from "../../utils/Environments";

const { apiUrl, baseUrl, dsopUrl } = Environment();

// Config
fetchMock.config.fallbackToNetwork = true;

const mockKontaktinfo = true;
const mockPersonalia = true;
const mockFeatureToggles = true;
const mockAuthInfo = true;
const mockDsopInfo = true;
const mockRetningsnumre = true;
const mockLand = true;
const mockValutaer = true;

export const setUpMock = async () => {
  mockKontaktinfo &&
    fetchMock.get(
      `${apiUrl}/kontaktinformasjon`,
      delay(200, 750).then(() => kontaktInformasjon)
    );
  mockPersonalia &&
    fetchMock.get(
      `${apiUrl}/personalia`,
      delay(200, 750).then(() => personInformasjon)
    );
  mockFeatureToggles &&
    fetchMock.get(
      `begin:${apiUrl}/feature-toggles`,
      delay(200, 750).then(() => featureToggles)
    );
  mockAuthInfo &&
    fetchMock.get(
      `${baseUrl}/innloggingslinje-api/auth`,
      delay(10, 50).then(() => authInfo)
    );
  mockRetningsnumre &&
    fetchMock.get(
      `${apiUrl}/retningsnumre`,
      delay(10, 50).then(() => retningsnumre)
    );
  mockValutaer &&
    fetchMock.get(`${apiUrl}/valuta`, delay(10, 50).then(() => valutaer));
  mockDsopInfo &&
    fetchMock.get(`${dsopUrl}/get`, delay(10, 50).then(() => dsopInfo));
  mockLand && fetchMock.get(`${apiUrl}/land`, delay(10, 50).then(() => land));
};

const delay = (min: number, max: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};
