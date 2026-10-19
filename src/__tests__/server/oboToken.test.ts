// @vitest-environment node
import { getOboToken } from "@/server/oboToken";

const audience = "dev-gcp:min-side:tms-personopplysninger-api";

describe("getOboToken", () => {
    it("bruker et falskt token lokalt uten å kontakte TokenX", async () => {
        const requestOboToken = vi.fn();

        await expect(getOboToken(undefined, { audience, isLocal: true, requestOboToken })).resolves.toBe("Fake token");
        expect(requestOboToken).not.toHaveBeenCalled();
    });

    it("veksler brukerens token mot API-ets audience", async () => {
        const requestOboToken = vi.fn().mockResolvedValue({ ok: true, token: "obo-token" });

        await expect(getOboToken("idporten-token", { audience, isLocal: false, requestOboToken })).resolves.toBe("obo-token");
        expect(requestOboToken).toHaveBeenCalledWith("idporten-token", audience);
    });

    it("feiler når brukeren mangler token utenfor lokal utvikling", async () => {
        const requestOboToken = vi.fn();

        await expect(getOboToken(undefined, { audience, isLocal: false, requestOboToken })).rejects.toThrow("Mangler brukertoken");
        expect(requestOboToken).not.toHaveBeenCalled();
    });

    it("feiler når TokenX avviser vekslingen", async () => {
        const requestOboToken = vi.fn().mockResolvedValue({ ok: false, error: new Error("invalid_grant") });

        await expect(getOboToken("idporten-token", { audience, isLocal: false, requestOboToken })).rejects.toThrow(
            "OBO-veksling mot dev-gcp:min-side:tms-personopplysninger-api feilet: invalid_grant",
        );
    });
});
