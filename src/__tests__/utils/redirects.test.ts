import { setRuntimeConfig } from "@/config/runtimeConfig";
import { getLoginRedirectUrl, resolveLoginReturnPath } from "@/utils/redirects";
import { testRuntimeConfig } from "./testRuntimeConfig";

const basePath = "/person/personopplysninger";
const encode = (path: string) => btoa(path);

describe("resolveLoginReturnPath", () => {
    it("returnerer stien brukeren kom fra", () => {
        expect(resolveLoginReturnPath(encode(`${basePath}/nb/arbeidsforhold/abc`), basePath)).toBe(`${basePath}/nb/arbeidsforhold/abc`);
    });

    it("beholder hash og søk", () => {
        expect(resolveLoginReturnPath(encode(`${basePath}/nb/dsop?a=1#seksjon`), basePath)).toBe(`${basePath}/nb/dsop?a=1#seksjon`);
    });

    it("gir null uten parameter eller med ugyldig base64", () => {
        expect(resolveLoginReturnPath(null, basePath)).toBeNull();
        expect(resolveLoginReturnPath("%%%", basePath)).toBeNull();
    });

    it("avviser stier utenfor basestien", () => {
        expect(resolveLoginReturnPath(encode("/andre/sider"), basePath)).toBeNull();
        expect(resolveLoginReturnPath(encode(`${basePath}x/nb`), basePath)).toBeNull();
    });

    it("avviser eksterne og protokollrelative URL-er (open redirect)", () => {
        expect(resolveLoginReturnPath(encode("https://evil.example/"), basePath)).toBeNull();
        expect(resolveLoginReturnPath(encode("//evil.example/"), basePath)).toBeNull();
        expect(resolveLoginReturnPath(encode(`${basePath}//evil.example/`), basePath)).toBeNull();
        expect(resolveLoginReturnPath(encode(`${basePath}/\\evil.example/`), basePath)).toBeNull();
        expect(resolveLoginReturnPath(encode(`${basePath}/../../evil`), basePath)).toBeNull();
    });
});

describe("getLoginRedirectUrl", () => {
    it("URL-koder base64-verdien slik at + og / overlever søkestrengen", () => {
        window.history.pushState({}, "", `${basePath}/nb/~~~`);
        const url = getLoginRedirectUrl();
        const param = new URL(url, "http://localhost").searchParams.get("path");

        expect(param).not.toBeNull();
        expect(atob(param as string)).toBe(window.location.pathname + window.location.hash);
        expect(url).toContain("%2B");
    });

    it("sender brukeren tilbake til appens URL for vertsnavnet de kom inn på", () => {
        setRuntimeConfig({ ...testRuntimeConfig, appUrl: "https://www.intern.nav.no/person/personopplysninger" });

        expect(getLoginRedirectUrl()).toMatch(/^https:\/\/www\.intern\.nav\.no\/person\/personopplysninger\?path=/);

        setRuntimeConfig(testRuntimeConfig);
    });
});
