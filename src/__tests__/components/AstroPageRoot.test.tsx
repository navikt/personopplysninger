import { render, screen } from "@testing-library/react";
import AstroPageRoot from "@/components/astro/AstroPageRoot";
import { getRuntimeConfig, setRuntimeConfig, useRuntimeConfig } from "@/config/runtimeConfig";
import { startFaro } from "@/utils/faro";
import { testRuntimeConfig } from "../utils/testRuntimeConfig";

vi.mock("@/utils/faro", () => ({ startFaro: vi.fn() }));
vi.mock("@/views/forside/Forside", () => ({
    default: () => {
        const { apiUrl } = useRuntimeConfig();
        return <div>forside {apiUrl}</div>;
    },
}));

const config = { ...testRuntimeConfig, apiUrl: "https://www.intern.nav.no/tms-personopplysninger-api" };

describe("AstroPageRoot", () => {
    afterEach(() => setRuntimeConfig(testRuntimeConfig));

    it("starter Faro i nettleseren når siden monteres", () => {
        render(<AstroPageRoot page="forside" locale="nb" pathname="/person/personopplysninger/nb/" config={config} />);

        expect(startFaro).toHaveBeenCalledTimes(1);
    });

    it("gir sidene konfigurasjonen fra serveren", () => {
        render(<AstroPageRoot page="forside" locale="nb" pathname="/person/personopplysninger/nb/" config={config} />);

        expect(screen.getByText(`forside ${config.apiUrl}`)).toBeInTheDocument();
    });

    it("gjør konfigurasjonen tilgjengelig for kode utenfor React før første rendring", () => {
        setRuntimeConfig(null);

        render(<AstroPageRoot page="forside" locale="nb" pathname="/person/personopplysninger/nb/" config={config} />);

        expect(getRuntimeConfig()).toBe(config);
    });
});
