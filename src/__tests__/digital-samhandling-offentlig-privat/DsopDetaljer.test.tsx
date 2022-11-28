import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import DsopDetaljerView from "../../pages/digital-samhandling-offentlig-privat/detaljer/DsopDetaljerView";
import dsopInfo from "../../clients/apiMock/app/fetch/dsop-info.json";
import { IntlProvider } from "react-intl";
import nbMessages from "text/nb";

describe("DsopDetaljerView", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <IntlProvider locale={"nb"} messages={nbMessages}>
          <DsopDetaljerView
            dsopInfo={dsopInfo}
            id={"2019-06-18T10:45:51.634"}
          />
        </IntlProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
