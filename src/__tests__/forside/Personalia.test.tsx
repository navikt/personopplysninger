import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import nbMessages from 'text/nb';
import personInfo from '../../clients/apiMock/app/fetch/person-info.json';
import Personalia from '../../pages/forside/sections/4-personinfo/1-personalia/Personalia';
import { Personalia as PersonaliaType } from 'types/personalia';
import { StoreProvider } from '../../store/Context';
import { render } from '@testing-library/react';

jest.mock('react-modal');

describe('Personalia', () => {
    it('renders correctly', () => {
        const { asFragment } = render(
            <StoreProvider>
                <IntlProvider locale={'nb'} messages={nbMessages}>
                    <Personalia personalia={personInfo as unknown as PersonaliaType} />
                </IntlProvider>
            </StoreProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
