# Native GitHub issue types

## MCP (primær)

Bruk MCP `issue_write` med `type`-parameter for oppretting/oppdatering av issue type.

Bruk MCP `list_issue_types` for å oppdage tilgjengelige typer før du setter verdi.

- Vanlige org-typer: `Bug`, `Epic`, `Feature`, `Story`, `Task`

## Fallback (gh api)

Når MCP ikke er tilgjengelig, bruk REST med `type`-felt.

### Opprett issue med type

```bash
gh api repos/{owner}/{repo}/issues \
  -X POST \
  -f title="..." \
  -f body="..." \
  -f type="Feature" \
  --jq '.number'
```

### List tilgjengelige issue types (org-nivå)

```bash
gh api graphql \
  -H "GraphQL-Features: issue_types" \
  -f query='query {
    organization(login: "navikt") {
      issueTypes {
        nodes {
          id
          name
        }
      }
    }
  }'
```