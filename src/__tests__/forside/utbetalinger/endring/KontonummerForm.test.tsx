import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import KontonummerForm from "../../../../pages/forside/sections/4-personinfo/4-utbetalinger/endring/KontonummerForm";
import { IntlProvider } from "react-intl";
import nbMessages from "../../../../text/nb";
import { StoreProvider } from "../../../../store/Context";
import React from "react";
import land from "../../../../clients/apiMock/app/fetch/land.json";
import valutaer from "../../../../clients/apiMock/app/fetch/valutaer.json";
import fetch, { enableFetchMocks } from "jest-fetch-mock";

const IDENT = "04918399092";

const mockSubmit = jest.fn();

enableFetchMocks();

beforeEach(() => {
  mockSubmit.mockReset();

  render(
    <StoreProvider>
      <IntlProvider locale={"nb"} messages={nbMessages}>
        <KontonummerForm
          settOpprettEllerEndre={jest.fn()}
          personident={{ type: "", verdi: IDENT }}
          submit={mockSubmit}
        />
      </IntlProvider>
    </StoreProvider>
  );
});

describe("Norsk kontonummer", () => {
  beforeEach(() => {
    selectRadio("Norsk kontonummer");
  });

  test("inneholder forventede felter", () => {
    expect(getByName("Kontonummer")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Lagre" })).toBeInTheDocument();
  });

  test("submitter ved gyldig input", async () => {
    inputTextbox("Kontonummer", "12345678911");

    submit();

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  test("får valideringsfeil med manglende kontonummer", async () => {
    submit();

    await waitFor(() =>
      expect(screen.getByText("Kontonummer er nødvendig")).toBeInTheDocument()
    );
  });

  test("får valideringsfeil med ugyldig lengde på kontonummer", async () => {
    inputTextbox("Kontonummer", "1234567891");

    submit();

    await waitFor(() =>
      expect(
        screen.getByText("Norske kontonummer må ha 11 tall")
      ).toBeInTheDocument()
    );
  });

  test("får valideringsfeil med ugyldig kontonummer", async () => {
    inputTextbox("Kontonummer", "12341234123");

    submit();

    await waitFor(() =>
      expect(
        screen.getByText("Skriv inn et gyldig kontonummer")
      ).toBeInTheDocument()
    );
  });

  test("får valideringsfeil når kontonummer er likt fødselsnummer", async () => {
    inputTextbox("Kontonummer", IDENT);

    submit();

    await waitFor(() =>
      expect(
        screen.getByText(
          "Kontonummer kan ikke være et fødselsnummer eller d-nummer."
        )
      ).toBeInTheDocument()
    );
  });
});

describe("Utenlandsk kontonummer", () => {
  beforeEach(async () => {
    fetch.mockResponseOnce(JSON.stringify(land));
    fetch.mockResponseOnce(JSON.stringify(valutaer));

    selectRadio("Utenlandsk kontonummer");

    await waitFor(() => {
      getByName("Bankens land");
    });
  });

  test("inneholder forventede felter", async () => {
    inputSelect("Bankens land", "Albania");

    await waitFor(() => {
      expect(getByName("Bankens land")).toBeInTheDocument();
      expect(getByName("Valuta")).toBeInTheDocument();
      expect(getByName("Bankens navn")).toBeInTheDocument();
      expect(getByName("Kontonummer / IBAN")).toBeInTheDocument();
      expect(getByName("BIC / Swift-kode")).toBeInTheDocument();
    });
  });

  test("submitter ved gyldig input", async () => {
    inputSelect("Bankens land", "Sverige");

    await waitFor(() => {
      getByName("Valuta");
    });

    inputSelect("Valuta", "Svenske kroner (SEK)");
    inputTextbox("Bankens navn", "AKELIUS RESIDENTIAL PROPERTY AB");
    inputTextbox("Kontonummer / IBAN", "SE7280000810340009783242");
    inputTextbox("BIC / Swift-kode", "AKRPSESS");

    submit();

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});

const getByName = (name: string) => {
  return screen.getByRole("textbox", { name: name });
};

const selectRadio = (name: string) => {
  fireEvent.click(screen.getByRole("radio", { name: name }));
};

const inputSelect = (name: string, value: string) => {
  fireEvent.input(screen.getByRole("textbox", { name: name }), {
    target: { value: value },
  });
  fireEvent.click(screen.getAllByText(value)[1]);
};

const inputTextbox = (name: string, value: string) => {
  fireEvent.input(screen.getByRole("textbox", { name: name }), {
    target: { value: value },
  });
};

const submit = () => {
  fireEvent.submit(screen.getByRole("button", { name: "Lagre" }));
};
