import '@testing-library/jest-dom';
import personInfo from '../../clients/apiMock/app/fetch/person-info.json';
import { IntlProvider } from 'react-intl';
import nbMessages from 'text/nb';
import EndreOpplysningerView from '../../pages/endre-personopplysninger/EndreOpplysningerView';
import { Adresser } from '../../types/adresser';
import { Personalia } from '../../types/personalia';
import { StoreProvider } from '@/store/Context';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-modal');

describe('EndreOpplysningerView', () => {
    it('renders correctly', () => {
        const { asFragment } = render(
            <StoreProvider>
                <IntlProvider locale={'nb'} messages={nbMessages}>
                    <MemoryRouter>
                        <EndreOpplysningerView
                            adresser={personInfo.adresser as unknown as Adresser}
                            personalia={personInfo.personalia as unknown as Personalia}
                        />
                    </MemoryRouter>
                </IntlProvider>
            </StoreProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
