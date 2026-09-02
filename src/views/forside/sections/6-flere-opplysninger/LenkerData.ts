import CVogJobbprofil from "@/assets/img/CVogJobbprofil.svg?url";
import dineSaker from "@/assets/img/DineSaker.svg?url";
import jobbsok from "@/assets/img/LedigeStillinger.svg?url";
import pensjon from "@/assets/img/Pensjon.svg?url";
import sykefravaer from "@/assets/img/Sykepenger.svg?url";
import utbetalinger from "@/assets/img/Utbetalinger.svg?url";
import type { RuntimeConfig } from "@/runtime-config/types";

export default (locale: string, runtimeConfig: RuntimeConfig) => [
    {
        id: "dine-saker",
        tittel: "lenker.dokumentarkiv.tittel",
        beskrivelse: "lenker.dokumentarkiv.beskrivelse",
        lenkeTekst: "lenker.dokumentarkiv.lenkeTekst",
        url: `${runtimeConfig.dineSakerUrl}${locale === "en" ? "?lang=en" : ""}`,
        icon: dineSaker,
    },
    {
        id: "utbetalinger",
        tittel: "lenker.utbetalinger.tittel",
        beskrivelse: "lenker.utbetalinger.beskrivelse",
        lenkeTekst: "lenker.utbetalinger.lenkeTekst",
        url: runtimeConfig.utbetalingsoversiktUrl,
        icon: utbetalinger,
    },
    {
        id: "sykefravaer",
        tittel: "lenker.sykefravaer.tittel",
        beskrivelse: "lenker.sykefravaer.beskrivelse",
        lenkeTekst: "lenker.sykefravaer.lenkeTekst",
        url: runtimeConfig.sykefravaerUrl,
        icon: sykefravaer,
    },
    {
        id: "cv",
        tittel: "lenker.cv.tittel",
        beskrivelse: "lenker.cv.beskrivelse",
        lenkeTekst: "lenker.cv.lenkeTekst",
        url: "https://www.nav.no/min-cv",
        icon: CVogJobbprofil,
    },
    {
        id: "stillingssok",
        tittel: "lenker.stillingssok.tittel",
        beskrivelse: "lenker.stillingssok.beskrivelse",
        lenkeTekst: "lenker.stillingssok.lenkeTekst",
        url: "https://arbeidsplassen.nav.no/stillinger/lagrede-sok",
        icon: jobbsok,
    },
    {
        id: "pensjonsopptjening",
        tittel: "lenker.pensjon.tittel",
        beskrivelse: "lenker.pensjon.beskrivelse",
        lenkeTekst: "lenker.pensjon.lenkeTekst",
        url: "https://www.nav.no/pensjon/opptjening",
        icon: pensjon,
    },
];
