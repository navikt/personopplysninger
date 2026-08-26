import { IntlProvider } from 'react-intl';
import { render, screen } from '@testing-library/react';
import nbMessages from '@/text/nb';
import Arbeidsforhold from '@/pages/forside/sections/5-arbeidsforhold/Arbeidsforhold';

const configuredArbeidsforholdUrl = 'https://www.ansatt.dev.nav.no/aa-registeret/innsyn';
const defaultArbeidsforholdUrl = 'https://www.nav.no/aa-registeret/innsyn';

describe('Arbeidsforhold', () => {
    beforeEach(() => {
        vi.stubEnv('VITE_ARBEIDSFORHOLD_URL', configuredArbeidsforholdUrl);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllEnvs();
    });

    it('should direct users to the Aa-registeret employment overview', () => {
        render(
            <IntlProvider locale="nb" messages={nbMessages}>
                <Arbeidsforhold />
            </IntlProvider>,
        );

        expect(screen.getByRole('heading', { level: 2, name: 'Arbeidsforhold' })).toBeInTheDocument();
        expect(
            screen.getByText('I Aa-registeret kan du se hvilke opplysninger arbeidsgiverne dine har rapportert om arbeidsforholdene dine.'),
        ).toBeInTheDocument();

        const link = screen.getByRole('link', { name: 'Se dine arbeidsforhold i Aa-registeret' });
        expect(link).toHaveAttribute('href', configuredArbeidsforholdUrl);
    });

    it('should use the canonical url when arbeidsforhold URL is missing', () => {
        vi.stubEnv('VITE_ARBEIDSFORHOLD_URL', '');

        render(
            <IntlProvider locale="nb" messages={nbMessages}>
                <Arbeidsforhold />
            </IntlProvider>,
        );

        const link = screen.getByRole('link', { name: 'Se dine arbeidsforhold i Aa-registeret' });
        expect(link).toHaveAttribute('href', defaultArbeidsforholdUrl);
    });
});
