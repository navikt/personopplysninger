import type { Kontaktadresse } from "@/types/adresser/kontaktadresse";
import { kontaktadresseTittel, oppholdAnnetStedTekst } from "@/views/forside/adresser/adresserUtils";

const norsk: Kontaktadresse = { adresse: { type: "POSTBOKSADRESSE", postboks: "10" } };
const utenlandsk: Kontaktadresse = { adresse: { type: "UTENLANDSK_ADRESSE", land: "SVERIGE" } };
const utenlandskFrittFormat: Kontaktadresse = { adresse: { type: "UTENLANDSK_ADRESSE_I_FRITT_FORMAT", land: "SVERIGE" } };

describe("kontaktadresseTittel", () => {
    it("skiller norsk og utenlandsk bare når begge finnes", () => {
        expect(kontaktadresseTittel(norsk, [norsk], "nb")).toBe("Postadresse (kontaktadresse)");
        expect(kontaktadresseTittel(norsk, [norsk, utenlandsk], "nb")).toBe("Postadresse (norsk kontaktadresse)");
        expect(kontaktadresseTittel(utenlandsk, [norsk, utenlandsk], "nb")).toBe("Postadresse (utenlandsk kontaktadresse)");
    });

    it("regner utenlandsk adresse i fritt format som utenlandsk", () => {
        expect(kontaktadresseTittel(utenlandskFrittFormat, [utenlandskFrittFormat], "nb")).toBe("Postadresse (utenlandsk kontaktadresse)");
        expect(kontaktadresseTittel(norsk, [norsk, utenlandskFrittFormat], "nb")).toBe("Postadresse (norsk kontaktadresse)");
    });
});

describe("oppholdAnnetStedTekst", () => {
    it("oversetter kjente koder og lar ukjente stå", () => {
        expect(oppholdAnnetStedTekst("PAA_SVALBARD", "nb")).toBe("På Svalbard");
        expect(oppholdAnnetStedTekst("ANNET", "nb")).toBe("ANNET");
    });
});
