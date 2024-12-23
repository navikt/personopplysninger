import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import nbMessages from '@/text/nb';
import personInfo from '@/clients/apiMock/app/fetch/person-info.json';
import personInfoUtenlandskbank from '@/clients/apiMock/app/fetch/person-info-utenlandskbank.json';
import Utbetalinger from '@/pages/forside/sections/4-personinfo/4-utbetalinger/Utbetalinger';
import { StoreProvider } from '@/store/Context';
import { UtenlandskBankkonto } from '@/types/personalia';

vi.mock('react-modal');

// TODO: react useId breaks this
describe['skip']('Utbetalinger', () => {
    it('with kontonummer renders correctly', () => {
        const { asFragment } = render(
            <StoreProvider>
                <IntlProvider locale={'nb'} messages={nbMessages}>
                    <MemoryRouter>
                        <Utbetalinger kontonr={personInfo.personalia.kontonr} kontoregisterStatus={'OK'} />
                    </MemoryRouter>
                </IntlProvider>
            </StoreProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('with utenlandsk bank renders correctly', () => {
        const { asFragment } = render(
            <StoreProvider>
                <IntlProvider locale={'nb'} messages={nbMessages}>
                    <MemoryRouter>
                        <Utbetalinger
                            utenlandskbank={personInfoUtenlandskbank.personalia.utenlandskbank as unknown as UtenlandskBankkonto}
                            kontoregisterStatus={'OK'}
                        />
                    </MemoryRouter>
                </IntlProvider>
            </StoreProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
