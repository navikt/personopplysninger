import { grupperPerAar } from "@/views/digital-samhandling-offentlig-privat/dsopUtils";

describe("grupperPerAar", () => {
    it("grupperer per år med nyeste år først og åpner året til første innslag", () => {
        const grupper = grupperPerAar([
            { uthentingsTidspunkt: "2018-03-01T10:00:00", mottakernavn: "A" },
            { uthentingsTidspunkt: "2019-06-18T10:45:51.634", mottakernavn: "B" },
            { uthentingsTidspunkt: "2018-01-01T10:00:00", mottakernavn: "C" },
        ]);

        expect(grupper.map((gruppe) => gruppe.aar)).toEqual(["2019", "2018"]);
        expect(grupper.map((gruppe) => gruppe.aapen)).toEqual([false, true]);
        expect(grupper[1].innslag.map((innslag) => innslag.mottakernavn)).toEqual(["A", "C"]);
    });

    it("gir ingen grupper uten innslag", () => {
        expect(grupperPerAar([])).toEqual([]);
    });
});
