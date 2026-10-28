import { PERSONOPPLYSNINGER_API_URL } from "astro:env/server";
import type { AstroGlobal } from "astro";
import type { ApiDeps } from "./apiClient";
import { getOboToken } from "./oboToken";

export const personopplysningerApi = (Astro: Pick<AstroGlobal, "locals" | "logger">): ApiDeps => ({
    baseUrl: PERSONOPPLYSNINGER_API_URL,
    getOboToken: () => getOboToken(Astro.locals.token, `${process.env.NAIS_CLUSTER_NAME}:min-side:tms-personopplysninger-api`),
    logger: Astro.logger,
});
