import { type Context, Hono } from "hono";
import { setCookie } from "hono/cookie";
import arbeidsforholdDetaljert from "./fixtures/arbeidsforhold-detaljert.json" with { type: "json" };
import arbeidsforholdListe from "./fixtures/arbeidsforhold-liste.json" with { type: "json" };
import auth from "./fixtures/auth.json" with { type: "json" };
import dsopInfo from "./fixtures/dsop-info.json" with { type: "json" };
import instInfo from "./fixtures/inst-info.json" with { type: "json" };
import kontaktInformasjon from "./fixtures/kontakt-info.json" with { type: "json" };
import landInfo from "./fixtures/land.json" with { type: "json" };
import medlInfo from "./fixtures/medl-info.json" with { type: "json" };
import personInformasjon from "./fixtures/person-info.json" with { type: "json" };
import postnummer from "./fixtures/postnummer.json" with { type: "json" };
import retningsnumre from "./fixtures/retningsnumre.json" with { type: "json" };
import valutaer from "./fixtures/valutaer.json" with { type: "json" };

type MockData = Record<string, unknown> | unknown[];

const getDelay = (context: Context, [min, max]: [number, number]) => {
    const configuredDelay = context.req.query("delay");
    if (configuredDelay !== undefined) {
        return Math.max(0, Number(configuredDelay) || 0);
    }
    return Math.random() * (max - min) + min;
};

const respond = async (context: Context, data: MockData, delayRange: [number, number], emptyData?: MockData) => {
    await new Promise((resolve) => setTimeout(resolve, getDelay(context, delayRange)));

    const scenario = context.req.query("scenario");
    if (scenario === "error") {
        return context.json({ message: "Mock error" }, 500);
    }
    if (scenario === "empty") {
        return context.json(emptyData ?? (Array.isArray(data) ? [] : {}));
    }
    return context.json(data);
};

export const createMockApp = () => {
    const app = new Hono();

    app.get("/api/auth", (context) =>
        respond(context, auth, [1000, 2000], {
            authenticated: false,
            name: null,
            securityLevel: null,
        }),
    );
    app.get("/api/kontaktinformasjon", (context) => respond(context, kontaktInformasjon, [200, 750]));
    app.get("/api/personalia", (context) => respond(context, personInformasjon, [200, 750]));
    app.get("/api/retningsnumre", (context) => respond(context, retningsnumre, [400, 500]));
    app.get("/api/postnummer", (context) => respond(context, postnummer, [10, 50]));
    app.get("/api/valuta", (context) => respond(context, valutaer, [100, 200]));
    app.get("/api/sporingslogg", (context) => respond(context, dsopInfo, [1000, 1500]));
    app.get("/api/land", (context) => respond(context, landInfo, [1000, 2000]));
    app.get("/api/institusjonsopphold", (context) => respond(context, instInfo, [1000, 2000]));
    app.get("/api/medl", (context) => respond(context, medlInfo, [1000, 2000], { perioder: [] }));
    app.get("/api/arbeidsforhold/forenklet/alle", (context) => respond(context, arbeidsforholdListe, [200, 750]));
    app.get("/api/arbeidsforhold/:id", (context) => respond(context, arbeidsforholdDetaljert, [200, 750]));

    app.post("/api/endreGateadresse", (context) => respond(context, { statusType: "PENDING" }, [2000, 3000]));
    app.post("/api/endreTelefonnummer", (context) => respond(context, { statusType: "REJECTED" }, [2000, 3000]));
    app.post("/api/slettTelefonnummer", (context) => respond(context, { statusType: "OK" }, [2000, 3000]));
    app.post("/api/slettKontaktadresse", (context) => respond(context, { statusType: "OK" }, [2000, 3000]));
    app.post("/api/endreKontonummer", async (context) => {
        const requestedLocale = context.req.header("locale");
        const locale = requestedLocale === "nn" || requestedLocale === "en" ? requestedLocale : "nb";
        setCookie(context, "kontonr-result", "success", {
            httpOnly: false,
            path: "/",
            sameSite: "Lax",
        });
        return respond(
            context,
            {
                redirect: `http://localhost:3006/person/personopplysninger/${locale}/endre-kontonummer?result=success`,
            },
            [200, 500],
        );
    });

    return app;
};
