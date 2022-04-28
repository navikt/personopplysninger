import { AlertType } from "components/alert/Alert";

export const logApiError = (url: string, err: AlertType) => {
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