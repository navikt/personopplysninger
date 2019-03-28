import koffert from "../assets/img/koffert.svg";
import papirstabel from "../assets/img/papirstabel.svg";
import penger from "../assets/img/penger.svg";
import jobbsok from "../assets/img/jobbsok.svg";
import sparegris from "../assets/img/spare-pensjonsgris.svg";

export default [
  {
    id: "arbeidsforhold",
    header: "Arbeidsforhold",
    information:
      "NAV har opplysninger om dine arbeidsforhold i en egen tjeneste.",
    linkText: "Gå til dine arbeidsforhold her",
    url: "https://www.nav.no/no/Person/Pensjon/Hva+kan+jeg+fa+i+pensjon",
    icon: koffert,
    visible: false
  },
  {
    id: "pensjonsopptjening",
    header: "Pensjonsopptjening",
    information:
      "NAV har opplysninger om din pensjonsopptjening i en egen tjeneste.",
    linkText: "Gå til Din pensjon",
    url: "https://tjenester.nav.no/pselv/publisering/dinpensjon.jsf",
    icon: sparegris,
    visible: true
  },
  {
    id: "dine-saker",
    header: "Dine saker",
    information: "Oversikt over dine saker og kommunikasjon med NAV",
    linkText: "Gå til saksoversikt",
    url: "https://tjenester.nav.no/saksoversikt/app",
    icon: papirstabel,
    infoBoxContent: {
      __html:
        'Hvis du er part i en sak hos NAV, kan du få innsyn i sakens dokumenter i tjenesten Dine saker på nav.no. På grunn av tekniske og juridiske begrensninger vil ikke alle dokumenter vises. Du kan også be om partsinnsyn ved å kontakte NAV Kontaktsenter, tlf. 55 55 33 33, eller bruke <a class="lenke" href="" target="_blank" rel="noopener noreferrer">Send beskjed til NAV</a>.'
    },
    visible: true
  },
  {
    id: "utbetalinger",
    header: "Utbetalinger",
    information: "Oversikt over dine utbetalinger fra NAV",
    linkText: "Gå til utbetalinger",
    url: "https://tjenester.nav.no/utbetalingsoversikt/",
    icon: penger,
    visible: true
  },
  {
    id: "cv",
    header: "CV og stillingssøk",
    information: "Din CV og lagrede stillingssøk",
    linkText: "Gå til CV/stillingssøk",
    url: "https://arbeidsplassen.nav.no/minside",
    icon: jobbsok,
    visible: true
  }
];
