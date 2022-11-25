import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";
import nbMessages from "text/nb";
import personInfo from "../../clients/apiMock/app/fetch/person-info.json";
import Utbetalinger from "../../pages/forside/sections/4-personinfo/4-utbetalinger/Utbetalinger";
import { StoreProvider } from "../../store/Context";

jest.mock("react-modal");

describe("Utbetalinger", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <StoreProvider>
          <IntlProvider locale={"nb"} messages={nbMessages}>
            <Utbetalinger kontonr={personInfo.personalia.kontonr} />
          </IntlProvider>
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
