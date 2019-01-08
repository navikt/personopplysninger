import koffert from '../../assets/img/koffert.png';
import papirstabel from '../../assets/img/papirstabel.png';
import penger from '../../assets/img/penger.png';
import jobbsok from '../../assets/img/jobbsok.png';
import pensjonist from '../../assets/img/pensjonist.png';

export default [
  {
    header: 'Arbeidsforhold',
    information: 'NAV har opplysninger om dine arbeidsforhold i en egen tjeneste.',
    linkText: 'Gå til dine arbeidsforhold her',
    url: 'https://www.nav.no/no/Person/Pensjon/Hva+kan+jeg+fa+i+pensjon',
    kilde: 'Pensjonsregisteret',
    icon: koffert,
    visible: false,
  },
  {
    header: 'Pensjon',
    information: 'NAV har opplysninger om din pensjon i en egen tjeneste.',
    linkText: 'Gå til Din pensjon',
    url: 'https://www.nav.no/no/Person/Pensjon/Hva+kan+jeg+fa+i+pensjon',
    kilde: 'Pensjonsregisteret',
    icon: pensjonist,
    visible: true,
  },
  {
    header: 'Dine saker',
    information: 'Oversikt over dine saker og kommunikasjon med NAV',
    linkText: 'Gå til saksoversikt',
    url: 'https://tjenester.nav.no/saksoversikt/app',
    kilde: 'NAV',
    icon: papirstabel,
    visible: true,
  },
  {
    header: 'Utbetalinger',
    information: 'Oversikt over dine utbetalinger fra NAV',
    linkText: 'Gå til utbetalinger',
    url: 'https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Utbetalinger/Utbetalinger',
    kilde: 'NAV',
    icon: penger,
    visible: true,
  },
  {
    header: 'Jobbsøk',
    information: 'Jobbsøknader, CV, aktivitetsplaner og lagrede søk',
    linkText: 'Gå til din jobbsøk/CV',
    url: 'https://www.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker',
    kilde: 'Arbeidsregisteret',
    icon: jobbsok,
    visible: true,
  },
];
