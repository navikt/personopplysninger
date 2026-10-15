import { expect, test } from "@playwright/test";

const paths = [
    "nb/",
    "nn/",
    "en/",
    "nb/dsop",
    "nb/institusjonsopphold",
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
