// @vitest-environment node
import { requestTokenxOboToken } from "@navikt/oasis";
import type { AstroGlobal } from "astro";
import { personopplysningerApi } from "@/server/personopplysningerApi";

vi.mock("astro:env/server", () => ({ PERSONOPPLYSNINGER_API_URL: "http://tms-personopplysninger-api/tms-personopplysninger-api" }));
vi.mock("@navikt/oasis", () => ({ requestTokenxOboToken: vi.fn() }));

const astro = (token?: string) => ({
    locals: { token } as App.Locals,
    logger: { warn: vi.fn(), error: vi.fn() } as unknown as AstroGlobal["logger"],
});

describe("personopplysningerApi", () => {
    afterEach(() => vi.unstubAllEnvs());

    it("veksler brukerens token mot API-et i samme cluster", async () => {
        vi.stubEnv("NAIS_CLUSTER_NAME", "prod-gcp");
        vi.stubEnv("NODE_ENV", "production");
        vi.mocked(requestTokenxOboToken).mockResolvedValue({ ok: true, token: "obo-token" });

        const deps = personopplysningerApi(astro("idporten-token"));

        expect(deps.baseUrl).toBe("http://tms-personopplysninger-api/tms-personopplysninger-api");
        await expect(deps.getOboToken()).resolves.toBe("obo-token");
        expect(requestTokenxOboToken).toHaveBeenCalledWith("idporten-token", "prod-gcp:min-side:tms-personopplysninger-api");
    });

    it("veksler tokenet én gang for flere kall på samme objekt", async () => {
        vi.stubEnv("NODE_ENV", "production");
        vi.mocked(requestTokenxOboToken).mockClear();
        vi.mocked(requestTokenxOboToken).mockResolvedValue({ ok: true, token: "obo-token" });

        const deps = personopplysningerApi(astro("idporten-token"));
        const [forste, andre] = await Promise.all([deps.getOboToken(), deps.getOboToken()]);

        expect(forste).toBe("obo-token");
        expect(andre).toBe("obo-token");
        expect(requestTokenxOboToken).toHaveBeenCalledTimes(1);
    });

    it("veksler tokenet hver for seg for separate objekter", async () => {
        vi.stubEnv("NODE_ENV", "production");
        vi.mocked(requestTokenxOboToken).mockClear();
        vi.mocked(requestTokenxOboToken).mockResolvedValue({ ok: true, token: "obo-token" });

        await personopplysningerApi(astro("idporten-token")).getOboToken();
        await personopplysningerApi(astro("idporten-token")).getOboToken();

        expect(requestTokenxOboToken).toHaveBeenCalledTimes(2);
    });

    it("gir begge kall samme feil når vekslingen feiler", async () => {
        vi.stubEnv("NODE_ENV", "production");
        vi.mocked(requestTokenxOboToken).mockResolvedValue({ ok: false, error: new Error("nede") } as never);

        const deps = personopplysningerApi(astro("idporten-token"));

        await expect(deps.getOboToken()).rejects.toThrow("OBO-veksling");
        await expect(deps.getOboToken()).rejects.toThrow("OBO-veksling");
    });
});
