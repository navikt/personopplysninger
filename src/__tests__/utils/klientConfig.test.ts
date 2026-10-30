import { getKlientConfig, setKlientConfig } from "@/utils/klientConfig";
import { testKlientConfig } from "./testConfig";

describe("klientConfig", () => {
    afterEach(() => setKlientConfig(testKlientConfig));

    it("feiler tydelig når konfigurasjonen leses før den er satt", () => {
        setKlientConfig(null);

        expect(() => getKlientConfig()).toThrow(/ikke satt/);
    });

    it("beholder endreKontonummerUrl når en annen øy setter konfigurasjonen etterpå", () => {
        setKlientConfig(null);
        setKlientConfig({ apiUrl: "a", appUrl: "b", loginUrl: "c", endreKontonummerUrl: "d" });
        setKlientConfig({ apiUrl: "e", appUrl: "f", loginUrl: "g" });

        expect(getKlientConfig()).toEqual({ apiUrl: "e", appUrl: "f", loginUrl: "g", endreKontonummerUrl: "d" });
    });
});
