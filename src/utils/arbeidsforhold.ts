const DEFAULT_ARBEIDSFORHOLD_URL = 'https://www.nav.no/aa-registeret/innsyn';

export const getArbeidsforholdUrl = () => {
    const arbeidsforholdUrl = import.meta.env.VITE_ARBEIDSFORHOLD_URL?.trim();

    if (arbeidsforholdUrl === '') {
        return DEFAULT_ARBEIDSFORHOLD_URL;
    }

    return arbeidsforholdUrl ?? DEFAULT_ARBEIDSFORHOLD_URL;
};
