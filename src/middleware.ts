import { authenticate } from "@navikt/astro-auth";
import { defineMiddleware, sequence } from "astro/middleware";
import { getLocaleRedirect } from "@/utils/locale";

// Sidene inneholder personopplysninger og skal aldri lagres av nettleser eller mellomliggende cacher.
const noStore = defineMiddleware(async ({ url }, next) => {
    const response = await next();

    if (!url.pathname.includes("/internal/")) {
        response.headers.set("Cache-Control", "private, no-store");
    }

    return response;
});

const redirectToLocale = defineMiddleware(({ url, redirect }, next) => {
    const location = getLocaleRedirect(url.pathname, url.search, import.meta.env.BASE_URL.replace(/\/$/, ""));

    return location ? redirect(location) : next();
});

export const onRequest = sequence(noStore, redirectToLocale, authenticate());
