import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import dsopInfo from "@/mocks/fixtures/dsop-info.json";
import nbMessages from "@/text/nb";
import DsopDetaljerView from "@/views/digital-samhandling-offentlig-privat/detaljer/DsopDetaljerView";

describe("DsopDetaljerView", () => {
    it("renders correctly", () => {
        const { asFragment } = render(
            <IntlProvider locale={"nb"} messages={nbMessages}>
                <DsopDetaljerView dsopInfo={dsopInfo} id={"2019-06-18T10:45:51.634"} />
            </IntlProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
