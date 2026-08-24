import { IntlProvider } from 'react-intl';
import { render, screen } from '@testing-library/react';
import App from '@/App';
import { basePath } from '@/constants';
import { StoreProvider } from '@/store/Context';
import nbMessages from '@/text/nb';

vi.mock('@grafana/faro-web-sdk', () => ({
    initializeFaro: vi.fn(),
}));

vi.mock('@/store/providers/WithAuth', () => ({
    WithAuth: ({ children }: { children: JSX.Element }) => children,
}));

const arbeidsforholdUrl = 'https://www.nav.no/aa-registeret/arbeidsforhold';
const originalPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;

const renderAppAtPath = (path: string) => {
    window.history.replaceState({}, '', path);

    return render(
        <StoreProvider>
            <IntlProvider locale="nb" messages={nbMessages}>
                <App />
            </IntlProvider>
        </StoreProvider>,
    );
};

describe('App arbeidsforhold routes', () => {
    beforeEach(() => {
        vi.stubEnv('VITE_ARBEIDSFORHOLD_URL', arbeidsforholdUrl);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllEnvs();
        window.history.replaceState({}, '', originalPath);
    });

    it.each([`${basePath}/nb/arbeidsforhold`, `${basePath}/nb/arbeidsforhold/123`])('should render 404 for %s', (path) => {
        renderAppAtPath(path);

        expect(screen.getByRole('heading', { level: 1, name: '404' })).toBeInTheDocument();
    });
});
