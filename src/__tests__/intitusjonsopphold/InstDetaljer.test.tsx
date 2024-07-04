import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import nbMessages from '@/text/nb';
import instInfo from '@/clients/apiMock/app/fetch/inst-info.json';
import InstDetaljerView from '@/pages/institusjonsopphold/detaljer/InstDetaljerView';

vi.mock('react-router-dom', () => ({
    Link: () => <div />,
    useLocation: () => ({
        pathname: 'pathname',
    }),
}));

describe('InstDetaljerView', () => {
    it('renders correctly', () => {
        const { asFragment } = render(
            <IntlProvider locale={'nb'} messages={nbMessages}>
                <InstDetaljerView innslag={instInfo[0]} />
            </IntlProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
