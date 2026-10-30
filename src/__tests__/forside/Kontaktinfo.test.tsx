import { render } from "@testing-library/react";
import personInfo from "@/mocks/fixtures/person-info.json";
import { StoreProvider } from "@/store/Context";
import type { Tlfnr } from "@/types/personalia";
import TelefonnummerHosNav from "@/views/forside/sections/4-personinfo/2-kontaktinfo/subsections/telefonnummer/TelefonnummerHosNav";

describe("TelefonnummerHosNav", () => {
    it("renders correctly", () => {
        const { asFragment } = render(
            <StoreProvider>
                <TelefonnummerHosNav tlfnr={personInfo.personalia.tlfnr as unknown as Tlfnr} language="nb" />
            </StoreProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
