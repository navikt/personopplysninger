// @vitest-environment node
import { hentFraApi, loginUrlFor } from "@/server/apiClient";

const feiltekst = "Oisann, noe gikk galt! Prøv igjen senere.";

const lagDeps = (fetchImpl: typeof fetch, getOboToken: () => Promise<string> = async () => "obo-token") => {
    const logger = { warn: vi.fn(), error: vi.fn() };
    return { deps: { baseUrl: "http://api.test/tms-personopplysninger-api", getOboToken, logger, fetch: fetchImpl, timeoutMs: 50 }, logger };
};

const svar = (status: number, body: string) => vi.fn<typeof fetch>().mockResolvedValue(new Response(body, { status }));

describe("hentFraApi", () => {
    it("henter JSON med OBO-token fra API-et", async () => {
        const fetchImpl = svar(200, JSON.stringify({ perioder: [] }));
        const { deps } = lagDeps(fetchImpl);

        await expect(hentFraApi("/medl", deps)).resolves.toEqual({ status: "RESULT", data: { perioder: [] } });

        const [url, init] = fetchImpl.mock.calls[0];
        expect(url).toBe("http://api.test/tms-personopplysninger-api/medl");
        expect(new Headers(init?.headers).get("Authorization")).toBe("Bearer obo-token");
        expect(init?.signal).toBeInstanceOf(AbortSignal);
    });

    it.each([401, 403])("gir UNAUTHORIZED ved %i, slik klienten sender til innlogging", async (status) => {
        const { deps, logger } = lagDeps(svar(status, ""));

        await expect(hentFraApi("/medl", deps)).resolves.toEqual({ status: "UNAUTHORIZED" });
        expect(logger.warn).toHaveBeenCalledWith(`API-kall /medl ga ${status}, sender til innlogging`);
    });

    it("gir feiltilstand med standardtekst ved serverfeil, og logger uten innhold fra svaret", async () => {
        const { deps, logger } = lagDeps(svar(500, "fnr 12345678910 finnes ikke"));

        await expect(hentFraApi("/medl", deps)).resolves.toEqual({ status: "ERROR", error: { code: 500, text: feiltekst } });
        expect(logger.error).toHaveBeenCalledWith("API-kall /medl feilet med status 500");
    });

    it("viser svarteksten ved 400, som klienten", async () => {
        const { deps } = lagDeps(svar(400, "Ugyldig forespørsel"));

        await expect(hentFraApi("/medl", deps)).resolves.toEqual({ status: "ERROR", error: { code: 400, text: "Ugyldig forespørsel" } });
    });

    it("gir feiltilstand 504 når API-et ikke svarer innen tidsfristen", async () => {
        const fetchImpl: typeof fetch = (_url, init) =>
            new Promise((_resolve, reject) => {
                init?.signal?.addEventListener("abort", () => reject(init.signal?.reason));
            });
        const { deps, logger } = lagDeps(fetchImpl);

        await expect(hentFraApi("/medl", deps)).resolves.toEqual({ status: "ERROR", error: { code: 504, text: feiltekst } });
        expect(logger.error).toHaveBeenCalledWith("API-kall /medl fikk ikke svar innen 50 ms");
    });

    it("venter maks 5 sekunder på API-et når ingen annen frist er gitt", async () => {
        const timeoutSpy = vi.spyOn(AbortSignal, "timeout");
        const { deps } = lagDeps(svar(200, "{}"));

        await hentFraApi("/medl", { ...deps, timeoutMs: undefined });

        expect(timeoutSpy).toHaveBeenCalledWith(5000);
        timeoutSpy.mockRestore();
    });

    it("gir feiltilstand 502 når API-et ikke kan nås", async () => {
        const { deps, logger } = lagDeps(vi.fn<typeof fetch>().mockRejectedValue(new TypeError("fetch failed")));

        await expect(hentFraApi("/medl", deps)).resolves.toEqual({ status: "ERROR", error: { code: 502, text: feiltekst } });
        expect(logger.error).toHaveBeenCalledWith("API-kall /medl kunne ikke nå API-et: fetch failed");
    });

    it("gir feiltilstand 500 uten å kalle API-et når OBO-vekslingen feiler", async () => {
        const fetchImpl = svar(200, "{}");
        const { deps, logger } = lagDeps(fetchImpl, async () => {
            throw new Error("OBO-veksling feilet: invalid_grant");
        });

        await expect(hentFraApi("/medl", deps)).resolves.toEqual({ status: "ERROR", error: { code: 500, text: feiltekst } });
        expect(fetchImpl).not.toHaveBeenCalled();
        expect(logger.error).toHaveBeenCalledWith("API-kall /medl: OBO-veksling feilet: invalid_grant");
    });
});

describe("loginUrlFor", () => {
    it("bygger samme innloggings-URL som astro-auth, med tilbake-sti og kodet query", () => {
        const url = new URL("https://www.nav.no/person/personopplysninger/nb/medlemskap-i-folketrygden?a=1&b=2");

        expect(loginUrlFor(url, "/person/personopplysninger/")).toBe(
            "/person/personopplysninger/oauth2/login?redirect=/person/personopplysninger/nb/medlemskap-i-folketrygden%3Fa%3D1%26b%3D2",
        );
    });
});
