import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import nbMessages from '@/text/nb';
import kontaktInfo from '@/clients/apiMock/app/fetch/kontakt-info.json';
import personInfo from '@/clients/apiMock/app/fetch/person-info.json';
import DKIF from '@/pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/kontakt-og-reservasjonsregisteret/DKIF';
import TelefonnummerHosNav from '@/pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/telefonnummer/TelefonnummerHosNav';
import { Tlfnr } from '@/types/personalia';
import { StoreProvider } from '@/store/Context';

describe('DKIF', () => {
    it('renders correctly', () => {
        const { asFragment } = render(
            <StoreProvider>
                <IntlProvider locale={'nb'} messages={nbMessages}>
                    <DKIF info={kontaktInfo} />
                </IntlProvider>
            </StoreProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});

describe('TelefonnummerHosNav', () => {
    it('renders correctly', () => {
        const { asFragment } = render(
            <StoreProvider>
                <IntlProvider locale={'nb'} messages={nbMessages}>
                    <TelefonnummerHosNav tlfnr={personInfo.personalia.tlfnr as unknown as Tlfnr} />
                </IntlProvider>
            </StoreProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
