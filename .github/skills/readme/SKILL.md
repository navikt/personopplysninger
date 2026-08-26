---
name: readme
description: "README og repo-dokumentasjon — faktisk stack, lokal kjøring, tester, deploy, NAIS-manifest, integrasjoner og eierskap. Brukes via /readme når dokumentasjon skal lages eller oppdateres."
---

# README-oppdatering for Nav-repoer

Bruk denne skillen når README skal opprettes eller oppdateres i et Nav-repo. README-en skal speile det repoet faktisk gjør i dag — ikke fylle ut en generisk mal.

## Steg 1: Les repoet først

Les faktiske kilder før du skriver én linje README:

1. **Eksisterende README** — bevar manuelt innhold, lenker, Slack-kanaler og stabile utviklingsdetaljer som lokal URL eller peker til discovery-kommandoer som fortsatt er riktige.
2. **Stack og bygg** — les `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `build.gradle.kts`, `pom.xml`, `Dockerfile` eller tilsvarende.
3. **NAIS-manifest** — les `.nais/` for miljøer, `ingresses`, databaser, Kafka, `accessPolicy`, TokenX/Azure/ID-porten og eventuelle eksterne avhengigheter.
4. **Kode** — les `src/`, `app/`, `server/`, `api/` eller tilsvarende for endepunkter, konsumenter, produsenter, databaser og frontend/backend-koblinger.
5. **CI/CD** — les `.github/workflows/` for workflow-navn som kan brukes i badge eller utviklingsseksjon.
6. **Docs** — les `docs/`, `README`-filer i undermapper og arkitektur-notater, og lenk heller enn å duplisere lange forklaringer.

Avklar minst dette før du skriver:

- Hva er repoets hovedformål?
- Hvilken repo-type er dette: frontend, backend, monorepo, library, dokumentasjon eller Naisjob?
- Hvilke miljøer finnes faktisk?
- Eksponerer repoet REST/GraphQL/API?
- Konsumerer eller produserer det Kafka?
- Hvilke andre apper/tjenester er sentrale?

## Steg 2: Velg relevante seksjoner

| Seksjon | Når | Hva du må hente fra repoet |
|---|---|---|
| Tittel + badges | Alltid | Repo-navn, workflow-navn, faktisk stack samt linter/formatter/testverktøy |
| Formålet med repoet | Alltid | Se Formål-seksjonen |
| Mermaid-diagram | Hvis integrasjoner, auth eller flyt mellom tjenester | Faktiske flyter: bruker, app, API, Kafka, DB, TokenX — velg bort diagram hvis en kort backend-liste er tydeligere |
| Miljølenker | Hvis frontend med deploy | `ingresses`, docs eller eksisterende README — inkluder demo-lenke når den finnes |
| Backend-API / backend-referanse | Hvis frontend | Se Backend-referanse-seksjonen |
| API-oversikt | Hvis repoet eksponerer API | Metode, sti, beskrivelse, auth-info |
| Kafka | Hvis consumer/producer | Topics, retning, lagring/videre publisering |
| Mikrofronter-tabell | Hvis monorepo | App-navn, backend, deploybar enhet |
| Utviklerverktøy (mise) | Hvis `.mise.toml`, `mise.toml` eller `.tool-versions` finnes | Verktøyversjoner, `mise install` og `mise tasks` for tilgjengelige oppgaver |
| Utvikling | Alltid | Kort seksjon nederst med stabil lokal URL, for eksempel `http://localhost:3000`, og hvor leseren finner ferske kommandoer. README skal ikke liste konkrete build/test/run-kommandoer som `./gradlew test` eller `pnpm dev`. Pek i stedet til repoets discovery-mekanisme — foretrekk `mise tasks` hvis `mise` finnes; ellers `pnpm run`, `make help` eller `./gradlew tasks` — slik at leseren kjører den selv og alltid ser oppdatert liste |
| Les mer | Hvis docs finnes | Lenker til `docs/`, arkitektur og workflow-dokumentasjon |
| For Nav-ansatte | Alltid | Kontaktlenke til team-Slack som siste seksjon i README, pluss eventuell intern team-info. For team min-side er `[#team-minside på Slack](https://nav-it.slack.com/app_redirect?channel=team-minside)` standard når ikke annet er kjent |

