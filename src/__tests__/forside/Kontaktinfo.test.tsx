import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import personInfo from "@/mocks/fixtures/person-info.json";
import { StoreProvider } from "@/store/Context";
import nbMessages from "@/text/nb";
import type { Tlfnr } from "@/types/personalia";
import TelefonnummerHosNav from "@/views/forside/sections/4-personinfo/2-kontaktinfo/subsections/telefonnummer/TelefonnummerHosNav";

describe("TelefonnummerHosNav", () => {
    it("renders correctly", () => {
        const { asFragment } = render(
            <StoreProvider>
                <IntlProvider locale={"nb"} messages={nbMessages}>
                    <TelefonnummerHosNav tlfnr={personInfo.personalia.tlfnr as unknown as Tlfnr} />
                </IntlProvider>
            </StoreProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
