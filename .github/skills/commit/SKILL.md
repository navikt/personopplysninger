---
name: commit
description: "Commit-meldinger etter conventional commits-standarden — scopes, breaking change-format og kort norsk oppsummering. Brukes via /commit ved commit eller commit-melding."
---

# Conventional commit

Generer commit-meldinger etter Conventional Commits-spesifikasjonen, tilpasset Nav-prosjekter.

## Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

## Typer

| Type | Brukes når |
|---|---|
| `feat` | Ny funksjonalitet |
| `fix` | Bugfiks |
| `docs` | Kun dokumentasjonsendringer |
| `style` | Formatering, semikolon osv. (ingen kodeendring) |
| `refactor` | Kode som verken fikser en bug eller legger til en feature |
| `perf` | Ytelsesendringer |
| `test` | Legge til eller fikse tester |
| `build` | Endringer i build-system eller avhengigheter |
| `ci` | Endringer i CI-konfigurasjon |
| `chore` | Andre endringer som ikke påvirker kode |

## Nav-relevante scopes

Scopes følger vertikale slices under `src/features/*` (f.eks. `utbetaling`,
`innboks`, `dokumenter`, `din-oversikt`, `personalia`, `aktuelt`,
`alert-island`, `innloggede-tjenester`) og delt infrastruktur
(`auth`/`middleware`, `microfrontend`, `layout`, `mock`, `deps`, `nais`).

```
feat(utbetaling): støtt opptil 4 utbetalinger i widget
fix(auth): fiks token-validering for TokenX i middleware
docs(readme): oppdater lokal kjøring med pnpm
refactor(locale): introduser getLocale-hjelper for currentLocale
test(innboks): legg til test for InnboksFallback
build(deps): oppgrader Astro til 7.0.9
ci(deploy): legg til prod-deploy steg
perf(microfrontend): unngå dobbelt fetch ved fallback
chore(nais): oppdater ressursgrenser
```

## Breaking changes

```
feat(microfrontend)!: endre audience-format for OBO-exchange

BREAKING CHANGE: getAudience returnerer nå `cluster:namespace:app`.
Kallende features må oppdatere sin bruk.
```

## Regler

- Første linje: maks 72 tegn
- Bruk imperativ: "add", ikke "added" eller "adds"
- Ikke avslutt med punktum
- Bruk norsk eller engelsk konsekvent i prosjektet
- Referer til GitHub-issue i footer: `Closes #123`
- Ta alltid med `Co-authored-by`-trailer for Copilot

## Arbeidsflyt

### 1. Analyser staged changes

```bash
git diff --cached --stat        # Overview of changed files
git diff --cached               # Detailed diff
```

### 2. Finn type og scope

Basert på diff-en:
1. Identifiser **type** (feat/fix/refactor/etc.)
2. Identifiser **scope** (hvilket modul- eller domeneområde)
3. Skriv en kort og presis beskrivelse

### 3. Skriv commit-melding

```bash
git commit -m "type(scope): kort beskrivelse" \
  -m "Utdypende forklaring hvis nødvendig." \
  -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

### 4. Flere logiske endringer

Hvis staged changes inneholder flere logiske endringer:
1. Foreslå å dele dem opp i egne commits
2. Bruk `git add -p` for å stage deler av endringene
3. Lag én commit per logisk endring

## Sikkerhetsprotokoll

Før du committer, verifiser at staged changes **IKKE** inneholder:
- Tokens, API keys eller credentials
- Passord eller secrets (også i kommentarer)
- PII (fødselsnumre, e-postadresser, navn i testdata)
- `.env`-filer med sensitive verdier

Hvis du oppdager sensitive data: **STOPP** og varsle brukeren.

## Eksempler

```bash
# Enkel feature
git commit -m "feat(personalia): vis navn fra dekoratør-data" \
  -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

# Bugfiks med referanse
git commit -m "fix(auth): håndter manglende token i middleware" \
  -m "Ugyldig token førte til at brukere ikke ble redirectet til
login, men fikk en tom side." \
  -m "Fixes #456

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

# Oppdatering av avhengighet
git commit -m "build(deps): oppgrader Astro til 7.0.9" \
  -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

# Breaking change
git commit -m "feat(microfrontend)!: fjern deprecated fallback-url" \
  -m "BREAKING CHANGE: local-fallback-url er fjernet. Bruk env-schema i astro.config.mjs.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```