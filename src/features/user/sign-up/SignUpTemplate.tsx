import React from 'react'
import { Avatar, Box, Container, CssBaseline } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { Copyright } from '@/core/layout'
import { H1 } from '@/components/data-display'

interface ISignUpTemplateProps {
    title: string
    children: React.ReactNode
}

const SignUpTemplate = ({
    title = 'Sign up',
    children,
}: ISignUpTemplateProps) => {
    return (
        <Container id="sign-up-container" component="main" maxWidth="xs">
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
                <H1 className="page-heading" data-testid="sign-up-heading">{title}</H1>
                {children}
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    )
}

export default SignUpTemplate
