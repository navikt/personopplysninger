import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import DsopDetaljerView from '@/pages/digital-samhandling-offentlig-privat/detaljer/DsopDetaljerView';
import dsopInfo from '@/clients/apiMock/app/fetch/dsop-info.json';
import nbMessages from '@/text/nb';

describe('DsopDetaljerView', () => {
    it('renders correctly', () => {
        const { asFragment } = render(
            <IntlProvider locale={'nb'} messages={nbMessages}>
                <DsopDetaljerView dsopInfo={dsopInfo} id={'2019-06-18T10:45:51.634'} />
            </IntlProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
