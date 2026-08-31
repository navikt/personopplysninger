import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import personInfo from "@/mocks/fixtures/person-info.json";
import DittNavKontor from "@/pages/forside/sections/4-personinfo/5-ditt-nav-kontor/DittNavKontor";
import { StoreProvider } from "@/store/Context";
import nbMessages from "@/text/nb";
import type { EnhetKontaktInfo } from "@/types/enhetKontaktInfo";

vi.mock("react-modal");

describe("DittNavKontor", () => {
    it("renders correctly", () => {
        const { asFragment } = render(
            <StoreProvider>
                <IntlProvider locale={"nb"} messages={nbMessages}>
                    <DittNavKontor enhetKontaktInformasjon={personInfo.enhetKontaktInformasjon as unknown as EnhetKontaktInfo} />
                </IntlProvider>
            </StoreProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
