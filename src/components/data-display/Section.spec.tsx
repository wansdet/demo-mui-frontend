import React from 'react'
import { render } from '@testing-library/react'
import { Section, Heading } from '@/components/data-display'

describe('Section Component', () => {
    it('renders a section with the correct level and id', () => {
        const { container } = render(
            <Section id="section-level-0">
                <Heading>Heading 1 Level 0</Heading>
                <Section id="section-level-1">
                    <Heading>Heading 2 Level 1</Heading>
                    <Section id="section-level-2">
                        <Heading>Heading 3 Level 2</Heading>
                        <Section id="section-level-3">
                            <Heading>Heading 4 Level 3</Heading>
                            <Section id="section-level-4">
                                <Heading>Heading 5 Level 4</Heading>
                                <Section id="section-level-5">
                                    <Heading>Heading 6 Level 5</Heading>
                                    <Section id="section-level-6">
                                        <Heading>Heading 7 Level 6</Heading>
                                    </Section>
                                </Section>
                            </Section>
                        </Section>
                    </Section>
                </Section>
            </Section>,
        )

        const h1Element = container.querySelector('h1')
        expect(h1Element).to.not.be.null
        expect(h1Element?.textContent).to.equal('Heading 1 Level 0')

        const h2Element = container.querySelector('h2')
        expect(h2Element).to.not.be.null
        expect(h2Element?.textContent).to.equal('Heading 2 Level 1')

        const h3Element = container.querySelector('h3')
        expect(h3Element).to.not.be.null
        expect(h3Element?.textContent).to.equal('Heading 3 Level 2')

        const h4Element = container.querySelector('h4')
        expect(h4Element).to.not.be.null
        expect(h4Element?.textContent).to.equal('Heading 4 Level 3')

        const h5Element = container.querySelector('h5')
        expect(h5Element).to.not.be.null
        expect(h5Element?.textContent).to.equal('Heading 5 Level 4')

        const h6Element = container.querySelector('h6')
        expect(h6Element).to.not.be.null
        expect(h6Element?.textContent).to.equal('Heading 6 Level 5')
    })
})
