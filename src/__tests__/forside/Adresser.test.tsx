import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import nbMessages from 'text/nb';
import personInfo from '../../clients/apiMock/app/fetch/person-info.json';
import Adresser from '../../pages/forside/sections/4-personinfo/3-adresser/Adresser';
import { Adresser as AdresserType } from 'types/adresser';
import { StoreProvider } from '../../store/Context';
import { render } from '@testing-library/react';

jest.mock('react-modal');

describe('Adresser', () => {
    it('renders correctly', () => {
        const { asFragment } = render(
            <StoreProvider>
                <IntlProvider locale={'nb'} messages={nbMessages}>
                    <Adresser adresser={personInfo.adresser as unknown as AdresserType} />
                </IntlProvider>
            </StoreProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
