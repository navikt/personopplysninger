// @vitest-environment node
import { renderToString } from "react-dom/server";
import AstroPageRoot from "@/components/astro/AstroPageRoot";
import { getRuntimeConfig, setRuntimeConfig, useRuntimeConfig } from "@/config/runtimeConfig";
import { testRuntimeConfig } from "../utils/testRuntimeConfig";

vi.mock("@/utils/faro", () => ({ startFaro: vi.fn() }));
vi.mock("@/views/forside/Forside", () => ({
    default: () => <div>forside {useRuntimeConfig().apiUrl}</div>,
}));

describe("AstroPageRoot på serveren", () => {
    afterEach(() => setRuntimeConfig(testRuntimeConfig));

    it("rendrer med forespørselens konfigurasjon uten å sette den globale verdien som deles mellom forespørsler", () => {
        setRuntimeConfig(null);
        const config = { ...testRuntimeConfig, apiUrl: "https://www.intern.nav.no/tms-personopplysninger-api" };

        const html = renderToString(<AstroPageRoot page="forside" locale="nb" pathname="/person/personopplysninger/nb/" config={config} />);

        expect(html).toContain(config.apiUrl);
        expect(() => getRuntimeConfig()).toThrow();
    });
});
