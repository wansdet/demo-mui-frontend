import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'

import { PATH_SIGN_IN } from '@/core/application'

const SignUpHelper = () => {
    return (
        <Grid container justifyContent="flex-end">
            <Grid item>
                <Link to={PATH_SIGN_IN}>Already have an account? Sign in</Link>
            </Grid>
        </Grid>
    )
}

export default SignUpHelper
