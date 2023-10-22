import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'

import { PATH_SIGN_UP } from '@/core/application'

const SignInHelperer = () => {
    return (
        <Grid container>
            <Grid item xs>
                <Link to="#">Forgot password?</Link>
            </Grid>
            <Grid item>
                <Link to={PATH_SIGN_UP}>
                    {"Don't have an account? Sign Up"}
                </Link>
            </Grid>
        </Grid>
    )
}

export default SignInHelperer