### Betingede råd

- **Frontend-repo:** prioriter miljølenker, backend-avhengigheter, lokal kjøring og hvordan appen nås.
- **Backend-repo:** prioriter API, Kafka, database, auth og hvordan andre tjenester kaller appen.
- **Monorepo:** vis struktur først, deretter tabell over delapper/mikrofronter og felles docs-lenker.
- **Dokumentasjons-repo:** prioriter innhold, struktur, navigasjon og lenker. Dropp build-, run- og testseksjoner når repoet bare er dokumentasjon.

## Steg 3: Generer eller oppdater

### Ved oppdatering

- Behold seksjoner som fortsatt er riktige.
- Oppdater bare foreldet innhold; ikke skriv om alt uten grunn.
- Bevar manuelle detaljer som Slack-kanaler, wiki-lenker og driftstips hvis de fortsatt stemmer.
- Hvis eksisterende README har nyttige seksjoner som ikke finnes i denne skillen, behold dem når de gir verdi.

### Tittelvalg

- Foreslå alltid 3 README-titler og spør brukeren via `ask_user` før du låser tittelen.
- Alternativ 1: app-/repo-navnet slik det er i dag.
- Alternativ 2: et domenenært forslag basert på hva appen faktisk gjør.
- Alternativ 3: et annet domenenært forslag med en annen vinkling, for eksempel mer brukerrettet eller mer teknisk.
- Alternativ 4: brukeren skriver en egen tittel.
- Begrunn kort valget: appnavn kan være kryptiske, mens en domenenær tittel gjør README-en forståelig på få sekunder for nye lesere.
- Ikke anta at app-/repo-navnet er beste tittel.

### Ved ny README

- Inkluder alltid: tittel, badges, formål, diagram og utvikling.
- Ta kun med seksjoner som repoet faktisk trenger.
- Bruk repoets egne navn på apper, topics, databaser og miljøer i innholdet.

### Kvalitetsregler

- Kognitiv trakt: tittel → formål/kontekst → integrasjoner/API → utvikling → meta. Lesere skanner ovenfra og ned.
- Ikke finn på miljølenker, topics, API-er eller Slack-kanaler.
- Ikke påstå auth-oppsett uten å ha sett det i kode eller manifest.
- Hvis info mangler for en "alltid"-seksjon, bevar eksisterende tekst eller spør brukeren.
- I utviklingsseksjonen: pek til repoets discovery-mekanisme for kommandoer. Foretrekk `mise tasks` hvis `mise` finnes; ellers `pnpm run`, `make help` eller `./gradlew tasks`. Ikke kopier konkrete build/test/run-kommandoer inn i README.
- Når du skriver eller forbedrer prosa i README, bruk `/klarsprak` for formålsbeskrivelse, utviklingsseksjon, kontaktseksjon og annen brukerrettet tekst.
- Skriv kort og konkret; README er inngangsport, ikke komplett internwiki.

## Anti-mønstre å se etter

- Template cargo-culting: kopiert mal uten tilpasning til faktisk repo.
- Zombie sections: utdaterte seksjoner som aldri fjernes.
- Badge wall: mer enn 5 badges på rad uten tydelig signalverdi.
- README bloat: over 500 linjer — splitt heller innholdet i docs.
- Command cargo-culting: kopierte build/test/run-kommandoer fra `mise`, `pnpm`-scripts, `Makefile` eller Gradle i stedet for å peke til discovery.
- Stale examples: kommandoer eller paths som ikke virker lenger.
- Aspirational docs: beskriver det som burde finnes, ikke det som finnes.
- Happy-path only: mangler feilhåndtering eller troubleshooting.

## Badges

Bruk badges som speiler faktisk stack og workflows. CI-badge med repoets workflow-navn:

```md
[![CI](https://github.com/navikt/<repo>/actions/workflows/<workflow>.yaml/badge.svg)](https://github.com/navikt/<repo>/actions/workflows/<workflow>.yaml)
```

Legg til teknologi-badges for repoets faktiske stack (shields.io med logo). Ta bare med det repoet bruker — ikke lag en komplett liste.

Sjekk minst disse kategoriene før du velger badges:

