import React from 'react'
import { Avatar, CssBaseline, Box, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { Copyright } from '@/core/layout'
import { H1 } from '@/components/data-display'

interface ISignInTemplateProps {
    title: string
    children: React.ReactNode
}

const SignInTemplate = ({
    title = 'Sign in',
    children,
}: ISignInTemplateProps) => (
    <Container id="sign-in-container" component="main" maxWidth="xs">
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
            <H1 className="page-heading" data-testid="sign-in-heading">{title}</H1>
            {children}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
)

export default SignInTemplate
