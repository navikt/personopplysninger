/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// `@navikt/ds-css`'s package.json points its bare package entry directly at
// a `.css` file. Astro/Vite's ambient `declare module "*.css"` only matches
// import specifiers that literally end in `.css` (e.g.
// `@navikt/arbeidsforhold/index.css`, which already matches), not bare
// package names whose resolved entry happens to be CSS.
declare module "@navikt/ds-css";
