import { loadRenderers } from "astro:container";
import { getContainerRenderer } from "@astrojs/react/container-renderer";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import LesMer from "@/components/lesmer/LesMer.astro";

describe("LesMer", () => {
    it("er en lukket details med Aksels read-more-klasser", async () => {
        const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });

        const html = await container.renderToString(LesMer, {
            props: { tittel: "Vis detaljer", lukkTittel: "Skjul detaljer" },
            slots: { default: "<dl></dl>" },
        });

        expect(html).toMatch(/<details class="[^"]+">/);
        expect(html).not.toMatch(/<details[^>]*\sopen/);
        expect(html).toMatch(/<summary class="[^"]+"><svg[^>]*aria-hidden="true"/);
        expect(html).toContain("Vis detaljer");
        expect(html).toContain("Skjul detaljer");
        expect(html).toMatch(/<\/summary><div class="[^"]+"><dl><\/dl><\/div><\/details>/);
        expect(html).toMatch(/<details class="[^"]*_toTitler_\w+[^"]*">/);
        expect(html).not.toContain("navds-");
    });

    it("skjuler ikke tittelen når den åpnes uten lukkTittel", async () => {
        const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });

        const html = await container.renderToString(LesMer, { props: { tittel: "Vis detaljer" }, slots: { default: "<dl></dl>" } });

        expect(html).toMatch(/<details class="_lesMer_\w+">/);
        expect(html).not.toContain("toTitler");
    });

    it("rendrer ikke noe lukk-element uten lukkTittel", async () => {
        const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });

        const html = await container.renderToString(LesMer, { props: { tittel: "Vis detaljer" }, slots: { default: "<dl></dl>" } });

        expect(html).not.toMatch(/_lukk_\w+/);
        expect(html.match(/<span/g)).toHaveLength(1);
    });
});
