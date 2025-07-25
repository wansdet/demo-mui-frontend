import React from 'react'
import { useNavigate } from 'react-router'
import { Button, Container, Typography } from '@mui/material'

import { APP_NAME } from '@/core/application'
import { SecurityContext } from '@/core/security'
import Footer from '@/core/layout/Footer'
import { H1 } from '@/components/data-display'

const SignOut = () => {
    const auth = React.useContext(SecurityContext)
    const navigate = useNavigate()
    const title = 'Sign out'
    document.title = `${title} | ${APP_NAME}`

    const handleSignOut = () => {
        auth.logout(() => navigate('/'))
    }

    return (
        <>
            <Container
                id="sign-out-container"
                maxWidth="md"
                component="main"
                sx={{ mt: 0, pt: 0, pb: 8 }}
            >
                <H1 className="page-heading">Sign out</H1>
                <Typography data-testid="sign-out-text" variant="body1" mb={5} gutterBottom>
                    Are sure you want to sign out?
                </Typography>
                <Button data-testid="sign-out-confirm-btn" variant="contained" onClick={handleSignOut}>
                    Confirm Sign out
                </Button>
            </Container>
            <Footer />
        </>
    )
}

export default SignOut
