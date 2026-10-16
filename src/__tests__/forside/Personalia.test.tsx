import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import personInfo from "@/mocks/fixtures/person-info.json";
import { StoreProvider } from "@/store/Context";
import nbMessages from "@/text/nb";
import type { Personalia as PersonaliaType } from "@/types/personalia";
import Personalia from "@/views/forside/sections/4-personinfo/1-personalia/Personalia";

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
