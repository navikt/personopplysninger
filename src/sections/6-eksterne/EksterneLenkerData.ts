import papirstabel from "../../assets/img/papirstabel.svg";
import penger from "../../assets/img/penger.svg";
import jobbsok from "../../assets/img/jobbsok.svg";
import sparegris from "../../assets/img/spare-pensjonsgris.svg";

export default [
  {
    id: "pensjonsopptjening",
    tittel: "eksternelenker.pensjon.tittel",
    beskrivelse: "eksternelenker.pensjon.beskrivelse",
    lenkeTekst: "eksternelenker.pensjon.lenkeTekst",
    url: "https://tjenester.nav.no/pselv/publisering/dinpensjon.jsf",
    icon: sparegris,
    visible: true
  },
  {
    id: "dine-saker",
    tittel: "eksternelenker.dinesaker.tittel",
    beskrivelse: "eksternelenker.dinesaker.beskrivelse",
    lenkeTekst: "eksternelenker.dinesaker.lenkeTekst",
    url: "https://tjenester.nav.no/saksoversikt/app",
    icon: papirstabel,
    visible: true
  },
  {
    id: "utbetalinger",
    tittel: "eksternelenker.utbetalinger.tittel",
    beskrivelse: "eksternelenker.utbetalinger.beskrivelse",
    lenkeTekst: "eksternelenker.utbetalinger.lenkeTekst",
    url: "https://tjenester.nav.no/utbetalingsoversikt/",
    icon: penger,
    visible: true
  },
  {
    id: "cv",
    tittel: "eksternelenker.cv.tittel",
    beskrivelse: "eksternelenker.cv.beskrivelse",
    lenkeTekst: "eksternelenker.cv.lenkeTekst",
    url: "https://arbeidsplassen.nav.no/minside",
    icon: jobbsok,
    visible: true
  }
];
