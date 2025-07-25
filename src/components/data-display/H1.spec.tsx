import React from 'react'
import { render } from '@testing-library/react'
import H1 from './H1'

describe('H1 Component', () => {
    it('renders children correctly', () => {
        const { getByText } = render(<H1>Test children</H1>)
        const h1Element = getByText('Test children')
        expect(h1Element).to.not.be.null
        expect(h1Element?.textContent).to.equal('Test children')
    })

    it('renders h1 tag', () => {
        const { container } = render(<H1>Test is h1 tag</H1>)
        const h1Element = container.querySelector('h1')
        expect(h1Element).to.not.be.null
        expect(h1Element?.tagName).to.equal('H1')
    })

    it('applies component prop', () => {
        const { container } = render(
            <H1 component="h2">Testing component prop</H1>,
        )
        const h2Element = container.querySelector('h2')
        expect(h2Element).to.not.be.null
        expect(h2Element?.tagName).to.equal('H2')
    })

    it('applies align prop', () => {
        const { container } = render(<H1 align="center">Testing align prop</H1>)
        const h1Element = container.querySelector('h1')
        expect(h1Element).to.not.be.null
        expect(h1Element?.style.textAlign).to.equal('center')
    })
})
