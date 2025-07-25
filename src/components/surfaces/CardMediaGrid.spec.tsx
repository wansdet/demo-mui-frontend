import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router'
import CardMediaGrid from './CardMediaGrid'

const mockMedia = [
    {
        id: 1,
        title: 'Media 1',
        description: 'Description 1',
        image: 'image-1.jpg',
        link: '/media/1',
    },
    {
        id: 2,
        title: 'Media 2',
        description: 'Description 2',
        image: 'image-2.jpg',
        link: '/media/2',
    },
]

describe('CardMediaGrid Component', () => {
    it('renders media items correctly', () => {
        const buttonText = 'View Details'
        const infoPrefix = 'Info:'
        render(
            <Router>
                <CardMediaGrid
                    media={mockMedia}
                    buttonText={buttonText}
                    infoPrefix={infoPrefix}
                />
            </Router>,
        )

        // Check if all media titles are rendered
        mockMedia.forEach((mediaItem) => {
            const mediaTitle = screen.getByText(mediaItem.title)
            expect(mediaTitle).to.not.be.null
            expect(mediaTitle?.textContent).to.equal(mediaItem.title)
        })

        // Check if all media descriptions are rendered
        mockMedia.forEach((mediaItem) => {
            const mediaDescription = screen.getByText(mediaItem.description)
            expect(mediaDescription).to.not.be.null
            expect(mediaDescription?.textContent).to.equal(mediaItem.description)
        })

        // Check if all buttons are rendered with the correct text and accessibility attributes
        const buttons = screen.getAllByRole('button')
        expect(buttons).to.have.length(mockMedia.length)

        buttons.forEach((button, index) => {
            expect(button?.textContent).to.equal(buttonText)
            expect(button?.getAttribute('title')).to.equal(`${infoPrefix} ${mockMedia[index].title}`)
            expect(button?.getAttribute('aria-label')).to.equal(`${infoPrefix} ${mockMedia[index].title}`)
        })
    })
})
