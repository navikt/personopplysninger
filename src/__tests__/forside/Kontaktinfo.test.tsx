import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import kontaktInfo from "@/clients/apiMock/app/fetch/kontakt-info.json";
import personInfo from "@/clients/apiMock/app/fetch/person-info.json";
import DKIF from "@/pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/kontakt-og-reservasjonsregisteret/DKIF";
import TelefonnummerHosNav from "@/pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/telefonnummer/TelefonnummerHosNav";
import { StoreProvider } from "@/store/Context";
import nbMessages from "@/text/nb";
import type { Tlfnr } from "@/types/personalia";

describe("DKIF", () => {
    it("renders correctly", () => {
        const { asFragment } = render(
            <StoreProvider>
                <IntlProvider locale={"nb"} messages={nbMessages}>
                    <DKIF info={kontaktInfo} />
                </IntlProvider>
            </StoreProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});

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
