import { IntlProvider } from 'react-intl';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import { basePath } from '@/constants';
import { StoreProvider } from '@/store/Context';
import nbMessages from '@/text/nb';
import { redirectExternally } from '@/utils/redirects';

vi.mock('@/utils/redirects', async (importOriginal) => ({
    ...(await importOriginal<typeof import('@/utils/redirects')>()),
    redirectExternally: vi.fn(),
}));

vi.mock('@grafana/faro-web-sdk', () => ({
    initializeFaro: vi.fn(),
}));

vi.mock('@/store/providers/WithAuth', () => ({
    WithAuth: ({ children }: { children: JSX.Element }) => children,
}));

const arbeidsforholdUrl = 'https://www.ansatt.dev.nav.no/aa-registeret/innsyn';
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

const has404Heading = () => document.querySelector('h1')?.textContent?.trim() === '404';
const containsNotFoundContainer = (node: Node) =>
    node instanceof HTMLElement && (node.classList.contains('notfound__container') || node.querySelector('.notfound__container') !== null);

describe('App arbeidsforhold routes', () => {
    beforeEach(() => {
        vi.stubEnv('VITE_ARBEIDSFORHOLD_URL', arbeidsforholdUrl);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllEnvs();
        window.history.replaceState({}, '', originalPath);
    });

    it('should redirect locale-less entry route without rendering 404 on the way', async () => {
        window.history.replaceState({}, '', basePath);

        const container = document.createElement('div');
        document.body.appendChild(container);
        const root = createRoot(container);
        let rendered404 = false;

        const observer = new MutationObserver((mutations) => {
            const hasNotFoundMutation = mutations.some((mutation) => Array.from(mutation.addedNodes).some(containsNotFoundContainer));

            if (hasNotFoundMutation || has404Heading()) {
                rendered404 = true;
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
        });

        try {
            await act(async () => {
                flushSync(() => {
                    root.render(
                        <StoreProvider>
                            <IntlProvider locale="nb" messages={nbMessages}>
                                <App />
                            </IntlProvider>
                        </StoreProvider>,
                    );
                });
            });

            if (container.querySelector('.notfound__container') !== null) {
                rendered404 = true;
            }

            await waitFor(() => {
                expect(window.location.pathname).toBe(`${basePath}/nb/`);
            });
        } finally {
            observer.disconnect();
            await act(async () => {
                root.unmount();
            });
            container.remove();
        }

        expect(rendered404).toBe(false);
    });

    it.each([`${basePath}/nb/arbeidsforhold`, `${basePath}/nb/arbeidsforhold/123`])('should redirect %s to the new service', async (path) => {
        renderAppAtPath(path);

        await waitFor(() => {
            expect(redirectExternally).toHaveBeenCalledWith(arbeidsforholdUrl);
        });
    });

    it('should render 404 for unknown paths', () => {
        renderAppAtPath(`${basePath}/nb/finnes-ikke`);

        expect(screen.getByRole('heading', { level: 1, name: '404' })).toBeInTheDocument();
    });
});
