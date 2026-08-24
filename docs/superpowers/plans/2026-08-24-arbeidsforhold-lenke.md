# Arbeidsforhold-lenke Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Erstatt arbeidsforholdinnsyn med en ekstern lenke, fjern interne arbeidsforhold-subsider, og behold en stabil locale-basert inngang uten transient 404.

**Architecture:** `Arbeidsforhold` er en statisk presentasjonsseksjon uten backendavhengighet. `VITE_ARBEIDSFORHOLD_URL` brukes når den er satt, men tom/manglende verdi faller tilbake til `https://www.nav.no/aa-registeret/arbeidsforhold`. `App.tsx` bruker locale-avgrenset catch-all (`${basePathWithLanguage}/*`) slik at locale-innsetting skjer uten 404-flash, mens tidligere locale-kvalifiserte arbeidsforhold-stier fortsatt går til standard 404.

**Tech Stack:** React 18, TypeScript 5, React Intl, React Router 7, Vitest, Testing Library.

## Global Constraints

- Arbeid kun i `personopplysninger`-frontend.
- Ikke endre backend, `docker-compose.yml`, avhengighetsfiler, oversettelser eller CTA-plassering i denne oppfølgingsoppgaven.
- Ikke gjeninnfør interne `/arbeidsforhold`-sider eller `Navigate`-redirects til `#arbeidsforhold`.
- Locale-løse canonical inngangs-URLer skal redirectes uten at 404-side rendres underveis.
- Tidligere locale-kvalifiserte arbeidsforhold-stier skal fortsatt rendere standard 404.
- `VITE_ARBEIDSFORHOLD_URL` skal være valgfri override; tom/manglende verdi skal bruke canonical default-URL.

---

## File Map

- Modify `src/pages/forside/sections/5-arbeidsforhold/Arbeidsforhold.tsx`: bruker canonical fallback når env-verdi mangler/er tom.
- Modify `src/__tests__/forside/Arbeidsforhold.test.tsx`: verifiserer både override og fallback-atferd.
- Modify `src/App.tsx`: avgrenser catch-all til `${basePathWithLanguage}/*`.
- Modify `src/__tests__/App.test.tsx`: verifiserer locale-løs redirect uten transient 404 og at gamle arbeidsforholdstier gir 404.
- Modify `docs/superpowers/specs/2026-08-24-arbeidsforhold-lenke-design.md`: synkroniserer design med faktisk fallback- og rutingatferd.
- Modify `docs/superpowers/plans/2026-08-24-arbeidsforhold-lenke.md`: synkroniserer plan med implementert atferd og testopplegg.

## Task 1: Sikre lenkeatferd med fallback (TDD)

**Files:**

- Modify `src/__tests__/forside/Arbeidsforhold.test.tsx`
- Modify `src/pages/forside/sections/5-arbeidsforhold/Arbeidsforhold.tsx`

- [ ] **Step 1: Skriv/oppdater test for manglende URL (RED)**

Testen skal uttrykkelig verifisere at tom `VITE_ARBEIDSFORHOLD_URL` fortsatt rendrer lenke til
`https://www.nav.no/aa-registeret/arbeidsforhold`, i stedet for å kaste feil.

- [ ] **Step 2: Kjør fokusert test og bekreft RED**

Run:

```bash
npm test -- --run src/__tests__/forside/Arbeidsforhold.test.tsx
```

Expected: FAIL fordi komponenten kaster render-time feil når env-verdi er tom.

- [ ] **Step 3: Implementer fallback (GREEN)**

Oppdater `Arbeidsforhold.tsx` slik at:

- ikke-tom `VITE_ARBEIDSFORHOLD_URL` brukes direkte
- tom/manglende verdi faller tilbake til canonical URL
- ingen error boundary eller disabled/skjult CTA introduseres

- [ ] **Step 4: Kjør fokusert test på nytt (GREEN)**

Run:

```bash
npm test -- --run src/__tests__/forside/Arbeidsforhold.test.tsx
```

Expected: PASS.

## Task 2: Verifiser at gamle arbeidsforholdstier fortsatt gir 404

**Files:**

- Verify `src/App.tsx`
- Verify `src/__tests__/App.test.tsx`

- [ ] **Step 1: Bekreft at interne arbeidsforhold-ruter ikke finnes**

Ingen dedikerte ruter for `/arbeidsforhold` eller `/arbeidsforhold/:id` skal være definert i `App.tsx`.

- [ ] **Step 2: Behold testene som verifiserer 404 for tidligere locale-stier**

`src/__tests__/App.test.tsx` skal fortsatt dekke:

- `${basePath}/nb/arbeidsforhold`
- `${basePath}/nb/arbeidsforhold/123`

Begge skal rendere standard 404.

## Task 3: Fjern transient 404 på locale-løse inngangsstier (TDD)

**Files:**

- Modify `src/__tests__/App.test.tsx`
- Modify `src/App.tsx`

- [ ] **Step 1: Legg til/oppdater redirect-test (RED)**

Testen skal bevise at `/person/personopplysninger` redirecter til locale-sti uten at 404 rendres underveis.

- [ ] **Step 2: Kjør fokusert App-test og bekreft RED**

Run:

```bash
npm test -- --run src/__tests__/App.test.tsx
```

Expected: FAIL med dagens global catch-all (`path="*"`) fordi 404 rendres før locale-redirect fullføres.

- [ ] **Step 3: Scope catch-all til locale (GREEN)**

Bytt catch-all-rute i `App.tsx` fra global `*` til `${basePathWithLanguage}/*`.

- [ ] **Step 4: Kjør fokusert App-test på nytt (GREEN)**

Run:

```bash
npm test -- --run src/__tests__/App.test.tsx
```

Expected: PASS, og testene for gamle arbeidsforholdstier er fortsatt grønne.

## Task 4: Oppdater dokumentasjon og verifiser hele endringen

**Files:**

- Modify `docs/superpowers/specs/2026-08-24-arbeidsforhold-lenke-design.md`
- Modify `docs/superpowers/plans/2026-08-24-arbeidsforhold-lenke.md`

- [ ] **Step 1: Synk design/plan med implementert atferd**

Dokumentasjonen må beskrive:

- at alle interne arbeidsforhold-subsider er fjernet, og gamle locale-stier gir standard 404
- at catch-all er locale-scopet for å unngå 404-flash ved locale-innsetting
- at `src/__tests__/App.test.tsx` dekker både retired paths og locale-løs redirect
- at `VITE_ARBEIDSFORHOLD_URL` overstyrer canonical default, men ikke lenger kan krasje forsiden

- [ ] **Step 2: Kjør samlet verifikasjon**

Run:

```bash
npm test -- --run src/__tests__/App.test.tsx src/__tests__/forside/Arbeidsforhold.test.tsx
npm test -- --run
npm run lint
VITE_ARBEIDSFORHOLD_URL=https://www.nav.no/aa-registeret/arbeidsforhold npm run build
npx prettier --check src/App.tsx src/pages/forside/sections/5-arbeidsforhold/Arbeidsforhold.tsx   src/__tests__/App.test.tsx src/__tests__/forside/Arbeidsforhold.test.tsx   docs/superpowers/specs/2026-08-24-arbeidsforhold-lenke-design.md   docs/superpowers/plans/2026-08-24-arbeidsforhold-lenke.md
git diff --check
if rg -n 'path=.*arbeidsforhold|to=.*#arbeidsforhold' src/App.tsx; then
  echo "Fant en intern arbeidsforhold-rute"
  exit 1
fi
```

Expected: alle kommandoer passerer.
