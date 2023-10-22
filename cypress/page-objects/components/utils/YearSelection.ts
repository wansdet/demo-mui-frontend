/**
 * src/cypress/page-objects/components/utils/YearSelection.ts
 * YearSelection page object class.
 */
export class YearSelection {
    getYearSelection() {
        return cy.get('[data-testid="year-selection"]')
    }

    getYearSelectionLabel() {
        return cy.get('[data-testid="year-selection-label"]')
    }

    getYearOption() {
        return cy.get('[data-test="year-selection-option"]')
    }
}
