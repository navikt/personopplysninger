# Personopplysninger

![Deploy main](https://github.com/navikt/personopplysninger/actions/workflows/deploy-main.yaml/badge.svg)

React-applikasjon (kjørt som en Astro-app) som skal gi brukeren innsikt i informasjonen Nav har lagret.

Appen er bygget med [Astro](https://astro.build) i standalone/server-modus. Den eksisterende React
Router-applikasjonen kjører fortsatt som en `client:only="react"`-øy under Astro, mens Astro selv eier
HTML-skallet, i18n-ruting, dekoratør-henting og health-endepunktene. Ett og samme bygde image deployes
til både den offentlige (`personbruker`) og den interne (`min-side`) Nais-applikasjonen; forskjellen mellom
dem er kun miljøvariabler satt i `nais/prod-gcp/nais.yaml` og `nais/prod-gcp/intern.yaml`, lest server-side ved forespørsel.

## Komme i gang

Hent repoet fra github

`git clone https://github.com/navikt/personopplysninger.git`

Installer nødvendige pakker ([pnpm](https://pnpm.io) 10+):

`pnpm install`

Kopier environment-variabler fra eksempelfilen:

```
cp .env.sample .env
```

Start applikasjonen lokalt:

```shell
pnpm dev
```

`pnpm dev` starter Astro sin dev-server på port 3006 og en separat Hono-server på port 3007.
Astro videresender `/api` til Hono-serveren, slik at nettleseren fortsatt bruker samme origin.
Dekoratøren hentes fra dev-miljøet, så lokal kjøring krever ikke Docker Compose.

## Mock-serveren

Mockdata ligger i `src/mocks/fixtures`, og rutene er definert i
`src/mocks/app.ts`. Mock-serveren kan startes separat med `pnpm dev:mocks`.

Legg til `scenario=empty` eller `scenario=error` på et mock-endepunkt for å
teste tomme data eller feil. `delay=<millisekunder>` overstyrer den
endepunktspesifikke forsinkelsen, for eksempel:

```text
/api/personalia?scenario=error&delay=0
```

## Tester

Enhets- og komponenttester ligger under `/src/__tests__` og kjøres med `pnpm test`
(Vitest, via Astro sin `getViteConfig`).

Playwright-tester (smoke, responsivt design, tilgjengelighet) ligger under `/e2e` og kjøres med
`pnpm test:e2e`. Første gang må nettlesere installeres: `pnpm exec playwright install --with-deps chromium`.

#### Snapshot-tester

En del av testene er snapshot-tester. Hensikten med disse testene er å avdekke utilsiktede endringer i UIet. En typisk
snapshot test rendrer en komponent, tar et snapshot og sammenligner dette med en referanse-snapshot som er lagret i
repoet. Testen vil feile dersom de to snapshotene ikke er like. Man kan oppdatere snapshotet i repoet ved å kjøre
kommandoen `pnpm test -- -u`.

## Bygg og forhåndsvisning

```shell
pnpm build    # astro check && astro build -> dist/
pnpm preview  # bygger og starter den ferdige serveren lokalt på port 3000
```

## Deployering

Deploy skjer via det delte, gjenbrukbare workflowet
[`navikt/tms-deploy/.github/workflows/astro-deploy-v1.yaml`](https://github.com/navikt/tms-deploy),
pinnet til en immutable commit-SHA i `.github/workflows/deploy-*.yaml`.

### Dev

Kjør workflowet `Deploy dev` manuelt (`workflow_dispatch`) fra Actions-fanen, eller via
[GitHub CLI](https://cli.github.com/):

`gh workflow run deploy-dev.yaml`

### Prod

- Lag en PR til main, og merge inn etter godkjenning.
- `main`-workflowet (`Deploy main`) bygger ett image og deployer det til **både** dev-gcp og prod-gcp.
  Den interne `min-side`-applikasjonen deployes deretter fra `nais/prod-gcp/intern.yaml` med det samme
  imaget, i en separat Nais-operasjon med riktig teamtilgang.

#### Om semver

`pnpm version patch` vil bumpe versjon fra feks v1.1.1 til v1.1.2. Diskuter med teamet om versjonen er en minor eller kun en patch. Hvis minor bruker du `pnpm version minor` istedet. Du kan lese mer på [semver.org](https://semver.org/)

## Logging

Feil ved API-kall blir logget via frontendlogger og vises i Kibana<br>
[https://logs.adeo.no](https://logs.adeo.no/app/kibana#/discover/ad01c200-4af4-11e9-a5a6-7fddb220bd0c)

Astro sine egne bygge- og serverlogger skrives via `@navikt/astro-logger`.

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/min-side

## For Nav internt

Interne henvendelser kan sendes via Slack i kanalen #team-minside.
