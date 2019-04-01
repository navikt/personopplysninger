const { frontendlogger } = window as any;

export const logApiError = (url: string, response: Response) => {
  const error =
    `Feil ved henting av data: ` +
    `${url} - ${response.status} ${response.statusText}`;

  if (frontendlogger) {
    frontendlogger.error(error),
    frontendlogger.event(
      "personopplysninger.apikall",
      { melding: error },
      { status: response.status, statusText: response.statusText, url }
    );
  }
};
