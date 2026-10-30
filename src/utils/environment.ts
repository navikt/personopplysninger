import { API_PATH, APP_ORIGIN } from "astro:env/server";

export type Miljo = "local" | "dev" | "prod";

const navnoHost = /^(?:[a-z0-9-]+\.)*nav\.no$/i;

export const getMiljo = (): Miljo => {
    const clusterName = process.env.NAIS_CLUSTER_NAME;
    if (clusterName === "prod-gcp") return "prod";
    if (clusterName === "dev-gcp") return "dev";
    return "local";
};

const getOrigin = (requestUrl: URL) => {
    if (getMiljo() === "local") {
        return requestUrl.origin;
    }
    return navnoHost.test(requestUrl.hostname) && !requestUrl.port ? `https://${requestUrl.hostname}` : APP_ORIGIN;
};

export const getAppUrl = (requestUrl: URL) => `${getOrigin(requestUrl)}${import.meta.env.BASE_URL.replace(/\/$/, "")}`;

export const getApiUrl = (requestUrl: URL) => `${getOrigin(requestUrl)}${API_PATH}`;
