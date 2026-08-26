# Issue dependencies

## MCP (primær)

Bruk MCP for dependencies når tilgjengelig i aktivt toolset.

- Sjekk først om MCP-oppsettet eksponerer dependency-operasjoner
- Foretrekk MCP over direkte API-kall

## Fallback (gh api)

Når MCP ikke er tilgjengelig, bruk GitHub REST via `gh api`.

### Legg til dependency

```bash
# Issue N er avhengig av et annet issue
gh api \
  repos/{owner}/{repo}/issues/{issue_number}/sub_issues/dependencies \
  -X POST \
  -f dependent_issue_id=N

# Alternativ payload-form
gh api \
  repos/{owner}/{repo}/issues/{issue_number}/sub_issues/dependencies \
  -X POST \
  -f dependency_issue_id=N
```

### List dependencies

```bash
gh api repos/{owner}/{repo}/issues/{issue_number}/sub_issues/dependencies
```

### Fjern dependency

```bash
gh api repos/{owner}/{repo}/issues/{issue_number}/sub_issues/dependencies/{dependency_id} -X DELETE
```

### Semantikk

- **blocked-by**: hvilke issues blokkerer dette issuet
- **blocking**: hvilke issues dette issuet blokkerer

### Notat

Dette erstatter tekstbasert `Avhenger av #NNN` som datakilde, men behold gjerne teksten i issue body for lesbarhet.