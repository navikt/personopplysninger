import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import instInfo from "@/mocks/fixtures/inst-info.json";
import InstDetaljerView from "@/pages/institusjonsopphold/detaljer/InstDetaljerView";
import nbMessages from "@/text/nb";

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
