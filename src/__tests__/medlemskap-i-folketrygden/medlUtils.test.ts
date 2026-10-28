import { grupperPerioder } from "@/views/medlemskap-i-folketrygden/medlUtils";

const periode = { fraOgMed: "2015-01-01", tilOgMed: "2016-01-01", hjemmel: "", kilde: "", lovvalgsland: "", trygdedekning: "" };

describe("grupperPerioder", () => {
    it("deler periodene i med, uten og fra Lånekassen", () => {
        const studie = { ...periode, medlem: true, studieinformasjon: { statsborgerland: "NOR", studieland: "DNK" } };
        const grupper = grupperPerioder({ perioder: [{ ...periode, medlem: true }, { ...periode, medlem: false }, studie] });

        expect(grupper.medMedlemskap).toHaveLength(1);
        expect(grupper.utenMedlemskap).toHaveLength(1);
        expect(grupper.fraLanekassen).toEqual([studie]);
        expect(grupper.ingenPerioder).toBe(false);
    });

    it("har ingen perioder når listen er tom eller mangler", () => {
        expect(grupperPerioder({ perioder: [] }).ingenPerioder).toBe(true);
        expect(grupperPerioder({}).ingenPerioder).toBe(true);
    });
});
