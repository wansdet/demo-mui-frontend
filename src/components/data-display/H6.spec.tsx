import React from 'react'
import { render } from '@testing-library/react'
import H6 from './H6'

describe('H6 Component', () => {
    it('renders children correctly', () => {
        const { getByText } = render(<H6>Test children</H6>)
        const h6Element = getByText('Test children')
        expect(h6Element).to.not.be.null
        expect(h6Element?.textContent).to.equal('Test children')
    })

    it('renders h6 tag', () => {
        const { container } = render(<H6>Test is h6 tag</H6>)
        const h6Element = container.querySelector('h6')
        expect(h6Element).to.not.be.null
        expect(h6Element?.tagName).to.equal('H6')
    })

    it('applies component prop', () => {
        const { container } = render(
            <H6 component="h5">Testing component prop</H6>,
        )
        const h5Element = container.querySelector('h5')
        expect(h5Element).to.not.be.null
        expect(h5Element?.tagName).to.equal('H5')
    })
})
