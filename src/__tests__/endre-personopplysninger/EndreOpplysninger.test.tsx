import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import personInfo from "@/mocks/fixtures/person-info.json";
import EndreOpplysningerView from "@/pages/endre-personopplysninger/EndreOpplysningerView";
import { StoreProvider } from "@/store/Context";
import nbMessages from "@/text/nb";
import type { Adresser } from "@/types/adresser";
import type { Personalia } from "@/types/personalia";

vi.mock("react-modal");

describe("EndreOpplysningerView", () => {
    it("renders correctly", () => {
        const { asFragment } = render(
            <StoreProvider>
                <IntlProvider locale={"nb"} messages={nbMessages}>
                    <MemoryRouter>
                        <EndreOpplysningerView
                            adresser={personInfo.adresser as unknown as Adresser}
                            personalia={personInfo.personalia as unknown as Personalia}
                        />
                    </MemoryRouter>
                </IntlProvider>
            </StoreProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
