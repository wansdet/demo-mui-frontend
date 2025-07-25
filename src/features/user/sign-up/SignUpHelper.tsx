import React from 'react'
import { Link } from 'react-router'
import { Grid } from '@mui/material'

import { PATH_SIGN_IN } from '@/core/application'

const SignUpHelper = () => {
    return (
        <Grid container justifyContent="flex-end">
            <Grid>
                <Link id="already-have-an-account-link" to={PATH_SIGN_IN}>
                    Already have an account? Sign in
                </Link>
            </Grid>
        </Grid>
    )
}

export default SignUpHelper
