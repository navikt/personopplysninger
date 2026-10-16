import CVogJobbprofil from "@/assets/img/CVogJobbprofil.svg";
import dineSaker from "@/assets/img/DineSaker.svg";
import jobbsok from "@/assets/img/LedigeStillinger.svg";
import pensjon from "@/assets/img/Pensjon.svg";
import sykefravaer from "@/assets/img/Sykepenger.svg";
import utbetalinger from "@/assets/img/Utbetalinger.svg";
import { runtimeEnvironment } from "@/config/runtimeEnvironment";

export default (locale: string) => [
    {
        id: "dine-saker",
        tittel: "lenker.dokumentarkiv.tittel",
        beskrivelse: "lenker.dokumentarkiv.beskrivelse",
        lenkeTekst: "lenker.dokumentarkiv.lenkeTekst",
        url: `${runtimeEnvironment.dineSakerUrl}${locale === "en" ? "?lang=en" : ""}`,
        icon: dineSaker,
    },
    {
        id: "utbetalinger",
        tittel: "lenker.utbetalinger.tittel",
        beskrivelse: "lenker.utbetalinger.beskrivelse",
        lenkeTekst: "lenker.utbetalinger.lenkeTekst",
        url: runtimeEnvironment.utbetalingsoversiktUrl,
        icon: utbetalinger,
    },
    {
        id: "sykefravaer",
        tittel: "lenker.sykefravaer.tittel",
        beskrivelse: "lenker.sykefravaer.beskrivelse",
        lenkeTekst: "lenker.sykefravaer.lenkeTekst",
        url: runtimeEnvironment.sykefravaerUrl,
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
