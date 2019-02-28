import fetchMock from "fetch-mock";
import personalia from "./personalia.json";
import Environment from "../js/utils/Environments";

const delay = new Promise(res => setTimeout(res, 100));
export const setUpMock = async () => {
  fetchMock.get(`${Environment().apiUrl}/personalia`, delay.then(personalia));
};

export default setUpMock;
