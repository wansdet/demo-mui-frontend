import React from 'react'
import { Container } from '@mui/material'

import { APP_NAME } from '@/core/application'
import { Footer } from '@/core/layout'
import { Heading, Section, Paragraph } from '@/components/data-display'

const technologies = [
    'React',
    'TypeScript',
    'Material UI',
    'Material UI Data Grids and Charts',
    'Vite',
    'Vitest',
    'Cypress',
    'React Router',
    'React Hook Form/Yup',
    'axios',
    'Mock Service Worker',
    'Faker',
    'ESLint/Prettier/AirBNB',
]

const Home = () => {
    document.title = APP_NAME

    return (
        <React.Fragment>
            <Container maxWidth="md" component="main" sx={{ pt: 0, pb: 8 }}>
                <Section id="home-section">
                    <Heading data-testid="home-heading">Home</Heading>
                    <Paragraph data-testid="home-text">
                        This demo application is built using the following
                        technologies:
                    </Paragraph>
                    <ul data-testid="technologies-list">
                        {technologies.map((technology) => (
                            <li
                                data-test="technologies-list-item"
                                key={technology}
                            >
                                {technology}
                            </li>
                        ))}
                    </ul>
                </Section>
            </Container>
            <Footer />
        </React.Fragment>
    )
}

export default Home
