import type { Kontaktadresse } from "@/types/adresser/kontaktadresse";
import { kontaktadresseTittel, oppholdAnnetStedTekst } from "@/views/forside/adresser/adresserUtils";

const norsk: Kontaktadresse = { adresse: { type: "POSTBOKSADRESSE", postboks: "10" } };
const utenlandsk: Kontaktadresse = { adresse: { type: "UTENLANDSK_ADRESSE", land: "SVERIGE" } };

describe("kontaktadresseTittel", () => {
    it("skiller norsk og utenlandsk bare når begge finnes", () => {
        expect(kontaktadresseTittel(norsk, [norsk], "nb")).toBe("Postadresse (kontaktadresse)");
        expect(kontaktadresseTittel(norsk, [norsk, utenlandsk], "nb")).toBe("Postadresse (norsk kontaktadresse)");
        expect(kontaktadresseTittel(utenlandsk, [norsk, utenlandsk], "nb")).toBe("Postadresse (utenlandsk kontaktadresse)");
    });
});

describe("oppholdAnnetStedTekst", () => {
    it("oversetter kjente koder og lar ukjente stå", () => {
        expect(oppholdAnnetStedTekst("PAA_SVALBARD", "nb")).toBe("På Svalbard");
        expect(oppholdAnnetStedTekst("ANNET", "nb")).toBe("ANNET");
    });
});
