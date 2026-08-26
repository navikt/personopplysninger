---
name: write-a-skill
description: Lag nye agent-skills med riktig struktur, progressiv innlasting og medfølgende ressurser. Bruk når bruker vil opprette, skrive eller bygge en ny skill.
---

# Skrive skills

## Prosess

1. **Samle krav** - spør brukeren om:
    - Hvilken oppgave/hvilket domene skal skillen dekke?
    - Hvilke konkrete brukstilfeller skal den håndtere?
    - Trengs kjørbare skript eller bare instruksjoner?
    - Er det referansemateriale som bør inkluderes?

2. **Lag førsteutkast** - opprett:
    - `SKILL.md` med korte og tydelige instruksjoner
    - Ekstra referansefiler hvis innholdet overstiger 500 linjer
    - Hjelpeskript hvis deterministiske operasjoner er nødvendig

3. **Gå gjennom med bruker** - presenter utkastet og spør:
    - Dekker dette brukstilfellene dine?
    - Mangler noe eller er noe uklart?
    - Bør noen deler være mer eller mindre detaljerte?

## Skill-struktur

```text
skill-name/
├── SKILL.md           # Hovedinstruksjoner (påkrevd)
├── REFERENCE.md       # Detaljert dokumentasjon (ved behov)
├── EXAMPLES.md        # Brukseksempler (ved behov)
└── scripts/           # Hjelpeskript (ved behov)
    └── helper.js
```

## SKILL.md-mal

```md
---
name: skill-name
description: Kort beskrivelse av hva skillen kan. Bruk når [spesifikke triggere].
---

# Skill-navn

## Hurtigstart

[Minimalt fungerende eksempel]

## Arbeidsflyter

[Trinnvise prosesser med sjekklister for komplekse oppgaver]

## Avanserte funksjoner

[Lenke til egne filer: Se [REFERENCE.md](REFERENCE.md)]
```

## Krav til beskrivelse

Beskrivelsen er **det eneste agenten ser** når den skal velge hvilken skill som skal lastes. Den vises i systemprompten sammen med alle andre installerte skills. Agenten leser disse beskrivelsene og velger relevant skill basert på brukerens forespørsel.

**Mål**: Gi agenten akkurat nok informasjon til å vite:

1. Hvilken kapasitet skillen gir
2. Når/hvorfor den skal trigges (spesifikke nøkkelord, kontekster, filtyper)

**Format**:

- Maks 1024 tegn
- Skriv i tredjeperson
- Første setning: hva den gjør
- Andre setning: "Bruk når [spesifikke triggere]"

**Godt eksempel**:

```text
Ekstraher tekst og tabeller fra PDF-filer, fyll ut skjemaer og slå sammen dokumenter. Bruk når du jobber med PDF-filer eller når brukeren nevner PDF, skjemaer eller dokumentekstrahering.
```

**Dårlig eksempel**:

```text
Hjelper med dokumenter.
```

Det dårlige eksemplet gir agenten ingen måte å skille dette fra andre dokument-skills.

## Når du bør legge til skript

Legg til hjelpeskript når:

- Operasjonen er deterministisk (validering, formatering)
- Samme kode ellers ville blitt generert gjentatte ganger
- Feil trenger eksplisitt håndtering

Skript sparer tokens og gir høyere pålitelighet enn generert kode.

## Når du bør dele opp filer

Del opp i separate filer når:

- `SKILL.md` overstiger 100 linjer
- Innholdet har tydelig ulike domener (f.eks. finans- vs salgs-skjema)
- Avanserte funksjoner sjelden trengs

## Sjekkliste for gjennomgang

Etter utkastet, verifiser:

- [ ] Beskrivelsen inkluderer triggere ("Bruk når ...")
- [ ] `SKILL.md` er under 100 linjer
- [ ] Ingen tidskritisk informasjon
- [ ] Konsistent terminologi
- [ ] Konkrete eksempler er inkludert
- [ ] Referanser går bare ett nivå dypt
