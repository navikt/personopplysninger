import jobbsok from 'assets/img/LedigeStillinger.svg';
import pensjon from 'assets/img/Pensjon.svg';
import utbetalinger from 'assets/img/Utbetalinger.svg';
import sykefravaer from 'assets/img/Sykepenger.svg';
import dineSaker from 'assets/img/DineSaker.svg';

const { REACT_APP_UTBETALINGSOVERSIKT_URL, REACT_APP_SYKEFRAVAER_URL, REACT_APP_DINE_SAKER_URL } = process.env;

export default (locale: string) => [
    {
        id: 'dine-saker',
        tittel: 'lenker.dokumentarkiv.tittel',
        beskrivelse: 'lenker.dokumentarkiv.beskrivelse',
        lenkeTekst: 'lenker.dokumentarkiv.lenkeTekst',
        url: `${REACT_APP_DINE_SAKER_URL}${locale === 'en' ? '?lang=en' : ''}`,
        icon: dineSaker,
    },
    {
        id: 'utbetalinger',
        tittel: 'lenker.utbetalinger.tittel',
        beskrivelse: 'lenker.utbetalinger.beskrivelse',
        lenkeTekst: 'lenker.utbetalinger.lenkeTekst',
        url: REACT_APP_UTBETALINGSOVERSIKT_URL,
        icon: utbetalinger,
    },
    {
        id: 'sykefravaer',
        tittel: 'lenker.sykefravaer.tittel',
        beskrivelse: 'lenker.sykefravaer.beskrivelse',
        lenkeTekst: 'lenker.sykefravaer.lenkeTekst',
        url: REACT_APP_SYKEFRAVAER_URL,
        icon: sykefravaer,
    },
    {
        id: 'cv',
        tittel: 'lenker.cv.tittel',
        beskrivelse: 'lenker.cv.beskrivelse',
        lenkeTekst: 'lenker.cv.lenkeTekst',
        url: 'https://arbeidsplassen.nav.no/cv',
        icon: jobbsok,
    },
    {
        id: 'pensjonsopptjening',
        tittel: 'lenker.pensjon.tittel',
        beskrivelse: 'lenker.pensjon.beskrivelse',
        lenkeTekst: 'lenker.pensjon.lenkeTekst',
        url: 'https://www.nav.no/pselv/publisering/dinpensjon.jsf',
        icon: pensjon,
    },
];
