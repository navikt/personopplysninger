---
name: pull-request
description: "PR-oppretting og -oppdatering — semantisk tittel, kort beskrivelse, issue-kobling, teststatus, risiko, sjekkliste og reviewer-kontekst. Brukes via /pull-request ved nye eller oppdaterte PR-er."
---

# Pull request

Opprett konsistente, godt strukturerte pull requests som kobles til issues og følger teamets arbeidsflyt.

## PR-tittel

Bruk semantisk commit-format:

```
type(scope): kort beskrivelse
```

- **Typer:** `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`
- **Scope:** Modul eller domene som endres

## PR-tekst

Repoet har en PR-template i `.github/PULL_REQUEST_TEMPLATE.md` som automatisk forhåndsfyller teksten når du oppretter en PR. Fyll inn seksjonene i malen.

For ikke-trivielle endringer bør teksten kort oppsummere:
- hva som ble endret
- issue-kobling
- hva som ble verifisert (build/typecheck/test/lint)
- eventuelle merknader fra review/inspeksjon

## Issue-kobling

| Situasjon | I PR-body |
|-----------|-----------|
| Issue løst fullstendig | `Closes #123` |
| Delvis arbeid, issue fortsatt åpent | `Relates to #123` |
| Del av epic | `Closes #123` + `Del av epic: #100` |
| Ingen issue | Skriv motivasjon direkte i beskrivelsen |

## Opprettelse

### MCP (foretrukket)

Bruk tilgjengelig PR-verktøy for å opprette PR med tittel og tekst.

### Fallback (gh CLI)

```bash
gh pr create \
  --repo navikt/REPO_NAVN \
  --title "type(scope): beskrivelse" \
  --body "BODY"
```

### Auto-merge (squash)

Etter opprettelse:
```bash
gh pr merge --auto --squash
```