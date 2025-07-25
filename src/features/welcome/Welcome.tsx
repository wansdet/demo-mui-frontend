import React from 'react'
import { Link } from 'react-router'
import { Button, Container } from '@mui/material'

import { APP_NAME, PATH_SIGN_IN } from '@/core/application'
import Footer from '@/core/layout/Footer'
import { H1, Paragraph } from '@/components/data-display'

const Welcome = () => {
    const title = 'Welcome'
    document.title = `${title} | ${APP_NAME}`

    return (
        <>
            <Container
                id="welcome-container"
                maxWidth="lg"
                component="main"
                sx={{ mt: 0, pt: 0, pb: 8 }}
            >
                <H1 className="page-heading">{title}</H1>
                <Paragraph data-testid="welcome-text" sx={{ mb: 5 }}>
                    Thank you for joining {APP_NAME}! We&#39;re excited to have you
                    on board. You now have access to a world of exciting
                    content, features, and opportunities. Feel free to explore,
                    connect with other members, and make the most out of your
                    experience here. If you have any questions or need
                    assistance, our support team is here to help. Enjoy your
                    journey with us!&#34;
                </Paragraph>
                <Link to={PATH_SIGN_IN}>
                    <Button data-testid="welcome-sign-in-btn" variant="contained" >Sign in</Button>
                </Link>
            </Container>
            <Footer />
        </>
    )
}

export default Welcome
