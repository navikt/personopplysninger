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

`pnpm dev` starter Astro på port 4321. Mock-API-et serveres av samme dev-server
under `/api` med `@navikt/astro-mocks`, både for nettleseren og for sider som
henter data på serveren (der brukes et falskt token i stedet for TokenX). Dekoratøren hentes fra dev-miljøet, så lokal kjøring krever ikke
Docker Compose. Miljøvariablene har lokale standardverdier i `astro.config.mjs`.

## Mock-API

Mockdata ligger i `src/mocks/fixtures`, og rutene er definert i
`src/mocks/mocks.ts`. Mockene finnes bare i `astro dev`, aldri i bygget.

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

## Omdirigering fra andre tjenester

Noen få tjenester kan sende brukeren til Personopplysninger for endring av kontaktinformasjon og kontonummer.
Brukeren ser da en knapp med beskrivelse som sender han/henne tilbake til den opprinnelige tjenesten.

1. Legg til tjenesten i `redirects` i `src/utils/redirects.ts`
2. Send brukeren til `https://www.nav.no/person/personopplysninger/endre-opplysninger/sendt-fra/[KEY]/[REDIRECT_URL]`

Beskrivelsen og teksten på knappen bestemmes av `[KEY]`. Lenken tilbake settes fra `[REDIRECT_URL]`, som må være URL-enkodet. Eksempel:

```text
https://www.ansatt.dev.nav.no/person/personopplysninger/nb/endre-opplysninger/sendt-fra/skjema/alderspensjonssoknad/https%3A%2F%2Fwww.nav.no%2Fpselv%2Ftransaksjon%2Fminprofil.jsf
```

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

Merge til `main` deployer til `prod-gcp`. Appen svarer på både `www.nav.no` og `www.intern.nav.no`.
Rollback: revert på `main`, eller kjør en tidligere `Deploy main` på nytt.

## Logging

Serveren logger JSON via `@navikt/astro-logger`. Feil i nettleseren sendes til Grafana Faro.

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/min-side

## For Nav internt

Interne henvendelser kan sendes via Slack i kanalen #team-minside.
