import React from 'react'
import { Typography } from '@mui/material'
import { SxProps } from '@mui/system'
import { merge } from 'lodash'

type IProps = {
    sx?: SxProps
}

const Copyright = (props: IProps) => {
    const { sx } = props

    const mergedSx = merge(
        {
            mt: 5,
        },
        sx
    )

    return (
        <Typography
            data-test="copyright"
            variant="body2"
            color="text.secondary"
            align="center"
            sx={mergedSx}
        >
            {'Copyright © '}
            {new Date().getFullYear()} demo@example.com
        </Typography>
    )
}
export default Copyright
