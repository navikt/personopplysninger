import App from "./App";
import { StoreProvider } from "./store/Context";
import WithLanguages from "./store/providers/Language";

import "./styles/tokens.css";
import "./styles/global.css";

const ReactApp = () => (
    <StoreProvider>
        <WithLanguages>
            <App />
        </WithLanguages>
    </StoreProvider>
);

export default ReactApp;
