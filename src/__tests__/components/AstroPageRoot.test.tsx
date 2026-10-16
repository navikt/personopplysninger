import { render } from "@testing-library/react";
import AstroPageRoot from "@/components/astro/AstroPageRoot";
import { startFaro } from "@/utils/faro";

vi.mock("@/utils/faro", () => ({ startFaro: vi.fn() }));
vi.mock("@/views/forside/Forside", () => ({ default: () => <div>forside</div> }));

describe("AstroPageRoot", () => {
    it("starter Faro i nettleseren når siden monteres", () => {
        render(<AstroPageRoot page="forside" locale="nb" pathname="/person/personopplysninger/nb/" />);

        expect(startFaro).toHaveBeenCalledTimes(1);
    });
});
