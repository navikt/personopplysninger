import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import personInfo from "../../clients/apiMock/app/fetch/person-info.json";
import { IntlProvider } from "react-intl";
import nbMessages from "text/nb";
import EndreOpplysninger from "../../pages/endre-personopplysninger/EndreOpplysninger";
import { Adresser } from "../../types/adresser";
import { Personalia } from "../../types/personalia";
import { StoreProvider } from "store/Context";
import { ValidatorsProvider } from "calidation";
import { extraValidators } from "../../utils/validators";

jest.mock("react-modal");
jest.mock("nav-frontend-js-utils", () => ({
  ...jest.requireActual("nav-frontend-js-utils"),
  guid: () => "Mocked UUID",
}));

describe("EndreOpplysninger", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ValidatorsProvider validators={extraValidators}>
          <StoreProvider>
            <IntlProvider locale={"nb"} messages={nbMessages}>
              <EndreOpplysninger
                adresser={personInfo.adresser as unknown as Adresser}
                personalia={personInfo.personalia as unknown as Personalia}
              />
            </IntlProvider>
          </StoreProvider>
        </ValidatorsProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
