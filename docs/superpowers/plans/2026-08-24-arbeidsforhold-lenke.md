# Arbeidsforhold-lenke Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Erstatt innsynslisten for arbeidsforhold i Personopplysninger med en oversatt lenke til den nye innsynsløsningen for Aa-registeret.

**Architecture:** Den eksisterende `Arbeidsforhold`-bolken beholdes som navigasjonspunkt, men blir en statisk presentasjonskomponent uten store- eller API-avhengigheter. Destinasjonen leveres som `VITE_ARBEIDSFORHOLD_URL`, mens alle interne arbeidsforhold-ruter fjernes og tidligere stier faller gjennom til standard 404-side. Hele frontendintegrasjonen mot `@navikt/arbeidsforhold` fjernes.

**Tech Stack:** React 18, TypeScript 5, React Intl, React Router 7, Aksel 7, Less, Vitest og Testing Library.

## Global Constraints

- Arbeid kun i `personopplysninger`-frontend.
- Ikke endre `docker-compose.yml`, arbeidsforhold-backend eller andre repoer.
- Vis lenken kun i den eksisterende bolken «Arbeidsforhold»; ikke dupliser den under «Flere opplysninger om deg».
- Behold `id="arbeidsforhold"`, overskrift, ikon og ankerlenke.
- Bruk `VITE_ARBEIDSFORHOLD_URL` med verdien `https://www.nav.no/aa-registeret/arbeidsforhold` inntil Team arbeidsforhold og Team Nav.no avklarer en annen URL.
- Åpne lenken i samme fane.
- Fjern interne `/arbeidsforhold`- og `/arbeidsforhold/:id`-ruter; tidligere stier skal falle gjennom til standard 404-side.
- Oppdater bokmål, nynorsk og engelsk samtidig.
- Fjern `@navikt/arbeidsforhold` og all tilhørende frontendkode.
- Ikke implementer eksterne Nav.no-redirects i denne leveransen.

---

## File Map

- Create `src/__tests__/forside/Arbeidsforhold.test.tsx`: verifies the user-visible copy and destination.
- Create `src/pages/forside/sections/5-arbeidsforhold/Arbeidsforhold.less`: aligns the external-link icon and text.
- Modify `src/pages/forside/sections/5-arbeidsforhold/Arbeidsforhold.tsx`: replaces the embedded list with static copy and CTA.
- Modify `src/text/nb.ts`, `src/text/nn.ts`, `src/text/en.ts`: defines the new copy and removes obsolete strings.
- Modify `.env.sample`: documents the local URL variable.
- Modify `.github/workflows/build-and-deploy.yml`: accepts and exports the URL for ordinary deploys.
- Modify `.github/workflows/build-and-deploy-intern.yml`: accepts and exports the URL for internal deploys.
- Modify `.github/workflows/deploy.dev.yml`: supplies the URL to the dev deployment.
- Modify `.github/workflows/deploy.prod.yml`: supplies the URL to production.
- Modify `.github/workflows/deploy.prod.intern.yml`: supplies the URL to internal production.
- Modify `src/App.tsx`: removes package initialization/detail rendering and deletes internal arbeidsforhold-ruter.
- Modify `src/index.less`: replaces the detail-page stylesheet import with the new section stylesheet.
- Modify `package.json`, `package-lock.json`: removes `@navikt/arbeidsforhold`.
- Delete `src/pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold.tsx`: removes the obsolete detail page.
- Delete `src/pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold.less`: removes obsolete detail styles.

### Task 0: Refresh main and isolate the work

**Files:**

- Commit: `docs/superpowers/specs/2026-08-24-arbeidsforhold-lenke-design.md`
- Commit: `docs/superpowers/plans/2026-08-24-arbeidsforhold-lenke.md`

**Interfaces:**

- Consumes: clean `navikt/personopplysninger` repository access.
- Produces: an isolated feature branch based on the newest `origin/main`.

- [ ] **Step 1: Confirm that no unrelated local changes would be moved**

Run:

```bash
git status --short --branch
```

Expected: no staged or modified source files. The two `docs/superpowers` files may be untracked because they were created during design.

- [ ] **Step 2: Refresh `main` exactly as requested**

Run:

```bash
git switch main
git pull --ff-only
```

