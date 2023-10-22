import React from 'react'
import { Avatar, CssBaseline, Box, Typography, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { Copyright } from '@/core/layout'

interface ISignInTemplateProps {
    title?: string
    children: React.ReactNode
}

const SignInTemplate = ({
    title = 'Sign in',
    children,
}: ISignInTemplateProps) => {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                data-testid="sign-in-content"
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography
                    data-testid="sign-in-heading"
                    component="h1"
                    variant="h5"
                >
                    {title}
                </Typography>
                {children}
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    )
}

export default SignInTemplate
