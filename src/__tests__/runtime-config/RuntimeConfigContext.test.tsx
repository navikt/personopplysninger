import { render, screen } from "@testing-library/react";
import { RuntimeConfigProvider, useRuntimeConfig } from "@/runtime-config/RuntimeConfigContext";
import { resetRuntimeConfigForTests } from "@/runtime-config/runtimeConfig";
import type { RuntimeConfig } from "@/runtime-config/types";

const exampleConfig: RuntimeConfig = {
    env: "dev",
    buildVersion: "dev-abc123",
    appUrl: "https://www.ansatt.dev.nav.no/person/personopplysninger",
    apiUrl: "https://www.ansatt.dev.nav.no/tms-personopplysninger-api",
    endreKontonummerUrl: "https://www.ansatt.dev.nav.no/tms-endre-kontonummer",
    innloggingsstatusUrl: "https://www.ekstern.dev.nav.no/person/nav-dekoratoren-api/auth",
    loginUrl: "https://login.ekstern.dev.nav.no/oauth2/login",
    dineSakerUrl: "https://www.intern.dev.nav.no/dokumentarkiv",
    dittNavUrl: "https://www.intern.dev.nav.no/minside",
    pdlUrl: "https://www.intern.dev.nav.no/person/pdl-fullmakt-ui",
    skjermingUrl: "https://skjerming-ui.intern.dev.nav.no/person/personopplysninger/skjerming",
    sykefravaerUrl: "https://www.ekstern.dev.nav.no/syk/sykefravaer",
    utbetalingsoversiktUrl: "https://www.intern.dev.nav.no/utbetalingsoversikt/",
    telemetryUrl: "https://telemetry.ekstern.dev.nav.no/collect",
};

const ConsumerComponent = () => {
    const config = useRuntimeConfig();
    return <span>{config.buildVersion}</span>;
};

describe("RuntimeConfigProvider / useRuntimeConfig", () => {
    it("should make the config available to descendants via the hook", () => {
        render(
            <RuntimeConfigProvider config={exampleConfig}>
                <ConsumerComponent />
            </RuntimeConfigProvider>,
        );

        expect(screen.getByText("dev-abc123")).toBeInTheDocument();
    });

    it("should throw a helpful error when used outside the provider", () => {
        // Swallow the expected React error boundary console.error noise.
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);

        expect(() => render(<ConsumerComponent />)).toThrow(/useRuntimeConfig must be used within/);

        consoleError.mockRestore();
    });

    it("should also update the plain-module singleton used by non-component code", async () => {
        resetRuntimeConfigForTests();
        render(
            <RuntimeConfigProvider config={exampleConfig}>
                <ConsumerComponent />
            </RuntimeConfigProvider>,
        );

        const { getRuntimeConfig } = await import("@/runtime-config/runtimeConfig");
        expect(getRuntimeConfig().env).toBe("dev");
    });
});
