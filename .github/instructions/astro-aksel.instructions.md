---
applyTo: "src/**/*.{astro,tsx,ts}"
---

# Astro med Aksel Design System

Standarder for Astro-apper med Aksel: spacing-tokens, responsive props og komponentmønstre.

## Astro-dokumentasjon

Ved Astro-spesifikke valg (routing, endpoints, middleware, islands), bruk oppdatert Astro-dokumentasjon fremfor antakelser fra treningsdata.

**Key Astro patterns:**

- **File-based routing**: Files in `src/pages/` automatically become routes. Use `.astro`, `.md`, `.mdx`, `.html`, or `.js`/`.ts` for endpoints.
- **Islands Architecture**: By default, UI components render to static HTML. Use `client:*` directives (`client:load`, `client:idle`, `client:visible`) to hydrate interactive components.
- **Server Islands**: Use `server:defer` directive on `.astro` components to render dynamic parts separately without blocking the main page.
- **Framework support**: React, Preact, Svelte, Vue, SolidJS, AlpineJS. Mix frameworks on the same page. Props must be serializable (no functions).
- **Partials**: Mark `.astro` files with `export const partial = true` to render HTML fragments for dynamic loading with htmx or similar.

## Aksel-dokumentasjon

For komponent-APIer, tokens, theming, layout og mønstre — hent dokumentasjon fra:

```
https://aksel.nav.no/llm.md
```

Filen er et indeks over alle tilgjengelige Aksel-dokumentasjonssider som individuelle `.md`-filer. Hent individuelle sider ved behov fremfor å anta API fra treningsdata.

## Spacing-regler

**VIKTIG**: Bruk alltid Nav DS spacing-tokens, aldri Tailwind padding/margin.

### ✅ Riktig

```tsx
import { Box, VStack, HGrid } from "@navikt/ds-react";

<Box
  paddingBlock={{ xs: "space-16", md: "space-24" }}
  paddingInline={{ xs: "space-16", md: "space-40" }}
>
  {children}
</Box>;

<Box
  background="neutral-soft"
  padding={{ xs: "space-12", sm: "space-16", md: "space-24" }}
  borderRadius="8"
>
  <Heading size="large" level="2">
    Tittel
  </Heading>
  <BodyShort>Innhold</BodyShort>
</Box>;

<Box paddingBlock="space-16" paddingInline="space-24" />;
```

### ❌ Feil

```tsx
<div className="p-4 md:p-6">;</div> // ❌ Feil
<div className="mx-4 my-2">;</div> // ❌ Feil
<Box padding="4" />; // ❌ Feil — mangler space-prefiks
```

## Spacing-tokens

Token name = eksakt pikselverdi (`space-16` = 16px, `space-4` = 4px). Alltid `space-`-prefiks.

