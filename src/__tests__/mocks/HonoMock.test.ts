import { createMockApp } from "@/mocks/app";

describe("Hono mock API", () => {
    it("serves the existing person information fixture", async () => {
        const response = await createMockApp().request("/api/personalia?delay=0");

        expect(response.status).toBe(200);
        expect(await response.json()).toMatchObject({
            personalia: {
                fornavn: expect.any(String),
            },
        });
    });

    it("serves explicit error scenarios", async () => {
        const response = await createMockApp().request("/api/personalia?scenario=error&delay=0");

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
        const response = await createMockApp().request(`${path}?delay=0`);
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
        const response = await createMockApp().request(`${path}?delay=0`, { method: "POST" });

        expect(response.status).toBe(200);
        expect(await response.json()).toEqual({ statusType });
    });

    it("serves account change redirect and result cookie", async () => {
        const response = await createMockApp().request("/api/endreKontonummer?delay=0", {
            method: "POST",
            headers: { locale: "nn" },
        });

        expect(await response.json()).toEqual({
            redirect: "http://localhost:3006/person/personopplysninger/nn/endre-kontonummer?result=success",
        });
        expect(response.headers.get("set-cookie")).toContain("kontonr-result=success");
    });

    it("serves arbeidsforhold list, details and empty scenarios", async () => {
        const app = createMockApp();
        const listResponse = await app.request("/api/arbeidsforhold/forenklet/alle?delay=0");
        const detailResponse = await app.request("/api/arbeidsforhold/42?delay=0");
        const emptyResponse = await app.request("/api/arbeidsforhold/forenklet/alle?scenario=empty&delay=0");

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
        const app = createMockApp();

        expect(await (await app.request("/api/auth?scenario=empty&delay=0")).json()).toEqual({
            authenticated: false,
            name: null,
            securityLevel: null,
        });
        expect(await (await app.request("/api/medl?scenario=empty&delay=0")).json()).toEqual({ perioder: [] });
    });
});
