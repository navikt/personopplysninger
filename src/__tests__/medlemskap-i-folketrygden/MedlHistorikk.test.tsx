import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import medlInfo from "@/mocks/fixtures/medl-info.json";
import nbMessages from "@/text/nb";
import type { MedlInfo } from "@/types/medl";
import MedlHistorikkView from "@/views/medlemskap-i-folketrygden/MedlHistorikkView";

describe("MedlHistorikkView", () => {
    it("renders correctly", () => {
        const { asFragment } = render(
            <IntlProvider locale={"nb"} messages={nbMessages}>
                <MedlHistorikkView medlInfo={medlInfo as unknown as MedlInfo} />
            </IntlProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
