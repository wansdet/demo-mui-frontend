import React from 'react'
import { Link } from 'react-router'
import { Grid } from '@mui/material'

import { PATH_SIGN_UP } from '@/core/application'

const SignInHelperer = () => {
    return (
        <Grid container>
            <Grid size="grow">
                <Link id="forgot-password-link" to={PATH_SIGN_UP}>
                    Forgot password?
                </Link>
            </Grid>
            <Grid>
                <Link id="dont-have-an-account-link" to={PATH_SIGN_UP}>
                    Don&#39;t have an account? Sign Up
                </Link>
            </Grid>
        </Grid>
    )
}

export default SignInHelperer