Expected: branch is `main`, and the pull fast-forwards or reports `Already up to date`.

- [ ] **Step 3: Create the isolated implementation branch**

Run:

```bash
git switch -c erstatt-arbeidsforhold-med-lenke
```

Expected: `Switched to a new branch 'erstatt-arbeidsforhold-med-lenke'`.

- [ ] **Step 4: Commit the approved design and plan**

Run:

```bash
git add docs/superpowers/specs/2026-08-24-arbeidsforhold-lenke-design.md docs/superpowers/plans/2026-08-24-arbeidsforhold-lenke.md
git commit -m "docs: beskriv erstatning av arbeidsforholdinnsyn" \
  -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

Expected: one documentation commit with only the two listed files.

### Task 1: Replace the embedded list with a tested CTA

**Files:**

- Create: `src/__tests__/forside/Arbeidsforhold.test.tsx`
- Create: `src/pages/forside/sections/5-arbeidsforhold/Arbeidsforhold.less`
- Modify: `src/pages/forside/sections/5-arbeidsforhold/Arbeidsforhold.tsx`
- Modify: `src/text/nb.ts`
- Modify: `src/text/nn.ts`
- Modify: `src/text/en.ts`
- Modify: `src/index.less`

**Interfaces:**

- Consumes: `import.meta.env.VITE_ARBEIDSFORHOLD_URL: string`.
- Produces: `Arbeidsforhold` as a store-independent component with one external link.

- [ ] **Step 1: Write the failing component test**

Create `src/__tests__/forside/Arbeidsforhold.test.tsx`:

```tsx
import { IntlProvider } from 'react-intl';
import { render, screen } from '@testing-library/react';
import nbMessages from '@/text/nb';
import { StoreProvider } from '@/store/Context';
import Arbeidsforhold from '@/pages/forside/sections/5-arbeidsforhold/Arbeidsforhold';

const arbeidsforholdUrl = 'https://www.nav.no/aa-registeret/arbeidsforhold';

vi.mock('@navikt/arbeidsforhold', () => ({
    ListeMedArbeidsforhold: () => <div>embedded list</div>,
}));

describe('Arbeidsforhold', () => {
    beforeEach(() => {
        vi.stubEnv('VITE_ARBEIDSFORHOLD_URL', arbeidsforholdUrl);
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should direct users to the Aa-registeret employment overview', () => {
        render(
            <StoreProvider>
                <IntlProvider locale="nb" messages={nbMessages}>
                    <Arbeidsforhold />
                </IntlProvider>
            </StoreProvider>,
        );

        expect(screen.getByRole('heading', { level: 2, name: 'Arbeidsforhold' })).toBeInTheDocument();
        expect(
            screen.getByText('I Aa-registeret kan du se hvilke opplysninger arbeidsgiverne dine har rapportert om arbeidsforholdene dine.'),
        ).toBeInTheDocument();

        const link = screen.getByRole('link', { name: 'Se dine arbeidsforhold i Aa-registeret' });
        expect(link).toHaveAttribute('href', arbeidsforholdUrl);
    });
});
```

- [ ] **Step 2: Run the focused test and verify the red state**

Run:

```bash
npm test -- --run src/__tests__/forside/Arbeidsforhold.test.tsx
```

Expected: FAIL because the current component has no link named `Se dine arbeidsforhold i Aa-registeret` and still renders `embedded list`.

- [ ] **Step 3: Replace the component implementation**

Replace `src/pages/forside/sections/5-arbeidsforhold/Arbeidsforhold.tsx` with:

```tsx
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { BodyLong, Link } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import Box from '@/components/box/Box';
import arbeidsforholdIkon from '@/assets/img/Arbeidsforhold.svg';

const Arbeidsforhold = () => {
    return (
        <Box id="arbeidsforhold" tittel="arbeidsforhold.tittel" icon={arbeidsforholdIkon} visAnkerlenke>
            <BodyLong spacing>
                <FormattedMessage id="arbeidsforhold.beskrivelse" />
            </BodyLong>
            <Link href={import.meta.env.VITE_ARBEIDSFORHOLD_URL} className="arbeidsforhold__lenke">
                <ExternalLinkIcon aria-hidden="true" />
                <FormattedMessage id="arbeidsforhold.lenke" />
            </Link>
        </Box>
    );
};

