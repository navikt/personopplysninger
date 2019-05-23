import fetchMock from "fetch-mock";
import personInformasjon from "./data/personInfo.json";
import kontaktInformasjon from "./data/kontaktInfo.json";
import featureToggles from "./data/featureToggles.json";
import Environment from "../../utils/Environments";

const { apiUrl, baseUrl } = Environment();

const mockKontaktinfo = true;
const mockPersonalia = true;
const mockFeatureToggles = true;

export const setUpMock = async () => {
  mockKontaktinfo &&
    fetchMock.get(
      `${apiUrl}/kontaktinformasjon`,
      delay(200, 500).then(() => kontaktInformasjon)
    );
  mockPersonalia &&
    fetchMock.get(
      `${apiUrl}/personalia`,
      delay(200, 300).then(() => personInformasjon)
    );
  mockFeatureToggles &&
    fetchMock.get(
      `begin:${baseUrl}/api/feature`,
      delay(200, 300).then(() => featureToggles)
    );
};

const delay = (min: number, max: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};
