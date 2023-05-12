import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import nbMessages from 'text/nb';
import InstHistorikkView from '../../pages/institusjonsopphold/historikk/InstHistorikkView';
import instInfo from '../../clients/apiMock/app/fetch/inst-info.json';
import { render } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
    Link: () => <div />,
    useLocation: () => ({
        pathname: 'pathname',
    }),
}));

describe('InstHistorikkView', () => {
    it('renders correctly', () => {
        const { asFragment } = render(
            <IntlProvider locale={'nb'} messages={nbMessages}>
                <InstHistorikkView instInfo={instInfo} />
            </IntlProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