export default Arbeidsforhold;
```

- [ ] **Step 4: Add focused link styling**

Create `src/pages/forside/sections/5-arbeidsforhold/Arbeidsforhold.less`:

```less
.arbeidsforhold {
    &__lenke {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }
}
```

Add this import to `src/index.less` immediately before the `6-flere-opplysninger` import:

```less
@import 'pages/forside/sections/5-arbeidsforhold/Arbeidsforhold.less';
```

- [ ] **Step 5: Replace the obsolete copy in all locales**

In `src/text/nb.ts`, replace the current `arbeidsforhold.*` content block with:

```ts
'arbeidsforhold.tittel': 'Arbeidsforhold',
'arbeidsforhold.beskrivelse':
    'I Aa-registeret kan du se hvilke opplysninger arbeidsgiverne dine har rapportert om arbeidsforholdene dine.',
'arbeidsforhold.lenke': 'Se dine arbeidsforhold i Aa-registeret',
```

In `src/text/nn.ts`, replace the current `arbeidsforhold.*` content block with:

```ts
'arbeidsforhold.tittel': 'Arbeidsforhold',
'arbeidsforhold.beskrivelse':
    'I Aa-registeret kan du sjå kva opplysningar arbeidsgivarane dine har rapportert om arbeidsforholda dine.',
'arbeidsforhold.lenke': 'Sjå arbeidsforholda dine i Aa-registeret',
```

In `src/text/en.ts`, replace the current `arbeidsforhold.*` content block with:

```ts
'arbeidsforhold.tittel': 'Employment relationships',
'arbeidsforhold.beskrivelse':
    'In the State Register of Employers and Employees, you can see the information your employers have reported about your employment relationships.',
'arbeidsforhold.lenke': 'See your employment relationships in the register',
```

This replacement removes `arbeidsforhold.kilde`, `arbeidsforhold.disclaimer` and `arbeidsforhold.submitted.by`.

- [ ] **Step 6: Run the focused test and verify the green state**

Run:

```bash
npm test -- --run src/__tests__/forside/Arbeidsforhold.test.tsx
```

Expected: PASS with one test.

- [ ] **Step 7: Commit the user-facing replacement**

Run:

```bash
git add src/__tests__/forside/Arbeidsforhold.test.tsx \
  src/pages/forside/sections/5-arbeidsforhold/Arbeidsforhold.tsx \
  src/pages/forside/sections/5-arbeidsforhold/Arbeidsforhold.less \
  src/text/nb.ts src/text/nn.ts src/text/en.ts src/index.less
git commit -m "feat: erstatt arbeidsforhold med lenke" \
  -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

Expected: one commit containing the tested UI and copy changes.

### Task 2: Supply the destination through every deploy workflow

**Files:**

- Modify: `.env.sample`
- Modify: `.github/workflows/build-and-deploy.yml`
- Modify: `.github/workflows/build-and-deploy-intern.yml`
- Modify: `.github/workflows/deploy.dev.yml`
- Modify: `.github/workflows/deploy.prod.yml`
- Modify: `.github/workflows/deploy.prod.intern.yml`

**Interfaces:**

- Consumes: the URL selected in the global constraints.
- Produces: `import.meta.env.VITE_ARBEIDSFORHOLD_URL` in local, dev, prod and internal prod builds.

- [ ] **Step 1: Document the local variable**

Add this line to `.env.sample` after `VITE_APP_URL`:

```dotenv
VITE_ARBEIDSFORHOLD_URL=https://www.nav.no/aa-registeret/arbeidsforhold
```

- [ ] **Step 2: Add the reusable workflow input for ordinary deploys**

In `.github/workflows/build-and-deploy.yml`, add this input after `VITE_APP_URL`:

```yaml
VITE_ARBEIDSFORHOLD_URL:
    required: true
    type: string
```

In the `Define client-side environment` step, add:

```yaml
echo "VITE_ARBEIDSFORHOLD_URL=${{ inputs.VITE_ARBEIDSFORHOLD_URL }}" >> $GITHUB_ENV
```

Place it immediately after the `VITE_APP_URL` echo.

- [ ] **Step 3: Add the reusable workflow input for internal deploys**

