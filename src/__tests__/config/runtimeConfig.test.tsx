import { render, screen } from "@testing-library/react";
import { getRuntimeConfig, type RuntimeConfig, RuntimeConfigContext, setRuntimeConfig, useRuntimeConfig } from "@/config/runtimeConfig";
import { testRuntimeConfig } from "../utils/testRuntimeConfig";

const Vis = () => <span>{useRuntimeConfig().appUrl}</span>;

describe("runtimeConfig", () => {
    afterEach(() => setRuntimeConfig(testRuntimeConfig));

    it("feiler tydelig når konfigurasjonen leses før den er satt", () => {
        setRuntimeConfig(null);

        expect(() => getRuntimeConfig()).toThrow(/ikke satt/);
    });

    it("returnerer konfigurasjonen som er satt", () => {
        const config: RuntimeConfig = { ...testRuntimeConfig, appUrl: "https://www.intern.nav.no/person/personopplysninger" };
        setRuntimeConfig(config);

        expect(getRuntimeConfig()).toBe(config);
    });

    it("lar konteksten vinne over den globale verdien, slik at serverrendringen bruker forespørselens verdier", () => {
        setRuntimeConfig({ ...testRuntimeConfig, appUrl: "global" });

        render(
            <RuntimeConfigContext.Provider value={{ ...testRuntimeConfig, appUrl: "fra-kontekst" }}>
                <Vis />
            </RuntimeConfigContext.Provider>,
        );

        expect(screen.getByText("fra-kontekst")).toBeInTheDocument();
    });

    it("faller tilbake til den globale verdien uten kontekst", () => {
        setRuntimeConfig({ ...testRuntimeConfig, appUrl: "global" });

        render(<Vis />);

        expect(screen.getByText("global")).toBeInTheDocument();
    });
});
