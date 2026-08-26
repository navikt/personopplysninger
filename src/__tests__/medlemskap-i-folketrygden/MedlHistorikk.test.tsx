import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import medlInfo from "@/clients/apiMock/app/fetch/medl-info.json";
import MedlHistorikkView from "@/pages/medlemskap-i-folketrygden/MedlHistorikkView";
import nbMessages from "@/text/nb";
import type { MedlInfo } from "@/types/medl";

vi.mock("react-router-dom", () => ({
    Link: () => <div />,
    useLocation: () => ({
        pathname: "pathname",
    }),
}));

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
