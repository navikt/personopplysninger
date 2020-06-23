# Personopplysninger

![Deploy-to-prod](https://github.com/navikt/personopplysninger/workflows/Deploy-to-prod/badge.svg) <br>
![Deploy-to-q0](https://github.com/navikt/personopplysninger/workflows/Deploy-to-q0/badge.svg)
![Deploy-to-q1](https://github.com/navikt/personopplysninger/workflows/Deploy-to-q1/badge.svg)
![Deploy-to-q2](https://github.com/navikt/personopplysninger/workflows/Deploy-to-q2/badge.svg)
![Deploy-to-q6](https://github.com/navikt/personopplysninger/workflows/Deploy-to-q6/badge.svg)

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

Start dekoratøren og mocks

```
docker-compose up -d
```

Start applikasjonen lokalt:

```
npm start
```

## Feature toggles

Personopplysninger benytter Unleash til å skru av og på funksjonalitet som er under utvikling.<br>
https://unleash.nais.adeo.no/#/features<br>
Obs: Unleash er kun tilgjengelig i fagsystemsonen.

## Deployering

- Q6: Tag på formatet `vX.X.X-dev`.
- Q1, Q2, Q6: Tag på formatet `vX.X.X-test`.
- Q0, PROD: Tag på formatet `vX.X.X`.

## Logging

Feil ved API-kall blir logget via frontendlogger og vises i Kibana<br>
[https://logs.adeo.no](https://logs.adeo.no/app/kibana#/discover/ad01c200-4af4-11e9-a5a6-7fddb220bd0c)

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.
