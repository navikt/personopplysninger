import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { BodyLong, Link } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import Box from '@/components/box/Box';
import arbeidsforholdIkon from '@/assets/img/Arbeidsforhold.svg';

const getArbeidsforholdUrl = () => {
    const arbeidsforholdUrl = import.meta.env.VITE_ARBEIDSFORHOLD_URL;

    if (arbeidsforholdUrl === undefined || arbeidsforholdUrl.trim() === '') {
        throw new Error('VITE_ARBEIDSFORHOLD_URL is not configured');
    }

    return arbeidsforholdUrl;
};

const Arbeidsforhold = () => {
    const arbeidsforholdUrl = getArbeidsforholdUrl();

    return (
        <Box id="arbeidsforhold" tittel="arbeidsforhold.tittel" icon={arbeidsforholdIkon} visAnkerlenke>
            <BodyLong spacing>
                <FormattedMessage id="arbeidsforhold.beskrivelse" />
            </BodyLong>
            <Link href={arbeidsforholdUrl} className="arbeidsforhold__lenke">
                <ExternalLinkIcon aria-hidden="true" />
                <FormattedMessage id="arbeidsforhold.lenke" />
            </Link>
        </Box>
    );
};
export default Arbeidsforhold;
