import { getSpraakvalg } from "@/utils/spraakvalg";

describe("getSpraakvalg", () => {
    it("gir samme side på alle språk", () => {
        expect(getSpraakvalg("https://www.nav.no/person/personopplysninger", "/en/dsop/2019-06-18T10%3A45%3A51.634")).toEqual([
            { locale: "nb", url: "https://www.nav.no/person/personopplysninger/nb/dsop/2019-06-18T10%3A45%3A51.634" },
            { locale: "nn", url: "https://www.nav.no/person/personopplysninger/nn/dsop/2019-06-18T10%3A45%3A51.634" },
            { locale: "en", url: "https://www.nav.no/person/personopplysninger/en/dsop/2019-06-18T10%3A45%3A51.634" },
        ]);
    });

    it("beholder avsluttende skråstrek på forsiden", () => {
        expect(getSpraakvalg("https://www.nav.no/person/personopplysninger", "/nn/")[0].url).toBe("https://www.nav.no/person/personopplysninger/nb/");
    });
});
