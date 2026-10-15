import { authenticate } from "@navikt/astro-auth";
import { defineMiddleware, sequence } from "astro/middleware";
import { publicEnvironment } from "@/config/publicEnvironment";
import { getLocaleRedirect } from "@/utils/locale";

void publicEnvironment;

const redirectToLocale = defineMiddleware(({ url, redirect }, next) => {
    const location = getLocaleRedirect(url.pathname, url.search, import.meta.env.BASE_URL.replace(/\/$/, ""));

    return location ? redirect(location) : next();
});

export const onRequest = sequence(redirectToLocale, authenticate());
