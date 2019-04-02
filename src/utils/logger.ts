const { frontendlogger } = window as any;

export const logApiError = (url: string, response: Response) => {
  const error =
    `Feil ved henting av data: ` +
    `${url} - ${response.status} ${response.statusText}`;

  const title = "personopplysninger.apiclient.error";
  const tags = {};
  const fields = {
    status: response.status,
    statusText: response.statusText,
    url
  };

  if (frontendlogger) {
    frontendlogger.error(error);
    frontendlogger.event(title, fields, tags);
  }
};
