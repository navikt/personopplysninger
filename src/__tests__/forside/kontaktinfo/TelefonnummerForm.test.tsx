import "@testing-library/jest-dom";
import { IntlProvider } from "react-intl";
import nbMessages from "text/nb";
import { StoreProvider } from "../../../store/Context";
import { act, fireEvent, render, screen } from "@testing-library/react";
import TelefonnummerForm from "../../../pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/telefonnummer/TelefonnummerForm";

// todo: mock dispatch sannsynligvis

describe("TelefonnummerForm", () => {
  it("renders correctly", () => {
    let defaultValues = {
      landskode: {
        label: "Norge",
        value: "+47",
      },
      tlfnummer: "43214321",
    };

    act(() => {
      render(
        <StoreProvider>
          <IntlProvider locale={"nb"} messages={nbMessages}>
            <TelefonnummerForm
              prioritet={1}
              type={"opprett"}
              defaultValues={defaultValues}
              onChangeSuccess={() => null}
              onCancelClick={() => null}
            />
          </IntlProvider>
        </StoreProvider>
      );

      // fireEvent.click(screen.getByText("Lagre"));
    });

    screen.debug();
  });
});
