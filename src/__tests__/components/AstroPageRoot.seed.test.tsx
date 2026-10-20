import { render, screen } from "@testing-library/react";
import type { MockInstance } from "vitest";
import AstroPageRoot from "@/components/astro/AstroPageRoot";
import dsopInfo from "@/mocks/fixtures/dsop-info.json";
import instInfo from "@/mocks/fixtures/inst-info.json";
import medlInfo from "@/mocks/fixtures/medl-info.json";
import type { MedlInfo } from "@/types/medl";
import { testRuntimeConfig } from "../utils/testRuntimeConfig";

vi.mock("@/utils/faro", () => ({ startFaro: vi.fn() }));

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

describe("DSOP-sidene med data fra serveren", () => {
    let fetchSpy: MockInstance<typeof fetch>;
    const [storebrand] = dsopInfo;
    const historikk = dsopInfo.map(({ uthentingsTidspunkt, mottakernavn }) => ({ uthentingsTidspunkt, mottakernavn }));
    const feil = { status: "ERROR", error: { code: 502, text: "Oisann, noe gikk galt! Prøv igjen senere." } } as const;

    beforeEach(() => {
        window.scrollTo = vi.fn();
        fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("[]"));
    });

    afterEach(() => fetchSpy.mockRestore());

    it("viser historikken fra serveren uten å hente den i nettleseren", () => {
        render(
            <AstroPageRoot
                page="dsopHistorikk"
                locale="nb"
                pathname="/person/personopplysninger/nb/dsop"
                config={testRuntimeConfig}
                dsopInfo={{ status: "RESULT", data: historikk }}
            />,
        );

        expect(screen.getAllByRole("link", { name: "STOREBRAND LIVSFORSIKRING AS" })[0]).toHaveAttribute(
            "href",
            "/person/personopplysninger/nb/dsop/2019-06-18T10%3A45%3A51.634",
        );
        expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("viser feilen fra serveren på historikken", () => {
        render(
            <AstroPageRoot
                page="dsopHistorikk"
                locale="nb"
                pathname="/person/personopplysninger/nb/dsop"
                config={testRuntimeConfig}
                dsopInfo={feil}
            />,
        );

        expect(screen.getByRole("alert")).toHaveTextContent("502: Oisann, noe gikk galt! Prøv igjen senere.");
        expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("viser innslaget fra serveren på detaljsiden", () => {
        render(
            <AstroPageRoot
                page="dsopDetaljer"
                locale="nb"
                pathname="/person/personopplysninger/nb/dsop/2019-06-18T10%3A45%3A51.634"
                config={testRuntimeConfig}
                innslag={{ status: "RESULT", data: storebrand }}
            />,
        );

        expect(screen.getByRole("heading", { level: 2, name: "STOREBRAND LIVSFORSIKRING AS" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Last ned leverte data" })).toBeInTheDocument();
        expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("viser dagens tekst med tilbakelenke når innslaget ikke finnes", () => {
        render(
            <AstroPageRoot
                page="dsopDetaljer"
                locale="nb"
                pathname="/person/personopplysninger/nb/dsop/finnes-ikke"
                config={testRuntimeConfig}
                innslag={{ status: "RESULT", data: undefined }}
            />,
        );

        expect(screen.getByText("Ingen personopplysninger har blitt utlevert.", { exact: false })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Tilbake" })).toHaveAttribute("href", "/person/personopplysninger/nb/dsop");
        expect(screen.queryByRole("heading", { level: 2, name: "STOREBRAND LIVSFORSIKRING AS" })).not.toBeInTheDocument();
    });

    it("viser feilen fra serveren på detaljsiden", () => {
        render(
            <AstroPageRoot
                page="dsopDetaljer"
                locale="nb"
                pathname="/person/personopplysninger/nb/dsop/2019-06-18T10%3A45%3A51.634"
                config={testRuntimeConfig}
                innslag={feil}
            />,
        );

        expect(screen.getByRole("alert")).toHaveTextContent("502: Oisann, noe gikk galt! Prøv igjen senere.");
        expect(fetchSpy).not.toHaveBeenCalled();
    });
});

describe("Institusjonsopphold-sidene med data fra serveren", () => {
    let fetchSpy: MockInstance<typeof fetch>;
    const feil = { status: "ERROR", error: { code: 504, text: "Oisann, noe gikk galt! Prøv igjen senere." } } as const;
    const vik = instInfo.find((opphold) => opphold.registreringstidspunkt === "2017-10-02T07:38:56.816");

    beforeEach(() => {
        window.scrollTo = vi.fn();
        fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("[]"));
    });

    afterEach(() => fetchSpy.mockRestore());

    it("viser historikken fra serveren uten å hente den i nettleseren", () => {
        render(
            <AstroPageRoot
                page="institusjonsoppholdHistorikk"
                locale="nb"
                pathname="/person/personopplysninger/nb/institusjonsopphold"
                config={testRuntimeConfig}
                instInfo={{ status: "RESULT", data: instInfo }}
            />,
        );

        // Alle oppholdene i mock-dataene er på samme institusjon, så lenkene skilles på tidspunktet.
        expect(screen.getAllByRole("link", { name: "VIK FENGSEL" }).map((lenke) => lenke.getAttribute("href"))).toContain(
            "/person/personopplysninger/nb/institusjonsopphold/2017-10-02T07%3A38%3A56.816",
        );
        expect(fetchSpy).not.toHaveBeenCalled();
    });

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

    it("viser oppholdet fra serveren på detaljsiden", () => {
        render(
            <AstroPageRoot
                page="institusjonsoppholdDetaljer"
                locale="nb"
                pathname="/person/personopplysninger/nb/institusjonsopphold/2017-10-02T07%3A38%3A56.816"
                config={testRuntimeConfig}
                innslag={{ status: "RESULT", data: vik }}
            />,
        );

        expect(screen.getByRole("heading", { level: 2, name: "VIK FENGSEL" })).toBeInTheDocument();
        expect(screen.getByText("Organisasjonsnummer 974 736 942")).toBeInTheDocument();
        expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("viser dagens tekst med tilbakelenke når oppholdet ikke finnes", () => {
        render(
            <AstroPageRoot
                page="institusjonsoppholdDetaljer"
                locale="nb"
                pathname="/person/personopplysninger/nb/institusjonsopphold/finnes-ikke"
                config={testRuntimeConfig}
                innslag={{ status: "RESULT", data: undefined }}
            />,
        );

        expect(screen.getByText("Det er ingen institusjonsopphold å vise.")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Tilbake" })).toHaveAttribute("href", "/person/personopplysninger/nb/institusjonsopphold");
        expect(screen.queryByRole("heading", { level: 2, name: "VIK FENGSEL" })).not.toBeInTheDocument();
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
