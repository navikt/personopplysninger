// @vitest-environment node
import { finnDsopInnslag, medData, svarstatus, tilDsopHistorikk } from "@/server/historikk";
import type { DsopInfo } from "@/types/dsop";

const sporingslogg: DsopInfo = [
    {
        person: "04019727454",
        mottaker: "958995369",
        mottakernavn: "STOREBRAND LIVSFORSIKRING AS",
        tema: "AAP",
        uthentingsTidspunkt: "2019-06-18T10:45:51.634",
        leverteData: "eyJ1dHRyZWtrc3BlcmlvZGUiOnt9fQ==",
        samtykkeToken: "samtykke-1",
    },
    {
        person: "04019727454",
        mottaker: "995568217",
        mottakernavn: "GJENSIDIGE FORSIKRING AS",
        tema: "AAP",
        uthentingsTidspunkt: "2019-06-18T10:45:52.101",
        leverteData: "eyJ2ZWR0YWsiOltdfQ==",
        samtykkeToken: "samtykke-2",
    },
];

const feil = { status: "ERROR", error: { code: 504, text: "Oisann, noe gikk galt! Prøv igjen senere." } } as const;

describe("tilDsopHistorikk", () => {
    it("sender bare feltene historikken viser, ikke utleverte data eller samtykketoken", () => {
        expect(tilDsopHistorikk(sporingslogg)).toEqual([
            { uthentingsTidspunkt: "2019-06-18T10:45:51.634", mottakernavn: "STOREBRAND LIVSFORSIKRING AS" },
            { uthentingsTidspunkt: "2019-06-18T10:45:52.101", mottakernavn: "GJENSIDIGE FORSIKRING AS" },
        ]);
    });
});

describe("finnDsopInnslag", () => {
    it("finner innslaget med samme uthentingstidspunkt, med utleverte data men uten samtykketoken", () => {
        expect(finnDsopInnslag(sporingslogg, "2019-06-18T10:45:52.101")).toEqual({
            person: "04019727454",
            mottaker: "995568217",
            mottakernavn: "GJENSIDIGE FORSIKRING AS",
            tema: "AAP",
            uthentingsTidspunkt: "2019-06-18T10:45:52.101",
            leverteData: "eyJ2ZWR0YWsiOltdfQ==",
        });
    });

    it("gir ingenting for et ukjent eller manglende tidspunkt", () => {
        expect(finnDsopInnslag(sporingslogg, "2019-06-18T10:45:52")).toBeUndefined();
        expect(finnDsopInnslag(sporingslogg, undefined)).toBeUndefined();
    });
});

describe("medData", () => {
    it("bearbeider dataene i et vellykket svar", () => {
        expect(medData({ status: "RESULT", data: [1, 2, 3] }, (tall) => tall.length)).toEqual({ status: "RESULT", data: 3 });
    });

    it("sender feil videre uendret, uten å kalle bearbeidingen", () => {
        const bearbeid = vi.fn();

        expect(medData(feil, bearbeid)).toEqual(feil);
        expect(bearbeid).not.toHaveBeenCalled();
    });
});

describe("svarstatus", () => {
    it("gir 404 når serveren fikk svar, men innslaget ikke finnes", () => {
        expect(svarstatus({ status: "RESULT", data: undefined })).toBe(404);
    });

    it("gir 200 når innslaget finnes", () => {
        expect(svarstatus({ status: "RESULT", data: { mottakernavn: "GJENSIDIGE FORSIKRING AS" } })).toBe(200);
    });

    // Feiltilstanden er dagens feilmelding på siden, ikke en feilside (beslutning i #646).
    it("gir 200 når API-et feilet, fordi siden viser feilmeldingen", () => {
        expect(svarstatus(feil)).toBe(200);
    });
});
