import { spawn } from "node:child_process";

const defaults = {
    PUBLIC_ENV: "local",
    PUBLIC_BUILD_VERSION: "local",
    PUBLIC_DINE_SAKER_URL: "https://www.intern.dev.nav.no/dokumentarkiv",
    PUBLIC_PDL_URL: "https://www.intern.dev.nav.no/person/pdl-fullmakt-ui",
    PUBLIC_SKJERMING_URL: "https://skjerming-ui.intern.dev.nav.no/person/personopplysninger/skjerming",
    PUBLIC_APP_URL: "http://localhost:3006/person/personopplysninger",
    PUBLIC_API_URL: "http://localhost:3006/api",
    PUBLIC_ENDRE_KONTONUMMER_URL: "http://localhost:3006/api",
    PUBLIC_UTBETALINGSOVERSIKT_URL: "https://www.intern.dev.nav.no/utbetalingsoversikt/",
    PUBLIC_SYKEFRAVAER_URL: "https://www.ekstern.dev.nav.no/syk/sykefravaer",
    PUBLIC_LOGIN_URL: "http://localhost:3006/oauth2/login",
    PUBLIC_DITT_NAV_URL: "https://www.intern.dev.nav.no/minside",
    PUBLIC_PENSJONSOPPTJENING_URL: "https://www-gcp.ansatt.dev.nav.no/pensjon/opptjening",
    PUBLIC_INNLOGGINGSSTATUS_URL: "http://localhost:3006/api/auth",
    PUBLIC_TELEMETRY_URL: "https://telemetry.ekstern.dev.nav.no/collect",
};

for (const [name, value] of Object.entries(defaults)) {
    process.env[name] ??= value;
}
process.env.ASTRO_TELEMETRY_DISABLED ??= "1";

const astro = spawn("./node_modules/.bin/astro", ["dev"], {
    env: process.env,
    stdio: "inherit",
});

astro.on("exit", (code) => process.exit(code ?? 1));
