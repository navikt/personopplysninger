# Rollback for flyttingen til min-side (#645)

Personopplysninger flyttes fra to Nais-apper (offentlig i `personbruker`, intern i `min-side`) til én app
`personopplysninger` i `min-side`, deployet med felles `astro-deploy-v1`. Flyttingen skjer i tre steg:

| Steg | Endring | Offentlig `www.nav.no` | Intern `www.intern.nav.no` |
| --- | --- | --- | --- |
| A | Ny pipeline, runtime-konfig, `nais/{dev-gcp,prod-gcp}` | Legacy-app i `personbruker` (uendret) | Ny app (canary) |
| B | Offentlig ingress legges til ny app (legacy kjører videre som reserve) | Ny app | Ny app |
| C | Legacy-app, `.nais/` og rollback-workflow slettes | Ny app | Ny app |

Mellom A og B kan legacy-appen ikke bygges på nytt (felles workflow bygger kun for `min-side` og krever
`pnpm-lock.yaml`). Offentlig prod står derfor på siste legacy-image til B er gjennomført.

I dev-gcp gjøres samme flytting før steg A merges: den nye appen deployes fra en `dev-*`-branch mens
legacy-appen i `personbruker` fortsatt har ingressen, og legacy-appen slettes etterpå. Dev har ingen
rollback utover å deploye en tidligere branch.

## Siste legacy-image

| App | Image | Commit |
| --- | --- | --- |
| Offentlig (`personbruker`) | `europe-north1-docker.pkg.dev/nais-management-233d/personbruker/personopplysninger-release-main:2026.10.16-08.58-9215052` | `9215052d` |
| Intern (`min-side`) | Ikke registrert i dette repoets workflow-historikk. Hentes fra Nais Console ved behov. | `aa20f9ee` (2025-08-11) |

## Etter steg A: canary feiler på intern ingress

Offentlig prod er ikke berørt. Velg én av:

1. Fiks fremover på `main` (deployes automatisk til `prod-gcp`).
2. Revert PR A på `main`. Merk at den gamle interne pipelinen ikke kommer tilbake på en nyttig måte,
   så for å få tilbake den gamle interne appen må imaget hentes fra Nais Console og deployes med
   rollback-workflowen (`target: intern`).

## Etter steg B: ny app feiler på offentlig ingress

Steg B legger `https://www.nav.no/person/personopplysninger` til den nye appen mens legacy-appen i
`personbruker` fortsatt kjører med samme ingress. Nais stopper ikke to apper fra å deklarere samme
ingress. Da dette ble testet i dev, gikk alle forespørsler til den sist deployede appen. Legacy-appen
beholdes til steg C, slik at den kan ta over igjen.

Mens legacy-appen fortsatt finnes:

1. Fjern `https://www.nav.no/person/personopplysninger` fra `nais/prod-gcp/nais.yaml` og merg til `main`.
2. Når deployen er ferdig, svarer legacy-appen alene på ingressen. Hvis den ikke gjør det (f.eks. fordi
   den er skalert ned), redeploy den med siste legacy-image:

   ```sh
   gh workflow run legacy-rollback.yml -R navikt/personopplysninger \
     -f target=public \
     -f image=europe-north1-docker.pkg.dev/nais-management-233d/personbruker/personopplysninger-release-main:2026.10.16-08.58-9215052
   ```

3. Verifiser at `https://www.nav.no/person/personopplysninger/nb/` laster legacy-appen (assets fra
   `/person/personopplysninger/_astro/`, ikke fra `cdn.nav.no/min-side`).

Hvis legacy-appen allerede er slettet: kjør først steg 2, deretter steg 1. Det gir et par minutter
med overlapp i stedet for nedetid.

## Etter steg C

Legacy-appen og `.nais/` er slettet. Rollback er da å deploye et tidligere image av den nye appen
(revert på `main`, eller redeploy av en tidligere `Deploy main`-kjøring).
