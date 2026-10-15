import { getLocaleRedirect } from "@/utils/locale";

const basePath = "/person/personopplysninger";

describe("getLocaleRedirect", () => {
    it("legger til bokmål for stier uten språk", () => {
        expect(getLocaleRedirect(`${basePath}/dsop`, "", basePath)).toBe(`${basePath}/nb/dsop`);
    });

    it("beholder query-parametere og kodede segmenter", () => {
        expect(
            getLocaleRedirect(`${basePath}/endre-opplysninger/sendt-fra/skjema/alderspensjon/https%3A%2F%2Fwww.nav.no%2F`, "?a=1", basePath),
        ).toBe(`${basePath}/nb/endre-opplysninger/sendt-fra/skjema/alderspensjon/https%3A%2F%2Fwww.nav.no%2F?a=1`);
    });

    it("lar stier med språk være i fred", () => {
        expect(getLocaleRedirect(`${basePath}/nb/dsop`, "", basePath)).toBeNull();
        expect(getLocaleRedirect(`${basePath}/en`, "", basePath)).toBeNull();
        expect(getLocaleRedirect(`${basePath}/nn/finnesikke`, "", basePath)).toBeNull();
    });

    it("lar basestien og API-ruter være i fred", () => {
        expect(getLocaleRedirect(basePath, "", basePath)).toBeNull();
        expect(getLocaleRedirect(`${basePath}/`, "", basePath)).toBeNull();
        expect(getLocaleRedirect(`${basePath}/api/internal/isAlive`, "", basePath)).toBeNull();
    });

    it("lar stier utenfor basestien være i fred", () => {
        expect(getLocaleRedirect("/dsop", "", basePath)).toBeNull();
        expect(getLocaleRedirect(`${basePath}x/dsop`, "", basePath)).toBeNull();
    });

    it("sender aldri videre til et annet domene", () => {
        expect(getLocaleRedirect(`${basePath}//evil.example/`, "", basePath)).toBe(`${basePath}/nb/evil.example/`);
    });
});
