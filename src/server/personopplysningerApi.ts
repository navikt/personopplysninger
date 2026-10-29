import { PERSONOPPLYSNINGER_API_URL } from "astro:env/server";
import type { AstroGlobal } from "astro";
import type { ApiDeps } from "./apiClient";
import { getOboToken } from "./oboToken";

export const personopplysningerApi = (Astro: Pick<AstroGlobal, "locals" | "logger">): ApiDeps => {
    let oboToken: Promise<string> | undefined;

    return {
        baseUrl: PERSONOPPLYSNINGER_API_URL,
        getOboToken: () => {
            oboToken ??= getOboToken(Astro.locals.token, `${process.env.NAIS_CLUSTER_NAME}:min-side:tms-personopplysninger-api`);
            return oboToken;
        },
        logger: Astro.logger,
    };
};
