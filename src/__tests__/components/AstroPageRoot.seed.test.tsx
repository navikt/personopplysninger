import { render, screen } from "@testing-library/react";
import type { MockInstance } from "vitest";
import AstroPageRoot from "@/components/astro/AstroPageRoot";
import medlInfo from "@/mocks/fixtures/medl-info.json";
import type { MedlInfo } from "@/types/medl";
import { testRuntimeConfig } from "../utils/testRuntimeConfig";

const pathname = "/person/personopplysninger/nb/medlemskap-i-folketrygden";

describe("AstroPageRoot med data fra serveren", () => {
    let fetchSpy: MockInstance<typeof fetch>;

    beforeEach(() => {
        window.scrollTo = vi.fn();
        fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify(medlInfo)));
    });

    afterEach(() => fetchSpy.mockRestore());

    it("viser data fra serveren uten å hente dem på nytt i nettleseren", () => {
        render(
            <AstroPageRoot
                page="medlemskap"
                locale="nb"
                pathname={pathname}
                config={testRuntimeConfig}
                initialData={{ medlInfo: { status: "RESULT", data: medlInfo as unknown as MedlInfo } }}
            />,
        );

        expect(screen.getAllByText("DANMARK").length).toBeGreaterThan(0);
        expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("viser feilen fra serveren uten å prøve igjen i nettleseren", () => {
        render(
            <AstroPageRoot
                page="medlemskap"
                locale="nb"
                pathname={pathname}
                config={testRuntimeConfig}
                initialData={{ medlInfo: { status: "ERROR", error: { code: 504, text: "Oisann, noe gikk galt! Prøv igjen senere." } } }}
            />,
        );

        expect(screen.getByRole("alert")).toHaveTextContent("504: Oisann, noe gikk galt! Prøv igjen senere.");
        expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("henter fortsatt i nettleseren når serveren ikke har sendt data", () => {
        render(<AstroPageRoot page="medlemskap" locale="nb" pathname={pathname} config={testRuntimeConfig} />);

        expect(fetchSpy).toHaveBeenCalledWith(`${testRuntimeConfig.apiUrl}/medl`, expect.anything());
    });
});

describe("Institusjonsopphold-sidene med data fra serveren", () => {
    let fetchSpy: MockInstance<typeof fetch>;
    const feil = { status: "ERROR", error: { code: 504, text: "Oisann, noe gikk galt! Prøv igjen senere." } } as const;

    beforeEach(() => {
        window.scrollTo = vi.fn();
        fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("[]"));
    });

    afterEach(() => fetchSpy.mockRestore());

    it("viser feilen fra serveren på historikken", () => {
        render(
            <AstroPageRoot
                page="institusjonsoppholdHistorikk"
                locale="nb"
                pathname="/person/personopplysninger/nb/institusjonsopphold"
                config={testRuntimeConfig}
                instInfo={feil}
            />,
        );

        expect(screen.getByRole("alert")).toHaveTextContent("504: Oisann, noe gikk galt! Prøv igjen senere.");
        expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("viser feilen fra serveren på detaljsiden", () => {
        render(
            <AstroPageRoot
                page="institusjonsoppholdDetaljer"
                locale="nb"
                pathname="/person/personopplysninger/nb/institusjonsopphold/2017-10-02T07%3A38%3A56.816"
                config={testRuntimeConfig}
                innslag={feil}
            />,
        );

        expect(screen.getByRole("alert")).toHaveTextContent("504: Oisann, noe gikk galt! Prøv igjen senere.");
        expect(fetchSpy).not.toHaveBeenCalled();
    });
});
