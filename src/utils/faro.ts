import { initializeFaro } from "@grafana/faro-web-sdk";
import { getRuntimeConfig } from "@/config/runtimeConfig";

let started = false;

export const startFaro = () => {
    const { environment, telemetryUrl, buildVersion } = getRuntimeConfig();
    if (started || environment === "local") {
        return;
    }

    started = true;
    initializeFaro({
        url: telemetryUrl,
        app: {
            name: "personopplysninger",
            version: buildVersion,
        },
    });
};
