import { getLocale } from "@/server/locale";

describe("getLocale", () => {
    it.each([
        ["nb", "nb"],
        ["nn", "nn"],
        ["en", "en"],
    ] as const)("returns %s unchanged when it is a supported locale", (input, expected) => {
        expect(getLocale(input)).toBe(expected);
    });

    it("falls back to nb for an unsupported locale", () => {
        expect(getLocale("de")).toBe("nb");
    });

    it("falls back to nb when undefined", () => {
        expect(getLocale(undefined)).toBe("nb");
    });
});