Fullstendig liste: [design-tokens](https://aksel.nav.no/grunnleggende/styling/design-tokens.md)

## Responsiv design

Mobil-først. Fullstendige breakpoints: [brekkpunkter](https://aksel.nav.no/grunnleggende/styling/brekkpunkter.md)

```tsx
<HGrid columns={{ xs: 1, md: 2, lg: 3 }} gap="space-16">
  {items.map((item) => (
    <Card key={item.id} {...item} />
  ))}
</HGrid>;

<Box padding={{ xs: "space-16", sm: "space-20", md: "space-24" }} />;
```

## Astro-komponentmønstre

### Filstruktur

```
src/
  components/
    Button.tsx           // React component
    Card.astro          // Astro component (static by default)
  layouts/
    Layout.astro
  pages/
    index.astro         // Routes to /
    about.astro         // Routes to /about
    [id].astro          // Dynamic route: [param]
    api/
      resources.ts      // API endpoint (GET, POST, etc.)
    404.astro           // Custom 404
    500.astro           // Custom error page
```

### `.astro`-side med React-island og Aksel

```astro
---
import Layout from "../layouts/Layout.astro";
import { Heading, BodyShort, Box } from "@navikt/ds-react";
import ResourceList from "../components/ResourceList.tsx";
---

<Layout title="Oversikt">
  <Box padding={{ xs: "space-16", md: "space-24" }}>
    <Heading size="large" level="1">Oversikt</Heading>
    <BodyShort>Data lastes inn i island-komponenten under.</BodyShort>
    <!-- React component hydrated on page load -->
    <ResourceList client:load />
  </Box>
</Layout>
```

### Islands Architecture — hydration directives

```astro
<!-- Never hydrate — renders static HTML -->
<Counter />

<!-- Hydrate on page load -->
<Counter client:load />

<!-- Hydrate when browser is idle -->
<Counter client:idle />

<!-- Hydrate only when component enters viewport -->
<Counter client:visible />

<!-- Hydrate only on specific media query -->
<Counter client:media="(max-width: 640px)" />

<!-- Only render on client (no server HTML) -->
<Counter client:only="react" />
```

### Server Islands — deferred rendering

```astro
---
import Avatar from "../components/Avatar.astro";
---

<!-- Renders main page fast, Avatar loads in parallel separately -->
<Avatar server:defer />
```

### Partials — dynamic HTML fragments

```astro
---
export const partial = true; // Mark as partial
---

<li class="item">Item loaded dynamically</li>
```

Use with htmx or similar to load HTML fragments:

```html
<button hx-post="/partials/item" hx-target="#list" hx-swap="beforeend">
  Add Item
</button>
<ul id="list"></ul>
```

### API-endpoint i Astro

```ts
// src/pages/api/resources.ts
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const { data, error } = await fetchData();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  if (!body.requiredField) {
    return new Response(
      JSON.stringify({ error: "requiredField is missing" }),
      { status: 400 },
    );
  }

  const result = await processData(body);
  return new Response(JSON.stringify(result), { status: 201 });
};
```

### Middleware i Astro

```ts
// src/middleware.ts
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  return response;
});
```

### Dynamic routes

```astro
---
// src/pages/post/[id].astro
export async function getStaticPaths() {
  const posts = await fetchAllPosts();
  return posts.map((post) => ({
    params: { id: post.id },
    props: { post },
  }));
}

interface Props {
  post: Post;
}

const { post } = Astro.props;
---

<h1>{post.title}</h1>
<p>{post.content}</p>
```

## Tallformatering

Bruk alltid norsk locale for tallformatering:

```ts
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("nb-NO").format(num);
}
```

## Framework Components — React/Svelte/Vue/etc.

All major frameworks supported: React, Preact, Svelte, Vue, SolidJS, AlpineJS.

**Key rules:**

- Framework components render as **static HTML by default** — no JavaScript sent.
- Add `client:*` directive to hydrate (make interactive).
- Props must be serializable (no functions, callbacks, or objects).
- You can **mix frameworks** on same page.
- Cannot import `.astro` components into framework components.

```astro
---
import Button from "../components/Button.tsx";      // React
import Card from "../components/Card.svelte";       // Svelte
import Modal from "../components/Modal.vue";        // Vue
---

<!-- All three frameworks on one page -->
<Button client:load />
<Card client:visible />
<Modal client:idle />
```

## Package Manager

**pnpm** er standard package manager for nye Nav frontend-prosjekter.

```bash
pnpm install
pnpm add @navikt/ds-react
pnpm test
```

## Boundaries

### ✅ Always

- Use Aksel Design System components
- Use spacing tokens with `space-` prefix
- Mobile-first responsive design
- Norwegian number formatting
- Explicit error handling in Astro endpoints
- pnpm for new projects
- Keep components static by default; hydrate only when needed with `client:*`
- Use `server:defer` for slow server-rendered components
- Preserve existing code structure when making targeted fixes — don't rename, restructure, or refactor working code beyond the task at hand

### ⚠️ Ask First

- Adding custom Tailwind utilities
- Deviating from Aksel patterns
- Changing authentication flow
- Modifying data aggregation logic
- Introducing React Query or React Hook Form into existing projects
- Using `client:only` (prefer server rendering + hydration)

### 🚫 Never

- Use Tailwind padding/margin utilities (`p-*`, `m-*`)
- Use numeric spacing without `space-` prefix
- Ignore accessibility requirements
- Skip responsive props
- Add code comments unless explicitly requested
- Pass functions as props to hydrated components
- Import `.astro` components inside framework components

## Related

| Resource                   | Use For                                                          |
| -------------------------- | ---------------------------------------------------------------- |
| `@aksel-agent`             | Aksel Design System component patterns and spacing tokens        |
| `@accessibility-agent`     | WCAG 2.1/2.2 compliance and accessibility testing                |
| `performance` instruction  | Core Web Vitals and bundle optimization                          |
| `aksel-spacing` skill      | Responsive spacing token reference                               |
| `playwright-testing` skill | E2E testing with Playwright and axe-core                         |
| aksel.nav.no/llm.md        | Full Aksel documentation index (components, tokens, foundations) |
