import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { fetchPersonInfo } from "@/clients/apiClient";
import DetaljertArbeidsforhold from "@/pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold";
import { StoreProvider } from "@/store/Context";
import nbMessages from "@/text/nb";

vi.mock("@/clients/apiClient", () => ({ fetchPersonInfo: vi.fn() }));
vi.mock("@/pages/detaljert-arbeidsforhold/DetaljertArbeidsforholdClient", () => ({
    default: ({ printName, printSSN }: { printName: string; printSSN: string }) => (
        <output>
            {printName}|{printSSN}
        </output>
    ),
}));

window.scrollTo = vi.fn();

describe("DetaljertArbeidsforhold", () => {
    it("henter personinfo når den ikke er lastet, slik at utskrift får navn og fødselsnummer", async () => {
        vi.mocked(fetchPersonInfo).mockResolvedValue({
            personalia: { fornavn: "Ola", etternavn: "Nordmann", personident: { verdi: "12345678901" } },
        });

        render(
            <StoreProvider>
                <IntlProvider locale="nb" messages={nbMessages}>
                    <DetaljertArbeidsforhold id="1" pathname="/person/personopplysninger/nb/arbeidsforhold/1" />
                </IntlProvider>
            </StoreProvider>,
        );

        expect(await screen.findByText("Ola Nordmann|12345678901")).toBeTruthy();
        expect(fetchPersonInfo).toHaveBeenCalledTimes(1);
    });
});
