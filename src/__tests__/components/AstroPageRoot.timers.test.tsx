import { render } from "@testing-library/react";
import AstroPageRoot from "@/components/astro/AstroPageRoot";
import medlInfo from "@/mocks/fixtures/medl-info.json";
import type { MedlInfo } from "@/types/medl";
import { testRuntimeConfig } from "../utils/testRuntimeConfig";

vi.mock("@/utils/faro", () => ({ startFaro: vi.fn() }));

// Dekoratørens klient spør etter vinduet hvert 50. ms til dekoratøren svarer.
// I testene svarer den aldri, så en slik timer kan gå etter at jsdom er revet ned
// og gi «window is not defined» i CI.
describe("AstroPageRoot i testmiljøet", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        window.scrollTo = vi.fn();
    });

    afterEach(() => vi.useRealTimers());

    it("etterlater ingen ventende timere", () => {
        render(
            <AstroPageRoot
                page="medlemskap"
                locale="nb"
                pathname="/person/personopplysninger/nb/medlemskap-i-folketrygden"
                config={testRuntimeConfig}
                initialData={{ medlInfo: { status: "RESULT", data: medlInfo as unknown as MedlInfo } }}
            />,
        );

        vi.advanceTimersByTime(200);

        expect(vi.getTimerCount()).toBe(0);
    });
});
