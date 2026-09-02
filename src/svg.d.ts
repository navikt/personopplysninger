// Explicit `?url` suffix forces Vite/Astro to treat these as plain URL
// strings (matching the previous Vite default behaviour for `*.svg`
// imports), rather than Astro's richer `SvgComponent & ImageMetadata`
// asset object declared for bare `*.svg` imports in `astro/client`.
declare module "*.svg?url" {
    const content: string;
    export default content;
}
