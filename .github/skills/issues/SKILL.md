---
name: issues
description: "GitHub Issues-håndtering — issue-maler, epics, sub-issues, dependencies, prosjektboard, status, ferdigmelding og PR-kobling. Brukes via /issues ved oppretting eller håndtering av issues."
---

# Issue-håndtering

Opprett og håndter GitHub Issues med epics, sub-issues og avhengigheter.

## Arbeidsflyt

### 1. Sjekk om issue allerede finnes

Før du oppretter et nytt issue, sjekk om brukeren allerede har referert til et issue (f.eks. `#123` eller en GitHub-URL). Hvis ja, bruk det eksisterende issuet.

### 2. Velg type

| Type | Bruk |
|------|------|
| **Epic** | Store oppgaver som brytes ned i flere issues |
| **Feature** | Ny funksjonalitet |
| **Story** | Brukerhistorie / brukstilfelle |
| **Task** | Teknisk oppgave, vedlikehold, chore |
| **Bug** | Feil som må fikses |

### 3. Opprett issue med riktig struktur

Repoet har issue-maler i `.github/ISSUE_TEMPLATE/` for de relevante typene (`feature`, `bug`, `story`, `task`, `epic`). Les feltstrukturen fra malen for den valgte typen og lag en markdown-tekst med tilsvarende seksjoner.

Inkluder alltid:
- **Avhengigheter** (valgfritt): `Avhenger av #NNN` hvis relevant
- **Epic-kobling** (valgfritt): `Del av epic: #EPIC_NUMMER` hvis relevant

### 4. Opprett issue

**MCP (foretrukket):** Bruk issue-/project-verktøy for å opprette issue med riktig type direkte.

**Fallback (`gh api`):**
```bash
gh api repos/navikt/REPO_NAVN/issues \
  -X POST \
  -f title="Kort, beskrivende tittel" \
  -f body="BODY" \
  -f type="Feature" \
  --jq '.html_url'
```

Se `references/issue-types.md` for detaljer om issue-typer.

### 4b. Legg issue inn i prosjektboard (hvis konfigurert)

Etter programmatisk opprettelse: les issue-malen i målrepoet og se etter `projects:`-linjen.

- Hvis issue-malen i repoet ikke har en `projects:`-linje, hopp over dette steget uten å feile
- Hvis prosjekt er konfigurert, legg issuet inn i boardet og oppdag prosjekt, felter og opsjoner dynamisk
- Ikke hardkod felt-ID-er, option-ID-er eller statusnavn per repo

Se `references/projects.md` for workflow og feilhåndtering.

### 5. Epic-håndtering

For store oppgaver som brytes ned:

1. Opprett epic-issuet først
2. Opprett underliggende issues
3. Koble sub-issues til epicen via GitHubs sub-issues-API
4. Koble avhengigheter via dependencies-API-et
5. Inkluder også `Del av epic: #EPIC_NUMMER` og `Avhenger av #NNN` i issue-teksten for lesbarhet

#### Sub-issues skal være selvstendige

Hvert sub-issue skal inneholde nok kontekst til at noen kan plukke det opp uten å lese hele epicen:
- Tydelig beskrivelse av hva som skal gjøres
- Relevante filer og API-er
- Avhengigheter til andre issues
- Akseptansekriterier

### 6. Epic-workflow og progresjon

Når en epic skal løses stegvis:

1. **Les epicen** — hent epic, sub-issues og informasjon om avhengigheter
2. **Kategoriser åpne sub-issues**:
    - **Kjørbar nå** — alle avhengigheter er oppfylt
    - **Blokkert** — minst én avhengighet er fortsatt åpen
    - **Parallelle kandidater** — flere kjørbare oppgaver uten innbyrdes avhengighet
3. **Presenter anbefaling**:
    - Hvis én kandidat → foreslå den
    - Hvis flere kandidater → foreslå valgbare eller parallelle alternativer
    - Hvis ingen kandidater → forklar hva som blokkerer videre arbeid
4. **Løs oppgaven** — følg normal arbeidsflyt for valgt issue
    - Når arbeid starter, oppdater prosjekt-status til `In Progress`/tilsvarende via mønsteret i `references/projects.md`
    - Hvis repo, prosjekt eller statusfelt ikke er konfigurert, hopp over uten å feile
5. **Gjenta** — etter fullføring, vurder neste kjørbare oppgave

### 7. Ferdigmelding på issues

Etter at et issue er løst, legg igjen en ferdigmelding:

```bash
gh issue comment ISSUE_NUMMER --repo navikt/REPO --body "COMMENT_BODY"
```

Ferdigmeldingen skal være strukturert og kortfattet:

~~~markdown
## ✅ Løst

**Oppsummering:** [Kort beskrivelse av hva som ble gjort]

**Endrede filer:**
- `src/path/to/file1.ts` — [hva som ble endret]
- `src/path/to/file2.ts` — [hva som ble endret]

**Verifisering:** [build/typecheck/test/lint eller `Ikke kjørt` + grunn]

**Inspeksjon:** [Godkjent / Godkjent med merknader / Må følges opp] — [kort oppsummering]

**PR:** #PR_NUMMER
~~~

Bruk en kort inspeksjonsoppsummering i kommentaren — ikke en full ASCII-rapport med mindre brukeren eksplisitt ønsker det.

### 8. Lukk epic automatisk

Etter at et sub-issue er lukket, sjekk om alle sub-issues i epicen er fullført.

Hvis ingen åpne sub-issues gjenstår:
1. Legg igjen en oppsummerende kommentar på epicen
2. Lukk epicen

### 9. Issue-kobling i PR-er

Når arbeidet resulterer i en PR:

```bash
Closes #ISSUE_NUMMER
```

Eller, hvis issuet skal holdes åpent:

```bash
Relates to #ISSUE_NUMMER
```

## Beslutningstre

```
Er oppgaven stor nok for en epic?
├── Ja → Opprett Epic + underliggende issues
│   └── Hvert sub-issue: selvstendig, med avhengigheter og akseptansekriterier
└── Nei → Opprett frittstående issue
    └── Type? → Feature / Story / Task / Bug
```