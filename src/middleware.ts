import { authenticate } from "@navikt/astro-auth";
import { publicEnvironment } from "@/config/publicEnvironment";

void publicEnvironment;
export const onRequest = authenticate();
