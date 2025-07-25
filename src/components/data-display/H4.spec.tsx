import React from 'react'
import { render } from '@testing-library/react'
import H4 from './H4'

describe('H4 Component', () => {
    it('renders children correctly', () => {
        const { getByText } = render(<H4>Test children</H4>)
        const h4Element = getByText('Test children')
        expect(h4Element).to.not.be.null
        expect(h4Element?.textContent).to.equal('Test children')
    })

    it('renders h4 tag', () => {
        const { container } = render(<H4>Test is h4 tag</H4>)
        const h4Element = container.querySelector('h4')
        expect(h4Element).to.not.be.null
        expect(h4Element?.tagName).to.equal('H4')
    })

    it('applies component prop', () => {
        const { container } = render(
            <H4 component="h5">Testing component prop</H4>,
        )
        const h5Element = container.querySelector('h5')
        expect(h5Element).to.not.be.null
        expect(h5Element?.tagName).to.equal('H5')
    })
})
