import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AndreAdresserOy from "@/views/forside/sections/4-personinfo/3-adresser/visning/AndreAdresserOy";

const apiUrl = "http://oy.test/api";
const svar = (personalia: object) => (url: string | URL | Request) =>
    Promise.resolve(new Response(JSON.stringify(String(url).endsWith("/personalia") ? personalia : { statusType: "OK" })));
const postboks = { type: "POSTBOKSADRESSE" as const, postboks: "Postboks 10 Sørstrand", postnummer: "0194", poststed: "OSLO" };

describe("AndreAdresserOy", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("henter adressene på nytt fra apiUrl etter sletting og viser ingenting uten øvrige adresser", async () => {
        const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(svar({ adresser: { kontaktadresser: [] } }));
        const { container } = render(
            <AndreAdresserOy
                language="nb"
                adresser={{ kontaktadresser: [{ kilde: "pdl", adresse: postboks }] }}
                apiUrl={apiUrl}
                appUrl="http://oy.test/app"
                loginUrl="http://oy.test/login"
            />,
        );

        expect(screen.getByRole("heading", { level: 3, name: "Øvrige registrerte adresser" })).toBeInTheDocument();

        await userEvent.click(screen.getByRole("button", { name: "Slett kontaktadresse" }));
        await userEvent.click(screen.getByRole("button", { name: "Slett" }));

        await waitFor(() => expect(container).toBeEmptyDOMElement());
        expect(fetchSpy.mock.calls.map(([url]) => String(url))).toEqual([`${apiUrl}/slettKontaktadresse`, `${apiUrl}/personalia`]);
    });
});
