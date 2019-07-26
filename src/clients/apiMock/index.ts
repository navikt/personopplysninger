import fetchMock from "fetch-mock";
import personInformasjon from "./data/personInfo.json";
import kontaktInformasjon from "./data/kontaktInfo.json";
import featureToggles from "./data/featureToggles.json";
import authInfo from "./data/authInfo.json";
import dsopInfo from "./data/dsopInfo.json";
import Environment from "../../utils/Environments";

const { apiUrl, baseUrl, dsopUrl } = Environment();

const mockKontaktinfo = true;
const mockPersonalia = true;
const mockFeatureToggles = true;
const mockAuthInfo = true;
const mockDsopInfo = true;

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
  mockDsopInfo &&
    fetchMock.get(`${dsopUrl}/get`, delay(10, 50).then(() => dsopInfo));
};

const delay = (min: number, max: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};
