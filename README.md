[![CircleCI](https://circleci.com/gh/navikt/personopplysninger.svg?style=svg)](https://circleci.com/gh/navikt/personopplysninger)
[![Maintainability](https://api.codeclimate.com/v1/badges/1a17b576c58daeb8bbc0/maintainability)](https://codeclimate.com/github/navikt/personopplysninger/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1a17b576c58daeb8bbc0/test_coverage)](https://codeclimate.com/github/navikt/personopplysninger/test_coverage)

# Personopplysninger

Applikasjon som skal gi brukeren innsikt i informasjonen NAV har lagret om personen.

## Komme i gang

Installer nødvendige pakker:

- `npm install`

For å kjøre opp app-en i dev:

- `npm run start`

For å kjøre tester:

- `npm run test`

Bygge/kjøre med docker:

1.  `npm run docker-build`
2.  `npm run docker-start`
3.  `npm run docker-stop`
4.  For å bygge på nytt: `npm run docker-rm && npm run docker-build`

## Bygg / CI

https://ci.adeo.no/job/team_personbruker/job/personopplysninger

1. Jenkins vil automatisk bygge prosjektet til Q6. <br>
2. Klikk på "-promotering-q0-" for å deployere fra Q6 ⇨ Q0
3. Klikk på "-release-" for å deployere fra Q0 ⇨ Produksjon

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.
