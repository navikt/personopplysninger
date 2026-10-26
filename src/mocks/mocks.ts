import { randomInt } from "node:crypto";
import type { MockContext, MockDefinition } from "@navikt/astro-mocks";
import arbeidsforholdDetaljert from "./fixtures/arbeidsforhold-detaljert.json";
import arbeidsforholdListe from "./fixtures/arbeidsforhold-liste.json";
import auth from "./fixtures/auth.json";
import dsopInfo from "./fixtures/dsop-info.json";
import instInfo from "./fixtures/inst-info.json";
import kontaktInformasjon from "./fixtures/kontakt-info.json";
import landInfo from "./fixtures/land.json";
import medlInfo from "./fixtures/medl-info.json";
import personInformasjon from "./fixtures/person-info.json";
import postnummer from "./fixtures/postnummer.json";
import retningsnumre from "./fixtures/retningsnumre.json";
import valutaer from "./fixtures/valutaer.json";

type MockData = object | object[];

const json = (data: object, init: ResponseInit = {}) =>
    new Response(JSON.stringify(data), {
        ...init,
        headers: { "Content-Type": "application/json; charset=utf-8", ...init.headers },
    });

const getDelay = (query: URLSearchParams, [min, max]: [number, number]) => {
    const configuredDelay = query.get("delay");
    if (configuredDelay !== null) {
        return Math.max(0, Number(configuredDelay) || 0);
    }
    return randomInt(min, max);
};

const respond =
    (data: MockData, delayRange: [number, number], emptyData?: MockData) =>
    async ({ query }: MockContext) => {
        await new Promise((resolve) => setTimeout(resolve, getDelay(query, delayRange)));

        const scenario = query.get("scenario");
        if (scenario === "error") {
            return json({ message: "Mock error" }, { status: 500 });
        }
        if (scenario === "empty") {
            return json(emptyData ?? (Array.isArray(data) ? [] : {}));
        }
        return json(data);
    };

const endreKontonummer = async (context: MockContext) => {
    const requestedLocale = context.req.headers.locale;
    const locale = requestedLocale === "nn" || requestedLocale === "en" ? requestedLocale : "nb";
    const response = await respond(
        { redirect: `http://localhost:4321/person/personopplysninger/${locale}/endre-kontonummer?result=success` },
        [200, 500],
    )(context);
    response.headers.set("Set-Cookie", "kontonr-result=success; Path=/; SameSite=Lax");
    return response;
};

export const mocks: MockDefinition[] = [
    { path: "/api/auth", handler: respond(auth, [1000, 2000], { authenticated: false, name: null, securityLevel: null }) },
    { path: "/api/kontaktinformasjon", handler: respond(kontaktInformasjon, [200, 750]) },
    { path: "/api/personalia", handler: respond(personInformasjon, [200, 750]) },
    { path: "/api/retningsnumre", handler: respond(retningsnumre, [400, 500]) },
    { path: "/api/postnummer", handler: respond(postnummer, [10, 50]) },
    { path: "/api/valuta", handler: respond(valutaer, [100, 200]) },
    { path: "/api/sporingslogg", handler: respond(dsopInfo, [1000, 1500]) },
    { path: "/api/land", handler: respond(landInfo, [1000, 2000]) },
    { path: "/api/institusjonsopphold", handler: respond(instInfo, [1000, 2000]) },
    { path: "/api/medl", handler: respond(medlInfo, [1000, 2000], { perioder: [] }) },
    { path: "/api/arbeidsforhold/forenklet/alle", handler: respond(arbeidsforholdListe, [200, 750]) },
    { path: "/api/arbeidsforhold/:id", handler: respond(arbeidsforholdDetaljert, [200, 750]) },

    { method: "POST", path: "/api/endreGateadresse", handler: respond({ statusType: "PENDING" }, [2000, 3000]) },
    { method: "POST", path: "/api/endreTelefonnummer", handler: respond({ statusType: "REJECTED" }, [2000, 3000]) },
    { method: "POST", path: "/api/slettTelefonnummer", handler: respond({ statusType: "OK" }, [2000, 3000]) },
    { method: "POST", path: "/api/slettKontaktadresse", handler: respond({ statusType: "OK" }, [2000, 3000]) },
    { method: "POST", path: "/api/endreKontonummer", handler: endreKontonummer },
];
