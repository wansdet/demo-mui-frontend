import React from 'react'
import { render } from '@testing-library/react'
import H2 from './H2'

describe('H2 Component', () => {
    it('renders children correctly', () => {
        const { getByText } = render(<H2>Test children</H2>)
        const h2Element = getByText('Test children')
        expect(h2Element).to.not.be.null
        expect(h2Element?.tagName).to.equal('Test children')
    })

    it('renders h2 tag', () => {
        const { container } = render(<H2>Test is h2 tag</H2>)
        const h2Element = container.querySelector('h2')
        expect(h2Element).to.not.be.null
        expect(h2Element?.tagName).to.equal('H2')
    })

    it('applies component prop', () => {
        const { container } = render(
            <H2 component="h3">Testing component prop</H2>,
        )
        const h3Element = container.querySelector('h3')
        expect(h3Element).to.not.be.null
        expect(h3Element?.tagName).to.equal('H3')
    })

    it('applies align prop', () => {
        const { container } = render(
            <H2 align="justify">Testing align prop</H2>,
        )
        const h2Element = container.querySelector('h2')
        expect(h2Element).to.not.be.null
        expect(h2Element?.style.textAlign).to.equal('justify')
    })
})
