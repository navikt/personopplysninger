import { describe, expect, it } from "vitest";
import { formatterPersonident, fornavnTittel } from "@/views/forside/personalia/personaliaUtils";

describe("formatterPersonident", () => {
    it("setter mellomrom etter sjette siffer i et 11-sifret nummer, ellers uendret", () => {
        expect(formatterPersonident({ verdi: "10108000398", type: "FNR" })).toEqual({ verdi: "101080 00398", type: "FNR" });
        expect(formatterPersonident({ verdi: "1234", type: "DNR" })).toEqual({ verdi: "1234", type: "DNR" });
        expect(formatterPersonident({ verdi: "101080003981", type: "FNR" })).toEqual({ verdi: "101080003981", type: "FNR" });
        expect(formatterPersonident(undefined)).toBeUndefined();
    });
});

describe("fornavnTittel", () => {
    it("bruker for- og mellomnavn når fornavnet har mellomrom", () => {
        expect(fornavnTittel("KARI", "nb")).toBe("Fornavn");
        expect(fornavnTittel("KARI ANNE", "nb")).toBe("For- og mellomnavn");
        expect(fornavnTittel(undefined, "en")).toBe("First and middle name(s)");
    });
});
