# Plan for migrering til Astro

## Mål

Migrer `personopplysninger` fra en Vite-basert React-SPA til en server-renderet
Astro-applikasjon uten å skrive om all React-koden samtidig.

Migreringen skal:

- beholde dagens URL-er under `/person/personopplysninger`
- beholde språkene `nb`, `nn` og `en`
- beholde ID-porten-innlogging på riktig sikkerhetsnivå
- beholde dagens API-kontrakter og endringsflyter
- flytte dekoratør, routing og autentisering til serveren
- beholde dagens klient-side datahenting og mutasjoner
- unngå å øke mengden JavaScript unødvendig

Planen bygger på mønstrene i
[`navikt/tms-utkast-frontend`](https://github.com/navikt/tms-utkast-frontend).

## Anbefalt målarkitektur

Bruk Astro som server- og sideskall, og behold React for komponenter som trenger
tilstand eller brukerinteraksjon.

```text
Nettleser
  |
  v
Astro middleware
  - autentisering
  - språk og request-kontekst
  |
  v
Astro-side
  - routing
  - dekoratør
  - sideskall
  |
  +--> React-island
       - klient-side datahenting
       - skjema
       - modal
       - klienttilstand
       - mutasjoner
```

Dette følger hovedprinsippet fra `tms-utkast-frontend`: Astro-komponenter er
statiske som standard, mens React-komponenter hydreres eksplisitt med
`client:*` bare når de må være interaktive.

## Prinsipper

1. **Migrer trinnvis.** Ikke kombiner Astro-migreringen med React-, Aksel- eller
   domenerefaktorering.
2. **Behold fungerende React-komponenter.** Flytt dem inn som islands før de
   eventuelt forenkles.
3. **Bruk filbasert routing.** Erstatt `react-router-dom` med filer under
   `src/pages/`.
4. **Behold klient-side datahenting.** Gjenbruk dagens API-klienter, providers,
   loading-tilstander og feiltilstander.
5. **Hydrer datadrevne sider med `client:load`.** Disse sidene må starte fetch
   straks siden åpnes. Bruk andre `client:*`-direktiver bare for komponenter
   som ikke henter kritiske sidedata.
6. **Valider miljøvariabler.** API-URL-er som brukes i nettleseren skal være
   eksplisitt offentlige. Hemmelige verdier skal være server-only.
7. **Bevar oppførsel før optimalisering.** Samme URL, språk, innhold,
   feilhåndtering og tilgjengelighet skal fungere før gammel kode fjernes.

## Foreslått struktur

```text
src/
├── layouts/
│   ├── Layout.astro
│   └── Layout.module.css
├── middleware.ts
├── pages/
│   ├── index.astro
│   ├── error.astro
│   ├── api/internal/
│   │   ├── isAlive.ts
│   │   └── isReady.ts
│   └── [locale]/
│       ├── index.astro
│       ├── endre-kontonummer.astro
│       ├── medlemskap-i-folketrygden.astro
│       ├── institusjonsopphold/
│       │   ├── index.astro
│       │   └── [id].astro
│       ├── dsop/
│       │   ├── index.astro
│       │   └── [id].astro
│       └── arbeidsforhold/
│           └── [id].astro
├── shared/
│   ├── language/
│   ├── server/
│   └── components/
└── features/
    ├── personopplysninger/
    ├── kontaktinformasjon/
    ├── kontonummer/
    ├── institusjonsopphold/
    ├── medlemskap/
    └── dsop/
```

Ikke flytt alle eksisterende filer til denne strukturen med én gang. Bruk den
for nye Astro-filer, og flytt eksisterende komponenter når deres side migreres.

## Gjennomføringsplan

### Fase 1: Etabler Astro uten funksjonelle endringer

1. Legg til Astro med Node-adapter og React-integrasjon.
2. Sett `output: "server"` og bruk standalone-modus, som i
   `tms-utkast-frontend`.
3. Sett:
   - `base: "/person/personopplysninger"`
   - `i18n.defaultLocale: "nb"`
   - språkene `nb`, `nn` og `en`
   - prefiks også for standardspråket
   - sourcemaps i Vite-konfigurasjonen
4. Behold Node 24.
5. Legg til en egen `tsconfig.astro.json` basert på `astro/tsconfigs/strict`.
   Hold den atskilt fra Vite-konfigurasjonen til Astro håndterer alle sidene,
   slik at Astros SVG-typer ikke påvirker eksisterende React-importer.
6. Behold eksisterende path alias, eller innfør ett tydelig alias som `@src/*`.
7. Lag Astro-endepunkter for:
   - `/api/internal/isAlive`
   - `/api/internal/isReady`
8. Lag et enkelt `Layout.astro` som importerer Aksel CSS og eksisterende globale
   stiler.

**Ferdig når:** Astro kan bygges og startes lokalt, og health-endepunktene
returnerer HTTP 200.

### Fase 2: Flytt dekoratøren til Astro-layouten

1. Erstatt Express-baserte `server/dekorator.js` med
   `fetchDecoratorHtml` i `Layout.astro`.
2. Sett dekoratørmiljø fra `NAIS_CLUSTER_NAME`, ikke fra en klientvariabel.
3. Send språk og språklenker fra `Astro.currentLocale`.
4. Behold:
   - privatperson-kontekst
   - logout-varsel
   - språklenker for `nb`, `nn` og `en`
   - eksisterende brødsmule- og Min side-lenker
5. Sett dekoratørens head, header, footer og scripts med `set:html`.
6. Fjern Express-dekoratøren og den lokale klient-injiseringen først etter at
   første Astro-rute er verifisert i dev og den gamle Vite-rutinen ikke lenger
   trenger dem.

**Ferdig når:** alle språkvariantene rendres med korrekt dekoratør uten
klient-side injisering.

### Fase 3: Flytt autentisering til middleware

1. Opprett `src/middleware.ts`.
2. Bruk `@navikt/astro-auth`, slik `tms-utkast-frontend` gjør.
3. Kontroller bibliotekets konfigurasjon mot dagens krav om ID-porten Level4.
4. Behold Nais ID-porten-sidecar og sett eksplisitt riktig nivå i manifestet.
5. Behold `WithAuth` og klientkallet til dekoratørens auth-endepunkt inntil
   første Astro-rute er migrert. Fjern dem sammen med den gamle Vite-rutinen,
   ikke før.
6. Definer tydelig oppførsel for:
   - manglende innlogging
   - utilstrekkelig sikkerhetsnivå
   - utløpt sesjon
   - feil under autentisering

**Ferdig når:** en uautentisert bruker sendes til innlogging før en Astro-side
rendres, og en autentisert bruker ikke trenger en klient-side auth-spinner på
migrerte ruter.

### Fase 4: Innfør validerte servervariabler

1. Definer miljøvariabler i Astros `env.schema`.
2. Definer API- og innloggings-URL-er som offentlige klientvariabler med
   konsekvent `PUBLIC_*`-prefiks.
3. Bruk `context: "server"` og `access: "secret"` bare for verdier som faktisk
   skal holdes utenfor klientpakken.
4. Skill mellom:
   - interne backend-adresser
   - offentlige navigasjonslenker
   - dekoratørmiljø
   - telemetry- og loggerkonfigurasjon
5. Erstatt `VITE_*` med validerte `PUBLIC_*`-variabler gradvis.
6. Behold API-kallene direkte fra nettleseren med `credentials: "include"`.
7. Sett begge prefikser i deploy-workflowene til siste Vite-komponent er
   migrert. Astro bruker `PUBLIC_*`; den aktive Vite-applikasjonen bruker
   fortsatt `VITE_*`.

**Ferdig når:** applikasjonen feiler ved oppstart dersom en påkrevd variabel
mangler, og bare eksplisitt offentlige variabler finnes i nettleserens
JavaScript.

### Fase 5: Migrer routing og språk

Migrer én rutegruppe om gangen:

1. Forsiden: `src/pages/[locale]/index.astro`
2. Medlemskap: `src/pages/[locale]/medlemskap-i-folketrygden.astro`
3. Institusjonsopphold: liste og `[id]`
4. DSOP: liste og `[id]`
5. Arbeidsforhold: `[id]`
6. Endre kontonummer
7. Redirect-rutene under `sendt-fra` og `endre-opplysninger`

For hver rute:

- opprett tilsvarende Astro-fil
- flytt sidens layout og statiske innhold til Astro
- behold dagens datadrevne React-side som et `client:load`-island
- erstatt `useParams` med `Astro.params`
- erstatt React Router-navigasjon med vanlige lenker eller Astro-redirect
- send `Astro.currentLocale` inn som initialverdi til React-providerne
- behold dagens klient-side providers og API-kall
- verifiser direkte navigasjon og reload på URL-en

Fjern `react-router-dom` først når siste rute er migrert.

### Fase 6: Tilpass eksisterende klient-fetches

1. Behold `apiClient.ts` og domenets eksisterende fetch-providers.
2. Behold `useEffect`-basert innlasting og dagens loading-, tom- og
   feiltilstander.
3. Flytt bare URL-konfigurasjonen fra `VITE_*` til validerte `PUBLIC_*`
   variabler.
4. Behold mutasjoner i React-islands:
   - endre og slette telefonnummer
   - endre kontonummer
   - slette kontaktadresse
5. Behold dagens oppdatering av global store etter mutasjoner.
6. Lag en liten React-root per Astro-side som setter opp nødvendige providers.
7. Unngå Astro API-proxyer med mindre CORS, auth eller nettverksregler krever
   det.

**Ferdig når:** alle eksisterende fetcher og mutasjoner fungerer fra de nye
Astro-rutene uten endringer i API-kontraktene.

### Fase 7: Reduser React-omfanget

Behold React for:

- klient-side datahenting og providers
- skjema med `react-hook-form`
- modaler
- betinget skjemavisning
- klient-side validering
- andre kontroller med lokal tilstand

Flytt til Astro når komponenten bare:

- viser tekst eller data
- lager layout
- viser brødsmuler eller overskrifter
- formatterer serverdata
- ikke bruker hooks, klient-fetch eller nettleser-API-er

Bruk `client:load` for sidekomponenter som henter data. Unngå `client:only`,
fordi React-komponentene fortsatt kan levere server-renderet startmarkup før
hydrering.

### Fase 8: Oppdater lokal utvikling og mocks

1. Bruk Astro-serveren lokalt. Astro blir også deploy-runtime i fase 9.
2. Vurder `@navikt/astro-mocks`, som i referanserepoet, for enkle
   backend-mocks.
3. Behold eksisterende Hono-mocks midlertidig hvis det gir mindre risiko.
4. Flytt mock for mock når den tilhørende ruten migreres.
5. Sørg for at lokal modus:
   - ikke krever ekte innlogging
   - bruker tydelige falske tokens
   - aldri kan aktiveres i deploy

Ikke bytt mockløsning og migrer alle sider i samme PR.

### Fase 9: Bygg, Docker og Nais

1. Bygg Astro til `dist/`.
2. Start standalone-serveren med `dist/server/entry.mjs`.
3. Bruk port 3000, som i `tms-utkast-frontend`, eller behold 8080 dersom teamets
   deploystandard krever det. Manifest, Dockerfile og health checks må bruke
   samme port.
4. Oppdater liveness/readiness til Astro-endepunktene under appens base path.
5. Behold ID-porten, outbound-regler, ressurser og ingresses fra dagens
   manifest.
6. Behold dagens CDN-oppsett inntil Astro-serveren fungerer stabilt.
7. Vurder deretter `assetsPrefix` og Astro-workflowen fra `tms-deploy`.
8. Fjern `server/` og gammel Express-runtime først når Astro er deployet og
   verifisert.

### Fase 10: Tester og utrulling

Bruk samme testdeling som `tms-utkast-frontend`:

- Vitest for domenehjelpere og React-islands
- Playwright for komplette sider, routing og SSR
- axe/Playwright for tilgjengelighet

Minimum før hver migrerte rute aktiveres:

- direkte URL og reload fungerer
- alle tre språk fungerer
- autentisering og redirect fungerer
- loading-, tom- og feiltilstander fungerer
- mobil og desktop fungerer
- skjema og mutasjoner fungerer
- ingen uventede klientfeil eller hydreringsfeil

Rull ut til dev etter hver rutegruppe. Ikke vent til hele applikasjonen er
migrert før første deploy.

## Foreslått PR-inndeling

1. Astro-grunnoppsett, health endpoints og tom layout
2. Dekoratør og språk
3. Middleware og autentisering
4. Miljøskjema og klientkonfigurasjon
5. Forsiden som Astro-side med eksisterende React-innhold
6. Klient-fetches og providers på Astro-rutene
7. Historikk- og detaljruter
8. Endringsskjema og redirect-ruter
9. Playwright- og tilgjengelighetstester
10. Ny Docker/deploy og fjerning av Vite/Express/React Router

Hver PR skal kunne bygges, testes og deployes uavhengig.

## Ting som bør vente

For å holde migreringen enkel bør disse endringene tas separat:

- React 18 til React 19
- Aksel 7 til Aksel 8
- npm til pnpm
- redesign eller større CSS-opprydding
- endring av API-kontrakter
- ny global state-løsning
- generell mappestruktur-refaktorering

## Ferdigdefinisjon

Migreringen er ferdig når:

- alle offentlige ruter håndteres av Astro
- dekoratør og autentisering håndteres på serveren
- datahenting og mutasjoner fungerer klient-side som i dag
- datadrevne og interaktive komponenter hydreres eksplisitt
- `react-router-dom`, gammel Vite-entry og Express-serveren er fjernet
- Astro-appen bygges og kjører med Node-adapteren i Nais
- dev og prod bruker samme runtime og routing
- eksisterende funksjonalitet, språk og tilgjengelighet er bevart

## Referanser fra `tms-utkast-frontend`

- [`astro.config.mjs`](https://github.com/navikt/tms-utkast-frontend/blob/main/astro.config.mjs):
  Node-adapter, SSR, base path, i18n, React og miljøskjema
- [`src/layouts/Layout.astro`](https://github.com/navikt/tms-utkast-frontend/blob/main/src/layouts/Layout.astro):
  server-side dekoratør og Aksel CSS
- [`src/middleware.ts`](https://github.com/navikt/tms-utkast-frontend/blob/main/src/middleware.ts):
  autentisering før sider rendres
- [`src/pages/[locale]/index.astro`](https://github.com/navikt/tms-utkast-frontend/blob/main/src/pages/%5Blocale%5D/index.astro):
  språkroute og `server:defer`
- [`src/pages/api/internal`](https://github.com/navikt/tms-utkast-frontend/tree/main/src/pages/api/internal):
  health endpoints
- [`Dockerfile`](https://github.com/navikt/tms-utkast-frontend/blob/main/Dockerfile):
  standalone Astro-server
- [`nais/`](https://github.com/navikt/tms-utkast-frontend/tree/main/nais):
  Astro-runtime, ID-porten og health checks
- [`test/`](https://github.com/navikt/tms-utkast-frontend/tree/main/test):
  separate enhets-, integrasjons-, responsive og tilgjengelighetstester
