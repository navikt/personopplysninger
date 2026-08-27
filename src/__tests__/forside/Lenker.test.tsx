import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import nbMessages from '@/text/nb';
import { StoreProvider } from '@/store/Context';
import LinksContainer from '@/pages/forside/sections/6-flere-opplysninger/Lenker';

const arbeidsforholdUrl = 'https://www.ansatt.dev.nav.no/aa-registeret/innsyn';

describe('Flere opplysninger om deg', () => {
    beforeEach(() => {
        vi.stubEnv('VITE_ARBEIDSFORHOLD_URL', arbeidsforholdUrl);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllEnvs();
    });

    const renderLenker = () =>
        render(
            <StoreProvider>
                <IntlProvider locale="nb" messages={nbMessages}>
                    <MemoryRouter>
                        <LinksContainer />
                    </MemoryRouter>
                </IntlProvider>
            </StoreProvider>,
        );

    it('should list arbeidsforhold with the configured url', () => {
        renderLenker();

        const arbeidsforhold = screen.getByRole('link', { name: /Se dine arbeidsforhold i Aa-registeret/ });
        expect(arbeidsforhold).toHaveAttribute('href', arbeidsforholdUrl);
    });

    it('should place arbeidsforhold above dokumentarkivet', () => {
        renderLenker();

        const arbeidsforhold = screen.getByRole('link', { name: /Se dine arbeidsforhold i Aa-registeret/ });
        const dokumentarkiv = screen.getByRole('link', { name: /Dokumentarkiv/ });

        expect(arbeidsforhold.compareDocumentPosition(dokumentarkiv) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });
});
