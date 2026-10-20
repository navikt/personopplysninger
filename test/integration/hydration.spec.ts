import { expect, test } from "@playwright/test";

const paths = [
    "nb/",
    "nn/",
    "en/",
    "nb/dsop",
    "nb/dsop/2019-06-18T10%3A45%3A51.634",
    "nb/dsop/2000-01-01T00%3A00%3A00",
    "nb/institusjonsopphold",
    "nb/institusjonsopphold/2017-10-02T07%3A38%3A56.816",
    "nb/institusjonsopphold/2000-01-01T00%3A00%3A00",
    "nb/medlemskap-i-folketrygden",
    "nb/endre-kontonummer",
    "nb/arbeidsforhold/1",
];

const hydrationProblem = /hydrat|did not match|validateDOMNesting|Expected server HTML/i;

for (const path of paths) {
    test(`hydrates ${path} without mismatch against the server HTML`, async ({ page }) => {
        const problems: string[] = [];
        page.on("console", (message) => {
            if (hydrationProblem.test(message.text())) problems.push(message.text());
        });
        page.on("pageerror", (error) => {
            if (hydrationProblem.test(error.message)) problems.push(error.message);
        });

        await page.goto(path, { waitUntil: "networkidle" });

        expect(problems).toEqual([]);
    });
}
