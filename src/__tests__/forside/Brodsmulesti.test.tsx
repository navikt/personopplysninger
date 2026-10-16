import { setAvailableLanguages } from "@navikt/nav-dekoratoren-moduler";
import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import Brodsmulesti from "@/pages/forside/sections/2-brodsmulesti/Brodsmulesti";
import { StoreProvider } from "@/store/Context";
import nbMessages from "@/text/nb";

vi.mock("@navikt/nav-dekoratoren-moduler", () => ({
    onBreadcrumbClick: vi.fn(),
    onLanguageSelect: vi.fn(),
    setAvailableLanguages: vi.fn(),
    setBreadcrumbs: vi.fn(),
}));

describe("Brodsmulesti", () => {
    it("sender språkvalg dekoratøren godtar: handleInApp og fulle URL-er til samme side", () => {
        render(
            <StoreProvider initialLocale="nb">
                <IntlProvider locale="nb" messages={nbMessages}>
                    <Brodsmulesti pathname="/person/personopplysninger/nb/institusjonsopphold" />
                </IntlProvider>
            </StoreProvider>,
        );

        const origin = window.location.origin;
        expect(setAvailableLanguages).toHaveBeenCalledWith([
            { url: `${origin}/person/personopplysninger/nb/institusjonsopphold`, locale: "nb", handleInApp: false },
            { url: `${origin}/person/personopplysninger/en/institusjonsopphold`, locale: "en", handleInApp: false },
            { url: `${origin}/person/personopplysninger/nn/institusjonsopphold`, locale: "nn", handleInApp: false },
        ]);
    });
});
