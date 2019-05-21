import fetchMock from "fetch-mock";
import personInformasjon from "./personInfo.json";
import kontaktInformasjon from "./kontaktInfo.json";
import Environment from "../../utils/Environments";

const { apiUrl } = Environment();

const delay = (min: number, max: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};

export const setUpMock = async () => {
  fetchMock.get(
    `${apiUrl}/kontaktinformasjon`,
    delay(500, 750).then(() => kontaktInformasjon)
  );
  fetchMock.get(
    `${apiUrl}/personalia`,
    delay(500, 750).then(() => personInformasjon)
  );
};
