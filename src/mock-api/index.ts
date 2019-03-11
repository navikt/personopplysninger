import fetchMock from "fetch-mock";
import personInfo from "./personInfo.json";
import Environment from "../js/utils/Environments";
import { getDefault } from "../config";

const { apiUrl } = Environment();

const delay = (min: number, max: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};

export const setUpMock = async () => {
  fetchMock.get("/person/personopplysninger/config", getDefault() as any);
  fetchMock.get(`${apiUrl}/personalia`, delay(50, 200).then(() => personInfo));
};
