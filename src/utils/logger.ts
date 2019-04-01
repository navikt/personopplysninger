const { frontendlogger } = window as any;

export const logError = (error: string) =>
  frontendlogger && frontendlogger.error(error);
