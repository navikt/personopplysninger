import { injectDecoratorClientSide } from "@navikt/nav-dekoratoren-moduler";
import { createRoot } from "react-dom/client";
import App from "./App";
import { StoreProvider } from "./store/Context";
import WithLanguages from "./store/providers/Language";

import "./styles/tokens.css";
import "./styles/global.css";

const init = async () => {
    if (import.meta.env.VITE_ENV === "local") {
        await injectDecoratorClientSide({
            env: "dev",
            params: {
                simple: false,
                chatbot: false,
                logoutWarning: true,
            },
        });
    }

    const container = document.getElementById("maincontent");
    if (!container) {
        return;
    }
    const root = createRoot(container);

    root.render(
        <StoreProvider>
            <WithLanguages>
                <App />
            </WithLanguages>
        </StoreProvider>,
    );
};
init();
