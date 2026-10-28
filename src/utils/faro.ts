import { initializeFaro } from "@grafana/faro-web-sdk";

let started = false;

export const startFaro = () => {
    const config = document.querySelector<HTMLElement>("[data-telemetry-url]")?.dataset;
    if (started || !config || config.environment === "local") {
        return;
    }

    started = true;
    initializeFaro({
        url: config.telemetryUrl,
        app: {
            name: "personopplysninger",
            version: config.buildVersion,
        },
    });
};
