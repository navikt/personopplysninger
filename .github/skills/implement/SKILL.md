---
name: implement
description: "Implement a piece of work based on a spec or set of tickets."
disable-model-invocation: true
---

Implement the work described by the user in the spec or tickets.

Use /test-driven-development where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

Once the implementation and tests are complete, run /code-review to review your changes against the repo's coding standards and code-smell baseline. Address the findings before continuing.

Commit your work to the current branch.