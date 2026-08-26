import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import personInfo from "@/clients/apiMock/app/fetch/person-info.json";
import Personalia from "@/pages/forside/sections/4-personinfo/1-personalia/Personalia";
import { StoreProvider } from "@/store/Context";
import nbMessages from "@/text/nb";
import type { Personalia as PersonaliaType } from "@/types/personalia";

vi.mock("react-modal");

describe("Personalia", () => {
    it("renders correctly", () => {
        const { asFragment } = render(
            <StoreProvider>
                <IntlProvider locale={"nb"} messages={nbMessages}>
                    <Personalia personalia={personInfo as unknown as PersonaliaType} />
                </IntlProvider>
            </StoreProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
