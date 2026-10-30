import { postKontonummer, postTlfnummer } from "@/clients/apiClient";
import { PAAGAAENDE_ENDRING } from "@/components/httpFeilmelding/httpFeilmeldingText";
import { setKlientConfig } from "@/utils/klientConfig";
import { testKlientConfig } from "../utils/testConfig";

describe("postTlfnummer", () => {
    beforeEach(() => {
        setKlientConfig(testKlientConfig);
        vi.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.clearAllMocks();
    });

    it("feiler med pågående endring når endringen avvises", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ statusType: "REJECTED" })));

        await expect(postTlfnummer({ prioritet: 1, landskode: "+47", nummer: "22334455" })).rejects.toMatchObject({
            type: "feil",
            text: PAAGAAENDE_ENDRING,
        });
    });
});

describe("postKontonummer", () => {
    beforeEach(() => {
        setKlientConfig(testKlientConfig);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.clearAllMocks();
    });

    it("sender språket som locale-header til endreKontonummerUrl", async () => {
        vi.spyOn(window, "location", "get").mockReturnValue({ ...window.location, assign: vi.fn() });
        const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ redirect: "http://x" })));

        await postKontonummer({ value: "12345678911" }, "en");

        const [url, init] = fetchSpy.mock.calls[0];
        expect(String(url)).toBe(`${testKlientConfig.endreKontonummerUrl}/endreKontonummer`);
        expect(init?.headers).toMatchObject({ locale: "en" });
    });
});
