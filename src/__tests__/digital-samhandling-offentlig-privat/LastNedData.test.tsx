import { fireEvent, render, screen } from "@testing-library/react";
import FileSaver from "file-saver";
import LastNedData from "@/views/digital-samhandling-offentlig-privat/detaljer/LastNedData";

vi.mock("file-saver", () => ({ default: { saveAs: vi.fn() } }));

const lesTekst = (blob: Blob) =>
    new Promise<string>((resolve) => {
        const leser = new FileReader();
        leser.onload = () => resolve(String(leser.result));
        leser.readAsText(blob);
    });

describe("LastNedData", () => {
    it("lagrer de leverte dataene som formatert JSON", async () => {
        render(<LastNedData language="en" leverteData={btoa(JSON.stringify({ a: 1 }))} />);

        fireEvent.click(screen.getByRole("button", { name: "Download supplied data" }));

        const [blob, filnavn] = vi.mocked(FileSaver.saveAs).mock.calls[0] as [Blob, string];
        expect(filnavn).toBe("utleverte-data.json");
        expect(blob.type).toBe("application/json");
        expect(await lesTekst(blob)).toBe('{\n  "a": 1\n}');
    });
});
