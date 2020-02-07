[![Github](https://github.com/navikt/personopplysninger/workflows/Deploy%20to%20prod/badge.svg)](https://github.com/navikt/personopplysninger/actions)

# Personopplysninger

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
