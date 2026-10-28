// @vitest-environment node
import { hentFraApi, loginUrlFor } from "@/server/apiClient";

const feiltekst = "Oisann, noe gikk galt! Prøv igjen senere.";

const lagDeps = (getOboToken: () => Promise<string> = async () => "obo-token") => {
    const logger = { warn: vi.fn(), error: vi.fn() };
    return { deps: { baseUrl: "http://api.test/tms-personopplysninger-api", getOboToken, logger }, logger };
};

const stubFetch = (fetchMock: ReturnType<typeof vi.fn<typeof fetch>>) => {
    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
};

const svar = (status: number, body: string) => stubFetch(vi.fn<typeof fetch>().mockResolvedValue(new Response(body, { status })));

describe("hentFraApi", () => {
    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it("henter JSON med OBO-token fra API-et", async () => {
        const fetchMock = svar(200, JSON.stringify({ perioder: [] }));
        const timeout = vi.spyOn(AbortSignal, "timeout");
        const { deps } = lagDeps();

        await expect(hentFraApi("/medl", deps)).resolves.toEqual({ status: "RESULT", data: { perioder: [] } });

        const [url, init] = fetchMock.mock.calls[0];
        expect(url).toBe("http://api.test/tms-personopplysninger-api/medl");
        expect(new Headers(init?.headers).get("Authorization")).toBe("Bearer obo-token");
        expect(timeout).toHaveBeenCalledWith(5000);
        expect(init?.signal).toBe(timeout.mock.results[0].value);
    });

    it.each([401, 403])("gir UNAUTHORIZED ved %i, slik klienten sender til innlogging", async (status) => {
        svar(status, "");
        const { deps, logger } = lagDeps();

        await expect(hentFraApi("/medl", deps)).resolves.toEqual({ status: "UNAUTHORIZED" });
        expect(logger.warn).toHaveBeenCalledWith(`API-kall /medl ga ${status}, sender til innlogging`);
    });

    it("gir feiltilstand med standardtekst ved serverfeil, og logger uten innhold fra svaret", async () => {
        svar(500, "fnr 12345678910 finnes ikke");
        const { deps, logger } = lagDeps();

        await expect(hentFraApi("/medl", deps)).resolves.toEqual({ status: "ERROR", error: { code: 500, text: feiltekst } });
        expect(logger.error).toHaveBeenCalledWith("API-kall /medl feilet med status 500");
    });

    it("viser svarteksten ved 400, som klienten", async () => {
        svar(400, "Ugyldig forespørsel");
        const { deps } = lagDeps();

        await expect(hentFraApi("/medl", deps)).resolves.toEqual({ status: "ERROR", error: { code: 400, text: "Ugyldig forespørsel" } });
    });

    it("gir feiltilstand 504 når API-et ikke svarer innen tidsfristen", async () => {
        stubFetch(vi.fn<typeof fetch>().mockRejectedValue(new DOMException("Timeout", "TimeoutError")));
        const { deps, logger } = lagDeps();

        await expect(hentFraApi("/medl", deps)).resolves.toEqual({ status: "ERROR", error: { code: 504, text: feiltekst } });
        expect(logger.error).toHaveBeenCalledWith("API-kall /medl fikk ikke svar innen 5000 ms");
    });

    it("gir feiltilstand 502 når API-et svarer med noe som ikke er JSON", async () => {
        svar(200, "<html>proxyfeil</html>");
        const { deps, logger } = lagDeps();

        await expect(hentFraApi("/medl", deps)).resolves.toEqual({ status: "ERROR", error: { code: 502, text: feiltekst } });
        expect(logger.error).toHaveBeenCalledWith(expect.stringContaining("API-kall /medl ga et svar som ikke kunne leses"));
    });

    it("gir feiltilstand 504 når tidsfristen går ut mens svaret leses", async () => {
        const response = new Response("{}", { status: 200 });
        vi.spyOn(response, "json").mockRejectedValue(new DOMException("Timeout", "TimeoutError"));
        stubFetch(vi.fn<typeof fetch>().mockResolvedValue(response));
        const { deps } = lagDeps();

        await expect(hentFraApi("/medl", deps)).resolves.toEqual({ status: "ERROR", error: { code: 504, text: feiltekst } });
    });

    it("gir feiltilstand 502 når API-et ikke kan nås", async () => {
        stubFetch(vi.fn<typeof fetch>().mockRejectedValue(new TypeError("fetch failed")));
        const { deps, logger } = lagDeps();

        await expect(hentFraApi("/medl", deps)).resolves.toEqual({ status: "ERROR", error: { code: 502, text: feiltekst } });
        expect(logger.error).toHaveBeenCalledWith("API-kall /medl kunne ikke nå API-et: fetch failed");
    });

    it("gir feiltilstand 500 uten å kalle API-et når OBO-vekslingen feiler", async () => {
        const fetchMock = svar(200, "{}");
        const { deps, logger } = lagDeps(async () => {
            throw new Error("OBO-veksling feilet: invalid_grant");
        });

        await expect(hentFraApi("/medl", deps)).resolves.toEqual({ status: "ERROR", error: { code: 500, text: feiltekst } });
        expect(fetchMock).not.toHaveBeenCalled();
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
