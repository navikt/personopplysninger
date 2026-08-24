# Erstatt arbeidsforholdinnsyn med lenke

## Mål

Personopplysninger skal ikke lenger hente og vise arbeidsforhold fra Aa-registeret. Den eksisterende bolken
«Arbeidsforhold» skal i stedet forklare kort hvor opplysningene finnes og lenke til Team arbeidsforholds nye
innsynsløsning for arbeidstakere.

Endringen avgrenses til `personopplysninger`-frontend. Fjerning av arbeidsforhold-backend, endelig URL-struktur og
Nav.no-redirects håndteres utenfor denne leveransen.

## Frontenddesign

`Arbeidsforhold.tsx` beholder dagens `Box`, ikon, overskrift og anker-ID. Den innebygde listen, infovarselet og
kildevisningen fjernes. Bolken viser i stedet:

- en kort, oversatt forklaring om at opplysninger om arbeidsforhold finnes i Aa-registerets nye innsynsløsning
- en tydelig ekstern lenke med beskrivende lenketekst og et dekorativt eksternlenkeikon

Lenken åpnes i samme fane. Lenken bruker følgende prioritet:

1. `VITE_ARBEIDSFORHOLD_URL` når variabelen finnes og ikke er tom
2. den kanoniske standardadressen `https://www.nav.no/aa-registeret/arbeidsforhold` når variabelen mangler eller er tom

Dette gjør at forsiden fortsatt fungerer uten render-time throw ved manglende miljøvariabel.

## Ruting og avhengigheter

Frontendintegrasjonen mot `@navikt/arbeidsforhold` fjernes, inkludert pakkeavhengighet, detaljside og gamle interne
arbeidsforhold-ruter.

Alle interne arbeidsforhold-ruter er fjernet. Tidligere stier under
`/person/personopplysninger/{locale}/arbeidsforhold` og `/person/personopplysninger/{locale}/arbeidsforhold/:id`
skal treffe frontendens standard 404-side.

For å unngå transient 404 når locale settes inn på locale-løse inngangsstier, avgrenses catch-all-ruten i `App.tsx`
til `${basePathWithLanguage}/*` i stedet for global `*`. Dermed kan `RedirectToLocale` navigere til canonical
locale-sti uten at 404 vises i mellomtiden.

`docker-compose.yml` og arbeidsforhold-backenden endres ikke i denne frontendleveransen.

## Feilhåndtering og tilgjengelighet

Lenketeksten skal beskrive målet uten å være avhengig av omkringliggende tekst. Ikonet skjules for skjermlesere, og
overskrift/ankerstruktur beholdes.

Manglende `VITE_ARBEIDSFORHOLD_URL` behandles med trygg fallback til kanonisk URL, ikke med hard feiling.

## Testing

- `src/__tests__/forside/Arbeidsforhold.test.tsx` verifiserer både:
    - at en ikke-tom `VITE_ARBEIDSFORHOLD_URL` overstyrer standardverdien
    - at tom/manglende verdi faller tilbake til `https://www.nav.no/aa-registeret/arbeidsforhold`
- `src/__tests__/App.test.tsx` verifiserer både:
    - at locale-løs inngangssti redirecter til locale-sti uten at 404 rendres underveis
    - at tidligere locale-kvalifiserte `/arbeidsforhold`- og `/arbeidsforhold/:id`-stier rendrer standard 404
- Full test, lint og build kjøres for regresjonskontroll.
