import jobbsok from "../../../../assets/img/jobbsok.svg";
import pensjon from "../../../../assets/img/pensjon.svg";
import utbetalinger from "../../../../assets/img/utbetalinger.svg";
import sykefravaer from "../../../../assets/img/sykefravaer.svg";
import dineSaker from "../../../../assets/img/dine-saker.svg";
import Environment from "../../../../utils/Environments";

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
