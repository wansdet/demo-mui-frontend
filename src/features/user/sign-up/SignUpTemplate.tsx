import React from 'react'
import { Avatar, Box, Container, CssBaseline, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { Copyright } from '@/core/layout'

interface ISignUpTemplateProps {
    title?: string
    children: React.ReactNode
}

const SignUpTemplate = ({
    title = 'Sign up',
    children,
}: ISignUpTemplateProps) => {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                data-testid="sign-up-content"
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
                    data-testid="sign-up-heading"
                    component="h1"
                    variant="h5"
                >
                    {title}
                </Typography>
                {children}
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    )
}

export default SignUpTemplate
