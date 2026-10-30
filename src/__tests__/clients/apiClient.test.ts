import { postTlfnummer } from "@/clients/apiClient";
import { PAAGAAENDE_ENDRING } from "@/components/httpFeilmelding/httpFeilmeldingText";
import { setRuntimeConfig } from "@/config/runtimeConfig";
import { testRuntimeConfig } from "../utils/testRuntimeConfig";

describe("postTlfnummer", () => {
    beforeEach(() => {
        setRuntimeConfig(testRuntimeConfig);
        vi.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("feiler med pågående endring når endringen avvises", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ statusType: "REJECTED" })));

        await expect(postTlfnummer({ prioritet: 1, landskode: "+47", nummer: "22334455" })).rejects.toMatchObject({
            type: "feil",
            text: PAAGAAENDE_ENDRING,
        });
    });
});
