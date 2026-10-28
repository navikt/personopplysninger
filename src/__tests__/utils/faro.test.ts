const { initializeFaro } = vi.hoisted(() => ({ initializeFaro: vi.fn() }));

vi.mock("@grafana/faro-web-sdk", () => ({ initializeFaro }));

const loadFaro = async (environment: string) => {
    vi.resetModules();
    document.body.innerHTML = `<div data-telemetry-url="https://t" data-environment="${environment}" data-build-version="v1"></div>`;
    return import("@/utils/faro");
};

describe("startFaro", () => {
    beforeEach(() => initializeFaro.mockClear());

    it("starter Faro med appnavn, versjon og telemetri-URL", async () => {
        const { startFaro } = await loadFaro("dev");

        startFaro();

        expect(initializeFaro).toHaveBeenCalledWith({
            url: "https://t",
            app: { name: "personopplysninger", version: "v1" },
        });
    });

    it("starter Faro bare én gang", async () => {
        const { startFaro } = await loadFaro("prod");

        startFaro();
        startFaro();

        expect(initializeFaro).toHaveBeenCalledTimes(1);
    });

    it("hopper over Faro i lokalt miljø", async () => {
        const { startFaro } = await loadFaro("local");

        startFaro();

        expect(initializeFaro).not.toHaveBeenCalled();
    });
});
