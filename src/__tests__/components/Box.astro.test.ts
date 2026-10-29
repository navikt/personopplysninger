import { loadRenderers } from "astro:container";
import { getContainerRenderer } from "@astrojs/react/container-renderer";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import Box from "@/components/box/Box.astro";

describe("Box", () => {
    it("rendrer GuidePanel-plakaten med tittel, infotekst-dialog og ankerlenke", async () => {
        const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });

        const html = await container.renderToString(Box, {
            props: { language: "nb", id: "personalia", tittel: "Personalia", ikon: "/ikon.svg", ankerlenke: true },
            slots: { default: "<p>innhold</p>", beskrivelse: "Vi må vite hvem du er." },
        });

        expect(html).toContain('data-responsive="false"');
        expect(html).toContain('data-poster="true"');
        expect(html).toContain('<img src="/ikon.svg" alt="">');
        expect(html).toMatch(/<h2[^>]*>Personalia<\/h2>/);
        const [, dialogId] = html.match(/<dialog[^>]*aria-labelledby="([^"]+)"/) ?? [];
        expect(dialogId).toMatch(/^infotekst-/);
        expect(html).toContain(`id="${dialogId}"`);
        expect(html).toContain("<info-tekst>");
        expect(html).toContain('aria-label="Les mer om denne seksjonen."');
        expect(html).toContain("Vi må vite hvem du er.");
        expect(html).toContain('href="#personalia"');
        expect(html).toContain("<p>innhold</p>");
    });

    it("rendrer verken infotekst eller ankerlenke uten beskrivelse og ankerlenke", async () => {
        const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });

        const html = await container.renderToString(Box, {
            props: { language: "nb", id: "feilboks", tittel: "Personalia", ikon: "/ikon.svg" },
            slots: { default: "innhold" },
        });

        expect(html).not.toContain("<info-tekst>");
        expect(html).not.toContain('href="#feilboks"');
    });
});