In `.github/workflows/build-and-deploy-intern.yml`, add this input after `VITE_APP_URL`:

```yaml
VITE_ARBEIDSFORHOLD_URL:
    required: true
    type: string
```

In the `Define client-side environment` step, add:

```yaml
echo "VITE_ARBEIDSFORHOLD_URL=${{ inputs.VITE_ARBEIDSFORHOLD_URL }}" >> $GITHUB_ENV
```

Place it immediately after the `VITE_APP_URL` echo.

- [ ] **Step 4: Supply the URL from every caller**

Add this line after `VITE_APP_URL` in `.github/workflows/deploy.dev.yml`:

```yaml
VITE_ARBEIDSFORHOLD_URL: 'https://www.nav.no/aa-registeret/arbeidsforhold'
```

Add the same line after `VITE_APP_URL` in `.github/workflows/deploy.prod.yml`:

```yaml
VITE_ARBEIDSFORHOLD_URL: 'https://www.nav.no/aa-registeret/arbeidsforhold'
```

Add the same line after `VITE_APP_URL` in `.github/workflows/deploy.prod.intern.yml`:

```yaml
VITE_ARBEIDSFORHOLD_URL: 'https://www.nav.no/aa-registeret/arbeidsforhold'
```

- [ ] **Step 5: Verify that every required workflow surface is wired**

Run:

```bash
rg -n "VITE_ARBEIDSFORHOLD_URL" \
  .env.sample \
  .github/workflows/build-and-deploy.yml \
  .github/workflows/build-and-deploy-intern.yml \
  .github/workflows/deploy.dev.yml \
  .github/workflows/deploy.prod.yml \
  .github/workflows/deploy.prod.intern.yml
```

Expected: eight matches: one in `.env.sample`, two in each reusable workflow, and one in each of the three callers.

- [ ] **Step 6: Build with the configured destination**

Run:

```bash
VITE_ARBEIDSFORHOLD_URL=https://www.nav.no/aa-registeret/arbeidsforhold npm run build
```

Expected: both `build:js` and `build:css` complete successfully.

- [ ] **Step 7: Commit the deploy configuration**

Run:

```bash
git add .env.sample \
  .github/workflows/build-and-deploy.yml \
  .github/workflows/build-and-deploy-intern.yml \
  .github/workflows/deploy.dev.yml \
  .github/workflows/deploy.prod.yml \
  .github/workflows/deploy.prod.intern.yml
git commit -m "chore: konfigurer lenke til arbeidsforhold" \
  -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

Expected: one configuration-only commit.

### Task 3: Remove the embedded arbeidsforhold frontend

**Files:**

- Modify: `src/App.tsx`
- Modify: `src/index.less`
- Modify: `src/__tests__/forside/Arbeidsforhold.test.tsx`
- Modify: `src/text/nb.ts`
- Modify: `src/text/nn.ts`
- Modify: `src/text/en.ts`
- Modify: `package.json`
- Modify: `package-lock.json`
- Delete: `src/pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold.tsx`
- Delete: `src/pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold.less`

**Interfaces:**

- Consumes: the static `Arbeidsforhold` component from Task 1.
- Produces: an application with no runtime or package dependency on `@navikt/arbeidsforhold`.

- [ ] **Step 1: Remove package initialization and detail rendering from `App.tsx`**

Delete these imports:

```tsx
import { initLocalMock as initLocalArbeidsforholdMock } from '@navikt/arbeidsforhold';
import DetaljertArbeidsforhold from './pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold';
import '@navikt/arbeidsforhold/index.css';
```

Delete this initialization block:

```tsx
if (import.meta.env.VITE_ENV === 'local') {
    initLocalArbeidsforholdMock();
}
```

Delete both arbeidsforhold route blocks from `Routes`:

```tsx
<Route
    caseSensitive={true}
    path={`${basePathWithLanguage}/arbeidsforhold`}
    element={<Navigate replace={true} to={`${basePathWithLanguage}/#arbeidsforhold`} />}
/>
<Route
    caseSensitive={true}
    path={`${basePathWithLanguage}/arbeidsforhold/:id`}
    element={<Navigate replace={true} to={`${basePathWithLanguage}/#arbeidsforhold`} />}
