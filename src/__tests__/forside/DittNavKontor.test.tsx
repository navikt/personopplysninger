import "@testing-library/jest-dom";
import { IntlProvider } from "react-intl";
import nbMessages from "text/nb";
import personInfo from "../../clients/apiMock/app/fetch/person-info.json";
import { GeografiskTilknytning } from "types/adresser";
import { StoreProvider } from "../../store/Context";
import DittNavKontor from "../../pages/forside/sections/4-personinfo/5-ditt-nav-kontor/DittNavKontor";
import { EnhetKontaktInfo } from "../../types/enhetKontaktInfo";
import { render } from "@testing-library/react";

jest.mock("react-modal");

describe("DittNavKontor", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
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
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
