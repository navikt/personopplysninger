import "@testing-library/jest-dom";
import personInfo from "../../clients/apiMock/app/fetch/person-info.json";
import { IntlProvider } from "react-intl";
import nbMessages from "text/nb";
import EndreOpplysningerView from "../../pages/endre-personopplysninger/EndreOpplysningerView";
import { Adresser } from "../../types/adresser";
import { Personalia } from "../../types/personalia";
import { StoreProvider } from "store/Context";
import { ValidatorsProvider } from "calidation";
import { extraValidators } from "../../utils/validators";
import { render } from "@testing-library/react";

jest.mock("react-modal");

describe("EndreOpplysningerView", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <ValidatorsProvider validators={extraValidators}>
        <StoreProvider>
          <IntlProvider locale={"nb"} messages={nbMessages}>
            <EndreOpplysningerView
              adresser={personInfo.adresser as unknown as Adresser}
              personalia={personInfo.personalia as unknown as Personalia}
            />
          </IntlProvider>
        </StoreProvider>
      </ValidatorsProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
