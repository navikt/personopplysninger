import { createRoot } from 'react-dom/client';
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import { StoreProvider } from './store/Context';
import WithLanguages from './store/providers/Language';
import App from './App';

const init = async () => {
    if (import.meta.env.VITE_ENV === 'local') {
        await import('./clients/apiMock').then(({ setUpMock }) => setUpMock());
        injectDecoratorClientSide({
            env: 'localhost',
            localUrl: 'http://localhost:8100/dekoratoren',
            params: {
                simple: false,
                chatbot: false,
                logoutWarning: true,
            },
        });
    }

    const container = document.getElementById('maincontent');
    if (!container) {
        return;
    }
    const root = createRoot(container);

    root.render(
        <StoreProvider>
            <WithLanguages>
                <App />
            </WithLanguages>
        </StoreProvider>
    );
};
init();
