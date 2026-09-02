import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import instInfo from "@/mocks/fixtures/inst-info.json";
import nbMessages from "@/text/nb";
import InstDetaljerView from "@/views/institusjonsopphold/detaljer/InstDetaljerView";

vi.mock("react-router-dom", () => ({
    Link: () => <div />,
    useLocation: () => ({
        pathname: "pathname",
    }),
}));

describe("InstDetaljerView", () => {
    it("renders correctly", () => {
        const { asFragment } = render(
            <IntlProvider locale={"nb"} messages={nbMessages}>
                <InstDetaljerView innslag={instInfo[0]} />
            </IntlProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
