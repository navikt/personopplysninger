import { PERSONOPPLYSNINGER_API_URL } from "astro:env/server";
import { requestTokenxOboToken } from "@navikt/oasis";
import type { AstroGlobal } from "astro";
import type { ApiDeps } from "./apiClient";
import { getOboToken } from "./oboToken";

// Kobler server-klienten til forespørselen: brukerens token fra astro-auth, miljøets audience og Astro-loggeren.
export const personopplysningerApi = (Astro: Pick<AstroGlobal, "locals" | "logger">): ApiDeps => ({
    baseUrl: PERSONOPPLYSNINGER_API_URL,
    getOboToken: () =>
        getOboToken(Astro.locals.token, {
            audience: `${process.env.NAIS_CLUSTER_NAME}:min-side:tms-personopplysninger-api`,
            isLocal: process.env.NODE_ENV === "development",
            requestOboToken: requestTokenxOboToken,
        }),
    logger: Astro.logger,
});
