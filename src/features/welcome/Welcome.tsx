import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container } from '@mui/material'

import { APP_NAME, PATH_SIGN_IN } from '@/core/application'
import { Footer } from '@/core/layout'
import { H1, Paragraph } from '@/components/data-display'

const Welcome = () => {
    const title: string = 'Welcome to Demo App'
    document.title = `${title} | ${APP_NAME}`

    return (
        <React.Fragment>
            <Container
                maxWidth="lg"
                component="main"
                sx={{ mt: 0, pt: 0, pb: 8 }}
            >
                <H1>{title}</H1>
                <Paragraph sx={{ mb: 5 }}>
                    Thank you for joining {APP_NAME}! We're excited to have you
                    on board. You now have access to a world of exciting
                    content, features, and opportunities. Feel free to explore,
                    connect with other members, and make the most out of your
                    experience here. If you have any questions or need
                    assistance, our support team is here to help. Enjoy your
                    journey with us!"
                </Paragraph>
                <Link to={PATH_SIGN_IN}>
                    <Button variant="contained">Sign in</Button>
                </Link>
            </Container>
            <Footer />
        </React.Fragment>
    )
}

export default Welcome
