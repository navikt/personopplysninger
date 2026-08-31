import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import personInfo from "@/mocks/fixtures/person-info.json";
import Adresser from "@/pages/forside/sections/4-personinfo/3-adresser/Adresser";
import { StoreProvider } from "@/store/Context";
import nbMessages from "@/text/nb";
import type { Adresser as AdresserType } from "@/types/adresser";

vi.mock("react-modal");

describe("Adresser", () => {
    it("renders correctly", () => {
        const { asFragment } = render(
            <StoreProvider>
                <IntlProvider locale={"nb"} messages={nbMessages}>
                    <Adresser adresser={personInfo.adresser as unknown as AdresserType} />
                </IntlProvider>
            </StoreProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
