export interface Config {
  tjenesteUrl: string;
}

let config: Config;

export const setConfig = (data: Config): void => {
  config = data;
};

export const getTjenesteUrl = (): string => config.tjenesteUrl;
export const getConfig = (): Config => config;
export const getDefault = (): Config => ({
  tjenesteUrl: "https://tjenester-q0.nav.no"
});
