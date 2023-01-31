import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import KontonummerForm from "../../../../pages/forside/sections/4-personinfo/4-utbetalinger/endring/KontonummerForm";
import { IntlProvider } from "react-intl";
import nbMessages from "../../../../text/nb";
import { StoreProvider } from "../../../../store/Context";
import React from "react";

const IDENT = "04918399092";

const mockSubmit = jest.fn();

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
    fireEvent.click(screen.getByRole("radio", { name: "Norsk kontonummer" }));
  });

  test("inneholder forventede felter", () => {
    expect(
      screen.getByRole("textbox", { name: "Kontonummer" })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Lagre" })).toBeInTheDocument();
  });

  test("submitter ved gyldig input", async () => {
    fireEvent.input(screen.getByRole("textbox", { name: "Kontonummer" }), {
      target: { value: "12345678911" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Lagre" }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  test("får valideringsfeil med manglende kontonummer", async () => {
    fireEvent.submit(screen.getByRole("button", { name: "Lagre" }));

    await waitFor(() =>
      expect(screen.getByText("Kontonummer er nødvendig")).toBeInTheDocument()
    );
  });

  test("får valideringsfeil med ugyldig lengde på kontonummer", async () => {
    fireEvent.input(screen.getByRole("textbox", { name: "Kontonummer" }), {
      target: { value: "1234567891" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Lagre" }));

    await waitFor(() =>
      expect(
        screen.getByText("Norske kontonummer må ha 11 tall")
      ).toBeInTheDocument()
    );
  });

  test("får valideringsfeil med ugyldig kontonummer", async () => {
    fireEvent.input(screen.getByRole("textbox", { name: "Kontonummer" }), {
      target: { value: "12341234123" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Lagre" }));

    await waitFor(() =>
      expect(
        screen.getByText("Skriv inn et gyldig kontonummer")
      ).toBeInTheDocument()
    );
  });

  test("får valideringsfeil når kontonummer er likt fødselsnummer", async () => {
    fireEvent.input(screen.getByRole("textbox", { name: "Kontonummer" }), {
      target: { value: IDENT },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Lagre" }));

    await waitFor(() =>
      expect(
        screen.getByText(
          "Kontonummer kan ikke være et fødselsnummer eller d-nummer."
        )
      ).toBeInTheDocument()
    );
  });
});
