import fetchMock from "fetch-mock";
import personInformasjon from "./data/personInfo.json";
import kontaktInformasjon from "./data/kontaktInfo.json";
import featureToggles from "./data/featureToggles.json";
import Environment from "../../utils/Environments";

const { apiUrl } = Environment();

const mockKontaktinfo = true;
const mockPersonalia = true;
const mockFeatureToggles = true;

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
};

const delay = (min: number, max: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};
