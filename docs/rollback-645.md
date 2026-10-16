# Rollback for flyttingen til min-side (#645)

Personopplysninger flyttes fra to Nais-apper (offentlig i `personbruker`, intern i `min-side`) til én app
`personopplysninger` i `min-side`, deployet med felles `astro-deploy-v1`. Flyttingen skjer i tre steg:

| Steg | Endring | Offentlig `www.nav.no` | Intern `www.intern.nav.no` |
| --- | --- | --- | --- |
| A | Ny pipeline, runtime-konfig, `nais/{dev-gcp,prod-gcp}` | Legacy-app i `personbruker` (uendret) | Ny app (canary) |
| B | Offentlig ingress flyttes til ny app | Ny app | Ny app |
| C | Legacy-app, `.nais/` og rollback-workflow slettes | Ny app | Ny app |

Mellom A og B kan legacy-appen ikke bygges på nytt (felles workflow bygger kun for `min-side` og krever
`pnpm-lock.yaml`). Offentlig prod står derfor på siste legacy-image til B er gjennomført.

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

Rekkefølgen er viktig: Nais stopper ikke to apper fra å deklarere samme ingress, og hva HAProxy gjør
da er udefinert. Fjern alltid ingressen fra den ene appen før den andre får den.

1. Fjern `https://www.nav.no/person/personopplysninger` fra `nais/prod-gcp/nais.yaml` og merg til `main`
   (deployes til `prod-gcp`). Vent til deployen er ferdig.
2. Deploy legacy-appen med siste legacy-image:

   ```sh
   gh workflow run legacy-rollback.yml -R navikt/personopplysninger \
     -f target=public \
     -f image=europe-north1-docker.pkg.dev/nais-management-233d/personbruker/personopplysninger-release-main:2026.10.16-08.58-9215052
   ```

3. Verifiser at `https://www.nav.no/person/personopplysninger/nb/` sender til innlogging og at siden
   laster etter innlogging.

Brukerne får 404 i tiden mellom steg 1 og 2 (typisk et par minutter).

## Etter steg C

Legacy-appen og `.nais/` er slettet. Rollback er da å deploye et tidligere image av den nye appen
(revert på `main`, eller redeploy av en tidligere `Deploy main`-kjøring).
