import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import nbMessages from 'text/nb';
import personInfo from '../../clients/apiMock/app/fetch/person-info.json';
import { StoreProvider } from '../../store/Context';
import DittNavKontor from '../../pages/forside/sections/4-personinfo/5-ditt-nav-kontor/DittNavKontor';
import { EnhetKontaktInfo } from '../../types/enhetKontaktInfo';
import { render } from '@testing-library/react';

jest.mock('react-modal');

//Mock import som feiler
jest.mock('@navikt/nav-office-reception-info', () => ({
    Reception: () => <div>Mock Reception</div>,
}));

describe('DittNavKontor', () => {
    it.skip('renders correctly', () => {
        const { asFragment } = render(
            <StoreProvider>
                <IntlProvider locale={'nb'} messages={nbMessages}>
                    <DittNavKontor enhetKontaktInformasjon={personInfo.enhetKontaktInformasjon as unknown as EnhetKontaktInfo} />
                </IntlProvider>
            </StoreProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
