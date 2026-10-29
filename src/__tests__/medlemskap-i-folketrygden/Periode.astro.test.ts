import { loadRenderers } from "astro:container";
import { getContainerRenderer } from "@astrojs/react/container-renderer";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import Periode from "@/views/medlemskap-i-folketrygden/Periode.astro";

const periode = { fraOgMed: "2018-01-01", hjemmel: "Folketrygdloven", kilde: "NAV", lovvalgsland: "", medlem: true, trygdedekning: "Full" };

describe("Periode", () => {
    it("viser start og slutt", async () => {
        const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });

        const html = await container.renderToString(Periode, { props: { language: "nb", periode: { ...periode, tilOgMed: "2018-12-31" } } });

        expect(html).toContain("01.01.18 - 31.12.18");
    });

    it("viser bare start når perioden ikke har slutt", async () => {
        const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });

        const html = await container.renderToString(Periode, { props: { language: "nb", periode: { ...periode, tilOgMed: null } } });

        expect(html).toContain("01.01.18 -");
        expect(html).not.toContain("Invalid Date");
    });
});
