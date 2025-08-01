import React from 'react'
import { render } from '@testing-library/react'
import H5 from './H5'

describe('H5 Component', () => {
    it('renders children correctly', () => {
        const { getByText } = render(<H5>Test children</H5>)
        const h5Element = getByText('Test children')
        expect(h5Element).to.not.be.null
        expect(h5Element?.textContent).to.equal('Test children')
    })

    it('renders h5 tag', () => {
        const { container } = render(<H5>Test is h5 tag</H5>)
        const h5Element = container.querySelector('h5')
        expect(h5Element).to.not.be.null
        expect(h5Element?.tagName).to.equal('H5')
    })

    it('applies component prop', () => {
        const { container } = render(
            <H5 component="h6">Testing component prop</H5>,
        )
        const h6Element = container.querySelector('h6')
        expect(h6Element).to.not.be.null
        expect(h6Element?.tagName).to.equal('H6')
    })
})
