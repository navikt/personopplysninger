import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import KontonummerForm from "../../../../pages/forside/sections/4-personinfo/4-utbetalinger/endring/KontonummerForm";
import { IntlProvider } from "react-intl";
import nbMessages from "../../../../text/nb";
import { StoreProvider } from "../../../../store/Context";
import React from "react";
import land from "./land.json";
import valutaer from "./valutaer.json";
import fetch, { enableFetchMocks } from "jest-fetch-mock";
import userEvent from "@testing-library/user-event";

const IDENT = "04918399092";

const KONTONUMMER = "Kontonummer";
const LAND = "Bankens land";
const VALUTA = "Valuta";
const BANKNAVN = "Bankens navn";
const KONTONUMMER_IBAN = "Kontonummer / IBAN";
const BIC_SWIFT = "BIC / Swift-kode";
const BANKKODE = "Bankkode";
const ADRESSE = "Bankens adresse";
const ADRESSELINJE1 = "Adresselinje 1";
const ADRESSELINJE2 = "Adresselinje 2";
const ADRESSELINJE3 = "Adresselinje 3";

const mockSubmit = jest.fn();

enableFetchMocks();

describe("Norsk bankkonto", () => {
  beforeEach(() => {
    setupNorskBankkonto();
  });

  test("inneholder forventede felter", () => {
    expect(getTextboxByName(KONTONUMMER)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Lagre" })).toBeInTheDocument();
  });

  test("submitter ved gyldig input", async () => {
    inputTextbox(KONTONUMMER, "12345678911");
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
    inputTextbox(KONTONUMMER, "1234567891");
    submit();

    await waitFor(() =>
      expect(
        screen.getByText("Norske kontonummer må ha 11 tall")
      ).toBeInTheDocument()
    );
  });

  test("får valideringsfeil med ugyldig kontonummer", async () => {
    inputTextbox(KONTONUMMER, "12341234123");
    submit();

    await waitFor(() =>
      expect(
        screen.getByText("Skriv inn et gyldig kontonummer")
      ).toBeInTheDocument()
    );
  });

  test("får valideringsfeil når kontonummer er likt fødselsnummer", async () => {
    inputTextbox(KONTONUMMER, IDENT);
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

describe("Utenlandsk bankkonto", () => {
  beforeEach(async () => {
    await setupUtenlandskBankkonto();
  });

  test("inneholder forventede felter", async () => {
    await inputValidUtenlandskKontonummer();

    await waitFor(() => {
      expect(getComboboxByName(LAND)).toBeInTheDocument();
      expect(getComboboxByName(VALUTA)).toBeInTheDocument();
      expect(getTextboxByName(BANKNAVN)).toBeInTheDocument();
      expect(getTextboxByName(KONTONUMMER_IBAN)).toBeInTheDocument();
      expect(getTextboxByName(BIC_SWIFT)).toBeInTheDocument();
    });
  });

  test("submitter ved gyldig input", async () => {
    await inputValidUtenlandskKontonummer();
    submit();

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  test("får valideringsfeil med manglende land", async () => {
    submit();
    await waitFor(() =>
      expect(screen.getAllByText("Land er nødvendig")).toHaveLength(2)
    );
  });

  test("får valideringsfeil med manglende valuta", async () => {
    await inputValidUtenlandskbankkontoWithOmission(VALUTA);
    submit();

    await waitFor(() =>
      expect(screen.getAllByText("Valuta er nødvendig")).toHaveLength(2)
    );
  });

  test("får valideringsfeil med manglende banknavn", async () => {
    await inputValidUtenlandskbankkontoWithOmission(BANKNAVN);
    submit();

    await waitFor(() =>
      expect(screen.getAllByText("Banknavn er nødvendig")).toHaveLength(2)
    );
  });

  test("får valideringsfeil når banknavn starter med mellomrom", async () => {
    await inputValidUtenlandskbankkontoWithOmission(BANKNAVN);
    inputTextbox(BANKNAVN, " Navn");
    submit();

    await waitFor(() =>
      expect(
        screen.getAllByText("Første bokstav kan ikke være mellomrom")
      ).toHaveLength(2)
    );
  });

  test("får valideringsfeil når banknavn inneholder svartelistet ord", async () => {
    await inputValidUtenlandskbankkontoWithOmission(BANKNAVN);
    inputTextbox(BANKNAVN, "vet ikke");
    submit();

    await waitFor(() =>
      expect(
        screen.getAllByText(
          "Kan ikke inneholde ord som «ukjent», «ikke kjent», «vet ikke», «uoppgitt», «n.n.», «nomen nescio»"
        )
      ).toHaveLength(2)
    );
  });

  test("får valideringsfeil når banknavn inneholder sammenhengende mellomrom", async () => {
    await inputValidUtenlandskbankkontoWithOmission(BANKNAVN);
    inputTextbox(BANKNAVN, "Bankens  navn");
    submit();

    await waitFor(() =>
      expect(
        screen.getAllByText("Kan ikke ha flere sammenhengende mellomrom")
      ).toHaveLength(2)
    );
  });

  test("får valideringsfeil når banknavn ikke inneholder bokstaver", async () => {
    await inputValidUtenlandskbankkontoWithOmission(BANKNAVN);
    inputTextbox(BANKNAVN, "123 .");
    submit();

    await waitFor(() =>
      expect(
        screen.getAllByText(
          "Kan ikke bestå av kun space, spesialtegn og/eller sifre"
        )
      ).toHaveLength(2)
    );
  });

  test("får valideringsfeil når banknavn inneholder ugyldige tegn", async () => {
    await inputValidUtenlandskbankkontoWithOmission(BANKNAVN);
    inputTextbox(BANKNAVN, "#Banknavn");
    submit();

    await waitFor(() =>
      expect(screen.getAllByText("Inneholder ugyldige tegn")).toHaveLength(2)
    );
  });
});

describe("Utenlandsk bankkonto med IBAN", () => {
  beforeEach(async () => {
    await setupUtenlandskBankkonto();
  });

  test("får valideringsfeil med manglende IBAN", async () => {
    await inputValidUtenlandskbankkontoWithOmission(KONTONUMMER_IBAN, "IBAN");
    submit();

    await waitFor(() =>
      expect(screen.getAllByText("IBAN er nødvendig")).toHaveLength(2)
    );
  });

  test("får valideringsfeil med ugyldig IBAN", async () => {
    await inputValidUtenlandskbankkontoWithOmission(KONTONUMMER_IBAN, "IBAN");
    inputTextbox(KONTONUMMER_IBAN, "ABC123");
    submit();

    await waitFor(() =>
      expect(screen.getAllByText("Gyldig IBAN er nødvendig")).toHaveLength(2)
    );
  });

  test("får valideringsfeil med IBAN fra feil land", async () => {
    await inputValidUtenlandskbankkontoWithOmission(KONTONUMMER_IBAN, "IBAN");
    inputTextbox(KONTONUMMER_IBAN, "AE460090000000123456789");
    submit();

    await waitFor(() =>
      expect(
        screen.getAllByText(
          "Du må taste inn et IBAN-nummer fra det landet du har valgt."
        )
      ).toHaveLength(2)
    );
  });
});

describe("Utenlandsk bankkonto med kontonummer", () => {
  beforeEach(async () => {
    await setupUtenlandskBankkonto();
  });

  test("får valideringsfeil med manglende kontonummer", async () => {
    await inputValidUtenlandskbankkontoWithOmission(
      KONTONUMMER_IBAN,
      "Kontonummer"
    );
    submit();

    await waitFor(() =>
      expect(screen.getAllByText("Kontonummer er nødvendig")).toHaveLength(2)
    );
  });

  test("får valideringsfeil når kontonummer inneholder ugyldige tegn", async () => {
    await inputValidUtenlandskbankkontoWithOmission(
      KONTONUMMER_IBAN,
      "Kontonummer"
    );
    inputTextbox(KONTONUMMER_IBAN, "SE 7280000810340009783242");
    submit();

    await waitFor(() =>
      expect(screen.getAllByText("Skriv bare bokstaver og tall")).toHaveLength(
        2
      )
    );
  });

  test("får valideringsfeil når kontonummer er fnr", async () => {
    await inputValidUtenlandskbankkontoWithOmission(
      KONTONUMMER_IBAN,
      "Kontonummer"
    );
    inputTextbox(KONTONUMMER_IBAN, IDENT);
    submit();

    await waitFor(() =>
      expect(
        screen.getAllByText(
          "Kontonummer kan ikke være et fødselsnummer eller d-nummer."
        )
      ).toHaveLength(2)
    );
  });
});

describe("Utenlandsk bankkonto med BIC/Swift", () => {
  beforeEach(async () => {
    await setupUtenlandskBankkonto();
  });

  test("får valideringsfeil med manglende BIC/Swift", async () => {
    await inputValidUtenlandskbankkontoWithOmission(BIC_SWIFT);
    submit();

    await waitFor(() =>
      expect(screen.getAllByText("BIC / Swift-kode er nødvendig")).toHaveLength(
        2
      )
    );
  });

  test("får valideringsfeil når BIC/Swift inneholder ugyldige tegn", async () => {
    await inputValidUtenlandskbankkontoWithOmission(BIC_SWIFT);
    inputTextbox(BIC_SWIFT, "ABC123.");
    submit();

    await waitFor(() =>
      expect(screen.getAllByText("Skriv bare bokstaver og tall")).toHaveLength(
        2
      )
    );
  });

  test("får valideringsfeil når BIC/Swift er ugyldig", async () => {
    await inputValidUtenlandskbankkontoWithOmission(BIC_SWIFT);
    inputTextbox(BIC_SWIFT, "ABC123");
    submit();

    await waitFor(() =>
      expect(
        screen.getAllByText("Gyldig BIC / Swift-kode er nødvendig")
      ).toHaveLength(2)
    );
  });

  test("får valideringsfeil når BIC/Swift er fra feil land", async () => {
    await inputValidUtenlandskbankkontoWithOmission(BIC_SWIFT);
    inputTextbox(BIC_SWIFT, "RBOSGBD2XXX");
    submit();

    await waitFor(() =>
      expect(
        screen.getAllByText(
          "Du må taste inn en gyldig BIC / Swift-kode fra det landet du har valgt."
        )
      ).toHaveLength(2)
    );
  });
});

describe("Utenlandsk bankkonto med bankkode", () => {
  beforeEach(async () => {
    await setupUtenlandskBankkonto();
  });

  test("inneholder forventede felter", async () => {
    await inputValidUtenlandskKontonummer("Bankkode");

    await waitFor(() => {
      expect(getComboboxByName(LAND)).toBeInTheDocument();
      expect(getComboboxByName(VALUTA)).toBeInTheDocument();
      expect(getTextboxByName(BANKNAVN)).toBeInTheDocument();
      expect(getTextboxByName(KONTONUMMER_IBAN)).toBeInTheDocument();
      expect(getTextboxByName(BIC_SWIFT)).toBeInTheDocument();
      expect(getTextboxByName(BANKKODE)).toBeInTheDocument();
      expect(getTextboxByName(ADRESSELINJE1)).toBeInTheDocument();
      expect(getTextboxByName(ADRESSELINJE2)).toBeInTheDocument();
      expect(getTextboxByName(ADRESSELINJE3)).toBeInTheDocument();
    });
  });

  test("submitter ved gyldig input", async () => {
    await inputValidUtenlandskKontonummer("Bankkode");
    submit();

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  test("submitter ved gyldig BIC/Swift", async () => {
    await inputValidUtenlandskbankkontoWithOmission(BANKKODE, "Bankkode");
    inputTextbox(BIC_SWIFT, "CITIIN33");
    submit();

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  test("får valideringsfeil med manglende bankkode", async () => {
    await inputValidUtenlandskbankkontoWithOmission(BANKKODE, "Bankkode");
    submit();

    await waitFor(() =>
      expect(screen.getAllByText("Bankkode er nødvendig")).toHaveLength(2)
    );
  });

  test("får valideringsfeil når bankkode inneholder ikke-numeriske tegn", async () => {
    await inputValidUtenlandskbankkontoWithOmission(BANKKODE, "Bankkode");
    inputTextbox(BANKKODE, "ABC123");
    submit();

    await waitFor(() =>
      expect(screen.getAllByText("Skriv bare tall")).toHaveLength(2)
    );
  });

  test("får valideringsfeil når bankkode har feil lengde", async () => {
    await inputValidUtenlandskbankkontoWithOmission(BANKKODE, "Bankkode");
    inputTextbox(BANKKODE, "123");
    submit();

    await waitFor(() =>
      expect(
        screen.getAllByText("Bankkoder fra India må ha 11 tall")
      ).toHaveLength(2)
    );
  });

  test("får valideringsfeil med manglende adresse", async () => {
    await inputValidUtenlandskbankkontoWithOmission(ADRESSE, "Bankkode");
    submit();

    await waitFor(() =>
      expect(
        screen.getAllByText("Første adresselinje er nødvendig")
      ).toHaveLength(2)
    );
  });

  test("får valideringsfeil når adresselinje 1 ikke inneholder bokstaver", async () => {
    await inputValidUtenlandskbankkontoWithOmission(ADRESSE, "Bankkode");
    inputTextbox(ADRESSELINJE1, "123 .");
    submit();

    await waitFor(() =>
      expect(
        screen.getAllByText(
          "Kan ikke bestå av kun space, spesialtegn og/eller sifre"
        )
      ).toHaveLength(2)
    );
  });

  test("får valideringsfeil når adresselinje starter med mellomrom", async () => {
    await inputValidUtenlandskbankkontoWithOmission(ADRESSE, "Bankkode");
    inputTextbox(ADRESSELINJE1, " Adresselinje 123");
    submit();

    await waitFor(() =>
      expect(
        screen.getAllByText("Første bokstav kan ikke være mellomrom")
      ).toHaveLength(2)
    );
  });

  test("får valideringsfeil når adresselinje inneholder svartelistet ord", async () => {
    await inputValidUtenlandskbankkontoWithOmission(ADRESSE, "Bankkode");
    inputTextbox(ADRESSELINJE1, "vet ikke");
    submit();

    await waitFor(() =>
      expect(
        screen.getAllByText(
          "Kan ikke inneholde ord som «ukjent», «ikke kjent», «vet ikke», «uoppgitt», «n.n.», «nomen nescio»"
        )
      ).toHaveLength(2)
    );
  });

  test("får valideringsfeil når adresselinje inneholder sammenhengende mellomrom", async () => {
    await inputValidUtenlandskbankkontoWithOmission(ADRESSE, "Bankkode");
    inputTextbox(ADRESSELINJE1, "Adressegaten  1337");
    submit();

    await waitFor(() =>
      expect(
        screen.getAllByText("Kan ikke ha flere sammenhengende mellomrom")
      ).toHaveLength(2)
    );
  });

  test("får valideringsfeil når adresselinje inneholder ugyldige tegn", async () => {
    await inputValidUtenlandskbankkontoWithOmission(ADRESSE, "Bankkode");
    inputTextbox(ADRESSELINJE1, "Adressegaten (1337)");
    submit();

    await waitFor(() =>
      expect(screen.getAllByText("Inneholder ugyldige tegn")).toHaveLength(2)
    );
  });

  test("får valideringsfeil når kun andre adresselinje ikke er utfylt", async () => {
    await inputValidUtenlandskbankkontoWithOmission(ADRESSELINJE2, "Bankkode");
    submit();

    await waitFor(() =>
      expect(
        screen.getAllByText("Nødvendig når feltet under er utfylt")
      ).toHaveLength(2)
    );
  });

  test("får valideringsfeil når adresselinje 2 ikke inneholder tall eller bokstaver", async () => {
    await inputValidUtenlandskbankkontoWithOmission(ADRESSELINJE2, "Bankkode");
    inputTextbox(ADRESSELINJE2, ". .");
    submit();

    await waitFor(() =>
      expect(
        screen.getAllByText("Kan ikke bestå av kun space og/eller spesialtegn")
      ).toHaveLength(2)
    );
  });

  test("får valideringsfeil når adresselinje 3 ikke inneholder tall eller bokstaver", async () => {
    await inputValidUtenlandskbankkontoWithOmission(ADRESSELINJE3, "Bankkode");
    inputTextbox(ADRESSELINJE3, ". .");
    submit();

    await waitFor(() =>
      expect(
        screen.getAllByText("Kan ikke bestå av kun space og/eller spesialtegn")
      ).toHaveLength(2)
    );
  });
});

describe("Amerikansk bankkonto", () => {
  beforeEach(async () => {
    await setupUtenlandskBankkonto();
  });

  test("inneholder forventede felter", async () => {
    await inputValidUtenlandskKontonummer("Amerikansk");

    await waitFor(() => {
      expect(getComboboxByName(LAND)).toBeInTheDocument();
      expect(getComboboxByName(VALUTA)).toBeInTheDocument();
      expect(getTextboxByName(BANKNAVN)).toBeInTheDocument();
      expect(getTextboxByName(KONTONUMMER_IBAN)).toBeInTheDocument();
      expect(getTextboxByName(BANKKODE)).toBeInTheDocument();
      expect(getTextboxByName(ADRESSELINJE1)).toBeInTheDocument();
      expect(getTextboxByName(ADRESSELINJE2)).toBeInTheDocument();
      expect(getTextboxByName(ADRESSELINJE3)).toBeInTheDocument();
    });
  });

  test("submitter ved gyldig input", async () => {
    await inputValidUtenlandskKontonummer("Amerikansk");
    submit();

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});

describe("Bankkode med alternativ landkode i IBAN", () => {
  beforeEach(async () => {
    await setupUtenlandskBankkonto();
  });

  test("submitter ved gyldig input", async () => {
    await inputValidUtenlandskKontonummer("Alternativ landkode");
    submit();

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});

const commonSetup = () => {
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
};

const setupNorskBankkonto = () => {
  commonSetup();

  selectRadio("Norsk kontonummer");
};

const setupUtenlandskBankkonto = async () => {
  commonSetup();

  fetch.resetMocks();
  fetch.mockResponseOnce(JSON.stringify(land));
  fetch.mockResponseOnce(JSON.stringify(valutaer));

  await selectRadio("Utenlandsk kontonummer");
};

const getTextboxByName = (name: string) => {
  return screen.getByRole("textbox", { name: name });
};

const getComboboxByName = (name: string) => {
  return screen.getByRole("combobox", { name: name });
};

const selectRadio = async (name: string) => {
  await userEvent.click(screen.getByRole("radio", { name: name }));
};

const inputCombobox = async (name: string, value: string) => {
  // Må først skrive inn verdien og deretter trykke på den i nedtrekksmenyen
  fireEvent.input(getComboboxByName(name), {
    target: { value: value },
  });

  await waitFor(() => {
    fireEvent.click(screen.getByText(value));
  });
};

const inputTextbox = (name: string, value: string) => {
  fireEvent.input(getTextboxByName(name), {
    target: { value: value },
  });
};

const inputValidUtenlandskKontonummer = async (type?: string) => {
  await inputValidUtenlandskbankkontoWithOmission("", type);
};

const inputValidUtenlandskbankkontoWithOmission = async (
  omit: string,
  type?: string
) => {
  let land;
  let valuta;
  let banknavn;
  let kontonummerIban;
  let bicSwift;
  let bankkode;
  let adresselinje1;
  let adresselinje2;
  let adresselinje3;

  switch (type) {
    case "Kontonummer":
    case "Bankkode":
      land = "India";
      valuta = "Indiske Rupi (INR)";
      banknavn = "Dominion bank";
      kontonummerIban = "389325974125698";
      bankkode = "38932597433";
      adresselinje1 = "Adresselinje 1";
      adresselinje2 = "Adresselinje 2";
      adresselinje3 = "Adresselinje 3";
      break;
    case "Amerikansk":
      land = "USA";
      valuta = "Amerikanske dollar (USD)";
      banknavn = "Dominion Bank";
      kontonummerIban = "389325974125698";
      bankkode = "123456789";
      adresselinje1 = "Adresselinje 1";
      adresselinje2 = "Adresselinje 2";
      adresselinje3 = "Adresselinje 3";
      break;
    case "Alternativ landkode":
      land = "Isle of Man";
      valuta = "Amerikanske dollar (USD)";
      banknavn = "Dominion Bank";
      kontonummerIban = "GB57NWBK55504453178386";
      bicSwift = "RBOSGBD2XXX";
      break;
    case "IBAN":
    default:
      land = "Sverige";
      valuta = "Svenske kroner (SEK)";
      banknavn = "AKELIUS RESIDENTIAL PROPERTY AB";
      kontonummerIban = "SE7280000810340009783242";
      bicSwift = "AKRPSESS";
      break;
  }

  if (omit === "LAND") {
    return;
  }

  await inputCombobox(LAND, land);

  await waitFor(() => {
    getComboboxByName(VALUTA);
  });

  omit !== VALUTA && (await inputCombobox(VALUTA, valuta));
  omit !== BANKNAVN && inputTextbox(BANKNAVN, banknavn);
  omit !== KONTONUMMER_IBAN && inputTextbox(KONTONUMMER_IBAN, kontonummerIban);

  if (bicSwift) {
    omit !== BIC_SWIFT && inputTextbox(BIC_SWIFT, bicSwift);
  }

  if (bankkode) {
    omit !== BANKKODE && inputTextbox(BANKKODE, bankkode);
    if (omit !== ADRESSE) {
      omit !== ADRESSELINJE1 &&
        inputTextbox(ADRESSELINJE1, adresselinje1 || "");
      omit !== ADRESSELINJE2 &&
        inputTextbox(ADRESSELINJE2, adresselinje2 || "");
      omit !== ADRESSELINJE3 &&
        inputTextbox(ADRESSELINJE3, adresselinje3 || "");
    }
  }
};

const submit = () => {
  fireEvent.submit(screen.getByRole("button", { name: "Lagre" }));
};
