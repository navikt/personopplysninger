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
});
