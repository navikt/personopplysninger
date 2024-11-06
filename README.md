# Personopplysninger

![Deploy-to-prod](https://github.com/navikt/personopplysninger/workflows/Deploy-to-prod/badge.svg) | ![Deploy-to-dev](https://github.com/navikt/personopplysninger/workflows/Deploy-to-dev/badge.svg)

React applikasjon som skal gi brukeren innsikt i informasjonen Nav har lagret.

## Komme i gang

Hent repoet fra github

`git clone https://github.com/navikt/personopplysninger.git`

Installer nødvendige pakker:

`npm install`

Kopier environment-variabler fra eksempel-filen:

''`
cp .env.sample .env
''`

Start dekoratøren og mocks:
Autentiser på Github container-registry hvis du ikke har gjort det allerede
(Merk: --password-stdin hindrer at access token havner i diverse logger):

`echo DIN_GITHUB_ACCESS_TOKEN | docker login docker.pkg.github.com -u DITT_GITHUB_BRUKERNAVN --password-stdin`

Start dekoratøren og mocks:

`docker-compose up -d`

Start applikasjonen lokalt:

`npm start`

## Mock-serveren

Ved enkelte post-kall vil mock-serveren alltid returnere en feilet case. Se feks
/clients/apiMock/app/post/endre-kontonr.json. For å teste andre TPS-svar, endre denne json tilsvarende.

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

Deploy til prod trigges når du publiserer en ny versjon. Husk å skrive en kort beskrivelse slik at det er enkelt å sporte endringer historisk fra én versjon til en annen.

1. Opprett PR og be om review fra en kollega.
2. Merge godkjent PR inn i master.
3. `npm version [minor | patch] -m "%s: Noen få ord om endringene som er gjort."`
4. Gå til repoet og publiser en ny release _eller_ bruk kommandolinjen: `gh release create vx.x.x -t "Tittel på release"`

#### Om semver

`npm version patch` vil bumpe versjon fra feks v1.1.1 til v1.1.2. Diskuter med teamet om versjonen er en minor eller kun en patch. Hvis minor bruker du `npm version minor` istedet. Du kan lese mer på [semver.org](https://semver.org/)

## Logging

Feil ved API-kall blir logget via frontendlogger og vises i Kibana<br>
[https://logs.adeo.no](https://logs.adeo.no/app/kibana#/discover/ad01c200-4af4-11e9-a5a6-7fddb220bd0c)

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/personbruker

## For Nav internt

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.
