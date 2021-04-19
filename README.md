# Personopplysninger

![Deploy-to-prod](https://github.com/navikt/personopplysninger/workflows/Deploy-to-prod/badge.svg) | ![Deploy-to-dev](https://github.com/navikt/personopplysninger/workflows/Deploy-to-dev/badge.svg)

React applikasjon som skal gi brukeren innsikt i informasjonen NAV har lagret.

## Komme i gang

Hent repoet fra github

```
git clone https://github.com/navikt/personopplysninger.git
```

Installer nødvendige pakker:

```
npm install
```

Kopier environment-variabler fra eksempel-filen:

```
cp .env.sample .env
```

Start dekoratøren og mocks

```
docker login docker.pkg.github.com -u GITHUB_USERNAME -p GITHUB_PERSONAL_ACCESS_TOKEN
docker-compose up -d
```

Start applikasjonen lokalt:

```
npm start
```

## Mock-serveren

Ved enkelte post-kall vil mock-serveren alltid returnere en feilet case. Se feks /clients/apiMock/app/post/endre-kontonr.json. For å teste andre TPS-svar, endre denne json tilsvarende.

## Feature toggles

Personopplysninger benytter Unleash til å skru av og på funksjonalitet som er under utvikling.<br>
https://unleash.nais.io

## Deployering

- Dev - Tag på formatet `vX.X.X-dev`.
- Prod - Tag på formatet `vX.X.X-prod`.

Push den nye versjonen til GitHub og merge til master.

```
git push && git push --tags
```

## Logging

Feil ved API-kall blir logget via frontendlogger og vises i Kibana<br>
[https://logs.adeo.no](https://logs.adeo.no/app/kibana#/discover/ad01c200-4af4-11e9-a5a6-7fddb220bd0c)

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.
