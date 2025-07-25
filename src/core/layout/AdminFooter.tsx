import React from 'react'
import { Box, Typography } from '@mui/material'
import { SxProps } from '@mui/system'
import { merge } from 'lodash'

type IProps = {
    sx?: SxProps
}

const AdminFooter = (props: IProps) => {
    const { sx } = props

    const mergedSx = merge(
        {
            mt: 5,
        },
        sx
    )

    return (
        <Box
            data-testid="admin-footer-content"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
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
        </Box>
    )
}
export default AdminFooter
