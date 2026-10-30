import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TelefonnummerOy from "@/views/forside/kontaktinfo/telefonnummer/TelefonnummerOy";

const apiUrl = "http://oy.test/api";

const svar = (personalia: object) => (url: string | URL | Request) => {
    if (String(url).endsWith("/personalia")) {
        return Promise.resolve(new Response(JSON.stringify(personalia)));
    }
    if (String(url).endsWith("/retningsnumre")) {
        return Promise.resolve(new Response(JSON.stringify([{ landskode: "+47", land: "Norge" }])));
    }
    return Promise.resolve(new Response(JSON.stringify({ statusType: "OK" })));
};

describe("TelefonnummerOy", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("henter telefonnumrene på nytt fra apiUrl etter sletting og viser dem", async () => {
        const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(svar({ personalia: { kontoregisterStatus: "SUCCESS" } }));
        render(
            <TelefonnummerOy
                language="nb"
                tlfnr={{ telefonHoved: "22334455", landskodeHoved: "+47" }}
                medOverskrift={true}
                apiUrl={apiUrl}
                appUrl="http://oy.test/app"
                loginUrl="http://oy.test/login"
            />,
        );

        expect(screen.getByRole("heading", { level: 3, name: "Telefonnummer registrert hos Nav" })).toBeInTheDocument();

        await userEvent.click(screen.getByRole("button", { name: "Slett telefonnummer" }));
        await userEvent.click(screen.getByRole("button", { name: "Slett" }));

        await waitFor(() => expect(screen.queryByRole("button", { name: "Slett telefonnummer" })).not.toBeInTheDocument());
        expect(screen.queryByText("+47")).not.toBeInTheDocument();
        expect(screen.queryByRole("heading", { level: 3 })).not.toBeInTheDocument();
        expect(fetchSpy.mock.calls.map(([url]) => String(url))).toEqual([`${apiUrl}/slettTelefonnummer`, `${apiUrl}/personalia`]);
    });

    it("henter telefonnumrene på nytt etter at et nytt nummer er lagret og viser det", async () => {
        const fetchSpy = vi
            .spyOn(globalThis, "fetch")
            .mockImplementation(svar({ personalia: { kontoregisterStatus: "SUCCESS", tlfnr: { telefonHoved: "22334455", landskodeHoved: "+47" } } }));
        render(
            <TelefonnummerOy
                language="nb"
                tlfnr={{}}
                medOverskrift={true}
                apiUrl={apiUrl}
                appUrl="http://oy.test/app"
                loginUrl="http://oy.test/login"
            />,
        );

        await userEvent.click(screen.getByRole("button", { name: "Legg til telefonnummer i Nav sitt register" }));
        await userEvent.type(screen.getByRole("textbox", { name: "Telefonnummer" }), "22334455");
        await userEvent.click(screen.getByRole("button", { name: "Lagre" }));

        expect(await screen.findByRole("heading", { level: 3, name: "Telefonnummer registrert hos Nav" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Slett telefonnummer" })).toBeInTheDocument();
        expect(fetchSpy.mock.calls.map(([url]) => String(url))).toContain(`${apiUrl}/endreTelefonnummer`);
        expect(fetchSpy.mock.calls.map(([url]) => String(url)).at(-1)).toBe(`${apiUrl}/personalia`);
    });
});
