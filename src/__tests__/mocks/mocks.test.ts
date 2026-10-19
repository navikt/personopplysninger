import type { IncomingMessage } from "node:http";
import type { HttpMethod } from "@navikt/astro-mocks";
import { mocks } from "@/mocks/mocks";

const matchPath = (pattern: string, pathname: string) => {
    const mønster = pattern.split("/");
    const deler = pathname.split("/");
    if (mønster.length !== deler.length) return null;
    const params: Record<string, string> = {};
    for (const [i, del] of mønster.entries()) {
        if (del.startsWith(":")) params[del.slice(1)] = deler[i];
        else if (del !== deler[i]) return null;
    }
    return params;
};

// Kaller mock-definisjonen slik @navikt/astro-mocks gjør på dev-serveren.
const request = async (pathAndQuery: string, init: { method?: HttpMethod; headers?: Record<string, string> } = {}) => {
    const url = new URL(pathAndQuery, "http://localhost:4321");
    const method = init.method ?? "GET";
    for (const mock of mocks) {
        const params = matchPath(mock.path, url.pathname);
        if ((mock.method ?? "GET") !== method || !params) continue;
        const req = { headers: init.headers ?? {} } as unknown as IncomingMessage;
        const result = await mock.handler?.({ req, url, method, params, query: url.searchParams, body: undefined });
        if (!(result instanceof Response)) throw new Error(`${pathAndQuery} ga ikke en Response`);
        return result;
    }
    throw new Error(`Ingen mock for ${method} ${url.pathname}`);
};

describe("Mock-API for lokal utvikling", () => {
    it("serves the existing person information fixture", async () => {
        const response = await request("/api/personalia?delay=0");

        expect(response.status).toBe(200);
        expect(await response.json()).toMatchObject({
            personalia: {
                fornavn: expect.any(String),
            },
        });
    });

    it("serves explicit error scenarios", async () => {
        const response = await request("/api/personalia?scenario=error&delay=0");

        expect(response.status).toBe(500);
        expect(await response.json()).toEqual({ message: "Mock error" });
    });

    it.each([
        ["/api/auth", "authenticated"],
        ["/api/kontaktinformasjon", "mobiltelefonnummer"],
        ["/api/retningsnumre", "length"],
        ["/api/postnummer", "length"],
        ["/api/valuta", "length"],
        ["/api/sporingslogg", "length"],
        ["/api/land", "length"],
        ["/api/institusjonsopphold", "length"],
        ["/api/medl", "perioder"],
    ])("serves %s", async (path, expectedProperty) => {
        const response = await request(`${path}?delay=0`);
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body).toHaveProperty(expectedProperty);
    });

    it.each([
        ["/api/endreGateadresse", "PENDING"],
        ["/api/endreTelefonnummer", "REJECTED"],
        ["/api/slettTelefonnummer", "OK"],
        ["/api/slettKontaktadresse", "OK"],
    ])("serves mutation response for %s", async (path, statusType) => {
        const response = await request(`${path}?delay=0`, { method: "POST" });

        expect(response.status).toBe(200);
        expect(await response.json()).toEqual({ statusType });
    });

    it("serves account change redirect and result cookie", async () => {
        const response = await request("/api/endreKontonummer?delay=0", {
            method: "POST",
            headers: { locale: "nn" },
        });

        expect(await response.json()).toEqual({
            redirect: "http://localhost:4321/person/personopplysninger/nn/endre-kontonummer?result=success",
        });
        expect(response.headers.get("set-cookie")).toContain("kontonr-result=success");
    });

    it("serves arbeidsforhold list, details and empty scenarios", async () => {
        const listResponse = await request("/api/arbeidsforhold/forenklet/alle?delay=0");
        const detailResponse = await request("/api/arbeidsforhold/42?delay=0");
        const emptyResponse = await request("/api/arbeidsforhold/forenklet/alle?scenario=empty&delay=0");

        expect(await listResponse.json()).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    navArbeidsforholdId: expect.any(String),
                    yrke: expect.any(String),
                }),
            ]),
        );
        expect(await detailResponse.json()).toMatchObject({
            navArbeidsforholdId: expect.any(Number),
            yrke: expect.any(String),
        });
        expect(await emptyResponse.json()).toEqual([]);
    });

    it("preserves response shapes for empty object scenarios", async () => {
        expect(await (await request("/api/auth?scenario=empty&delay=0")).json()).toEqual({
            authenticated: false,
            name: null,
            securityLevel: null,
        });
        expect(await (await request("/api/medl?scenario=empty&delay=0")).json()).toEqual({ perioder: [] });
    });
});
