import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";
import nbMessages from "text/nb";
import personInfo from "../../clients/apiMock/app/fetch/person-info.json";
import { GeografiskTilknytning } from "types/adresser";
import { StoreProvider } from "../../store/Context";
import DittNavKontor from "../../pages/forside/sections/4-personinfo/5-ditt-nav-kontor/DittNavKontor";
import { EnhetKontaktInfo } from "../../types/enhetKontaktInfo";

jest.mock("react-modal");
jest.mock("nav-frontend-js-utils", () => ({
  ...jest.requireActual("nav-frontend-js-utils"),
  guid: () => "Mocked UUID",
}));

describe("DittNavKontor", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <StoreProvider>
          <IntlProvider locale={"nb"} messages={nbMessages}>
            <DittNavKontor
              enhetKontaktInformasjon={
                personInfo.enhetKontaktInformasjon as unknown as EnhetKontaktInfo
              }
              geografiskTilknytning={
                personInfo.adresser
                  .geografiskTilknytning as unknown as GeografiskTilknytning
              }
            />
          </IntlProvider>
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
