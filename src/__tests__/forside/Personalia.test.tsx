import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";
import nbMessages from "text/nb";
import personInfo from "../../clients/apiMock/app/fetch/person-info.json";
import Personalia from "../../pages/forside/sections/4-personinfo/1-personalia/Personalia";
import { Personalia as PersonaliaType } from "types/personalia";
import { StoreProvider } from "../../store/Context";

jest.mock("react-modal");

describe("Personalia", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <StoreProvider>
          <IntlProvider locale={"nb"} messages={nbMessages}>
            <Personalia personalia={personInfo as unknown as PersonaliaType} />
          </IntlProvider>
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
