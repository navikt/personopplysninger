# Personopplysninger

![Deploy-to-prod](https://github.com/navikt/personopplysninger/workflows/Deploy-to-prod/badge.svg) | ![Deploy-to-dev](https://github.com/navikt/personopplysninger/workflows/Deploy-to-dev/badge.svg)

React applikasjon som skal gi brukeren innsikt i informasjonen Nav har lagret.

## Komme i gang

Hent repoet fra github

`git clone https://github.com/navikt/personopplysninger.git`

Installer nødvendige pakker:

`npm install`

Kopier environment-variabler fra eksempelfilen:

```
cp .env.sample .env
```

Start applikasjonen lokalt:

```shell
npm start
```

`npm start` starter Vite på port 3006 og en separat Hono-server på port 3007.
Vite videresender `/api` til Hono-serveren, slik at nettleseren fortsatt bruker
samme origin. Dekoratøren hentes fra dev-miljøet, så lokal kjøring krever ikke
Docker Compose.

## Mock-serveren

Mockdata ligger i `src/mocks/fixtures`, og rutene er definert i
`src/mocks/app.ts`. Mock-serveren kan startes separat med `npm run start:mocks`.

Legg til `scenario=empty` eller `scenario=error` på et mock-endepunkt for å
teste tomme data eller feil. `delay=<millisekunder>` overstyrer den
endepunktspesifikke forsinkelsen, for eksempel:

```text
/api/personalia?scenario=error&delay=0
```

## Tester

Tester ligger under `/src/__tests__`. Disse kan kjøres med kommandoen `npm test`.

#### Snapshot-tester

En del av testene er snapshot-tester. Hensikten med disse testene er å avdekke utilsiktede endringer i UIet. En typisk
snapshot test rendrer en komponent, tar et snapshot og sammenligner dette med en referanse-snapshot som er lagret i
repoet. Testen vil feile dersom de to snapshotene ikke er like. Man kan oppdatere snapshotet i repoet ved å kjøre
kommandoen `npm test -- -u`.

## Deployering

Merk: Bruk develop-branchen når vi deployer til dev.

### Dev

1. Opprett en PR mot develop. Sett den gjerne til DRAFT hvis du vil signalisere at den ikke er klar for test.
2. Besøk https://github.com/navikt/personopplysninger/actions
3. Velg workflow `Deploy-to-web`, velg develop-branchen og deretter `Run workflow`.

_eller_

Benytt [Github CLI](https://cli.github.com/) for å deploye via kommandolinjen:

`gh workflow run workflow_dispatch -b develop`

### Prod

- Lag en PR til main, og merge inn etter godkjenning (En automatisk release vil oppstå ved deploy til main)

#### Om semver

`npm version patch` vil bumpe versjon fra feks v1.1.1 til v1.1.2. Diskuter med teamet om versjonen er en minor eller kun en patch. Hvis minor bruker du `npm version minor` istedet. Du kan lese mer på [semver.org](https://semver.org/)

## Logging

Feil ved API-kall blir logget via frontendlogger og vises i Kibana<br>
[https://logs.adeo.no](https://logs.adeo.no/app/kibana#/discover/ad01c200-4af4-11e9-a5a6-7fddb220bd0c)

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/min-side

## For Nav internt

Interne henvendelser kan sendes via Slack i kanalen #team-minside.
