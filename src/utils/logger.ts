import { FeilmeldingType } from "components/httpFeilmelding/HttpFeilmelding";

export const logApiError = (url: string, err: FeilmeldingType) => {
  switch (err.type) {
    default:
      console.log(url, err);
      break;
    case "advarsel":
      console.warn(url, err);
      break;
    case "feil":
      console.error(url, err);
      break;
  }
};