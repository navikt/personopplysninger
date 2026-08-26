---
name: code-review
description: Review changes since a fixed point (commit, branch, tag, or merge-base) against this repo's documented coding standards and a code-smell baseline. Use when the user wants to review a branch, a PR, work-in-progress changes, asks to "review since X", or reaches the refactoring stage of TDD.
---

# Code review

Single-axis **Standards** review of the diff between `HEAD` and a fixed point the user
supplies: does the code follow this repo's documented standards, and does it avoid the
code smells below? This runs inline — no sub-agents.

> Spec review (does the code match an originating issue/spec?) is intentionally out of
> scope: this team doesn't work from Specs.

## 1. Establish the fixed point and diff

The fixed point is whatever the user says — a commit SHA, branch name, tag, `main`,
`HEAD~5`, etc. If they didn't give one, ask for it.

Validate before reviewing, so a bad ref or empty diff fails here rather than mid-review:

```bash
git rev-parse <fixed-point>                 # resolves?
git diff <fixed-point>...HEAD               # three-dot: compares against the merge-base
git log <fixed-point>..HEAD --oneline       # the commits under review
```

An unresolvable ref or an empty diff stops the review with a clear message.

## 2. Gather standards sources

This skill is synced into team repos, so discover what *this* repo documents rather than
assuming. Look for, and read what exists:

- `.github/instructions/*.instructions.md`
- `AGENTS.md`, `CONTEXT.md`
- `CONTRIBUTING.md`, `CODING_STANDARDS.md`
- ADRs in the area you're touching

Two rules bind every finding:

- **The repo overrides.** A documented repo standard always wins; where it endorses
  something the baseline below would flag, suppress the smell.
- **Skip what tooling enforces.** Don't flag anything a linter, formatter, or type checker
  already catches.

## 3. Smell baseline

Applies even when the repo documents nothing. Each smell is a labelled **judgement call**
("possible Feature Envy"), never a hard violation — read *what it is → how to fix*, match
against the diff. From *Refactoring* (Fowler), ch.3:

- **Mysterious Name** — a name that doesn't reveal what it does or holds. → rename; if no honest name comes, the design's murky.
- **Duplicated Code** — the same logic shape in more than one hunk or file. → extract the shape, call it from both.
- **Feature Envy** — a method reaching into another object's data more than its own. → move it onto the data it envies.
- **Data Clumps** — the same few fields/params keep travelling together. → bundle them into one type, pass that.
- **Primitive Obsession** — a primitive or string standing in for a domain concept. → give the concept its own small type.
- **Repeated Switches** — the same `switch`/`if`-cascade on the same type recurs. → replace with polymorphism, or one shared map.
- **Shotgun Surgery** — one logical change forces scattered edits across many files. → gather what changes together into one module.
- **Divergent Change** — one module edited for several unrelated reasons. → split so each module changes for one reason.
- **Speculative Generality** — abstraction/params/hooks added for needs that don't exist. → delete it; inline back until a real need shows.
- **Message Chains** — long `a.b().c().d()` navigation the caller shouldn't depend on. → hide the walk behind one method.
- **Middle Man** — a class/function that mostly just delegates onward. → cut it, call the real target direct.
- **Refused Bequest** — a subclass/implementer that ignores most of what it inherits. → drop the inheritance, use composition.

The set is a heuristic, not a checklist — add obvious relatives (long function, long
parameter list) when the diff shows them.

## 4. Review and report

Walk the diff per file/hunk and report:

1. **Documented-standard violations** — cite the standard (source file + the rule). These
   can be **hard violations**.
2. **Baseline smells** — name the smell and quote the hunk. Always **judgement calls**; a
   documented repo standard overrides the baseline.

Distinguish hard violations from judgement calls throughout. End with a one-line summary:
total findings, and the single worst issue.

Refactoring belongs here, not in the red → green loop — see the `test-driven-development` skill.
