import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";
import nbMessages from "text/nb";
import kontaktInfo from "../../clients/apiMock/app/fetch/kontakt-info.json";
import personInfo from "../../clients/apiMock/app/fetch/person-info.json";
import DKIF from "../../pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/kontakt-og-reservasjonsregisteret/DKIF";
import TelefonnummerHosNav from "../../pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/TelefonnummerHosNav";
import { Tlfnr } from "types/personalia";
import { StoreProvider } from "../../store/Context";
import { extraValidators } from "../../utils/validators";
import { ValidatorsProvider } from "calidation";

describe("DKIF", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <StoreProvider>
          <IntlProvider locale={"nb"} messages={nbMessages}>
            <DKIF info={kontaktInfo} />
          </IntlProvider>
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("TelefonnummerHosNav", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ValidatorsProvider validators={extraValidators}>
          <StoreProvider>
            <IntlProvider locale={"nb"} messages={nbMessages}>
              <TelefonnummerHosNav
                tlfnr={personInfo.personalia.tlfnr as unknown as Tlfnr}
              />
            </IntlProvider>
          </StoreProvider>
        </ValidatorsProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
