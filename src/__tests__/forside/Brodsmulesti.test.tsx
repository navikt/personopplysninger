import { setAvailableLanguages } from "@navikt/nav-dekoratoren-moduler";
import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import PageContainer from "@/components/pagecontainer/PageContainer";
import { StoreProvider } from "@/store/Context";
import nbMessages from "@/text/nb";
import Brodsmulesti from "@/views/forside/sections/2-brodsmulesti/Brodsmulesti";

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

    it("PageContainer sender pathname videre til brødsmulestien", () => {
        render(
            <StoreProvider initialLocale="nb">
                <IntlProvider locale="nb" messages={nbMessages}>
                    <PageContainer tittelId="dsop.tittel" backTo="/" brodsmulesti={[]} pathname="/person/personopplysninger/nb/dsop">
                        <div />
                    </PageContainer>
                </IntlProvider>
            </StoreProvider>,
        );

        const origin = window.location.origin;
        expect(setAvailableLanguages).toHaveBeenLastCalledWith([
            { url: `${origin}/person/personopplysninger/nb/dsop`, locale: "nb", handleInApp: false },
            { url: `${origin}/person/personopplysninger/en/dsop`, locale: "en", handleInApp: false },
            { url: `${origin}/person/personopplysninger/nn/dsop`, locale: "nn", handleInApp: false },
        ]);
    });
});
