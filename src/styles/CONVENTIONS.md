# CSS-konvensjoner — personopplysninger

Prosjektet migrerer fra en global Less-bundle (`src/index.less`) til **CSS Modules** per komponent/seksjon.
Dette dokumentet definerer reglene som gjelder under og etter migreringen.

## Arkitekturoversikt

```
src/
├── styles/
│   ├── global.css        ← Eksplisitt global stilgrense (se regler nedenfor)
│   ├── tokens.css        ← Prosjektspesifikke CSS custom properties
│   └── CONVENTIONS.md    ← Dette dokumentet
├── components/
│   └── spinner/
│       ├── Spinner.tsx
│       └── Spinner.module.css   ← Referanseimplementasjon (delt komponent)
└── pages/
    └── forside/sections/3-header/
        ├── Header.tsx
        └── Header.module.css    ← Referanseimplementasjon (sideseksjon)
```

## 1. Filnavn og plassering

| Type                    | Filnavn              | Plassering                               |
|-------------------------|----------------------|------------------------------------------|
| Komponent-stil          | `Foo.module.css`     | Samme mappe som `Foo.tsx`                |
| Delt layout/hooks       | `shared.module.css`  | `src/styles/` eller komponentmappe       |
| Global (unntakstilfelle)| `global.css`         | `src/styles/global.css` — ingen andre   |
| Prosjekt-tokens         | `tokens.css`         | `src/styles/tokens.css` — ingen andre   |

## 2. Selektorsyntaks i `*.module.css`

### camelCase-klasser

```css
/* ✅ Riktig */
.spinnerWrapper { … }
.headerSeksjon  { … }

/* ❌ Unngå */
.spinner-wrapper { … }
.header__seksjon { … }
```

### Betingede klasser — bruk `clsx` eller `classnames`

```tsx
import classNames from "classnames";
import styles from "./Foo.module.css";

<div className={classNames(styles.base, isActive && styles.active)} />
```

### Delte moduler

Dersom to komponenter trenger identisk styling, ekstrahér til en **delt modul**:

```tsx
import shared from "@/styles/underseksjon.module.css";
// …
<div className={shared.header}>…</div>
```

Ikke kopier regler mellom moduler.

## 3. `:global(…)` — regler for bruk

`:global()` er tillatt **kun** for:

1. **Tredjeparts-/vendor-klassenavn** som du ikke kontrollerer (f.eks. Aksel-internals `navds-*`, react-modal `ReactModal__*`)
2. **Temabytte** basert på data-attributter satt utenfra (`[data-theme="dark"] .foo`)

```css
/* ✅ Riktig — overstyrer Aksel-intern stil */
.header :global(.navds-guide-panel__content) {
  border: none;
}

/* ✅ Riktig — respons på ekstern data-attributt */
:global([data-theme="dark"]) .card {
  background: var(--a-surface-subtle);
}

/* ❌ Feil — bruk heller en vanlig lokal klasse */
:global(.minEgenKlasse) { … }
```

## 4. Breakpoints

CSS custom properties kan **ikke** brukes direkte i `@media`-regler.
Bruk de bokstavelige piksel-verdiene med kommentar:

```css
/* --ppo-bp-desktop: 959px */
@media (min-width: 959px) {
  .modal { max-width: 700px; }
}

/* --ppo-bp-mobile: 420px */
@media (max-width: 420px) {
  .panel { flex-direction: column; }
}
```

Definisjonen av `--ppo-bp-desktop` og `--ppo-bp-mobile` finnes i `src/styles/tokens.css`.

## 5. Tokens og farger

Bruk Aksel 7 `--a-*`-variabler for nye stiler. Behold eksisterende rå farger når
en token-erstatning ville gi en visuell endring; slike fargebytter tas i en egen
migrering.

```css
/* ✅ */
color: var(--a-text-default);
border: 1px solid var(--a-border-default);
background: var(--a-bg-subtle);

/* ❌ */
color: #262626;
border: 1px solid #c6c2bf;
```

Prosjektspesifikke tokens (layout, breakpoints) er definert i `src/styles/tokens.css`.

## 6. Hva er tillatt i `src/styles/global.css`

| Kategori                              | Eksempel                                     | Tillatt |
|---------------------------------------|----------------------------------------------|---------|
| Dokumentnivå                          | `html`, `body`                               | ✅      |
| Strukturelle hooks i `index.html`     | `.pagewrapper`, `.app`                       | ✅      |
| App-skjelettklasser i `App.tsx`       | `.pagecontent`, `.wrapper`                   | ✅ (midlertidig) |
| Delte layout-hooks på tvers av sider  | `.underseksjon__*`                           | ✅ (midlertidig) |
| Tredjeparts-/vendor-selektorer        | `.ReactModal__Overlay`, `.navds-*`           | ✅      |
| Felles hjelpeklasser uten tilhørighet | `.capitalize`                                | ✅      |
| Komponent-spesifikke stiler           | `.header__seksjon`, `.spinner-wrapper`       | ❌ — bruk CSS Module |
| Overskriving av `--a-*`-tokens        | `--a-spacing-4: 20px`                        | ❌ aldri |

## 7. Importrekkefølge i `index.tsx`

```tsx
// 1. Aksel CSS (vendor)
import "@navikt/ds-css";
// 2. Andre vendor-pakker
import "@navikt/arbeidsforhold/index.css";
// 3. Prosjektspesifikke tokens (må komme etter Aksel slik at --a-* er definert)
import "./styles/tokens.css";
// 4. Eksplisitt global grense
import "./styles/global.css";
// 5. Komponent-moduler importeres der komponentene brukes
```

## 8. Migrasjonsplan

Resterende Less-filer migreres gradvis. Rekkefølge:

1. **Delte komponenter** (`src/components/**/*.less`) — én om gangen, pr. PR
2. **Sideseksjoner** (`src/pages/**/*.less`) — én side om gangen
3. **Siste steg**: fjern `less-watch-compiler`, `<link rel="stylesheet" href="/index.css">` fra `index.html`, og `src/index.less`

Hver fil som er migrert **fjernes** fra `src/index.less` for å unngå dobbel lasting.

## 9. Tilgjengelighet (UU)

CSS Modules påvirker ikke semantikken — alle `a11y`-krav i `.github/instructions/accessibility.instructions.md` gjelder uendret:

- Bruk Aksel-komponenter fremfor egne `<div>`-løsninger
- Ikke fjern fokus-indikator (`outline: none`) uten erstatning
- `className` i CSS Modules endrer ikke ARIA-roller eller heading-hierarki
