// @vitest-environment node
import { renderToString } from "react-dom/server";
import { getKlientConfig, setKlientConfig } from "@/utils/klientConfig";
import KontonummerOy from "@/views/endre-kontonummer/KontonummerOy";
import AndreAdresserOy from "@/views/forside/adresser/andre-adresser/AndreAdresserOy";
import TelefonnummerOy from "@/views/forside/kontaktinfo/telefonnummer/TelefonnummerOy";
import { testKlientConfig } from "./testConfig";

const urler = { apiUrl: "https://www.intern.nav.no/api", appUrl: "https://www.intern.nav.no/person/personopplysninger", loginUrl: "https://login" };
const postboks = { type: "POSTBOKSADRESSE" as const, postboks: "Postboks 10 Sørstrand", postnummer: "0194", poststed: "OSLO" };

describe("Øyene på serveren", () => {
    afterEach(() => setKlientConfig(testKlientConfig));

    it("rendrer uten å sette den globale konfigurasjonen som deles mellom forespørsler", () => {
        setKlientConfig(null);

        renderToString(<TelefonnummerOy language="nb" tlfnr={{ telefonHoved: "22334455", landskodeHoved: "+47" }} medOverskrift={true} {...urler} />);
        renderToString(<AndreAdresserOy language="nb" adresser={{ kontaktadresser: [{ kilde: "pdl", adresse: postboks }] }} {...urler} />);
        renderToString(<KontonummerOy language="nb" kontonr="12345678911" {...urler} endreKontonummerUrl="https://endre" />);

        expect(() => getKlientConfig()).toThrow();
    });
});
