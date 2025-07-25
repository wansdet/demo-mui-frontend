import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import NavigationList from './NavigationList'

describe('NavigationList Component', () => {
    it('renders list title and nav links correctly', () => {
        const listTitle = 'Test List'
        const navLinks = [
            { url: '/link1', title: 'Link 1' },
            { url: '/link2', title: 'Link 2' },
            { url: '/link3', title: 'Link 3' },
        ]

        const { getByText, getByRole } = render(
            <BrowserRouter>
                <NavigationList listTitle={listTitle} navLinks={navLinks} />
            </BrowserRouter>,
        )

        const titleElement = getByText(listTitle)
        expect(titleElement).to.not.be.null
        expect(titleElement?.textContent).to.equal(listTitle)

        navLinks.forEach((link) => {
            const linkElement = getByRole('link', { name: link.title })
            expect(linkElement).to.not.be.null
            expect(linkElement.getAttribute('href')).to.be.equal(link.url)
        })
    })
})
