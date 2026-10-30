import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setKlientConfig } from "@/config/klientConfig";
import { text as felles } from "@/language/text";
import { text } from "@/views/endre-kontonummer/endring/kontonummerSkjemaText";
import Kontonummer from "@/views/endre-kontonummer/Kontonummer";
import { testKlientConfig } from "../utils/testRuntimeConfig";

const REDIRECT = "http://x/nb/endre-kontonummer";

const setup = (props: Omit<Parameters<typeof Kontonummer>[0], "language">, language: "nb" | "en" = "nb") =>
    render(<Kontonummer {...props} language={language} />);

const fyllOgLagre = async () => {
    await userEvent.click(screen.getByRole("button", { name: "Endre" }));
    fireEvent.input(screen.getByRole("textbox", { name: "Kontonummer" }), { target: { value: "12345678911" } });
    await userEvent.click(screen.getByRole("button", { name: "Lagre" }));
};

describe("Kontonummer", () => {
    beforeEach(() => {
        setKlientConfig(testKlientConfig);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.clearAllMocks();
    });

    test("viser registrert kontonummer med kilde og endre-knapp", () => {
        setup({ kontonr: "12345678911" });

        expect(screen.getByText("1234 56 78911")).toBeInTheDocument();
        expect(screen.getByText("Kilde: Nav")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Endre" })).toBeInTheDocument();
        expect(screen.queryByRole("group")).not.toBeInTheDocument();
    });

    test("viser ingen data og legg til-knapp uten kontonummer", () => {
        setup({});

        expect(screen.getByText(/Vi har ikke registrert kontonummer på deg\./)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Legg til" })).toBeInTheDocument();
    });

    test("bytter mellom visning og skjema", async () => {
        setup({ kontonr: "12345678911" });

        await userEvent.click(screen.getByRole("button", { name: "Endre" }));

        expect(screen.getByRole("group", { name: text.kontonummerValg.nb })).toBeInTheDocument();
        expect(screen.queryByText("1234 56 78911")).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole("button", { name: "Avbryt" }));

        expect(screen.getByText("1234 56 78911")).toBeInTheDocument();
        expect(screen.queryByRole("group")).not.toBeInTheDocument();
    });

    test("henter ikke personinfo på nytt etter lagring, men sender til redirect", async () => {
        const assign = vi.fn();
        vi.spyOn(window, "location", "get").mockReturnValue({ ...window.location, assign });
        const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ redirect: REDIRECT })));
        setup({ kontonr: "12345678911" });

        await fyllOgLagre();

        await waitFor(() => expect(assign).toHaveBeenCalledWith(REDIRECT));
        expect(fetchSpy).toHaveBeenCalledTimes(1);
        const [url, init] = fetchSpy.mock.calls[0];
        expect(String(url)).not.toContain("personalia");
        expect(init?.headers).toMatchObject({ locale: "nb" });
        expect(screen.queryByRole("button", { name: "Lagre" })).not.toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Lagre/ })).toBeInTheDocument();
        expect(screen.getByRole("group", { name: text.kontonummerValg.nb })).toBeInTheDocument();
    });

    test("sender valgt språk som locale-header ved lagring", async () => {
        vi.spyOn(window, "location", "get").mockReturnValue({ ...window.location, assign: vi.fn() });
        const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ redirect: REDIRECT })));
        setup({ kontonr: "12345678911" }, "en");

        await userEvent.click(screen.getByRole("button", { name: felles.endre.en }));
        fireEvent.input(screen.getByRole("textbox", { name: text.kontonummerLabel.en }), { target: { value: "12345678911" } });
        await userEvent.click(screen.getByRole("button", { name: felles.lagre.en }));

        await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1));
        expect(fetchSpy.mock.calls[0][1]?.headers).toMatchObject({ locale: "en" });
    });

    test("sender ikke en ny forespørsel når lagre trykkes mens første lagring pågår", async () => {
        const fetchSpy = vi.spyOn(globalThis, "fetch").mockReturnValue(new Promise(() => {}));
        setup({ kontonr: "12345678911" });

        await fyllOgLagre();
        await userEvent.click(screen.getByRole("button", { name: /Lagre/ }));

        expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    test("viser feilmelding og aktiverer lagre igjen når lagring feiler", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("", { status: 500 }));
        setup({ kontonr: "12345678911" });

        await fyllOgLagre();

        expect(await screen.findByText("Oisann, noe gikk galt! Prøv igjen senere.")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Lagre" })).toBeEnabled();
        expect(screen.getByRole("group", { name: text.kontonummerValg.nb })).toBeInTheDocument();
    });
});
