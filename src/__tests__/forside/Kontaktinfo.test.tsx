import { render } from "@testing-library/react";
import personInfo from "@/mocks/fixtures/person-info.json";
import type { Tlfnr } from "@/types/personalia";
import TelefonnummerHosNav from "@/views/forside/sections/4-personinfo/2-kontaktinfo/subsections/telefonnummer/TelefonnummerHosNav";

describe("TelefonnummerHosNav", () => {
    it("renders correctly", () => {
        const { asFragment } = render(
            <TelefonnummerHosNav tlfnr={personInfo.personalia.tlfnr as unknown as Tlfnr} hentPaaNytt={() => Promise.resolve()} language="nb" />,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
