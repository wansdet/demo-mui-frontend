import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Typography } from '@mui/material'

import { APP_NAME } from '@/core/application'
import { SecurityContext } from '@/core/security'
import { Footer } from '@/core/layout'
import { H1 } from '@/components/data-display'

const SignOut = () => {
    const auth = React.useContext(SecurityContext)
    const navigate = useNavigate()
    const title: string = 'Sign out'
    document.title = `${title} | ${APP_NAME}`

    const handleSignOut = () => {
        auth.logout(() => navigate('/'))
    }

    return (
        <React.Fragment>
            <Container
                maxWidth="md"
                component="main"
                sx={{ mt: 0, pt: 0, pb: 8 }}
            >
                <H1>Sign out</H1>
                <Typography variant="body1" mb={5} gutterBottom>
                    Are sure you want to sign out?
                </Typography>
                <Button variant="contained" onClick={handleSignOut}>
                    Confirm Sign out
                </Button>
            </Container>
            <Footer />
        </React.Fragment>
    )
}

export default SignOut