- **Framework/språk:** f.eks. React, Next.js, TypeScript, Kotlin, Spring Boot.
- **Linter/formatter:** f.eks. Biome, ESLint, Prettier, ktlint.
- **Tester:** f.eks. Vitest, Jest, Playwright, Cypress, JUnit.

## Mermaid-diagrammer

Tilpass diagrammet til repoets faktiske arkitektur, men velg format etter informasjonsbehov:

- **Bruk Mermaid** når README må forklare flyt mellom flere tjenester, auth-hop, Kafka eller databaser.
- **Bruk backend-endepunktliste i stedet** når en frontend hovedsakelig kaller 2–4 backender og leseren trenger konkrete referanser raskt.
- **Ikke ta med begge** uten tydelig grunn; velg det som gjør avhengighetene enklest å forstå.

Hvis du lager diagram:

- **Frontend:** vis bruker, frontend-app, backend, auth-hop som TokenX/cookies og eventuelle data- eller eksterne tjenester.
- **Backend:** vis Kafka-topics, backend-app, PostgreSQL, REST API og hvilke klienter som kaller API-et via TokenX eller Azure AD.
- **Monorepo / mikrofronter:** vis nav-dekoratøren, vertsapp, relevante mikrofronter og hvilke backender de kobler seg til.

## Backend-referanse-seksjonen

Når du dokumenterer backender for en frontend, bruk listeformat — ikke tabell og ikke kodeblokk:

```md
### [tms-min-side](https://github.com/navikt/tms-min-side)

Varsler, utkast og utbetalinger.

- **GET** `/api/varlser`
- **GET** `/api/utkast`
- **GET** `/api/utbetalinger`
```

Krav til format:

- Lenk til backend-repoet i overskriften.
- Beskriv kort hva tjenesten brukes til i denne frontendens kontekst.
- List endepunkter som `- **METHOD** \`/path\``.
- Ta bare med endepunkter eller kontrakter som faktisk er sentrale for brukerflatene.

## Formål-seksjonen

Formål skal forklare både produktet og brukerflatene:

- Hvem er hovedmålgruppene?
- Hvilke skjermbilder, oppgaver eller features bruker de?
- Hvis flere roller bruker samme app, beskriv kort hva som er forskjellig per rolle.

## Eksempler fra malrepoer

Bruk disse som mønstre, ikke som rigid mal:

- **`tms-min-side`**: kombiner CI- og teknologibadges med relevante lenker, formål-seksjon og Slack-info.
- **`narmesteleder-frontend`**: fremhev miljølenker, formål, backend-API og lokal utvikling for en enkelt frontend-app.
- **`aktivitetskrav-backend`**: vis backendens ansvar i diagrammet: Kafka inn/ut, database, API og hvilke klienter som kaller den via TokenX/Azure.

Lån strukturgrepene, men fyll dem med repoets egne navn, lenker og integrasjoner.

## Grafana og observability

Hvis repoet har dashboards, lenk til dem i README. Nav bruker `https://grafana.nav.cloud.nais.io/` med team-spesifikke dashboards. Sjekk `.nais/`-manifest eller eksisterende README for dashboard-URLer — ikke konstruer URLer du ikke har verifisert.

## Grenser

### Alltid

- Les faktisk repo-innhold før du skriver README.
- Kryssjekk README-tekst mot kode, `.nais/` og workflows.
- Bevar manuelt innhold som fortsatt er riktig.
- Tilpass seksjoner til frontend, backend eller monorepo.
- Beskriv auth og integrasjoner med Nav-kontekst når de finnes: TokenX, `accessPolicy`, Kafka-topics, databaser.

### Spør først

- Hvis du må gjette på miljølenker, Slack-kanal eller teamnavn.
- Hvis README mangler viktig produktkontekst som ikke kan utledes fra repoet.
- Hvis du vurderer å fjerne store manuelle seksjoner som kan være bevisst skrevet.
- Hvis flere backender eller deploy-mål gjør strukturen tvetydig.

### Aldri

- Skriv en generisk README uten å lese repoet.
- Finn på API-er, topics, dashboards, auth eller miljøer.
- Overskriv manuelt innhold ukritisk.
- Dokumenter "ønsket fremtid" som om den allerede er implementert.
- Lær bort generell Markdown- eller Mermaid-syntax i README-skillen.