/>
```

- [ ] **Step 2: Delete the obsolete detail page**

Delete:

```text
src/pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold.tsx
src/pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold.less
```

Remove this import from `src/index.less`:

```less
@import 'pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold.less';
```

- [ ] **Step 3: Remove strings used only by the deleted detail page**

Delete this key from `src/text/nb.ts`:

```ts
'brodsmulesti.arbeidsforhold': 'Arbeidsforhold',
```

Delete this key from `src/text/nn.ts`:

```ts
'brodsmulesti.arbeidsforhold': 'Arbeidsforhold',
```

Delete this key from `src/text/en.ts`:

```ts
'brodsmulesti.arbeidsforhold': 'Employment relationship',
```

Do not remove `arbeidsforhold.tittel`, `arbeidsforhold.beskrivelse` or `arbeidsforhold.lenke`.

- [ ] **Step 4: Simplify the component test now that the package is gone**

Remove this import from `src/__tests__/forside/Arbeidsforhold.test.tsx`:

```tsx
import { StoreProvider } from '@/store/Context';
```

Remove the entire `vi.mock('@navikt/arbeidsforhold', ...)` block.

Replace the render call with:

```tsx
render(
    <IntlProvider locale="nb" messages={nbMessages}>
        <Arbeidsforhold />
    </IntlProvider>,
);
```

- [ ] **Step 5: Remove the npm package with npm**

Run:

```bash
npm uninstall @navikt/arbeidsforhold --ignore-scripts
```

Expected: `@navikt/arbeidsforhold` is removed from `package.json`, its package block and nested React Router blocks are removed from `package-lock.json`, and npm exits successfully.

- [ ] **Step 6: Verify that no embedded frontend integration remains**

Run:

```bash
if rg -n "@navikt/arbeidsforhold|detaljert-arbeidsforhold|initLocalArbeidsforholdMock|DetaljertArbeidsforhold" \
  src package.json package-lock.json; then
  echo "Fant rester av den gamle arbeidsforhold-integrasjonen"
  exit 1
fi
```

Expected: no matches.

- [ ] **Step 7: Run the focused test after dependency removal**

Run:

```bash
npm test -- --run src/__tests__/forside/Arbeidsforhold.test.tsx
```

Expected: PASS with one test.

- [ ] **Step 8: Commit the integration removal**

Run:

```bash
git add src/App.tsx src/index.less src/__tests__/forside/Arbeidsforhold.test.tsx \
  src/text/nb.ts src/text/nn.ts src/text/en.ts package.json package-lock.json
git add -u src/pages/detaljert-arbeidsforhold
git commit -m "chore: fjern arbeidsforhold-integrasjonen" \
  -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

Expected: one commit removing only the obsolete frontend integration and the two internal arbeidsforhold routes.

### Task 4: Verify the complete frontend change

**Files:**

- Verify: all files changed in Tasks 1-3.

**Interfaces:**

- Consumes: completed UI, configuration and cleanup tasks.
- Produces: evidence that the feature is ready for review.

- [ ] **Step 1: Run the complete test suite once**

Run:

```bash
npm test -- --run
```

Expected: all Vitest tests pass with no skipped or failing tests introduced by this change.

- [ ] **Step 2: Run lint**

Run:

```bash
npm run lint
```

Expected: ESLint exits with code 0.

- [ ] **Step 3: Run the production build**

Run:

```bash
VITE_ARBEIDSFORHOLD_URL=https://www.nav.no/aa-registeret/arbeidsforhold npm run build
```

Expected: JavaScript and Less builds both exit with code 0.

- [ ] **Step 4: Verify the exact scope**

Run:

```bash
git status --short
git diff --check main...HEAD
git diff --stat main...HEAD
if rg -n "@navikt/arbeidsforhold|detaljert-arbeidsforhold|initLocalArbeidsforholdMock|DetaljertArbeidsforhold" \
  src package.json package-lock.json; then
  echo "Fant rester av den gamle arbeidsforhold-integrasjonen"
  exit 1
fi
```

Expected:

- `git status --short` is empty.
- `git diff --check` reports no whitespace errors.
- The diff contains only the frontend, workflow, test and documentation files listed in this plan.
- The final `rg` command has no matches.
