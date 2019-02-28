import fetchMock from "fetch-mock";
import personalia from "./personalia.json";
import Environment from "../js/utils/Environments";

const { apiUrl } = Environment();

const delay = (min, max) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};

export const setUpMock = async () => {
  fetchMock.get(`${apiUrl}/personalia`, delay(50, 200).then(() => personalia));
};

export default setUpMock;
