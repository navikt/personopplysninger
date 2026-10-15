import { initializeFaro } from "@grafana/faro-web-sdk";
import { runtimeEnvironment } from "@/config/runtimeEnvironment";

let started = false;

export const startFaro = () => {
    if (started || runtimeEnvironment.environment === "local") {
        return;
    }

    started = true;
    initializeFaro({
        url: runtimeEnvironment.telemetryUrl,
        app: {
            name: "personopplysninger",
            version: runtimeEnvironment.buildVersion,
        },
    });
};
