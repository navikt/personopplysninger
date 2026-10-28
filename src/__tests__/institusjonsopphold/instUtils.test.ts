import instInfo from "@/mocks/fixtures/inst-info.json";
import { periode, sorterOpphold } from "@/views/institusjonsopphold/instUtils";

describe("sorterOpphold", () => {
    it("sorterer nyeste startdato først uten å endre listen", () => {
        const opphold = [
            { ...instInfo[0], startdato: "2017-06-13" },
            { ...instInfo[0], startdato: "2020-12-29" },
            { ...instInfo[0], startdato: "2018-01-01" },
        ];

        expect(sorterOpphold(opphold).map((innslag) => innslag.startdato)).toEqual(["2020-12-29", "2018-01-01", "2017-06-13"]);
        expect(opphold[0].startdato).toBe("2017-06-13");
    });
});

describe("periode", () => {
    it("viser start og slutt, og tom slutt når den mangler", () => {
        expect(periode({ ...instInfo[0], startdato: "2017-06-13", faktiskSluttdato: "2017-09-15" })).toBe("13.06.2017 - 15.09.2017");
        expect(periode({ ...instInfo[0], startdato: "2017-06-13", faktiskSluttdato: "" })).toBe("13.06.2017 - ");
    });
});
