import { injectDecoratorClientSide } from "@navikt/nav-dekoratoren-moduler";
import { createRoot } from "react-dom/client";
import ReactApp from "./ReactApp";

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

    root.render(<ReactApp />);
};
init();
