import fetchMock from "fetch-mock";
import personalia from "./personalia.json";
import Environment from "../js/utils/Environments";

export const setUpMock = () => {
  fetchMock.get(`${Environment().apiUrl}/personalia`, personalia);
};

export default setUpMock;
