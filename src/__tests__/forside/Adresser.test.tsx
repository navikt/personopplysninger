import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";
import nbMessages from "text/nb";
import personInfo from "../../clients/apiMock/app/fetch/person-info.json";
import Adresser from "../../pages/forside/sections/4-personinfo/3-adresser/Adresser";
import { Adresser as AdresserType } from "types/adresser";
import { StoreProvider } from "../../store/Context";

jest.mock("react-modal");
jest.mock("nav-frontend-js-utils", () => ({
  ...jest.requireActual("nav-frontend-js-utils"),
  guid: () => "Mocked UUID",
}));

describe("Adresser", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <StoreProvider>
          <IntlProvider locale={"nb"} messages={nbMessages}>
            <Adresser
              adresser={personInfo.adresser as unknown as AdresserType}
            />
          </IntlProvider>
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
