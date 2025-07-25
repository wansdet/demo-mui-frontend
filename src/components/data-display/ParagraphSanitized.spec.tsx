import React from 'react'
import { render } from '@testing-library/react'
import ParagraphSanitized from './ParagraphSanitized'

describe('ParagraphSanitized Component', () => {
    it('renders sanitized text correctly', () => {
        const textWithHtml =
            '<b>Bold Text</b><script>console.log("Malicious script");</script>'
        const { container } = render(<ParagraphSanitized text={textWithHtml} />)

        const paragraphElement = container.querySelector('p')
        expect(paragraphElement).to.not.be.null
        expect(paragraphElement?.textContent).to.equal('Bold Text')
        expect(paragraphElement?.innerHTML).to.equal('<b>Bold Text</b>') // Make sure the HTML is properly sanitized
    })

    it('replaces newline characters with line breaks', () => {
        const textWithNewlines = 'Line 1\nLine 2\nLine 3'
        const { container } = render(
            <ParagraphSanitized text={textWithNewlines} />,
        )

        const paragraphElement = container.querySelector('p')
        expect(paragraphElement).to.not.be.null
        expect(paragraphElement?.innerHTML).to.equal('Line 1<br>Line 2<br>Line 3')
    })
})
