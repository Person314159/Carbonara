import { expect } from "vitest";

// Shared by the two data-validation suites (networkDataValidation, rmpDataValidation). Every check
// runs once at module load and collects findings here rather than asserting inline, so one broken
// invariant doesn't mask the others and each `it` can assert on its own slice of the report.
export class Reporter {
    errors: string[] = [];
    warnings: string[] = [];
    error(msg: string) {
        this.errors.push(msg);
    }
    warn(msg: string) {
        this.warnings.push(msg);
    }
}

/** Warnings are logged and tolerated; errors fail the test. */
export function expectNoErrors(report: Reporter) {
    if (report.warnings.length) console.warn(report.warnings.join("\n"));
    expect(report.errors).toEqual([]);
}
