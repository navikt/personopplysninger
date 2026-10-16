# Personopplysninger

![Deploy main](https://github.com/navikt/personopplysninger/actions/workflows/deploy-main.yaml/badge.svg)

React applikasjon som skal gi brukeren innsikt i informasjonen Nav har lagret.

## Komme i gang

Hent repoet fra github

`git clone https://github.com/navikt/personopplysninger.git`

Installer nødvendige pakker (pnpm 10, Node 24):

`pnpm install`

Start applikasjonen lokalt:

```shell
pnpm dev
```

`pnpm dev` starter Astro på port 4321 og en separat Hono-server på port 3007.
Astro videresender `/api` til Hono-serveren, slik at nettleseren fortsatt bruker
samme origin. Dekoratøren hentes fra dev-miljøet, så lokal kjøring krever ikke
Docker Compose. Miljøvariablene har lokale standardverdier i `astro.config.mjs`.

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

Vitest-tester ligger under `/src/__tests__` og kjøres med `pnpm test`. Playwright-tester
for Astro-rutene ligger under `/test/integration` og kjøres med `pnpm test:e2e`.
Kjør `pnpm test:e2e:install` første gang, eller når
Playwright-versjonen oppdateres.

#### Snapshot-tester

En del av testene er snapshot-tester. Hensikten med disse testene er å avdekke utilsiktede endringer i UIet. En typisk
snapshot test rendrer en komponent, tar et snapshot og sammenligner dette med en referanse-snapshot som er lagret i
repoet. Testen vil feile dersom de to snapshotene ikke er like. Man kan oppdatere snapshotet i repoet ved å kjøre
kommandoen `pnpm test -u`.

## Deployering

Appen bygges og deployes med felles workflow fra
[navikt/tms-deploy](https://github.com/navikt/tms-deploy) (`astro-deploy-v1`). Samme image kjører i alle
miljøer; miljøverdiene settes i `nais/<cluster>/nais.yaml` og leses ved kjøring.

### Dev

Dev er ett delt miljø. Sjekk hva som kjører før du deployer:

```shell
gh run list --workflow=deploy-dev.yaml
gh workflow run deploy-dev.yaml --ref <branch>
```

En push til en branch som starter med `dev-` deployer også til dev.

### Prod

Merge til `main` deployer til `prod-gcp`. Se [docs/rollback-645.md](docs/rollback-645.md) for rollback
mens flyttingen til min-side pågår.

## Logging

Serveren logger JSON via `@navikt/astro-logger`. Feil i nettleseren sendes til Grafana Faro.

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/min-side

## For Nav internt

Interne henvendelser kan sendes via Slack i kanalen #team-minside.
