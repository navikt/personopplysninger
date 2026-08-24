import { IntlProvider } from 'react-intl';
import { render, screen } from '@testing-library/react';
import nbMessages from '@/text/nb';
import { StoreProvider } from '@/store/Context';
import Arbeidsforhold from '@/pages/forside/sections/5-arbeidsforhold/Arbeidsforhold';

const arbeidsforholdUrl = 'https://www.nav.no/aa-registeret/arbeidsforhold';

vi.mock('@navikt/arbeidsforhold', () => ({
    ListeMedArbeidsforhold: () => <div>embedded list</div>,
}));

describe('Arbeidsforhold', () => {
    beforeEach(() => {
        vi.stubEnv('VITE_ARBEIDSFORHOLD_URL', arbeidsforholdUrl);
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should direct users to the Aa-registeret employment overview', () => {
        render(
            <StoreProvider>
                <IntlProvider locale="nb" messages={nbMessages}>
                    <Arbeidsforhold />
                </IntlProvider>
            </StoreProvider>
        );

        expect(screen.getByRole('heading', { level: 2, name: 'Arbeidsforhold' })).toBeInTheDocument();
        expect(
            screen.getByText('I Aa-registeret kan du se hvilke opplysninger arbeidsgiverne dine har rapportert om arbeidsforholdene dine.')
        ).toBeInTheDocument();

        const link = screen.getByRole('link', { name: 'Se dine arbeidsforhold i Aa-registeret' });
        expect(link).toHaveAttribute('href', arbeidsforholdUrl);
    });
});
