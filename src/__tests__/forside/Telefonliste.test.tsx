import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import personInfo from "@/mocks/fixtures/person-info.json";
import type { PersonInfo } from "@/types/personInfo";
import Telefonliste from "@/views/forside/sections/4-personinfo/2-kontaktinfo/subsections/telefonnummer/Telefonliste";

vi.mock("react-modal");

const medNummer = personInfo as unknown as PersonInfo;
const tomBank = {
    adresse1: "",
    adresse2: "",
    adresse3: "",
    bankkode: "",
    banknavn: "",
    iban: "",
    kontonummer: "",
    land: "",
    swiftkode: "",
    valuta: "",
};
const utenNummer: PersonInfo = { personalia: { kontoregisterStatus: "SUCCESS", utenlandskbank: tomBank } };

const medBareHovednummer: PersonInfo = {
    personalia: { kontoregisterStatus: "SUCCESS", utenlandskbank: tomBank, tlfnr: { telefonHoved: "22334455", landskodeHoved: "+47" } },
};

const renderListe = (personInfo: PersonInfo, medOverskrift = true) =>
    render(<Telefonliste tlfnr={personInfo.personalia?.tlfnr} medOverskrift={medOverskrift} hentPaaNytt={() => Promise.resolve()} language="nb" />);

describe("Telefonliste", () => {
    it("viser overskriften og nummeret fra den seedede personinfoen uten å hente", () => {
        const fetchSpy = vi.spyOn(globalThis, "fetch");
        renderListe(medNummer);

        expect(screen.getByRole("heading", { level: 3, name: "Telefonnummer registrert hos Nav" })).toBeInTheDocument();
        expect(screen.getByText("+47")).toBeInTheDocument();
        expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("viser nummeret uten overskrift og uten omsluttende div når medOverskrift er false", () => {
        const { container: medOverskrift } = renderListe(medNummer);
        const { container } = renderListe(medNummer, false);

        expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(1);
        expect(screen.getAllByText("+47")).toHaveLength(2);
        expect(container.innerHTML).toBe(medOverskrift.lastElementChild?.innerHTML);
    });

    it("viser verken overskrift eller nummer uten telefonnummer", () => {
        renderListe(utenNummer);

        expect(screen.queryByRole("heading", { level: 3 })).not.toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Legg til telefonnummer i Nav sitt register" })).toBeInTheDocument();
    });

    it("viser beskrivelsen med uthevet register uten telefonnummer", () => {
        renderListe(utenNummer);

        const uthevet = screen.getByText("Nav sitt register");
        expect(uthevet.tagName).toBe("B");
        expect(uthevet.parentElement?.textContent).toBe(
            "Vil du heller legge inn et telefonnummer i Nav sitt register?\n  Det nye telefonnummeret du legger inn, vil bare lagres hos oss.",
        );
    });

    it("spør før nummeret slettes", async () => {
        renderListe(medNummer);

        await userEvent.click(screen.getAllByRole("button", { name: "Slett telefonnummer" })[0]);

        expect(screen.getByRole("heading", { level: 2, name: "Slett telefonnummer" })).toBeInTheDocument();
        expect(screen.getByText("Er du sikker på at du vil fjerne dette nummeret?")).toBeInTheDocument();
    });

    it("viser overskriften også når bare hovednummeret finnes", () => {
        renderListe(medBareHovednummer);

        expect(screen.getByRole("heading", { level: 3, name: "Telefonnummer registrert hos Nav" })).toBeInTheDocument();
    });
});
