// @vitest-environment node
import { renderToString } from "react-dom/server";
import AstroPageRoot from "@/components/astro/AstroPageRoot";
import { getRuntimeConfig, setRuntimeConfig, useRuntimeConfig } from "@/config/runtimeConfig";
import medlInfo from "@/mocks/fixtures/medl-info.json";
import type { MedlInfo } from "@/types/medl";
import { testRuntimeConfig } from "../utils/testRuntimeConfig";

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

    it("rendrer data fra serveren i første HTML, uten spinner som byttes ut senere", () => {
        const html = renderToString(
            <AstroPageRoot
                page="medlemskap"
                locale="nb"
                pathname="/person/personopplysninger/nb/medlemskap-i-folketrygden"
                config={testRuntimeConfig}
                initialData={{ medlInfo: { status: "RESULT", data: medlInfo as unknown as MedlInfo } }}
            />,
        );

        expect(html).toContain("DANMARK");
    });
});
