import { AlertType } from "../components/alert/Alert";

const { frontendlogger } = window as any;

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

  const error = `Feil ved henting av data: ${url} - ${err.code} ${err.text}`;
  const title = "personopplysninger.apiclient.error";
  const tags = {};
  const fields = {
    status: err.code,
    statusText: err.text,
    url
  };

  if (frontendlogger) {
    frontendlogger.error(error);
    frontendlogger.event(title, fields, tags);
  }
};
