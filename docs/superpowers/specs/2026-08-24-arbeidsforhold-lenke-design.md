# Erstatt arbeidsforholdinnsyn med lenke

## Mål

Personopplysninger skal ikke lenger hente og vise arbeidsforhold fra Aa-registeret. Den eksisterende bolken
«Arbeidsforhold» skal i stedet forklare kort hvor opplysningene finnes og lenke til Team arbeidsforholds nye
innsynsløsning for arbeidstakere.

Endringen avgrenses til `personopplysninger`-frontend. Fjerning av arbeidsforhold-backend, endelig URL-struktur og
Nav.no-redirects håndteres utenfor denne leveransen.

## Vurderte alternativer

1. **Behold bolken «Arbeidsforhold» og erstatt innholdet med én lenke (valgt).** Bevarer sidens informasjonsarkitektur
   og eksisterende ankerlenker, samtidig som duplisering unngås.
2. **Vis lenken både i «Arbeidsforhold» og «Flere opplysninger om deg».** Kan være nyttig i en overgang, men gir
   duplisert innhold og to steder som må vedlikeholdes.
3. **Flytt lenken til «Flere opplysninger om deg».** Gir mindre innhold på forsiden, men bryter etablerte ankerlenker
   og gjør arbeidsforhold vanskeligere å finne for brukere som kjenner dagens plassering.

## Frontenddesign

`Arbeidsforhold.tsx` beholder dagens `Box`, ikon, overskrift og anker-ID. Den innebygde listen, infovarselet og
kildevisningen fjernes. Bolken viser i stedet:

- en kort, oversatt forklaring om at opplysninger om arbeidsforhold finnes i Aa-registerets nye innsynsløsning
- en tydelig ekstern lenke med beskrivende lenketekst og et dekorativt eksternlenkeikon

Lenken åpnes i samme fane, i tråd med vanlig navigasjon til andre Nav-tjenester. URL-en leveres gjennom
`VITE_ARBEIDSFORHOLD_URL`, slik at endelig URL eller senere redirect-endringer kan håndteres uten komponentendringer.
Inntil Team arbeidsforhold og Team Nav.no avklarer annet, brukes den offentlige Nav-adressen
`https://www.nav.no/aa-registeret/arbeidsforhold`.

Tekstene oppdateres samlet på bokmål, nynorsk og engelsk. Gamle tekster for datakilde, detaljliste og ansvarsfraskrivelse
fjernes når de ikke lenger har en brukerflate.

## Ruter og avhengigheter

Frontendintegrasjonen mot `@navikt/arbeidsforhold` fjernes:

- pakke- og CSS-import
- lokal mock-initialisering
- detaljsiden for arbeidsforhold
- detaljsidens Less-import
- npm-avhengigheten og tilhørende lockfile-oppføringer

Eksisterende lokale URL-er under `/arbeidsforhold` beholdes som kompatibilitetsruter som navigerer tilbake til
`#arbeidsforhold` på Personopplysninger-forsiden. Eksterne redirects til den nye løsningen legges ikke inn før
URL-strukturen er avklart.

`docker-compose.yml` og arbeidsforhold-backenden endres ikke i denne frontendleveransen.

## Feilhåndtering og tilgjengelighet

Deploy-workflowene må alltid levere `VITE_ARBEIDSFORHOLD_URL`; lokal eksempelkonfigurasjon oppdateres samtidig.
Lenketeksten skal beskrive målet uten å være avhengig av omkringliggende tekst. Ikonet skjules for skjermlesere, og
overskrift/ankerstruktur beholdes.

## Testing

- En komponenttest verifiserer overskrift, forklaring, lenketekst og korrekt `href`.
- Eksisterende testpakke kjøres for å avdekke utilsiktede regresjoner.
- Lint og produksjonsbygg verifiserer at alle pakke-, CSS- og ruteimporter er fjernet.
