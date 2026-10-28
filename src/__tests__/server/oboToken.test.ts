// @vitest-environment node
import { requestTokenxOboToken } from "@navikt/oasis";
import { getOboToken } from "@/server/oboToken";

vi.mock("@navikt/oasis", () => ({ requestTokenxOboToken: vi.fn() }));

const audience = "dev-gcp:min-side:tms-personopplysninger-api";

describe("getOboToken", () => {
    afterEach(() => {
        vi.unstubAllEnvs();
        vi.mocked(requestTokenxOboToken).mockReset();
    });

    it("bruker et falskt token lokalt uten å kontakte TokenX", async () => {
        vi.stubEnv("NODE_ENV", "development");

        await expect(getOboToken(undefined, audience)).resolves.toBe("Fake token");
        expect(requestTokenxOboToken).not.toHaveBeenCalled();
    });

    it("veksler brukerens token mot API-ets audience", async () => {
        vi.mocked(requestTokenxOboToken).mockResolvedValue({ ok: true, token: "obo-token" });

        await expect(getOboToken("idporten-token", audience)).resolves.toBe("obo-token");
        expect(requestTokenxOboToken).toHaveBeenCalledWith("idporten-token", audience);
    });

    it("feiler når brukeren mangler token utenfor lokal utvikling", async () => {
        await expect(getOboToken(undefined, audience)).rejects.toThrow("Mangler brukertoken");
        expect(requestTokenxOboToken).not.toHaveBeenCalled();
    });

    it("feiler når TokenX avviser vekslingen", async () => {
        vi.mocked(requestTokenxOboToken).mockResolvedValue({ ok: false, error: new Error("invalid_grant") });

        await expect(getOboToken("idporten-token", audience)).rejects.toThrow(
            "OBO-veksling mot dev-gcp:min-side:tms-personopplysninger-api feilet: invalid_grant",
        );
    });
});
