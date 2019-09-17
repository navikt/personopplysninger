import jobbsok from "../../../../assets/img/LedigeStillinger.svg";
import pensjon from "../../../../assets/img/Pensjon.svg";
import utbetalinger from "../../../../assets/img/Utbetalinger.svg";
import sykefravaer from "../../../../assets/img/Sykepenger.svg";
import dineSaker from "../../../../assets/img/DineSaker.svg";
import Environment from "../../../../Environments";

const { tjenesteUrl } = Environment();

export default [
  {
    id: "dine-saker",
    tittel: "eksternelenker.dinesaker.tittel",
    beskrivelse: "eksternelenker.dinesaker.beskrivelse",
    lenkeTekst: "eksternelenker.dinesaker.lenkeTekst",
    url: `${tjenesteUrl}/saksoversikt/app`,
    icon: dineSaker
  },
  {
    id: "utbetalinger",
    tittel: "eksternelenker.utbetalinger.tittel",
    beskrivelse: "eksternelenker.utbetalinger.beskrivelse",
    lenkeTekst: "eksternelenker.utbetalinger.lenkeTekst",
    url: `${tjenesteUrl}/utbetalingsoversikt`,
    icon: utbetalinger
  },
  {
    id: "sykefravaer",
    tittel: "eksternelenker.sykefravaer.tittel",
    beskrivelse: "eksternelenker.sykefravaer.beskrivelse",
    lenkeTekst: "eksternelenker.sykefravaer.lenkeTekst",
    url: `${tjenesteUrl}/sykefravaer`,
    icon: sykefravaer
  },
  {
    id: "cv",
    tittel: "eksternelenker.cv.tittel",
    beskrivelse: "eksternelenker.cv.beskrivelse",
    lenkeTekst: "eksternelenker.cv.lenkeTekst",
    url: "https://arbeidsplassen.nav.no/minside",
    icon: jobbsok
  },
  {
    id: "pensjonsopptjening",
    tittel: "eksternelenker.pensjon.tittel",
    beskrivelse: "eksternelenker.pensjon.beskrivelse",
    lenkeTekst: "eksternelenker.pensjon.lenkeTekst",
    url: `${tjenesteUrl}/pselv/publisering/dinpensjon.jsf`,
    icon: pensjon
  }
];
